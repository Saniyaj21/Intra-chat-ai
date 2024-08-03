'use client'

import Avatar from "@/components/Avatar"
import Messages from "@/components/Messages"
import axios from "axios"
import { useEffect, useState } from "react"


const Page = ({ params }) => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isOpen, setIsOpen] = useState(true)
    const [loading, setLoading] = useState("")
    const [messages, setMessages] = useState([])
    const [chatbot, setChatbot] = useState("")
    const [sessionId, setSessionId] = useState("")
    const [sendMessage, setSendMessage] = useState("")

    const handleGuestSubmit = async (e) => {
        e.preventDefault()
        if (!name || !email) {
            return
        }
        setIsOpen(!open)
        const id = params.id
        // create chat sesson 
        const { data } = await axios.post(`/api/chatbot?id=${params.id}`, {
            name, email, id
        })
        setSessionId(data.chatSession._id)
    }

    // Displaying the chat details in head
    const getChat = async () => {
        const { data } = await axios.get(`/api/chatbot?id=${params.id}`)
        setChatbot(data.chatbot)
    }

    // get all messgaes of sessionId
    const getAllSessionMessages = async () => {
        const { data } = await axios.get(`/api/messages/session-messages?session_id=${sessionId}`)
        setMessages(data.messages)
    }
    // get send messages
    const sendMessageHandler = async (e) => {
        e.preventDefault()
        const date = Date.now()

        // setting the user messgae so that we can wait for ai to reply
        setMessages([...messages, {
            content: sendMessage,
            sender: "user",
            created_at: date
        }])
        setSendMessage('')
        setLoading(true)
        const { data } = await axios.post(`/api/messages/send?session_id=${sessionId}&chat_id=${params.id}`, {
            message: sendMessage,
            sender: "user",
            name
        })
        setLoading(false)
        setMessages(data.allMessages)
    }

    useEffect(() => {
        getChat()
        getAllSessionMessages()
    }, [params.id, sessionId])

    return (
        <div>
            <div className={`${isOpen ? "block" : "hidden"} z-50 bg-slate-200 absolute h-screen flex  justify-center items-center w-full`}>

                <form className="flex flex-col items-center justify-center m-auto p-6 border rounded-lg shadow-lg  gap-3">
                    <h1 className="text-blue-400 font-semibold">Continue as Guest</h1>
                    <input onChange={(e) => setName(e.target.value)} required type="text" placeholder="Enter your name.." className="border p-2 w-full rounded outline-none focus:border-blue-500" />
                    <input onChange={(e) => setEmail(e.target.value)} required type="email" placeholder="Enter your email.." className="border p-2 w-full rounded outline-none focus:border-blue-500" />
                    <button disabled={!name || !email} onClick={handleGuestSubmit} type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition-colors font-semibold">Continue</button>
                </form>

            </div>
            <div className="flex justify-center items-center w-full h-screen bg-slate-100">
                <div className="relative w-full max-w-[400px] bg-white h-[90%] shadow-lg border-2">
                    <div className=" flex gap-2 p-2 items-center bg-blue-400 text-white">
                        <Avatar seed={chatbot.name} className="h-10 w-10" />
                        <div  >
                            <h2 className="text-xl">{chatbot.name}</h2>
                            <p className="text-sm">Typically replies instantly.</p>
                        </div>
                    </div>
                    <div className="h-[80%] px-4 overflow-scroll pb-8 ">
                        {
                            messages && messages.map((message) => (

                                <Messages message={message} key={message._id} />
                            ))
                        }

                        {
                            loading &&  <p className="text-blue-400 font-semibold">Thinking...</p>
                        }
                       
                    </div>
                    <div className="absolute bottom-0 w-full p-4 bg-gray-100 border-t border-gray-300">
                        <form onSubmit={sendMessageHandler} className="flex gap-2">
                            <input onChange={(e) => setSendMessage(e.target.value)} value={sendMessage} type="text" className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Type your message..." />
                            <button disabled={loading} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Send</button>
                        </form>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Page
