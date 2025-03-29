"use client"
import UserLayout from "@/components/layout/Userlayout"
import ClaimHistoryTable from "./Table"
import Rigs from "./Rigs"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"


interface Pool {
  currentvalue: number
pricepool: number
}


export default function page() {
  const router = useRouter()
  const [pool, setPool] = useState<Pool>()
  const [qualify, setQualify] = useState(false)
  const [socket, setSocket] = useState<any>(null);
  const [currValue, setCurrValue] = useState(0)
  const [getCurrvalue, setGetcurrvalue] = useState(false)

  const [amount, setAmount] = useState(currValue)
  const [showCoins, setShowCoins] = useState(false)

  // Update amount and trigger coins when initialAmount changes
  useEffect(() => {
    setAmount(currValue) // Update the amount state
    setShowCoins(true) // Trigger coin animation
    const timer = setTimeout(() => setShowCoins(false), 1000) // Hide coins after 2 seconds
    return () => clearTimeout(timer)
  }, [currValue]) // Run this effect when initialAmount changes

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



  return (

    <UserLayout>
        <div className=" w-full h-full flex flex-col items-center p-4">
         
          <Rigs/>
          <ClaimHistoryTable/>
        </div>
      
    </UserLayout>
  )
}
