'use client'
import Spinner from '@/components/common/Spinner'
import { changepasswordadmin, ChangePasswordAdmin } from '@/validation/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { EyeOff, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type Prop ={
    id: string
}

export default function ChangePasswordAdminForm( prop: Prop) {
    const [shownew, setShownew] = useState('password')
  const [showconfirm, setShowconfirm] = useState('password')
  const [loading, setLoading] = useState(false)
  const [dialog, setDialog] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<ChangePasswordAdmin>({
    resolver: zodResolver(changepasswordadmin),
  });

  const changePassowrd = async ( data: ChangePasswordAdmin) => {
    setLoading(true)
    try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/staffusers/changepasswordadmin`,{
         adminid: prop.id,
        password: data.newpassword
      },{
        withCredentials:true,
        headers:{
          'Content-Type': 'application/json',
        }
      })

      const response = await toast.promise(request, {
        loading: 'Changing the passord....',
        success: `Password successfully changed`,
        error: 'Error while changing the password',
      });
      

      if( response.data.message === 'success'){
        setLoading(false)
        setDialog(false)
        reset()
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
    <form onSubmit={handleSubmit(changePassowrd)} className=' w-full flex flex-col gap-1 mt-2'>
        <label htmlFor="" className=' text-xs text-zinc-300'>New password</label>
        <div className=' w-full relative text-black'>
            <input type={shownew} placeholder='New password' className=' p-2 text-xs rounded-sm w-full' {...register('newpassword')} />
                { shownew === 'password' ? (
                <p onClick={() => setShownew('text')} className=' top-1 right-1 absolute bg-zinc-200 text-black p-1 rounded-sm cursor-pointer '><EyeOff size={15}/></p>
                ) : (
                <p onClick={() => setShownew('password')} className=' top-1 right-1 absolute bg-zinc-200 text-black p-1 rounded-sm cursor-pointer '><Eye size={15}/></p>

                )}
        </div>
        {errors.newpassword && <p className=' text-[.6em] text-red-400'>{errors.newpassword.message}</p>}


            <label htmlFor="" className=' text-xs text-zinc-300 mt-2'>Confirm password</label>
            <div className=' w-full relative text-black'>
                <input type={showconfirm} placeholder='Confirm password' className=' p-2 text-xs rounded-sm w-full' {...register('confirmpassword')} />
                { showconfirm === 'password' ? (
                <p onClick={() => setShowconfirm('text')} className=' top-1 right-1 absolute bg-zinc-200 text-black p-1 rounded-sm cursor-pointer '><EyeOff size={15}/></p>
                ) : (
                <p onClick={() => setShowconfirm('password')} className=' top-1 right-1 absolute bg-zinc-200 text-black p-1 rounded-sm cursor-pointer '><Eye size={15}/></p>

                )}

            </div>
            {errors.confirmpassword && <p className=' text-[.6em] text-red-400'>{errors.confirmpassword.message}</p>}


            <button className=' px-6 py-2 text-sm font-semibold rounded-sm bg-gradient mt-4 w-fit flex items-center justify-center gap-2'>
                {loading === true && (
                    <Spinner/>
                )}
                Save Changes</button>


        </form>

  )
}
