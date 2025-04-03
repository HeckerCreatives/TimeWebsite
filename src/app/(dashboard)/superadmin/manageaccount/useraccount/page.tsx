
'use client'
import Card from '@/components/common/Card'
import { Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Cashout from './Cashout'
import Cashin from './Cashin'
import Unilevel from './Unilevel'
import Inventory from './Inventory'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Spinner from '@/components/common/Spinner'
import ViewCard from '@/components/common/ViewCard'
import { handleApiError } from '@/lib/errorHandler'


type User = {
    banstatus: string
    referral: string
    username: string

}

type Wallet = {
    userwallets : {
        commissionwallet
        : 
        {amount: number}
        creditwallet
        : 
        {amount: number}
        chronocoinwallet
        : 
        {amount: number}
        directwallet: {amount: number},
        unilevelwallet: {amount: number},
    }
   
}

type TotalEarnings = {
    data:{
        mining: number
        referral: number
        unilevel: number
    }

}


export default function page() {

    const router = useRouter()
    const [ban, setBan] = useState('active')
    const [loading, setLoading] = useState(false)
    const [dialog, setDialog] = useState(false)
    const params = useSearchParams()
    const id = params.get('uid')
    const [data, setData] = useState<User>()
    const [wallet, setWallet] = useState<Wallet>()
    const state = params.get('state')
        const [earnings, setEarnings] = useState<TotalEarnings>()
    

    //user data
    useEffect(() => {
       const getData = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getuserdetailsbysuperadmin?userid=${id}`,
            {
                withCredentials: true
            }
        )
        setData(response.data.data)
        
       }

       
       getData()
    
    },[id])



    //ban
    const banUser = async () => {
      
        setLoading(true)
          try {
          const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/user/banusers`,{
            userlist: [`${id}`], 
            status: data?.banstatus === 'active' ? 'banned' : 'active'
          },{
            withCredentials:true,
            headers:{
              'Content-Type': 'application/json',
            }
          })
    
          const response = await toast.promise(request, {
            loading: `${ban === 'active' ? 'Unbanning' : 'Banning'} user account ....`,
            success: `Successfully ${ban === 'active' ? 'unbanned' : 'banned'}`,
            error: `Error while ${ban === 'active' ? 'unbanning' : 'banning'} user account`,
          });
    
          if(response.data.message === 'success'){
            setLoading(false)
            window.location.reload()
        
    
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

    //wallets
    useEffect(() => {
        const getWallets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallets/getplayerwalletforadmin?playerid=${id}`,
                    {
                        withCredentials: true
                    }
                )
                setWallet(response.data.data)
                
                
            } catch (error) {
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

        getWallets()
     
     },[id])

     useEffect(() => {
        const getWallets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/wallethistory/getwallettotalearningsforadmin?playerid=${id}`,
                    {
                        withCredentials: true
                    }
                )
                setEarnings(response.data)
                 setLoading(false)
                
                
            } catch (error) {
             handleApiError(error)
                
            }
        
        }

        getWallets()
     
     },[id])

    const commissionAmount = wallet?.userwallets?.commissionwallet?.amount ?? 0;
    const chronocoinAmount = wallet?.userwallets?.chronocoinwallet?.amount ?? 0;
    const unilevel = wallet?.userwallets?.unilevelwallet?.amount ?? 0;
    const referal = wallet?.userwallets?.directwallet?.amount ?? 0;
    const mining = earnings?.data.mining ?? 0;

    const redeemables = commissionAmount + chronocoinAmount;
    const comissionWallet = unilevel + referal
    const totalRevenue = unilevel + referal + mining

      


  return (
    <div className=' w-full h-screen flex flex-col items-center p-4 py-16 bg-zinc-950 overflow-y-auto'>

        <div className=' max-w-[1520px] w-full flex flex-col gap-6'>

            <div className=' relative w-full h-[150px]  bg-zinc-800 flex items-center justify-between p-8 rounded-md'
            style={{backgroundImage: "url(/assets/BG.png)", backgroundPosition:'center'}}
            >

                <div className=' absolute left-0 top-0 w-full h-full bg-zinc-800'>

                </div>
                <div className=' z-20 flex flex-col gap-4'>
                    <h2 className=' text-2xl font-semibold'>{data?.username}</h2>
                    <p className=' text-sm text-yellow-500'>Referral: {data?.referral}</p>
                </div>

                
                <Dialog open={dialog} onOpenChange={setDialog}>
                  <DialogTrigger className=' relative z-20'>
                    {data?.banstatus === 'banned' ? (
                    <button className=' z-20 text-sm bg-blue-600 px-4 py-2 rounded-md'>Unban</button>

                    ): (
                    <button className=' z-20 text-sm bg-red-600 px-4 py-2 rounded-md'>Ban</button>

                    )}
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className=' text-red-500'>Are you absolutely sure, you want to ban this user?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently ban the user account.
                        </DialogDescription>
                      </DialogHeader>

                    

                      <button onClick={banUser} className=' px-8 py-2 text-sm font-semibold rounded-sm bg-red-600 mt-4 w-fit flex items-center justify-center gap-2'>
                         {loading === true && (
                          <Spinner/>
                        )}
                        {data?.banstatus === 'ban' ? 'Unban' : 'Ban'}</button>
                  </DialogContent>
              </Dialog>

            </div>

            <div className=' w-full grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8 mt-12'>
                {/* <ViewCard icon={<Wallet size={30}/>} iconbg={'bg-amber-500'} title={'Credit Time Wallet'} amount={`${wallet?.userwallets.creditwallet.amount.toLocaleString()}`} subtitle={'Total credits'} text={''} loading={false}/>
                <ViewCard icon={<Wallet size={30}/>} iconbg={'bg-amber-500'} title={'Total comission'} amount={`${wallet?.userwallets.commissionwallet.amount.toLocaleString()}`} subtitle={'Total comnissions'} text={''} loading={false}/>
                <ViewCard icon={<Wallet size={30}/>} iconbg={'bg-amber-500'} title={'Total chrono package'} amount={`${wallet?.userwallets.chronocoinwallet.amount.toLocaleString()}`} subtitle={'Total earnings from chrono package'} text={''} loading={false}/> */}

                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Credit Time Wallet'} amount={wallet?.userwallets.creditwallet.amount || 0} subtitle={'Use to purchase chrono package'} text={''} loading={false} editable={true} type={'creditwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Chrono Package Wallet'} amount={wallet?.userwallets.chronocoinwallet.amount || 0} subtitle={'Unclaimed chrono package earnings'} text={''} loading={false} editable={true} type={'chronocoinwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Referral Total Commission'} amount={wallet?.userwallets.directwallet.amount || 0} subtitle={'Total accumulated commission from direct refferal'} text={''} loading={false} editable={true} type={'directwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Unilevel Total Commission'} amount={wallet?.userwallets.unilevelwallet.amount || 0} subtitle={'Total accumulated commission from lvl 2 to lvl 10'} text={''} loading={false} editable={true} type={'unilevelwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Commission Wallet'} amount={comissionWallet} subtitle={'Withdrawable value from direct referral & unilevel'} text={''} loading={false} editable={false} type={'commissionwallet'}/>

                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Total Redeemables'} amount={redeemables} subtitle={'The sum of commission wallet & chrono package wallet'} text={''} loading={false} editable={false} type={'commissionwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Chrono Package Total Earning'} amount={mining} subtitle={'Total income from chrono package'} text={''} loading={false} editable={false} type={'commissionwallet'}/>
                <ViewCard icon={<Wallet size={30} className=' text-black' />} iconbg={'bg-yellow-500'} title={'Total Revenue'} amount={totalRevenue} subtitle={'The sum of referral commission, unilevel & chrono package total earnings'} text={''} loading={false} editable={false} type={'commissionwallet'}/>

            </div>

            <Tabs defaultValue="tab1" className="w-full mt-12  ">
            <TabsList className=' w-full pl-16 md:pl-0 md:w-fit bg-zinc-800 flex md:text-sm text-[5rem] overflow-x-auto'>
                <TabsTrigger value="tab1">Cashin history</TabsTrigger>
                <TabsTrigger value="tab2">Cashout history</TabsTrigger>
                <TabsTrigger value="tab3">Unilevel</TabsTrigger>
                <TabsTrigger value="tab4">Chrono Package Inventory</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1"><Cashin/></TabsContent>
            <TabsContent value="tab2"><Cashout/></TabsContent>
            <TabsContent value="tab3"><Unilevel/></TabsContent>
            <TabsContent value="tab4"><Inventory/></TabsContent>
            </Tabs>


        </div>

    </div>
  )
}
