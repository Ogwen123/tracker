import React from "react";

import { Link } from "react-router-dom";
import { _Alert, _Task } from "../../global/types";
import CompletionDateBadge from "../tasks/CompletionDateBadge";
import RepeatPeriodBadge from "../tasks/RepeatPeriodBadge";
import DeleteDialog from "../tasks/DeleteTaskDialog";
import { BookmarkIcon, TrashIcon } from "@heroicons/react/20/solid";
import { useData } from "../../App";
import { url } from "../../utils/url";
import { alertReset } from "../Alert";

interface PinnedCardProps {
    task: _Task;
    setPinnedTasks: React.Dispatch<React.SetStateAction<_Task[] | undefined>>;
    setAlert: React.Dispatch<React.SetStateAction<_Alert>>;
}

const PinnedCard = ({ task, setPinnedTasks, setAlert }: PinnedCardProps) => {
    const { user } = useData();

    const [deleteDialog, setDeleteDialog] = React.useState<boolean>(false);

    const pinTask = () => {
        if (!user) return;
        console.log("here");
        fetch(url("tracker") + "task/pin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify({
                id: task.id,
                page: 0,
            }),
        }).then((res) => {
            if (!res.ok) {
                res.json().then((data) => {
                    setAlert([data.error, "ERROR", true]);
                    setTimeout(() => {
                        setAlert(alertReset);
                    }, 5000);
                });
            } else {
                setPinnedTasks((prev) =>
                    prev?.filter((pinned, _) => {
                        if (task.id === pinned.id) {
                            return false;
                        } else {
                            return true;
                        }
                    }),
                );
            }
        });
    };

    const completeTask = () => {
        if (!user) return;
        console.log("here");
        fetch(url("tracker") + "task/complete", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify({
                id: task.id,
                page: 0,
                return_updated_tasks: "PINNED",
            }),
        }).then((res) => {
            if (!res.ok) {
                res.json().then((data) => {
                    setAlert([data.error, "ERROR", true]);
                    setTimeout(() => {
                        setAlert(alertReset);
                    }, 5000);
                });
            } else {
                res.json().then((data) => {
                    setPinnedTasks(data.data);
                });
            }
        });
    };

    return (
        <div
            className={
                "rounded-md p-[10px] flex flex-row w-full backdrop:flex-grow max-h-[123px] min-h-[123px] mb-[4px] " +
                (task.completed
                    ? "border-[2px] border-secondary"
                    : "white-border")
            }
        >
            <DeleteDialog
                open={deleteDialog}
                setOpen={setDeleteDialog}
                id={task.id}
                setTasks={setPinnedTasks}
                useSuccessHandler={false}
            />
            <div className="w-[80%] flex flex-col">
                <div className="flex flex-wrap">
                    <RepeatPeriodBadge type={task.repeat_period} />
                    {task.date_time && <CompletionDateBadge />}
                </div>
                <div className="text-xl">{task.name}</div>

                <div className="flex flex-row items-center mt-auto">
                    <BookmarkIcon
                        className={
                            "size-7 hover:fill-yellow-300/50 " +
                            (task.pinned &&
                                "fill-yellow-300 hover:fill-yellow-300")
                        }
                        onClick={pinTask}
                    />
                    <TrashIcon
                        className={"size-7 hover:fill-error/50"}
                        onClick={() => setDeleteDialog(true)}
                    />
                </div>
            </div>
            <div className="flex flex-col w-[20%]">
                <Link
                    to={"/task/" + task.id}
                    className="rounded-md bg-main h-[50%] flex-grow mt-[5px] fc hover:bg-maindark"
                >
                    View Task
                </Link>
                <button
                    className="rounded-md bg-main h-[50%] flex-grow mt-[5px] fc hover:bg-maindark"
                    onClick={completeTask}
                >
                    {task.completed ? (
                        <div className="text-sm">Undo Completion</div>
                    ) : (
                        <div>Complete</div>
                    )}
                </button>
            </div>
        </div>
    );
};

export default PinnedCard;
