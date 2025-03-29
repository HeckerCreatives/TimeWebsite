"use client"
import UserLayout from "@/components/layout/Userlayout"
import Faq from "./Faq"

export default function page() {

  return (

    <UserLayout>
        <div className=" w-full h-full flex flex-col items-center p-4">
            <Faq/>
        </div>
      
    </UserLayout>
  )
}
