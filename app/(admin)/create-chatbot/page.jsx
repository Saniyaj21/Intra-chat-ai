'use client'

import Avatar from '@/components/Avatar'
import { createChatbot } from "@/actions/chatbot"

const Page = () => {
  return (
    <div className='flex flex-col items-center justify-center md:flex-row md:space-x-10 bg-white p-10 rounded m-10 shadow-lg'>
      <Avatar seed='create-chatbot' />
      <div>
        <h1 className='text-xl lg:text-3xl font-semibold mb-2'>Create</h1>
        <h2 className='font-light mb-4'>Create a new chatbot to assist you in your conversation with your customers.</h2>

        <form action={createChatbot} className='flex flex-col md:flex-row gap-5 m-2'>
          <input
            placeholder='Chatbot Name'
            className='max-w-lg border border-gray-300 rounded p-2 outline-none focus:rounded-lg focus:border-gray-600'
            required
            name='chatbot_name'
          />
          <button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
            Create Chatbot
          </button>
        </form>
      </div>
    </div>
  )
}

export default Page
