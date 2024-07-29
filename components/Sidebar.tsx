// import { BotMessageSquare, PencilLine, SearchIcon } from 'lucide-react'
import Link from 'next/link'
import { FaRobot , FaPen, FaSearch} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className=' bg-gray-200 flex gap-4 flex-row md:flex-col p-2'>
      <Link href={'/create-chatbot'}
        className='flex flex-col text-ceniter lg:text-left md:flex-row items-center justify-center gap-2 p-2 rounded-md bg-blue-400 text-white  w-1/3 md:w-40'
      >
        <FaRobot />
        <div className='hidden md:inline'>
          <p className='text-center'>Create</p>
          <p className='text-center'>New ChatBot</p>
        </div>
      </Link>
      <Link href={'/view-chatbots'}
        className='flex flex-col text-ceniter lg:text-left md:flex-row items-center justify-center gap-2 p-2 rounded-md bg-blue-400 text-white  w-1/3 md:w-40'
      >
        <FaPen />
        <div className='hidden md:inline'>
          <p className='text-center'>Create</p>
          <p className='text-center'>New ChatBot</p>
        </div>
      </Link>
      <Link href={'/review-sessions'}
        className='flex flex-col text-ceniter lg:text-left md:flex-row items-center justify-center gap-2  p-2 rounded-md bg-blue-400 text-white  w-1/3 md:w-40'
      >
        <FaSearch />
        <div className='hidden md:inline'>
          <p className='text-center'>Create</p>
          <p className='text-center'>New ChatBot</p>
        </div></Link>
    </div>
  )
}

export default Sidebar
