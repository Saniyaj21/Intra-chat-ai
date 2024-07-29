import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';


const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='min-h-screen'>
      {/* header */}
      <Header />
      <div className='flex min-h-screen flex-col md:flex-row bg-gray-100'>
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
