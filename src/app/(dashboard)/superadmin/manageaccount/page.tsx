import React from 'react'
import Cards from './Cards'
import UserTable from './Table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminTable from './Admintable'
import CommissionTable from './Commision'
import UnilevelCommissionTable from './Unilevel'
import SuperAdminLayout from '@/components/layout/Superadminlayout'


export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" w-full h-full flex flex-col items-center p-8">

          <Tabs defaultValue="admin" className=" w-full max-w-[1440px] rounded-sm">
            <TabsList className=' bg-zinc-900 flex flex-wrap w-fit h-auto'>
              <TabsTrigger value="admin">Admins</TabsTrigger>
              <TabsTrigger value="user">Users</TabsTrigger>
              <TabsTrigger value="commissions">DRB</TabsTrigger>
              <TabsTrigger value="unilevelcommissions">Unilevel</TabsTrigger>

            </TabsList>
            <TabsContent value="user" className=' mt-12'>
              <>
              <Cards/>
              <UserTable/>
              </>
            </TabsContent>
            <TabsContent value="admin">
              <>
              <AdminTable/>
              </>
            </TabsContent>

            <TabsContent value="commissions">
              <CommissionTable/>
            </TabsContent>

            <TabsContent value="unilevelcommissions">
              <UnilevelCommissionTable/>
            </TabsContent>
          </Tabs>

            
        </div>
    </SuperAdminLayout>
  )
}
