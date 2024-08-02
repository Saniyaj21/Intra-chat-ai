"use client"
import Messages from '@/components/Messages'
import axios from 'axios'
import { useEffect, useState } from 'react'


const Page = ({ params }) => {
  const [messages, setMessages] = useState([])
  const [guest, setGuest] = useState({})
  const [session, setSession] = useState({})

  const getAllMessages = async () => {
   try {
    const {data} = await axios.get(`/api/messages/all?session_id=${params.id}`)
    console.log("session id all messages",data);
    setMessages(data.messages)
    setGuest(data.guest.guest_id)
    setSession(data.guest)
   } catch (error) {
    console.log(error);
   }
  }

  useEffect(() => {
    getAllMessages()
  }, [params.id])

  return (
    <div className="mt-4 w-full px-8 mb-4">
      <h1 className="font-semibold text-lg">Session Review</h1>
      <p className="">Session Started : {new Date(session.created_at).toString().slice(0, 10)}</p>
      <p className="">With {guest.name} ({guest.email})</p>
      <hr className="mt-2" />
      <div className="shadow-lg border-2 border-blue-200 rounded p-4">
        {
          messages && messages.map((message, index) => (
            <Messages message={message} key={index} />
          ))
        }
      </div>
    </div>
  )
}

export default Page
