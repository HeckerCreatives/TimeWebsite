import React from 'react'
import Changepassword from './Changepassword'
import AdminLayout from '@/components/layout/Adminlayout'

export default function page() {
  return (
    <AdminLayout>
        <div className=" w-full h-full flex flex-col items-center p-8">
            <Changepassword/>
        </div>
    </AdminLayout>
  )
}
