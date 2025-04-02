'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, ArrowRight, EllipsisVertical, Eye, EyeOff, OctagonAlert, RectangleEllipsis, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import Spinner from '@/components/common/Spinner'
import Pagination from '@/components/common/Pagination'
import { setPriority } from 'os'
import ChangePasswordAdminForm from './ChangePasswordAdminForm'
import { createAdmin, CreateAdmin } from '@/validation/schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


type Admin = {
  createdAt: string
status: string
userid: string
username: string
}

type Selected = {
  id: string
}


export default function AdminTable() {
  const [shownew, setShownew] = useState('password')
  const [showconfirm, setShowconfirm] = useState('password')
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const router = useRouter()
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [list, setList] = useState<Admin[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [ban, setBan] = useState('active')
  const params = useSearchParams()
  const state = params.get('state')

  const handleSelectRow = (id: string) => {
  setSelectedRows((prevSelectedRows) => {
    if (prevSelectedRows.includes(id)) {
      return prevSelectedRows.filter((rowId) => rowId !== id);
    } else {
      return [...prevSelectedRows, id];
    }
  });
};


  
   const {
    register,
    handleSubmit,
    setValue,
    reset,
    trigger,
    formState: { errors },
  } = useForm<CreateAdmin>({
    resolver: zodResolver(createAdmin),
  });

  const onSubmit = async (data: CreateAdmin) => {
    setLoading(true)
    try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/registerstaffs`,{
        username: data.username,
        password: data.password
      },{
        withCredentials:true,
        headers:{
          'Content-Type': 'application/json',
        }
      })

      const response = await toast.promise(request, {
        loading: 'Registering admin account ....',
        success: `Successfully registered`,
        error: 'Error while registering admin account',
      });
      reset()

      if( response.data.message === 'success'){
        setLoading(false)
        setDialog(false)
        router.push('?state=true')
      }

      
    } catch (error) {
      setLoading(false)
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
    
  };

  useEffect(() => {
    setLoading(true)
    const handler = setTimeout( async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/staffusers/adminlist?adminusername=${search}&status=${status === 'all' ? '' : status}&page=${currentpage}&limit=10`,{
          withCredentials:true
          })
          setList(response.data.data.users)
          setTotalpage(response.data.data.totalPages)
          setLoading(false)
          router.push('?state=false')

        
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`)
              router.push('/')  
              }    
            } 
        }
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  },[currentpage,state, status])


  useEffect(() => {
    setLoading(true)
    const handler = setTimeout( async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/staffusers/adminlist?adminusername=${search}&status=${status === 'all' ? '' : status}&page=${currentpage}&limit=10`,{
          withCredentials:true
          })
          setList(response.data.data.users)
          setTotalpage(response.data.data.totalPages)
          setLoading(false)
          router.push('?state=false')
          setCurrentpage(0)

        
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`)
              router.push('/')  
              }    
            } 
        }
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  },[search])

  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }


  const banAdmin = async () => {
    setDialog2(false)
    setLoading2(true)
    if(selectedRows.length !== 0 ){
      try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/staffusers/banstaffs`,{
        staffuserlist: selectedRows, 
        status: ban
      },{
        withCredentials:true,
        headers:{
          'Content-Type': 'application/json',
        }
      })

      const response = await toast.promise(request, {
        loading: `${ban === 'active' ? 'Unbanning' : 'Banning'} admin account ....`,
        success: `Successfully ${ban === 'active' ? 'unbanned' : 'banned'}`,
        error: `Error while ${ban === 'active' ? 'unbanning' : 'banning'} admin account`,
      });

      if(response.data.message === 'success'){
        router.push('?state=true')
        setSelectedRows([])
        setLoading2(false)

      }

    } catch (error) {
      setLoading2(false)

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
    }else{
      setLoading2(false)
      toast.error('Please select atlest one admin')
    }
    
  }



  return (
    <div className=' relative w-full flex flex-col items-center max-w-[1440px] min-h-[500px] h-auto mt-12 bg-zinc-900 p-6'>
        <div className=' flex md:flex-row flex-col gap-4 items-center justify-between sticky top-0 w-[98%] bg-yellow-500 p-2 rounded-sm -translate-y-12'>
            <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[200px] bg-zinc-900 text-white">
                <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              
            </SelectContent>
            </Select>

            <div className=' flex flex-wrap items-center justify-center gap-2'>
              
              <Dialog open={dialog} onOpenChange={setDialog}>
              <DialogTrigger>
                <button className=' px-6 p-2 bg-blue-600 rounded-sm text-white text-xs'>Create Account</button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Admin Account</DialogTitle>
                  <DialogDescription>
                    
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} action="" className=' w-full flex flex-col gap-1'>
                  <label htmlFor="" className=' text-xs'>Username</label>
                  <Input type="text" placeholder='Username' className=' text-sm text-black p-2 rounded-md' {...register('username')} />
                  {errors.username && <p className=' text-[.6em] text-red-400'>{errors.username.message}</p>}


                  <label htmlFor="" className=' text-xs mt-2'>Password</label>
                  <Input type="text" placeholder='Password' className=' text-sm text-black p-2 rounded-md' {...register('password')} />
                  {errors.password && <p className=' text-[.6em] text-red-400'>{errors.password.message}</p>}


                  <Button className=' clip-btn w-fit px-12 mt-6'>
                    {loading === true && (
                      <Spinner/>
                    )}
                    Create</Button>

                </form>
              </DialogContent>
            </Dialog>

            
              <Dialog open={dialog2} onOpenChange={setDialog2}>
                  <DialogTrigger>
                      <button className=' px-6 p-2 bg-red-600 rounded-sm text-white text-xs flex items-center justify-center gap-2'>
                        {loading2 === true && (
                          <Spinner/>
                        )}
                        Ban</button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className=' text-red-500'>Are you absolutely sure, you want to ban this user?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently ban the user account.
                        </DialogDescription>
                      </DialogHeader>

                      <Select value={ban} onValueChange={setBan}>
                      <SelectTrigger className="w-[200px] bg-slate-800 text-white">
                          <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="banned">Banned</SelectItem>
                        
                      </SelectContent>
                      </Select>

                      <button onClick={banAdmin} className=' px-8 py-2 text-sm font-semibold rounded-sm bg-red-600 mt-4 w-fit'>{ban === 'active' ? 'Unban' : 'Ban'}</button>
                  </DialogContent>
              </Dialog>

                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Username' className=' p-2 rounded-sm text-xs bg-zinc-900 border-none' />
                <button className=' p-2 bg-yellow-600 text-black rounded-sm'><Search size={15}/></button>
            </div>


        </div>
        <Table className=''>
        {list.length === 0 &&  
          <TableCaption className=' text-xs'>No data</TableCaption>
          }

          {loading === true && (
            <TableCaption className=' '>
              <Spinner/>
            </TableCaption>
          )}
        <TableHeader className=' border-slate-700'>
            <TableRow>
            <TableHead className=' text-center' >Select</TableHead>
            <TableHead className=' text-center' >Created At</TableHead>
            <TableHead className=' text-center'>Username</TableHead>
            <TableHead className=' text-center'>Status</TableHead>
            <TableHead className=' text-center' >Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>

          {list.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium flex items-center justify-center">
                <input 
                checked={selectedRows.includes(item.userid)}
                onChange={() => handleSelectRow(item.userid)} 
                type="checkbox" />
              </TableCell>

              <TableCell className="font-medium text-center">{new Date(item.createdAt).toDateString()}</TableCell>
              <TableCell className="font-medium text-center">{item.username}</TableCell>
              <TableCell className={`font-medium text-center ${item.status === 'active' ? ' text-green-500' : 'text-red-500'}`}>{item.status}</TableCell>
              <TableCell className="font-medium text-center flex items-center justify-center gap-2">

              {/* <Dialog>
                  <DialogTrigger>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <button className=' bg-slate-800 p-1 rounded-sm text-red-500'><OctagonAlert size={15}/></button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Ban User</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className=' text-red-500'>Are you absolutely sure, you want to ban this user?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently ban the user account.
                        </DialogDescription>
                      </DialogHeader>

                      <button className=' px-8 py-2 text-sm font-semibold rounded-sm bg-red-600 mt-4 w-fit'>Ban</button>
                  </DialogContent>
              </Dialog> */}

              <Dialog>
                  <DialogTrigger>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <button className=' bg-slate-800 p-1 rounded-sm text-blue-300'><RectangleEllipsis size={15}/></button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Change Password</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className=''>Change password for <span className=' text-yellow-500'>{item.username}</span></DialogTitle>
                        <DialogDescription>
                          
                        </DialogDescription>
                      </DialogHeader>

                      <ChangePasswordAdminForm id={item.userid}/>
                  </DialogContent>
              </Dialog>

              </TableCell>
            
            </TableRow>
          ))}
            
        </TableBody>
        </Table>

        {list.length !== 0 && (
        <div className=' mt-12'>
          <Pagination onPageChange={handlePageChange} total={totalpage} currentPage={currentpage}/>
        </div>
        )}

        


       


    </div>
  )
}
