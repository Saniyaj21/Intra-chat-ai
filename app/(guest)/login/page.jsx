import { SignIn } from "@clerk/nextjs"

const Page = () => {
  return (
    <div className="flex h-screen justify-center items-center">
     <SignIn routing="hash" fallbackRedirectUrl={'/'}/>
    </div>
  )
}

export default Page
