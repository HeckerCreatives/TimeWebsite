import React from 'react'
import Cards from './Cards'
import { Chart } from './Chart'
import AdminLayout from '@/components/layout/Adminlayout'

export default function page() {
  return (
    <AdminLayout>
        <div className=" w-full h-full flex flex-col items-center p-8">
            <Cards/>
            <Chart/>
        </div>
    </AdminLayout>
  )
}
