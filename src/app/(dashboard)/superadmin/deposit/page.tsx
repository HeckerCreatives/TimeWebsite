import React from 'react'
import UserTable from './Table'
import Deposit from './Deposit'
import SuperAdminLayout from '@/components/layout/Superadminlayout'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className=" w-full h-full flex flex-col items-center p-8">
            <Deposit/>
            <UserTable/>
        </div>
    </SuperAdminLayout>
  )
}
