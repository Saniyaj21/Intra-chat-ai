'use client'

import { usePathname } from "next/navigation"
import Avatar from "./Avatar"
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useEffect, useRef } from "react"

import ReactTimeAgo from "react-time-ago"
// time ago
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'


import { FaRobot } from "react-icons/fa";

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const Messages = ({ message }) => {
    const path = usePathname()
    const isReviewsPage = path.includes("review-sessions")

    console.log(message)
    const ref = useRef(null)


    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [message])

    return (
        <div className={`flex ${message.sender == 'user' ? "justify-end " : ""}`}>
            {
                message.sender == "ai" ?
                    <AIMessage message={message} />
                    :
                    <UserMessage message={message} />
            }

            <div ref={ref} />
        </div>


    )
}

export default Messages

const AIMessage = ({ message }) => {
    return (
        <div className="flex items-start gap-2  border border-blue-400 rounded-lg px-4 py-2 bg-slate-200 my-2">

                <span className="pt-1"><FaRobot /></span>
            <div>
                <div>
                    <Markdown remarkPlugins={remarkGfm} className={'break-words'}>

                        {message.content}
                    </Markdown>
                </div>
                <div className="text-sm mt-1">
                <ReactTimeAgo date={new Date(message.created_at)} locale="en-US"/>
                  
                </div>
            </div>
        </div>
    )
}

const UserMessage = ({ message }) => {
    return (
        <div className="flex gap-2 items-center border border-black rounded-lg px-4 py-2 bg-slate-200 my-2 ">
            <Avatar seed="user" className="h-7 w-7 " />
            <div>
                <div>
                    {message.content}
                </div>
                <div className="text-sm mt-1">
                <ReactTimeAgo date={new Date(message.created_at)} locale="en-US"/>
                  
                </div>
            </div>
        </div>
    )
}
