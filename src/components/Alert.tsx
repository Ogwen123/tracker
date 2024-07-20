//import React from 'react'
import { _Alert } from '../global/types'
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'

interface AlertProps {
    content: string
    severity: "SUCCESS" | "ERROR"
    show: boolean,
    title?: string,
    width?: string
}

const Alert = ({ content, severity, show, title, width = "100%" }: AlertProps) => {
    let colour = severity === "ERROR" ? "bg-error" : "bg-success"

    return (
        show ?

            <div
                className={`flex items-center bg-bgdark rounded-md overflow-hidden`}
                style={{
                    width: width
                }}
            >
                <div className={colour + " self-start fc h-full w-[50px] p-[5px]"}>
                    {
                        severity === "ERROR" ?
                            <ExclamationCircleIcon className="h-7 w-7 m-[5px]" />
                            :
                            <CheckCircleIcon className="h-7 w-7 m-[5px]" />
                    }
                </div>
                <div className={colour + ' bg-opacity-60 flex flex-col w-full items-center py-[5px] px-[10px] h-full'}>
                    <div className={"w-full h-[30px] text-xl"}>{title ? title : severity[0] + severity.slice(1).toLowerCase()}</div>
                    <div className={"w-full h-[30px] text-md"}>{content}</div>
                </div>
            </div>

            :
            <div className='hidden'></div>
    )
}

export default Alert

export const alertReset: _Alert = ["Alert", "ERROR", false]