import React from 'react'
import Cards from './Cards'
import UserTable from './Table'
import AdminLayout from '@/components/layout/Adminlayout'


export default function page() {
  return (
    <AdminLayout>
        <div className=" w-full h-full flex flex-col items-center p-8">
              <Cards/>
              <UserTable/>
            
        </div>
    </AdminLayout>
  )
}
