"use client"
import UserLayout from "@/components/layout/Userlayout"
import MyConnectionTable from "./Table"


export default function page() {

  return (

    <UserLayout>
        <div className=" w-full h-full flex flex-col items-center p-4">
            <MyConnectionTable/>
        </div>
      
    </UserLayout>
  )
}
