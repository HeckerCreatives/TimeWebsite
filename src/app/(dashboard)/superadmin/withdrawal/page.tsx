import React from 'react'
import List from './List'
import Cards from './Cards'
import SuperAdminLayout from '@/components/layout/Superadminlayout'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" w-full h-full flex flex-col gap-8 items-center p-4 md:p-8">
          <Cards/>
           <List/>
        </div>
    </SuperAdminLayout>
  )
}
