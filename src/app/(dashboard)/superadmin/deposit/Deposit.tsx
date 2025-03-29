"use client"
import Spinner from '@/components/common/Spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { payin, Payin } from '@/validation/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';


type User = {
  username: string
}


export default function Deposit() {
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [list, setList] = useState<User[]>([])
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState('')

   const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<Payin>({
    resolver: zodResolver(payin),
  });

  const payinUser = async ( data: Payin) => {
    router.push('?state=false')

    setLoading(true)
    try {
       const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/payin/sendfiattoplayer`,{
        playerusername: search,
        amount: data.amount
      },{
        withCredentials:true,
        headers:{
          'Content-Type': 'application/json',
        }
      })

      const response = await toast.promise(request, {
        loading: `Sending amount to ${data.username}....`,
        success: `Amount sent successfully`,
        error: 'Error while sending the amount',
      });
      

      if( response.data.message === 'success'){
        setLoading(false)
        router.push('?state=true')
        setSearch('')
 
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


   useEffect(() => {
     const handler = setTimeout( async () => {
         try {
           const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/searchuserlist?playerusername=${search}`,{
           withCredentials:true
           })
           setList(response.data.data.userlist)
        
         } catch (error) {
           if (axios.isAxiosError(error)) {
             const axiosError = error as AxiosError<{ message: string, data: string }>;
             if (axiosError.response && axiosError.response.status === 401) {
               toast.error(`${axiosError.response.data.data}`)
               router.push('/')  
               }    
             } 
         }
     }, 1000)

     return () => {
       clearTimeout(handler)
     }
   },[search])


  
  return (
    <div className=' max-w-[400px] h-auto p-6 w-full bg-zinc-800 rounded-sm flex flex-col'>
        <p className=' text-sm font-semibold mb-4'>Payin</p>
        <form onSubmit={handleSubmit(payinUser)} action="" className=' relative z-30 w-full flex flex-col gap-1 text-sm'>
          <div className=' group ' onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <label htmlFor="" className=' text-xs text-zinc-300'>Username</label>
            <Input 
            type="text" 
            placeholder='Username' 
            className='w-full p-2 rounded-sm text-black' 
            {...register('username', {
              onChange: (e) => {
                setSearch(e.target.value);
              },
              required: 'Username is required' // Add validation rule
            })} 
          />
            {errors.username && <p className=' text-[.6em] text-red-400'>{errors.username.message}</p>}

            {open === true && (
              <div className=' absolute z-50 w-full flex flex-col p-6 gap-1 h-[300px] bg-zinc-900 overflow-y-auto'>
                <X className=' text-white mb-2 cursor-pointer' onClick={() => setOpen(false)} size={15}/>
                {list.map((item, index) => (
                  <p key={index} 
                   onClick={() => {
                  setSearch(item.username);
                  setOpen(false);
                  setValue('username', item.username); // Update the form value
                 
                }}  
                  
                  className=' p-2 w-full bg-zinc-800 cursor-pointer'>{item.username}</p>
                ))}
              </div>
            )}

          </div>
            


            <label htmlFor="" className=' text-xs text-zinc-300 mt-2'>Amount</label>
            <Input type="number" placeholder=' Amount' className=' w-full p-2 rounded-sm text-black' {...register('amount')} />
              {errors.amount && <p className=' text-[.6em] text-red-400'>{errors.amount.message}</p>}

            <Button disabled={loading} className='clip-btn px-12 w-fit mt-6'>
              {loading === true && (
                <Spinner/>
              )}
              Send</Button>
        </form>

    </div>
  )
}
