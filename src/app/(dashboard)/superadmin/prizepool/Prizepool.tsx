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
import Spinner from '@/components/common/Spinner'
import axios, { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { min } from 'moment'
import Pagination from '@/components/common/Pagination'
import io from 'socket.io-client';


interface pricepool {
    _id: string
    pricepool: number,
    currentvalue: number,
    status: string,
    createdAt: string,
    updatedAt: string,
    __v: 0
}

interface Distibution {
  _id: string
  pricepool: string,
  Benificiary: string,
  total: number,
  totalusers: number,
  distribution: number,
  createdAt: string
  updatedAt: string
}

const options = ['rolex_ai_bot', 'patek_philippe_ai_bot', 'audemars_piguet_ai_bot'];

export default function Prizepool() {
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const router = useRouter()
    const [pool, setpool] = useState<pricepool>()
    const [currentvalue, setCurrentValue] = useState(0)
    const [pricepool, setPricepool] = useState(0)
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [distribution, setDistribution] = useState<Distibution[]>([])
    const [benificiary, setBenificiary] = useState('')
    const [totalpage, setTotalpage] = useState(0)
    const [currentpage, setCurrentpage] = useState(0)
  const [socket, setSocket] = useState<any>(null);
  const user = 'Superadmin'


       // Initialize Socket.IO connection
       useEffect(() => {
        const newSocket = io(`${process.env.NEXT_PUBLIC_URL}`);
        setSocket(newSocket);
    
        return () => {
          newSocket.disconnect(); // Clean up socket connection
        };
      }, []);

      useEffect(() => {
        if (!socket) return;
    
        // Join the conversation room
        socket.emit('login', user);

        
  
    
      }, [socket]);

    

    const handlePageChange = (page: number) => {
      setCurrentpage(page)
    }
    
    

    // Function to handle checkbox change
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (checked) {
      // Add the value to the array if the checkbox is checked
      setSelectedValues((prevValues) => [...prevValues, value]);
    } else {
      // Remove the value from the array if the checkbox is unchecked
      setSelectedValues((prevValues) =>
        prevValues.filter((val) => val !== value)
      );
    }
  };

  const updatePricepool = async () => {
    setLoading2(true)

    socket.emit('setpricepool', currentvalue);

    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/pricepool/updatepricepool`,{
            id: pool?._id,
            currentvalue: currentvalue,
            pricepool: pricepool,
            tiers: selectedValues
        },{
            withCredentials:true,
            headers:{
              'Content-Type': 'application/json',
            }
        })

        if( response.data.message === 'success'){
            toast.success(`Price pool updated succesfully`)     
            setLoading2(false)
            refresh()
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

  const distributePricepool = async () => {
    setLoading2(true)
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/pricepoolhistory/distributepricepool`,{
          pricepoolid: pool?._id,
            
        },{
            withCredentials:true,
            headers:{
              'Content-Type': 'application/json',
            }
        })

        if( response.data.message === 'success'){
            toast.success(`Price pool successfully distributed to the users.`)     
            setLoading2(false)
            refresh()
            refreshHistory()
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



    useEffect(() => {
        setLoading(true)
        const handler = setTimeout( async () => {
            try {
              const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/pricepool/getcurrentpricepool`,{
              withCredentials:true
              })

              setpool(response.data.data)
              setCurrentValue(response.data.data.currentvalue)
              setPricepool(response.data.data.pricepool)
                setLoading(false)
            setSelectedValues(response.data.data.tiers)


            
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
    },[])

      const refresh = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/pricepool/getcurrentpricepool`,{
            withCredentials:true
            })

            setpool(response.data.data)
            setCurrentValue(response.data.data.currentvalue)
            setPricepool(response.data.data.pricepool)
              setLoading(false)
            setSelectedValues(response.data.data.tiers)

          
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

      const refreshHistory = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/pricepoolhistory/getdistributionhistory?page=0&limit=10`,{
          withCredentials:true
          })
  
          setDistribution(response.data.data)
      
  
  
        
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


const getBenificiary = (data: string) => {

  const miners = data.split(/[,\&]/);

  const trimmedMiners = miners.map((miner) => miner.trim());

  const formattedMiners = trimmedMiners.map((miner) => formatString(miner));

  return formattedMiners.join(', ');

}

useEffect(() => {
  setLoading(true)
  const handler = setTimeout( async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/pricepoolhistory/getdistributionhistory?page=${currentpage}&limit=10`,{
        withCredentials:true
        })

        setDistribution(response.data.data)
        setTotalpage(response.data.totalPages)
    


      
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
},[currentpage])

const formatString = (data: string) => {
  return data
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}
    
  return (
    <div className=' w-full flex flex-col'>

        <div className=' w-fit flex flex-col gap-8 bg-zinc-950 p-6'>
            <div className=' w-fit flex flex-wrap gap-4'>
                <div className=' bg-zinc-800 w-[300px] p-6 text-sm flex flex-col gap-2'>
                    <p>Current Value</p>
                    <input type="number" value={currentvalue} onChange={(e) => setCurrentValue(e.target.valueAsNumber)} className='text-sm p-2 w-full max-w-[300px]  rounded-md bg-zinc-600'/>

                </div>

                <div className=' bg-zinc-800 p-6 w-[300px] text-sm flex flex-col gap-2'>
                    <p>Price Pool</p>
                    <input type="number" value={pricepool} onChange={(e) => setPricepool(e.target.valueAsNumber)} className='text-sm p-2 w-full max-w-[300px]  rounded-md bg-zinc-600'/>

                </div>

            </div>

            <div className=' flex items-center gap-4'>
            {options.map((option) => (
               <div className=' flex items-center gap-2'>
               <input 
               value={option}
                checked={selectedValues.includes(option)} // Check if the option is in the selectedValues array
                onChange={handleCheckboxChange}
               type="checkbox" name="" id="" />
               <p className=' text-xs'>{formatString(option)}</p>
           </div>
            ))}
                

               
            </div>

            <div className=' flex items-center gap-4 text-sm'>
                <button disabled={loading2} onClick={distributePricepool} className='bg-zinc-700 px-4 py-2 rounded-md flex items-center gap-2'>
                {loading2 === true && (
                    <div className=' spinner'></div>
                  )}
                  Distribute</button>
                <button disabled={loading2} onClick={updatePricepool} className='bg-yellow-500 text-black px-4 py-2 rounded-md flex items-center gap-2'>
                  {loading2 === true && (
                    <div className=' spinner'></div>
                  )}
                  Save</button>
            </div>

        </div>

        <div className=' w-full flex flex-col mt-12 p-4 bg-zinc-800'>
            <p className=' text-sm'>History</p>
            <Table className=''>
            {loading === true && (
                <TableCaption className=' '>
                <Spinner/>
                </TableCaption>
            )}
            {/* {list.length === 0 && (
            <TableCaption className=' text-xs'>No data</TableCaption>
            )} */}
            <TableHeader className=' border-slate-700'>
                <TableRow>
                <TableHead className=' text-center'>Benificiary</TableHead>
                <TableHead className=' text-center'>Total Price Pool</TableHead>
                <TableHead className=' text-center'>Total Users</TableHead>
                <TableHead className=' text-center'>Distibuted Ammount</TableHead>
                <TableHead className=' text-center'>Date</TableHead>
            
                {/* <TableHead className=' text-center' >Date changed</TableHead> */}
                </TableRow>
            </TableHeader>
            <TableBody>
            {distribution.map((item, index) => (
                <TableRow key={index}>
                <TableCell className="font-medium text-center"> All Users owned {getBenificiary(item.Benificiary)}</TableCell>
                <TableCell className="font-medium text-center">₱{item.total.toLocaleString()}</TableCell>
                <TableCell className="font-medium text-center">{item.totalusers}</TableCell>
                <TableCell className="font-medium text-center">₱{item.distribution.toLocaleString()}</TableCell>
                <TableCell className="font-medium text-center">{new Date(item.createdAt).toDateString()}</TableCell>
                </TableRow>
            ))}


                
            </TableBody>
            </Table>

            <div className=' w-full flex items-center justify-center'>
             {distribution.length !== 0 && (
            <div className=' mt-12'>
            <Pagination onPageChange={handlePageChange} total={totalpage} currentPage={currentpage}/>
            </div>
            )}
            </div>
        </div>

       
        

    </div>
  )
}
