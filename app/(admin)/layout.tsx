import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';


const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

const {userId} = auth()
if (!userId) {
  return redirect('/login')
}


  return (
    <div className='max-sm:h-auto min-h-screen'>
      {/* header */}
      <Header />
      <div className='flex max-sm:h-auto min-h-screen  flex-col md:flex-row bg-gray-100'>
        {/* sidebar */}
        <Sidebar />
        <div className=' flex justify-center lg:justify-start items-start max-w-5xl mx-auto w-full'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
