'use client'
import Spinner from '@/components/common/Spinner'
import { Button } from '@/components/ui/button'
import { changepasswordsuperadmin, ChangePasswordSuperadmin } from '@/validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function Changepassword() {
    const [shownew, setShownew] = useState('password')
    const [showconfirm, setShowconfirm] = useState('password')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ChangePasswordSuperadmin>({
    resolver: zodResolver(changepasswordsuperadmin),
  });

  const changePassword = async (data: ChangePasswordSuperadmin) => {
    setLoading(true)
    try {
         const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/staffusers/changepass`,{
        password: data.newpasswordsuperadmin
        },{
            withCredentials:true,
            headers:{
            'Content-Type': 'application/json',
            }
        })

        const response = await toast.promise(request, {
            loading: 'Upadating password....',
            success: `Successfully updated`,
            error: 'Error while updating password',
        });
        reset()

        if( response.data.message === 'success'){
            setLoading(false)
            router.push('?state=true')
        }
        
    } catch (error) {
         setLoading(false)
       if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        toast.error(`${axiosError.response.data.data}`) 
                        router.push('/')    
                    }

                    if (axiosError.response && axiosError.response.status === 400) {
                        toast.error(`${axiosError.response.data.data}`)     
                            
                    }

                    if (axiosError.response && axiosError.response.status === 402) {
                        toast.error(`${axiosError.response.data.data}`)          
                                
                    }

                    if (axiosError.response && axiosError.response.status === 403) {
                        toast.error(`${axiosError.response.data.data}`)              
                        
                    }

                    if (axiosError.response && axiosError.response.status === 404) {
                        toast.error(`${axiosError.response.data.data}`)             
                    }
            } 
        
    }
  }

  return (
    <div className=' w-full max-w-[1440px] flex flex-col'>
        <div className=' flex flex-col max-w-[500px] w-full h-auto bg-zinc-800 rounded-sm p-6 shadow-lg'>
            <p className=' text-sm font-semibold'>Change Password</p>

            <form onSubmit={handleSubmit(changePassword)} className=' w-full flex flex-col gap-1  text-xs mt-6'>
                <label htmlFor="" className=' text-zinc-200'>New password</label>
                <div className=' relative w-full'>
                    <input type={shownew} placeholder='New Password' className=' bg-white p-2 text-xs rounded-sm w-full text-black' {...register('newpasswordsuperadmin')} />
                    {shownew === 'password' ? 
                    (
                    <p onClick={() => setShownew('text')} className=' absolute right-1 top-1 bg-slate-300 p-1 rounded-sm text-black cursor-pointer'><EyeOff size={15}/></p>
                    ):(
                    <p onClick={() => setShownew('password')} className=' absolute right-1 top-1 bg-slate-300 p-1 rounded-sm text-black cursor-pointer'><Eye size={15}/></p>
                    )}
                    
                </div>
                {errors.newpasswordsuperadmin && <p className=' text-[.6em] text-red-400'>{errors.newpasswordsuperadmin.message}</p>}

                <label htmlFor="" className=' text-zinc-200 mt-4'>Confirm password</label>
                <div className=' relative w-full'>
                    <input type={showconfirm} placeholder='Confirm Password' className=' bg-white p-2 text-xs rounded-sm w-full text-black' {...register('confirmpasswordsuperadmin')}/>
                    {showconfirm === 'password' ? 
                        (
                        <p onClick={() => setShowconfirm('text')} className=' absolute right-1 top-1 bg-slate-300 p-1 rounded-sm text-black cursor-pointer'><EyeOff size={15}/></p>
                        ):(
                        <p onClick={() => setShowconfirm('password')} className=' absolute right-1 top-1 bg-slate-300 p-1 rounded-sm text-black cursor-pointer'><Eye size={15}/></p>
                    )}
                        
                </div>
                {errors.confirmpasswordsuperadmin && <p className=' text-[.6em] text-red-400'>{errors.confirmpasswordsuperadmin.message}</p>}


                <Button className=' clip-btn px-12 w-fit mt-4'>
                    {loading === true && (
                    <Spinner/>
                    )}
                    Save</Button>
            </form>
        </div>
    </div>
  )
}
