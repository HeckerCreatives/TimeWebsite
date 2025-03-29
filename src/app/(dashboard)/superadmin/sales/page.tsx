import React from 'react'
import SalesTable from './Table'
import Cards from './Cards'
import SuperAdminLayout from '@/components/layout/Superadminlayout'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" w-full h-full flex flex-col items-center p-8">
           
            <SalesTable/>
        </div>
    </SuperAdminLayout>
  )
}
