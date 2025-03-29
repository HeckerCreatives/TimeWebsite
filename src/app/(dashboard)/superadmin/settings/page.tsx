import React from 'react'
import Changepassword from './Changepassword'
import SuperAdminLayout from '@/components/layout/Superadminlayout'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" w-full h-full flex flex-col items-center p-8">
            <Changepassword/>
        </div>
    </SuperAdminLayout>
  )
}
