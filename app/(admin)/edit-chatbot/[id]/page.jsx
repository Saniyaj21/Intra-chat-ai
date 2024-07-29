'use client'

import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react"
import { getChatbotName } from "@/actions/chatbot";
import axios from "axios"

const Page = ({ params }) => {
  const [url, setUrl] = useState("hi")
  const [copySuccess, setCopySuccess] = useState("")
  const [chatbotName, setChatbotName] = useState("")

  const getChat = async () => {
    const { id } = params;
    const res = await axios.get(`/api/chatbot/${id}`)
    console.log(res);
  }

  useEffect(() => {
    setUrl(`http://localhost:3000/${params.id}`)
    getChatbotName(params.id).then((res) => {
      setChatbotName(res.chatbotName)
    })
    getChat()


  }, [params.id])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess("Copied!")
      setTimeout(() => setCopySuccess(""), 2000)
    }, () => {
      setCopySuccess("Failed to copy")
    })
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-start bg-gray-100'>
      <div className='p-6 m-10 bg-white rounded shadow-lg w-full max-w-md'>
        <h1 className='text-xl font-bold text-green-600 mb-4'>Link to your Chatbot</h1>
        <p className='mb-4'>Share this link with your customers to start conversations with your chatbot.</p>
        <div className='flex items-center'>
          <input
            value={url}
            readOnly
            type="text"
            className='border border-gray-300 rounded-l p-2 flex-grow'
          />
          <button
            onClick={copyToClipboard}
            className='bg-blue-500 text-white p-2 rounded-r'>
            Copy
          </button>
        </div>
        {copySuccess && <p className='text-green-500 mt-2'>{copySuccess}</p>}
      </div>


      <div className='mt-10 w-full max-w-md'>

        <div className="flex justify-between items-center">
          <h2 className='text-2xl font-semibold mb-4'>Train Your ChatBot</h2>

          <button className='text-red-500 hover:text-red-700'>
            <FaTrash />
          </button>
        </div>
        <div className='flex justify-between items-center bg-white p-4 rounded shadow-lg'>
          <h2 className='text-lg font-medium'>{chatbotName}</h2>
          <button className='text-blue-500 hover:text-blue-700 font-semibold'>
            Update
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page
