"use client"
import UserLayout from "@/components/layout/Userlayout"
import Cards from "./Cards"
import DashboardTable from "./Table"



export default function page() {

  return (

    <UserLayout>
        <div className=" w-full h-full flex flex-col items-center p-4">

            <Cards/>
            <DashboardTable/>
        </div>
      
    </UserLayout>
  )
}
