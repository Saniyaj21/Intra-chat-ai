'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import SessionCard from '@/components/SessionCards'

const Page = () => {
  const [allChatbots, setAllChatbots] = useState([])
  const [loading, setLoading] = useState(false)

  const getAllChatbots = async () => {
    setLoading(true)
    const res = await axios.get(`/api/chatbot/all`)
    setAllChatbots(res.data.chatbots)
    setLoading(false)
  }

  useEffect(() => {
    getAllChatbots()
  }, [])


  return (
    <div className='mt-8 w-full px-4 mb-8'>
      <h2 className='font-bold text-center'>Active Chatbots Sessions</h2>
      <p className='text-slate-400 text-center'>See all conversation between your Chatbot and User.</p>
      {/* all chatbots */}
      <div className='flex mt-8 flex-col flex-wrap-reverse items-center gap-6'>

        {
          loading && <p className='text-blue-400 font-semibold'>Loading ChatBots..</p>
        }
        {
          allChatbots && allChatbots.map((chatbot, index) => (
            <SessionCard key={index} chatbot={chatbot} />
          ))
        }
      </div>
    </div>
  )
}

export default Page
