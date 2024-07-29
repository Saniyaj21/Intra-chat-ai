import {connectDB} from "@/db/connect"
const page = () => {
  connectDB()
  return (
    <div className="bg-black">
      home
    </div>
  )
}

export default page
