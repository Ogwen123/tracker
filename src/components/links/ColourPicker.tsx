import React from "react";
import { colourMap } from "../../utils/utils";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface ColourPickerProps {
    id: string;
    colour: number;
    type: "CLASS" | "TYPE";
    setColour: (id: string, colour: number, type: "CLASS" | "TYPE") => void;
}

const ColourPicker = ({ id, colour, type, setColour }: ColourPickerProps) => {
    const [showPicker, setShowPicker] = React.useState<boolean>(false);
    React.useEffect(() => console.log(showPicker), [showPicker]);
    return (
        <div className="">
            <div className="relative">
                <div
                    className={"size-6 rounded-lg white-border"}
                    style={{ backgroundColor: colourMap[colour] }}
                    onClick={() => {
                        setShowPicker(true);
                    }}
                ></div>
                {showPicker && (
                    <div className="absolute z-10 bg-bgdark white-border p-[5px] rounded-lg flex flex-col left-[35px] top-[-10px]">
                        <XMarkIcon
                            className="size-6"
                            onClick={() => {
                                setShowPicker(false);
                            }}
                        />
                        {[...Array(10)].map((_, index) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        "size-6 rounded-lg white-border my-[3px] border-[2px] outline-offset-2 " +
                                        (colour === index
                                            ? "border-[" +
                                              colourMap[index] +
                                              "]"
                                            : "border-bgdark")
                                    }
                                    style={{
                                        backgroundColor: colourMap[index],
                                    }}
                                    onClick={() => {
                                        setColour(id, index, type);
                                        setShowPicker(false);
                                    }}
                                ></div>
                            );
                        })}
                    </div>
                )}
            </div>

            {showPicker && (
                <div
                    className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/5 backdrop-blur-xs z-5"
                    onClick={() => {
                        setShowPicker(false);
                    }}
                ></div>
            )}
        </div>
    );
};

export default ColourPicker;
