'use client'

import { FaTrash } from "react-icons/fa6";
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from 'next/navigation';
import { IoIosAddCircle } from "react-icons/io";
import Characterestics from "@/components/Characterestics"
import { addCharacteristics } from "@/actions/chatbot";




const Page = ({ params }) => {
  const [url, setUrl] = useState("hi")
  const [copySuccess, setCopySuccess] = useState("")
  const [chatbotName, setChatbotName] = useState("")
  const [characteristics, setCharacteristics] = useState("")
  const [chars, setChars] = useState([])

  const router = useRouter()

   const base_url = `https://intra-chat-ai.vercel.app` 


  // get chatbot details
  const getChat = async () => {
    const res = await axios.get(`/api/chatbot?id=${params.id}`)
    setChatbotName(res.data.chatbot.name)
  }
  // get chatbot characteristics
  const getChatChars = async () => {
    const res = await axios.get(`/api/chatbot/characteristics?id=${params.id}`)
    setChars(res.data.chars)
  }

  //  delete a chatbot
  const handleDeleteChat = async () => {
    const res = await axios.delete(`/api/chatbot?id=${params.id}`)
    if (res.status == 200) {
      router.push('/create-chatbot')
    }
  }
  const deleteChar = async (id) => {
    console.log("delete char", id);
    const res = await axios.delete(`/api/chatbot/characteristics?char_id=${id}`)
    // if (res.status == 200) {
    //   router.push('/create-chatbot')
    // }
    await getChatChars()
  }

  const addCharacteristicsHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.set("characteristics", characteristics)
    formData.set("chatbotId", params.id)
    await addCharacteristics(formData)
    setCharacteristics("")
    await getChatChars()
  }

  useEffect(() => {
    setUrl(`${base_url}/chatbot/${params.id}`)
    getChat()
    getChatChars()
    console.log("validate");
  }, [params.id, chars.length])

  // copy url to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopySuccess("Copied!")
      setTimeout(() => setCopySuccess(""), 2000)
    }, () => {
      setCopySuccess("Failed to copy")
    })
  }

  return (
    <div className='min-h-screen flex flex-col items-center justify-start bg-gray-100 pb-8'>
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

          <button onClick={handleDeleteChat} className='text-red-500 hover:text-red-700'>
            <FaTrash />
          </button>
        </div>
        <div className='flex justify-between items-center bg-white p-4 rounded shadow-lg'>
          <h2 className='text-lg font-medium'>{chatbotName}</h2>
          {/* <button className='text-blue-500 hover:text-blue-700 font-semibold'>
            Update
          </button> */}
        </div>
        <div className="mt-8 bg-white p-4 rounded shadow-lg">
          <h4 className="font-bold">Heres what your AI knows..</h4>
          <p>
            Your chatbot is equipped with the folowing information to assist you in your conversations with your customes and users.
          </p>



          <div >
            <form onSubmit={addCharacteristicsHandler} className="flex justify-center items-center mt-4 w-full h-8 gap-2">
              {/* <form action={addCharacteristics} className="flex justify-center items-center mt-4 w-full h-8 gap-2"> */}
              <input onChange={(e) => setCharacteristics(e.target.value)} value={characteristics} className="border-2 outline-none px-3 border-blue-300 h-full rounded w-2/3" type="text" name="char" />
              <button type="submit" className="w-1/3  flex justify-center items-center bg-blue-600 rounded text-white gap-2 h-full">
                <IoIosAddCircle />
                Add
              </button>
            </form>
          </div>


          <div className="border-2  my-8 px-2 rounded">
            <ul className="flex flex-wrap-reverse gap-4 py-4">


              {
                chars.map((char, index) => (
                  <Characterestics key={index} char={char} deleteChar={deleteChar} />
                ))

              }




            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
