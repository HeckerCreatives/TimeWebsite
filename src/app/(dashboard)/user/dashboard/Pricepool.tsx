import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'
interface Pool {
    currentvalue: number
  pricepool: number
  }

export default function Pricepool() {
    const router = useRouter()
  const [pool, setPool] = useState<Pool>()
  const [qualify, setQualify] = useState(false)
  const [socket, setSocket] = useState<any>(null);
  const [currValue, setCurrValue] = useState(0)
  const [getCurrvalue, setGetcurrvalue] = useState(false)
  const [amount, setAmount] = useState(currValue)
  const [showCoins, setShowCoins] = useState(false)


  useEffect(() => {
    setAmount(currValue) 
    setShowCoins(true) 
    const timer = setTimeout(() => setShowCoins(false), 1000) 
    return () => clearTimeout(timer)
  }, [currValue]) 



  useEffect(() => {
    const handler = setTimeout( async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/pricepool/usergetpricepool`,{
          withCredentials:true
          })

          setPool(response.data.data)
          setQualify(response.data.boolean)
          setCurrValue(response.data.data.currentvalue)
          setGetcurrvalue(true)
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
  
     
      socket.emit('login', 'User');

      socket.on('update-pricepool', (data: any) => {
      
  
      
       setCurrValue(data)
      });
  
      return () => {
        socket.off('update-pricepool');
      };

  
    }, [socket]);

  return (
    <>
    {qualify === true && (
         <div className=' relative w-full max-w-[1440px] h-auto flex items-center justify-center my-8'
        //  style={{
        //      width: '100%',
        //      backgroundImage: 'url(/Web line.gif)',
        //      backgroundSize: 'cover',
        //      backgroundPosition: 'center', 
        //      backgroundRepeat: 'no-repeat', 
        //    }}
         >
             {/* <img src="/Web line.gif" width={1440} className=' h-24 absolute'/> */}
     
             {/* {showCoins === true ? (
                 <img
                 src='/Piggy-bank.gif' 
                 width={130}
                 className='absolute w-[120px] md:w-[130px] left-0 -translate-x-6 -translate-y-6'
                 alt="Piggy Bank"
               />
             ) : (
             <img src="/Piggy.png" width={130} className=' w-[120px] md:w-[130px] absolute left-0 -translate-x-6 -translate-y-1'/>
     
             )} */}
             
     
             <div className=' relative w-full max-w-[90%] lg:max-w-[70%] h-[70px] rounded-md bg-zinc-900 flex items-center justify-center'>
                 <p className=' absolute top-2 left-2 text-xs text-zinc-400'>Prize Pool</p>
                 <p className=' text-sm md:text-xl font-medium '>Php {amount.toLocaleString()} <span className=' text-yellow-500'>/</span> Php {pool?.pricepool.toLocaleString()}</p>
             </div>
     
         </div>
    )}
    </>
   
  )
}
