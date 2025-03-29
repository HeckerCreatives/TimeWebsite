"use client"
import UserLayout from "@/components/layout/Userlayout"
import PurchaseHistoryTable from "./Table"
import Product from "./Product"


export default function page() {

  return (

    <UserLayout>
        <div className=" w-full h-full flex flex-col items-center p-4">
          
          <Product/>
          <PurchaseHistoryTable/>
        </div>
      
    </UserLayout>
  )
}
