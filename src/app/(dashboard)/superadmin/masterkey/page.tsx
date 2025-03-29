import React from 'react'
import Form from './Form'
import MasterkeyHistory from './History'
import SuperAdminLayout from '@/components/layout/Superadminlayout'

export default function page() {
  return (
    <SuperAdminLayout>
        <div className="  w-full h-full flex flex-col gap-12 items-center p-8">
            <Form/>
            <MasterkeyHistory/>
        </div>
    </SuperAdminLayout>
  )
}
