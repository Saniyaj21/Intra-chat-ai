'use client'


import { SignedIn } from '@clerk/nextjs'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SessionCard from '@/components/SessionCards'

const page = () => {
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

      <div className='mt-8 w-full px-4 mb-8'>
        <h2 className='font-bold '>Active Chatbots Sessions</h2>

        {/* all chatbots */}
        <div className='flex mt-8 flex-col flex-wrap-reverse items-center gap-6'>
          {
            allChatbots && allChatbots.map((chatbot, index) => (
              <SessionCard key={index} chatbot = {chatbot} />
           
            ))
          }
        </div>

      </div>

  )
}

export default page
