import Link from "next/link"


const Page = () => {
  
  return (
    <div className=" shadow-md px-10 py-5 mt-10 border-2 rounded-md">
      <h1 className="text-xl">Welcome to <span className="text-blue-400">IntraChat AI</span></h1>
      <p>Create your first AI Chatbot for free.</p>
      <Link href={'/create-chatbot'} >
        <button className="bg-blue-400 text-white px-4 py-2 mt-5 rounded-md" >
          Create Now</button>
      </Link>
    </div>
  )
}

export default Page
