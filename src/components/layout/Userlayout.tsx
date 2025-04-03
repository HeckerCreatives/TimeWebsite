"use client"
import React, { useEffect, useState } from 'react'
import Link from "next/link"
import {
  Menu,
  LogOut,
  Copy
} from "lucide-react"
import { usePathname, useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { user } from '@/lib/route'
import Breadcrumb from '../common/Breadcrumb'


export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const path = usePathname()
  const params = useSearchParams()

  const page = path.includes('/user/dashboard') && '' || path.includes('/user/unilevel') && 'Unilevel' || path.includes('/user/requestpayout') && 'Request Payout' || path.includes('/user/purchase') && 'Buy Chrono Package' || path.includes('/user/mychronopackage') && 'My Chrono Package' || path.includes('/user/faq') && 'Bot Assistance'

  const [username, setUsername] = useState('')
  const [id, setId] = useState('')
  const router = useRouter()
  const [referralstatus, setReferralStatus] = useState(false)


  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getuserdata`,{
        withCredentials:true
        })
        setUsername(response.data.data.username)
        setId(response.data.data.referralid)
      } catch (error) {
        if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                    toast.error(`${axiosError.response.data.data}`)
                    router.push('/')  
                    }    
                } 
        
      }
      
    }
    getUserData()
  },[])

  useEffect(() => {
    const getReferralStatus = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/analytics/getreferrallinkstatus`,{
        withCredentials:true
        })
        setReferralStatus(response.data.data.status)
      } catch (error) {
        if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string, data: string }>;
                    if (axiosError.response && axiosError.response.status === 401) {
                    toast.error(`${axiosError.response.data.data}`)
                    router.push('/')  
                    }    
                } 
        
      }
      
    }
    getReferralStatus()
  },[])

  const copyReferral = () => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_REFERRAL}/auth/register?uid=${id}`)
    toast.success('Referral link copied')
  }

  const logout = async () => {
    const request = axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/logout`,{
      withCredentials: true
    })

    const response = await toast.promise(request, {
      loading: 'Loging out....',
      success: `Logout successfully`,
      error: 'Error while logging out',
    });
  }


  return (
      <div className="grid min-h-screen w-full lg:grid-cols-[220px_1fr] overflow-hidden">
        <div className=" hidden lg:block">
          <div className=" relative flex h-full max-h-screen flex-col gap-2 bg-primary"
          > <div className=' absolute w-full h-screen bg-zinc-900 z-0'></div>
             <div className=' relative z-10 w-full flex items-center justify-center h-[74px] gap-2 text-white p-4 border-b-[1px] px-2 border-yellow-600'>
                <img src="/GTIME-LOGO.png" alt="logo" loading="lazy" width={90} height={90} className=" w-[70px] "/>
                <img src="/game-time-png-words.png" alt="logo" loading="lazy" width={220} height={220} className=" w-[120px]" />
              </div>
            <div className=" relative z-10flex-1 mt-4 overflow-y-auto">
              <nav className=" flex flex-col gap-4 px-2 text-sm font-medium lg:px-4">

                {user.map((item, index) => (
                   <Link
                   key={index}
                    href={item.route}
                    className={` ${path.includes(item.route) ? ' bg-yellow-500 text-black' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-sm px-3  py-2 hover:bg-yellow-500 hover:text-black transition-all duration-200`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}

               
              </nav>
            </div>
            
          </div>
        </div>
        <div className=" relative h-screen flex flex-col overflow-y-auto">
          <header className=" sticky top-0 z-50 flex h-14 border-b-[1px] border-yellow-600 bg-zinc-900 items-center justify-between gap-4 p-4 lg:h-[74px] lg:px-6">
            <div className=' flex items-center gap-4 h-[74px]'>
              <Sheet>
                <SheetTrigger asChild className=' lg:hidden block'>
                <button className=' p-1 bg-slate-800 rounded-sm text-yellow-500'><Menu size={15}/></button>
                </SheetTrigger>
                <SheetContent side="left" className=" flex flex-col bg-zinc-900 border-none"
                //  style={{backgroundImage: "url(/assets/BG.png)"}}
                >
                  
                  <div className=' relative z-10 w-full flex items-center justify-center h-[74px] gap-2 text-white p-4 mt-8'>
                    <img src="/GTIME-LOGO.png" alt="logo" loading="lazy" width={90} height={90} className=" w-[70px] "/>
                    <img src="/game-time-png-words.png" alt="logo" loading="lazy" width={220} height={220} className=" w-[120px]" />
                  </div>
                  <nav className=" flex flex-col gap-4 px-2 text-sm font-medium lg:px-4">

                  {user.map((item, index) => (
                   <Link
                   key={index}
                    href={item.route}
                    className={` ${path.includes(item.route) ? ' bg-yellow-500 text-black' : 'text-zinc-100'}  text-sm flex items-center gap-3 rounded-sm px-3  py-2 hover:bg-yellow-500 hover:text-black transition-all duration-200`}
                  >
                    {item.icon}
                    {item.name}
                  </Link>
                ))}

                {referralstatus && (
                  <button onClick={() => copyReferral()} className=' clip-btn hidden text-xs w-fit text-black bg-yellow-500 px-6 py-2 lg:flex items-center gap-1 font-bold'><Copy size={15}/>Copy referral</button>

                )}



                  
                  
                  </nav>
                
                </SheetContent>
              </Sheet>

              <Breadcrumb dashboard={'/user/dashboard'} page={page} title={'Time Board'}/>

            </div>
            
            {/* <Menu className="h-5 w-5 text-zinc-100 lg:block hidden" /> */}

            <div className=' flex items-center gap-2'>
              {referralstatus && (
                <button onClick={() => copyReferral()} className=' clip-btn hidden text-xs w-fit text-black bg-yellow-500 px-6 py-2 lg:flex items-center gap-1 font-bold'><Copy size={15}/>Copy referral</button>

              )}


              <DropdownMenu>
              <DropdownMenuTrigger className=' active:border-none focus:border-none'>
                <div className=' flex items-center gap-2'>
                  <div className=' flex flex-col'>
                    <p className=' text-xs text-white'>{username}</p>
                  </div>
                  <div className=' p-[1px] bg-zinc-700 rounded-full'>
                    <img src="/GTIME-LOGO.png" alt="" width={40}/>
                  </div>

                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <a href="/">
                <DropdownMenuItem onClick={logout} className=' flex items-center gap-2'><LogOut size={15}/>Logout</DropdownMenuItem>
                
                </a>
              </DropdownMenuContent>
            </DropdownMenu>

            </div>

            

            

            
          </header>
          <main className=" flex flex-1 flex-col items-center gap-4 relative"
          >
             <video
              className="absolute z-10 top-0 left-0 w-full h-full object-cover"
              src="/Loop Video BG.mp4" // Place your video in the "public" folder
              autoPlay
              loop
              muted
              playsInline
              disablePictureInPicture
              controls={false} 
              
            />

            <div className=' w-full h-full relative z-20'>
            {children}

            </div>
          </main>
        </div>
      </div>
  )
}
