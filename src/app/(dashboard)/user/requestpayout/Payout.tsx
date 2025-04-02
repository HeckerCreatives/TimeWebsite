import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import Spinner from '@/components/common/Spinner'
import { payout, RequestPayout } from '@/validation/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { banks } from '@/app/data'


type Wallets = {
    "creditwallet": number
    "chronocoinwallet": number
    "commissionwallet": number
    
}



export default function Payout() {
    const [type, setType] = useState('commissionwallet')
    const router = useRouter()

    const [wallet, setWallet] = useState<Wallets>()
    const [loading, setLoading] = useState(false)
    const params = useSearchParams()
    const state = params.get('state')

    

    const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    watch,
    control,
    formState: { errors },
  } = useForm<RequestPayout>({
    resolver: zodResolver(payout),
  });

  const onSubmit = async (data: RequestPayout) => {
    setLoading(true)
    router.push('?state=true')
     try {
        
        const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/payout/requestuserpayout`,{
            "type": type, // commissionwallet, minecoinwallet
            "payoutvalue": data.payoutvalue,
            "paymentmethod": data.paymentmethod, // Gcash, Gotyme
            "accountname": data.accountname,
            "accountnumber": data.accountnumber
            },{
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json'
                }
            })
         
            const response = await toast.promise(request, {
                loading: 'Requesting payout ....',
                success: `Payout request success`,
                error: 'Error while requesting payout',
            });
            reset()

            if(response.data.message === 'success'){
                setLoading(false)
                router.push('?state=false')
                reset()
            }


            if(response.data.message === 'failed'){
                setLoading(false)
                toast.error(response.data.data)
                reset()
            }
            
    } catch (error) {
            setLoading(false)
            reset()
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
    };
  }

    const payoutRequest = async (amount: string, number: string, name: string, paymentmethod: string, type: string) => {
        if(paymentmethod === ''){
            toast.error('Please select a payment method')
        } else if( amount === ''){
            toast.error('Please enter the amount')
        } else if(number === ''){
            toast.error('Please enter your account number')
        } else if(name === ''){
            toast.error('Please enter your account name')
        } else{
            setLoading(true)
            try {
            const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/payout/requestuserpayout`,{
            "type": type, // commissionwallet, minecoinwallet
            "payoutvalue": amount,
            "paymentmethod": paymentmethod, // Gcash, Gotyme
            "accountname": name,
            "accountnumber": number
            },{
                withCredentials: true,
                headers: {
                'Content-Type': 'application/json'
                }
            })

            const response = await toast.promise(request, {
                loading: 'Requesting payout ....',
                success: `Payout request success`,
                error: 'Error while requesting payout',
            });

            setLoading(false)


            if(response.data.message === 'failed'){
            setLoading(false)

                toast.error(response.data.data)
            }
            
            } catch (error) {
            setLoading(false)
            reset()
                if (axios.isAxiosError(error)) {
                    const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                        toast.error(`${axiosError.response.data.data}`)     
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
        
     
    }

    useEffect(() => {
        const walletBalance = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallets/userwallets`,{
                withCredentials: true
                })
                setWallet(res.data.data)
            } catch (error) {
               
            }
            
        }

        walletBalance()
    },[state])


    const amount = watch('payoutvalue', 0);



     // Function to format number with commas
    const formatNumber = (value: number) => {
        return value.toLocaleString();
    };
    
    // Handle input change
    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let rawValue = event.target.value.replace(/,/g, '');
        let numericValue = Number(rawValue);
    
        if (!isNaN(numericValue)) {
        setValue('payoutvalue', numericValue, { shouldValidate: true }); 
        }
    };

    const paymentMethod = watch("paymentmethod"); 

        useEffect(() => {
            if (!paymentMethod) {
                setValue("paymentmethod", "");
            }
        }, [paymentMethod, setValue]);



  
  return (
    <div className=' relative w-full flex flex-col items-center gap-8 max-w-[1440px] h-auto mt-12 bg-zinc-800 p-4 md:p-6'>
        <div className=' flex items-center justify-between absolute top-0 w-[98%] bg-yellow-500 p-2 rounded-sm -translate-y-4'>
            <Select value={type} onValueChange={setType}>
            <SelectTrigger className="w-[200px] bg-zinc-900">
                <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='commissionwallet'>Payout Commission</SelectItem>
                <SelectItem value='chronocoinwallet'>Payout Chrono Package Earnings</SelectItem>
            </SelectContent>
            </Select>

            

        </div>

        <div className=' w-full flex flex-col items-center justify-center'>
            <div className=' max-w-[400px] w-full h-[150px] bg-zinc-700 mt-8 rounded-sm flex flex-col gap-2 items-center justify-center'>
                {type === 'commissionwallet' ? (
                    <>
                    <p className=' text-sm'>Commission Wallet Balance</p>
                    <p className=' text-2xl font-semibold text-yellow-500'>₱ {wallet?.commissionwallet.toLocaleString()}</p>
                    </>

                ): (
                    <>
                    <p className=' text-sm'>Chrono Package Wallet Balance</p>
                    <p className=' text-2xl font-semibold text-yellow-500'>₱ {wallet?.chronocoinwallet.toLocaleString()}</p>

                    </>

                )}

            </div>

          

             <form onSubmit={handleSubmit(onSubmit)} className=' w-full  mt-4'>
                <div className='grid grid-cols-2 gap-2 md:gap-4'>
                    <div className=' w-full flex flex-col gap-2 md:p-4'>

                        <div className=' w-full flex flex-col gap-1 items-start h-[65px]'>
                        <Controller
                                name="paymentmethod"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <Select onValueChange={field.onChange} value={field.value}>
                                        <SelectTrigger className="w-full bg-zinc-100 text-black">
                                            <SelectValue placeholder="Select Payment Method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {banks.map((item) => (
                                                <SelectItem key={item} value={item}>{item}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />
                            <p className=' text-[.6rem] md:text-xs text-orange-300'>*Select payment method</p>
                            {errors.paymentmethod && <p className=' text-[.6em] text-red-400'>{errors.paymentmethod.message}</p>}
                        </div>

                        <div className='w-full flex flex-col items-start gap-1 h-[65px] mt-2'>
                            <Input type="number" className=' p-3 text-xs rounded-sm text-black w-full' placeholder='Account number' {...register('accountnumber')}/>
                            <p className=' text-[.6rem] md:text-xs text-orange-300'>*Make sure you enter a valid account number</p>
                            {errors.accountnumber && <p className=' text-[.6em] text-red-400'>{errors.accountnumber.message}</p>}
                        </div>
                       

                    </div>

                    <div className=' w-full flex flex-col gap-2 md:p-4'>

                        <div className='w-full flex flex-col gap-1 items-start h-[65px]'>
                            <Input type="text" className=' p-3 text-xs rounded-sm text-black w-full' placeholder='Account name' {...register('accountname')}/>
        
                            <p className=' text-[.6rem] md:text-xs text-orange-300'>*Make sure you enter a correct account name</p>
                            {errors.accountname && <p className=' text-[.6em] text-red-400'>{errors.accountname.message}</p>}
                        </div>

                        <div className=' w-full flex flex-col gap-1 items-start h-[65px] mt-2'>
                            <Input 
                             type="text"
                             placeholder=""
                             className=" text-black"
                             defaultValue={amount}
                             value={amount ? formatNumber(amount) : ''}
                             onChange={handleAmountChange}
                             onBlur={() => setValue('payoutvalue', amount || 0, { shouldValidate: true })}
                            />
                            <p className=' text-[.5rem] md:text-xs text-orange-300'></p>
                            {errors.payoutvalue && <p className=' text-[.6em] text-red-400'>{errors.payoutvalue.message}</p>}
                        </div>
                        

                    </div>
                </div>
                 <div className=' w-full flex items-end justify-end px-4'>
                    <Button disabled={loading} className=' clip-btn text-black font-semibold w-[150px]'>
                        {loading && (
                            <Spinner/>
                        )}
                        Request</Button>

                 </div>

                

            </form>

            {/* <div className=' w-full flex items-end justify-end px-4'>
                    <button disabled={loading} onClick={() => payoutRequest(amount,number,name, paymentmethod, type)} className=' px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-green-700 to-green-500 rounded-sm flex items-center justify-center gap-2'>
                        {loading === true && (
                            <Spinner/>
                        )}
                        Request</button>

                </div> */}



            

        </div>
    
    </div>
  )
}
