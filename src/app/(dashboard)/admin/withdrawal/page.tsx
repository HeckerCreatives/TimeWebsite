import React from 'react'
import List from './List'
import Cards from './Cards'
import AdminLayout from '@/components/layout/Adminlayout'

export default function page() {
  return (
    <AdminLayout>
        <div className=" w-full h-full flex flex-col gap-8 items-center p-4 md:p-8">
          <Cards/>
           <List/>
        </div>
    </AdminLayout>
  )
}
