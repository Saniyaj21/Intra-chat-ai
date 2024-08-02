'use client'


import Avatar from '@/components/Avatar'
import { SignedIn } from '@clerk/nextjs'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [allChatbots, setAllChatbots] = useState([])

  const getAllChatbots = async () => {
    const res = await axios.get(`/api/chatbot/all`)
    console.log(res.data);
    setAllChatbots(res.data.chatbots)
  }

  useEffect(() => {
    getAllChatbots()
  }, [])


  return (

      <div className='mt-8 w-full px-4'>
        <h2 className='font-bold '>Active Chatbots</h2>

        {/* all chatbots */}
        <div className='flex  mt-8 flex-col flex-wrap-reverse items-center gap-6'>
          {
            allChatbots && allChatbots.map((chatbot) => (
              <Link href={`/edit-chatbot/${chatbot._id}`} key={chatbot._id}
                className='flex items-center gap-6 border p-5 shadow-md rounded w-[90%] max-w-[500px]'
              >
                <Avatar seed={chatbot.name} />
                <div>
                  <h1 className='font-semibold text-lg'>{chatbot.name}</h1>
                  <p className='font-normal text-sm'> Created At : {new Date(chatbot.created_at).toString().slice(0, 10)}</p>
                 
                </div>

              </Link>
            ))
          }
        </div>

      </div>

  )
}

export default Page
