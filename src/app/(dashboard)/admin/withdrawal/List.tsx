import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Comission from './Comission'
import Riglist from './Riglist'
import Righistory from './Righistory'
import ComissionHsitory from './Comissionhistory'
import Comissionhistory from './Comissionhistory'
import ComissionList from './Comission'


export default function List() {
  return (
    <div className=' max-w-[1440px] w-full  p-2 md:p-6'>
        <Tabs defaultValue="comission" className=" w-full ">
        <TabsList className=' bg-zinc-900'>
            <TabsTrigger value="comission">Commission</TabsTrigger>
            <TabsTrigger value="miners">Chrono Package</TabsTrigger>
        </TabsList>
        <TabsContent value="comission" className=' w-full'>
            {/* <ComissionList/> */}
            <Comissionhistory/>
        </TabsContent>
        <TabsContent value="miners">
            {/* <Riglist/> */}
            <Righistory/>
        </TabsContent>
        </Tabs>


    </div>
  )
}
