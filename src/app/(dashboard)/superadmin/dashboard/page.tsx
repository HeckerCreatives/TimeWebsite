import React from 'react'
import Cards from './Cards'
import { Chart } from './Chart'
import SuperAdminLayout from '@/components/layout/Superadminlayout'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" w-full h-full flex flex-col items-center p-8">
            <Cards/>
            <Chart/>
        </div>
    </SuperAdminLayout>
  )
}
