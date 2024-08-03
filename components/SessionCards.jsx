'use client'
import ReactTimeAgo from 'react-time-ago'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

// time ago
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const SessionCards = ({ chatbot }) => {

    const [open, setOpen] = useState(false)
    const [sessions, setSessions] = useState([])

    const getSessions = async () => {
        const { data } = await axios.get(`/api/chatbot/sessions?chatbot_id=${chatbot._id}`)
        setSessions(data.sessions)
        console.log(data);

    }

    useEffect(() => {
        getSessions()
    }, [chatbot._id])

    return (
        <div className='flex flex-col justify-center gap-6 border p-5 shadow-md rounded w-[90%] max-w-[500px]'>
            <div>
                <h1 className='font-semibold text-lg'>{chatbot.name}</h1>
                <p className='font-normal text-sm'> Active Chats  : {sessions ? sessions.length : 0}</p>

            </div>
            <div className=''>
                {sessions && <button onClick={() => setOpen(!open)} className='text-white font-bold border bg-blue-500 rounded py-2 px-4 '>{open ? "Hide " : "View "}Chats</button>}
                <div className={`${open ? "h-[100%]" : "h-0"} overflow-hidden `}>
                    {
                        sessions && sessions.map(session => (
                            <Link href={`/review-sessions/${session._id}`} key={session.created_at} >
                                <div className='bg-blue-500 rounded p-2 my-2 text-white w-full'>

                                    <p className='flex justify-between'>
                                        Name : {session.guest_id.name}
                                    </p>
                                    <p className='flex justify-between'>
                                        Email : {session.guest_id.email}
                                    </p>

                                    <p>Chat Started : <ReactTimeAgo date={new Date(session.created_at)} locale="en-US" /></p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>


        </div>
    )
}

export default SessionCards
