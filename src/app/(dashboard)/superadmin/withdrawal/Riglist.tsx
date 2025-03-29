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
import { List, ListCheck, RefreshCcw, Search, Trash } from 'lucide-react'
import Pagination from '@/components/common/Pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import Spinner from '@/components/common/Spinner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



type List ={
  accountname: string
accountnumber: string
createdAt: string
grossamount: number
id: string
lastname: string
netamount: number
paymentmethod: string
phonenumber: string
status: string
type: string
userid: string
username: string
withdrawalfee: number

}


export default function Riglist() {
  const [list, setList] = useState<List[]>([])
  const [totalpage, setTotalpage] = useState(0)
  const [currentpage, setCurrentpage] = useState(0)
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [search, setSearch] = useState('')
  const [payemnt, setPayment] = useState('')
  const [date, setDate] = useState('')
  const router = useRouter()
  const params = useSearchParams()
  const state = params.get('state')
  const [status, setStatus] = useState('')


   useEffect(() => {
    setLoading(true)
    const handler = setTimeout( async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/payout/getpayoutlist?methodtype=${payemnt}&date=${date}&type=chronocoinwallet&searchUsername=${search}&page=${currentpage}&limit=10`,{
          withCredentials:true
          })
          setList(response.data.data.payoutlist)
          setTotalpage(response.data.data.totalPages)
          setLoading(false)
          // router.push('?state=false')

          if(search !== ''){
            setCurrentpage(0)
          }

        
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
  },[currentpage, search,state,date,payemnt])

  const handlePageChange = (page: number) => {
    setCurrentpage(page)
  }


  const deletePayout = async (id: string, username: string) => {
    setLoading2(true)
    router.push('?state=rue')
      try {
       const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/payout/deletepayout`,{
        payoutid: id
      },{
        withCredentials:true,
        headers:{
          'Content-Type': 'application/json',
        }
      })

      const response = await toast.promise(request, {
        loading: `Deleting payout from ${username}....`,
        success: `Payout deleted successfully`,
        error: 'Error while deleting payout',
      });
      

      if( response.data.message === 'success'){
        setLoading2(false)
        router.push('?state=false')
        setSearch('')
 
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
  }

  const proccessPayout = async (id: string, username: string) => {
    setLoading2(true)
    router.push('?state=rue')
      try {
       const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/payout/processpayout`,{
        payoutid: id,
        status: status
      },{
        withCredentials:true,
        headers:{
          'Content-Type': 'application/json',
        }
      })

      const response = await toast.promise(request, {
        loading: `Proccessing payout from ${username}....`,
        success: `Payout processed successfully`,
        error: 'Error while processing the payout request',
      });
      

      if( response.data.message === 'success'){
        setLoading2(false)
        router.push('?state=false')
        setSearch('')
 
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
  }


  const reset = () => {
    setSearch('')
    setPayment('')
    setDate('')
  }


  
  return (
    <div className=' relative w-full flex flex-col items-center gap-8 max-w-[1440px] min-h-[500px] h-auto mt-12 bg-zinc-900 p-6'>
        <div className=' flex md:flex-row flex-col items-center justify-between absolute z-30 top-0 w-[98%] gap-2 h-auto md:h-[55px] bg-yellow-500 p-2 rounded-sm -translate-y-4'>
            <p className=' text-sm font-semibold text-black'>Chrono Package Payout List</p>

            <div className=' flex flex-wrap items-center gap-2'>
              <Select value={payemnt} onValueChange={setPayment}>
                <SelectTrigger className="w-[150px] bg-slate-900 text-white">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                 <SelectItem value='Gcash'>Gcash</SelectItem>
                <SelectItem value='GoTyme'>GoTyme</SelectItem>
                <SelectItem value='BDO'>BDO</SelectItem>
                <SelectItem value='BPI'>BPI</SelectItem>
                <SelectItem value='RCBC'>RCBC</SelectItem>
                <SelectItem value='EASTWEST'>EASTWEST</SelectItem>
                <SelectItem value='CHINABANK'>CHINABANK</SelectItem>
                <SelectItem value='UNIONBANK'>UNION BANK</SelectItem>
                <SelectItem value='SECURITYBANK'>SECURITY BANK</SelectItem>
                 <SelectItem value='METROBANK'>METRO BANK</SelectItem>
                 <SelectItem value='PNB'>PNB</SelectItem>
                 <SelectItem value='MAYA'>MAYA</SelectItem>
                 <SelectItem value='CIMBBANK'>CIMB BANK</SelectItem>
                
          
                </SelectContent>
              </Select>

              <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className=' text-xs p-2 text-black rounded-sm' />
                <input value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder='Search Username' className=' p-2 rounded-sm text-xs bg-zinc-900 border-none' />
                <button onClick={reset} className=' p-2 bg-yellow-600 text-black rounded-sm'><RefreshCcw size={15}/></button>
            </div>

        </div>
        <Table className='mt-24 md:mt-8'>
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
            <TableHead className=' text-center'>Date</TableHead>
            <TableHead className=' text-center'>Username</TableHead>
            <TableHead className=' text-center'>Acount Name</TableHead>
            <TableHead className=' text-center'>Acount Number</TableHead>
            <TableHead className=' text-center'>Net Amount</TableHead>
            <TableHead className=' text-center'>Gross Amount</TableHead>
            <TableHead className=' text-center'>Payment Method</TableHead>
            <TableHead className=' text-center'>Phone</TableHead>
            <TableHead className=' text-center'>Type</TableHead>
            <TableHead className=' text-center'>Status</TableHead>
            <TableHead className=' text-center'>Action</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
          {loading === false && (
            <>
            {list.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium text-center">{new Date(item.createdAt).toLocaleString()}</TableCell>
                <TableCell className="font-medium text-center">{item.username}</TableCell>
                <TableCell className="font-medium text-center">{item.accountname}</TableCell>
                <TableCell className="font-medium text-center">{item.accountnumber}</TableCell>
                <TableCell className="font-medium text-center">{item.netamount}</TableCell>
                <TableCell className="font-medium text-center">{item.grossamount}</TableCell>
                <TableCell className="font-medium text-center">{item.paymentmethod}</TableCell>
                <TableCell className="font-medium text-center">{item.phonenumber}</TableCell>
                <TableCell className="font-medium text-center">{item.type}</TableCell>
                <TableCell className="font-medium text-center">{item.status}</TableCell>
                <TableCell className="font-medium text-center flex items-center gap-2">

                  <Dialog>
                    <DialogTrigger>
                        <button className=' p-1 rounded-sm bg-green-600 text-white'><ListCheck size={15}/></button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure, you want to process this payout from <span className=' text-green-500'>{item.username}</span> requested at <span className=' text-green-500'>{new Date(item.createdAt).toDateString()}</span>?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will proccessed the requested payout
                        </DialogDescription>
                      </DialogHeader>

                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className="w-[180px] bg-slate-800">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="done">Done</SelectItem>
                          <SelectItem value="reject">Reject</SelectItem>
                        </SelectContent>
                      </Select>

                      <button onClick={() => proccessPayout(item.id,item.username)} className=' btn-gradient rounded-sm w-fit text-sm text-white font-semibold flex items-center justify-center gap-2'>
                        {loading2 === true && (
                          <Spinner/>
                        )}
                        Continue</button>
                    </DialogContent>
                  </Dialog>


                  <Dialog>
                    <DialogTrigger>
                        <button className=' p-1 rounded-sm bg-red-500 text-white'><Trash size={15}/></button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure, you want to delete this payout from <span className=' text-red-500'>{item.username}</span> requested at <span className=' text-red-500'>{new Date(item.createdAt).toDateString()}</span>?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete payout details on the server
                        </DialogDescription>
                      </DialogHeader>

                      <button onClick={() => deletePayout(item.id, item.username)} className=' bg-red-600 px-6 py-2 rounded-sm w-fit text-sm text-white font-semibold flex items-center justify-center gap-2'>
                        {loading2 === true && (
                          <Spinner/>
                        )}
                        Continue</button>
                    </DialogContent>
                  </Dialog>

                   

                </TableCell>

              </TableRow>
            ))}
            </>
          )}
          
            
        </TableBody>
        </Table>

        {list.length !== 0 && (
        <Pagination onPageChange={handlePageChange} currentPage={currentpage} total={totalpage}/>

        )}


       


    </div>
  )
}
