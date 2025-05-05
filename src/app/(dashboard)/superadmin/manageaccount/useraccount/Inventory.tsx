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
import Spinner from '@/components/common/Spinner'
import axios, { AxiosError } from 'axios'
import { useSearchParams } from 'next/navigation'
import Pagination from '@/components/common/Pagination'
import Countdown from 'react-countdown'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { handleApiError } from '@/lib/errorHandler'
import toast from 'react-hot-toast'
import { Trash2 } from 'lucide-react'


type Miner = {
  chronoid:string
    type: string
    buyprice: number
    profit: number
    duration: number
    earnings: number
    remainingtime: number
    purchasedate: string

}

export default function Inventory() {
    const params = useSearchParams()
    const playerid = params.get('uid')
    const [list, setList] = useState<Miner[]>([])
    const [loading, setLoading] = useState(false)
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
    const [refresh, setRefresh] = useState(false)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setLoading(true)
        const getWallets = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/inventory/getplayerinventoryforsuperadmin?playerid=${playerid}&page=${currentpage}&limit=10`,
                    {
                        withCredentials: true
                    }
                )
                setList(response.data.data.inventory)
                setTotalpage(response.data.data.totalPages)
              setLoading(false)

                
                
            } catch (error) {
                
                
            }
        
        }

        getWallets()
     
     },[currentpage, refresh])


    const handlePageChange = (page: number) => {
        setCurrentpage(page)
    }

    const formatString = (data: string) => {
      return data
          .split('_')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
  }

  const grantMaturity = async ( id: string) => {
    setLoading(true)
    setRefresh(true)

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/inventory/maxplayerinventorysuperadmin`,{
          chronoid: id,
          playerid: playerid
        },
            {
                withCredentials: true
            }
        )

        if(response.data.message === 'success'){
          toast.success('Success')
          setLoading(false)
          setRefresh(false)
          setOpen(false)

        } 

        
        
    } catch (error) {
      setLoading(false)

        handleApiError(error)
        
    }

}


const deletChrono = async ( petid: string) => {
  setLoading(true);
  try {
      const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/inventory/deleteplayerinventoryforadmin`, {
        // playerid: id,
        chronoid: petid
      }, {
          withCredentials: true,
          headers: {
              'Content-Type': 'application/json'
          }
      });

      const response = await toast.promise(request, {
          loading: `Deleting chrono...`,
          success: `Successfully deleted `,
          error: `Error while deleting chrono.`,
      });
      if (response.data.message === 'success') {
          setLoading(false);
          window.location.reload()
      }
  } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<{ message: string, data: string }>;
          if (axiosError.response && axiosError.response.status === 401) {
              toast.error(`${axiosError.response.data.data}`);
          }

          if (axiosError.response && axiosError.response.status === 400) {
              toast.error(`${axiosError.response.data.data}`);
          }

          if (axiosError.response && axiosError.response.status === 402) {
              toast.error(`${axiosError.response.data.data}`);
          }

          if (axiosError.response && axiosError.response.status === 403) {
              toast.error(`${axiosError.response.data.data}`);
          }

          if (axiosError.response && axiosError.response.status === 404) {
              toast.error(`${axiosError.response.data.data}`);
          }
      }
  }
};

    
  return (
    <div className=' w-full flex flex-col gap-8 items-center bg-zinc-800 min-h-[500px] p-4'>
        <Table className=''>
            {list.length === 0 && (
              <TableCaption className=' text-xs'>No data</TableCaption>
            )}
             {loading === true && (
              <TableCaption className=' '>
                <Spinner/>
              </TableCaption>
            )}
            <TableHeader className=' border-slate-700'>
                <TableRow>
                <TableHead className=' text-center'>Purchase Date</TableHead>
                <TableHead className=' text-center'>Price</TableHead>
                <TableHead className=' text-center'>Duration</TableHead>
                <TableHead className=' text-center'>Earnings</TableHead>
                <TableHead className=' text-center'>Profit</TableHead>
                <TableHead className=' text-center'>Remaining Time</TableHead>
                <TableHead className=' text-center'>Type</TableHead>
                <TableHead className=' text-center'>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
              {Object.values(list).map((item, index) => (
                <TableRow key={index}>
                  <TableCell className=' text-center'>{new Date(item.purchasedate).toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.buyprice.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>{item.duration}</TableCell>
                  <TableCell className=' text-center'>₱ {item.earnings.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>₱ {item.profit.toLocaleString()}</TableCell>
                  <TableCell className=' text-center'>
                  <Countdown
                    className=' mt-2'
                        date={Date.now() + (item.remainingtime * 1000 )}
                        renderer={({ days, hours, minutes, seconds }) => (
                            <span className=' text-xs'>
                            Time left: {days} days : {hours} hours : {minutes} minutes : {seconds} seconds
                            </span>
                        )}
                    />
                  </TableCell>
                  <TableCell className=' text-center'>{formatString(item.type)}</TableCell>
                  <TableCell className=' text-center flex items-center gap-2'>
                  <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger>
                    <Button className=' text-black rounded-sm'>Grant</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will grant chrono package maturity.
                      </DialogDescription>
                    </DialogHeader>

                    <Button disabled={loading} onClick={() => grantMaturity(item.chronoid)} className='clip-btn px-12 w-fit mt-4'>
                      {loading === true && ( <div className='spinner'></div>)}
                    Continue</Button>
                  </DialogContent>
                </Dialog>

                <Dialog >
                                     <DialogTrigger className=' text-[.7rem] bg-red-500 text-white p-2 rounded-md flex items-center gap-1'><Trash2 size={15}/></DialogTrigger>
                                     <DialogContent>
                                       <DialogHeader>
                                         <DialogTitle>Are you absolutely sure?</DialogTitle>
                                         <DialogDescription>
                                           This action cannot be undone. This will permanently delete history.
                                         </DialogDescription>
                                       </DialogHeader>
               
                                       <div className=' w-full flex items-end justify-end'>
                                         <button disabled={loading} 
                                          onClick={() => deletChrono( item.chronoid)} 
                                         className=' px-4 py-2 text-xs bg-red-500 text-white rounded-md'>Continue</button>
               
                                       </div>
                                     </DialogContent>
                                   </Dialog>

                  </TableCell>
                </TableRow>
              ))}
                
            </TableBody>
            </Table>

             {list.length !== 0 && (
            <Pagination currentPage={currentpage} total={totalpage} onPageChange={handlePageChange}/>

            )}

    </div>
  )
}
