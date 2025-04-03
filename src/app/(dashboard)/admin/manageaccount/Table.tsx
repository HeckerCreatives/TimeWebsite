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
import Pagination from '@/components/common/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import Spinner from '@/components/common/Spinner'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changepasswordadmin, ChangePasswordAdmin } from '@/validation/schema'

type User = {
createdAt: string
id: string
phonenumber: string
status: string
username: string
}



export default function UserTable() {
  const [shownew, setShownew] = useState('password')
  const [showconfirm, setShowconfirm] = useState('password')

  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const router = useRouter()
  const [dialog, setDialog] = useState(false)
  const [dialog2, setDialog2] = useState(false)
  const [list, setList] = useState<User[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [ban, setBan] = useState('active')
  const params = useSearchParams()
  const state = params.get('state')
  const [id, setId] = useState('')

  useEffect(() => {
    setLoading(true)
    const handler = setTimeout( async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getuserlist?usersearch=${search}&status=${status === 'all' ? '' : status}&page=${currentpage}&limit=10`,{
          withCredentials:true
          })
          setList(response.data.data.userlist)
          setTotalpage(response.data.data.totalPages)
          setLoading(false)
          // router.push('?state=false')
    
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`)
              router.push('/')  
              }    
            } 
        }
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  },[currentpage, search,status, state])


  useEffect(() => {
    setLoading(true)
    const handler = setTimeout( async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/user/getuserlist?usersearch=${search}&status=&page=0&limit=10`,{
          withCredentials:true
          })
          setList(response.data.data.userlist)
          setTotalpage(response.data.data.totalPages)
          setLoading(false)
          // router.push('?state=false')
    
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message: string, data: string }>;
            if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`)
              router.push('/')  
              }    
            } 
        }
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  },[search])

  

   const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }


  const banUser = async () => {
    router.push('?state=flase')
    setLoading2(true)
    if(selectedRows.length !== 0 ){
      try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/user/banusers`,{
        userlist: selectedRows, 
        status: ban
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
        router.push('?state=true')
        setSelectedRows([])
        setLoading2(false)
        setDialog2(false)

      }

    } catch (error) {
      setLoading2(false)
      setDialog2(false)
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
  } = useForm<ChangePasswordAdmin>({
    resolver: zodResolver(changepasswordadmin),
  });

  const changePassowrd = async ( data: ChangePasswordAdmin) => {
    setLoading2(true)
    try {
        const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/user/changepassworduser`,{
        userid: id,
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
        setLoading2(false)
        setDialog(false)
        reset()
      }
    } catch (error) {
        setLoading2(false)
        setDialog(false)

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

  const viewUseraccount = (id: string) => {
    window.open(`/admin/manageaccount/useraccount?uid=${id}`, '_blank');
  }

  return (
    <div className=' relative w-full flex flex-col items-center max-w-[1440px] min-h-[500px] h-auto mt-12 bg-zinc-800 p-6'>
        <div className=' flex md:flex-row flex-col gap-4 items-center justify-between sticky top-0 w-[98%] bg-yellow-500 p-2 rounded-sm -translate-y-12'>
            <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[200px] bg-zinc-900">
                <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="banned">Banned</SelectItem>
              
            </SelectContent>
            </Select>

            <div className=' flex flex-wrap items-center justify-center gap-2'>
               <Dialog open={dialog2} onOpenChange={setDialog2}>
                  <DialogTrigger>
                      <button className=' px-6 p-2 bg-red-600 rounded-sm text-white text-xs flex items-center justify-center gap-2'>
                       
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

                      <button onClick={banUser} className=' px-8 py-2 text-sm font-semibold rounded-sm bg-red-600 mt-4 w-fit flex items-center justify-center gap-2'>
                         {loading2 === true && (
                          <Spinner/>
                        )}
                        {ban === 'active' ? 'Unban' : 'Ban'}</button>
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
            <TableHead className=' text-center' >Date Joined</TableHead>
            <TableHead className=' text-center'>Username</TableHead>
            <TableHead className=' text-center'>Phone no.</TableHead>
            <TableHead className=' text-center' >Status</TableHead>
            <TableHead className=' text-center' >Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>

          {loading === false && (
            <>
            {list.map(( item, index) => (
              <TableRow key={index}>
              <TableCell className="font-medium flex items-center justify-center">
                <input 
                checked={selectedRows.includes(item.id)}
                onChange={() => handleSelectRow(item.id)} 
                type="checkbox" />
              </TableCell>
              <TableCell className="font-medium text-center">{new Date(item.createdAt).toDateString()}</TableCell>
              <TableCell className="font-medium text-center">{item.username}</TableCell>
              <TableCell className="font-medium text-center">{item.phonenumber}</TableCell>
              <TableCell className={`font-medium text-center ${item.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>{item.status}</TableCell>
              <TableCell className="font-medium text-center flex items-center justify-center gap-2">

              
                <Dialog open={dialog} onOpenChange={setDialog}>
                    <DialogTrigger>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <button onClick={() => setId(item.id)} className=' bg-slate-800 p-1 rounded-sm text-blue-300'><RectangleEllipsis size={15}/></button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Change Password</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle className=''>Change password</DialogTitle>
                          <DialogDescription>
                            
                          </DialogDescription>
                        </DialogHeader>

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
                            <input type={showconfirm} placeholder='Confirm password' className=' p-2 text-xs rounded-sm w-full' {...register('confirmpassword')}/>
                            { showconfirm === 'password' ? (
                              <p onClick={() => setShowconfirm('text')} className=' top-1 right-1 absolute bg-zinc-200 text-black p-1 rounded-sm cursor-pointer '><EyeOff size={15}/></p>
                              ) : (
                              <p onClick={() => setShowconfirm('password')} className=' top-1 right-1 absolute bg-zinc-200 text-black p-1 rounded-sm cursor-pointer '><Eye size={15}/></p>

                              )}

                          </div>
                          {errors.confirmpassword && <p className=' text-[.6em] text-red-400'>{errors.confirmpassword.message}</p>}

                          <button className=' px-6 py-2 text-sm font-semibold rounded-sm bg-gradient mt-4 w-fit flex items-center justify-center gap-2'>
                            {loading2 === true && (
                                <Spinner/>
                            )}
                            Save Changes</button>
                        </form>

                    </DialogContent>
                </Dialog>

                <button onClick={() => viewUseraccount(item.id)} className=' text-[.6rem] bg-blue-600 px-2 py-1 rounded-sm flex items-center gap-1'><Eye size={15}/>View user</button>

              </TableCell>
              
              </TableRow>
            ))}
            </>
          )}

          
            
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
