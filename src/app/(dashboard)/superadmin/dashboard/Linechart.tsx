"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import toast from "react-hot-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "A line chart with a label"


const chartConfig = {
  desktop: {
    label: "Data",
    color: "#facc15",
  },
  mobile: {
    label: "Data",
    color: "green",
  },
} satisfies ChartConfig

export function LineCharts() {
  const router = useRouter()
  const [data, setData] = useState([])
  const [type, setType] = useState('daily')
  const params = useSearchParams()
  const graph = params.get('state')
  const title = graph === 'payin' && 'Payin' || graph === 'comission' && 'Comission' || graph === 'minerpurchased' && 'Rig Miner Purchased' || graph === 'minerpayout' && 'Rig Miner Payout' || graph === 'unilevelpayout' && 'Unilevel Payout'

  const apiRoute = graph === 'payin' && 'getpayingraph' || graph === 'comission' && 'getcommissiongraph' || graph === 'minerpurchased' && 'getminerbuygraph' || graph === 'minerpayout' && 'getminerpayoutgraph' || graph === 'unilevelpayout' && 'getunilevelpayoutgraph'

  const todaysDate = new Date().toDateString()

  const chartDataLine = Object.keys(data).map((time: any) => ({
        time,           // key (e.g., "00:00", "01:00")
        data: data[time], // corresponding value (e.g., 0)
      }));


   useEffect(() => {
    const getWallets = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/analytics/${apiRoute}?charttype=${type}`,{
        withCredentials:true
        })
        setData(response.data.data)
      
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
    getWallets()
    },[graph, type])

  
  return (

         <Card className=" bg-zinc-800 border-none">
         <CardHeader>
             <div className=" w-full flex items-center justify-between">
                 <div className=" flex flex-col gap-2">
                     <CardTitle className=" text-white">{title}</CardTitle>
                     <CardDescription>As of <span className=" text-yellow-500">{todaysDate}</span></CardDescription>
                     <p className=" text-xs text-slate-200">Line Chart</p>
                 </div>

                 <Select value={type} onValueChange={setType}>
                     <SelectTrigger className=" w-[120px] bg-zinc-900 text-white">
                     <SelectValue placeholder="Select" />
                     </SelectTrigger>
                     <SelectContent>
                     <SelectItem value="daily">Daily</SelectItem>
                     <SelectItem value="weekly">Weekly</SelectItem>
                     <SelectItem value="monthly">Monthly</SelectItem>
                     <SelectItem value="yearly">Yearly</SelectItem>
                
                     </SelectContent>
                 </Select>
                
             </div>
            
         </CardHeader>
         <CardContent className=" h-auto">
             <ChartContainer config={chartConfig} className=" h-auto">
             <LineChart
                 accessibilityLayer
                 data={chartDataLine}
                 margin={{
                
                 left: 12,
                 right: 12,
                 }}
             >
                 <CartesianGrid vertical={false} />
                 <XAxis
                 dataKey="time"
                 tickLine={false}
                 axisLine={false}
                 tickMargin={8}
                 tickFormatter={(value) => value.slice(0, 3)}
                 className=""
                 />
                 <ChartTooltip
                 cursor={false}
                 content={<ChartTooltipContent indicator="line" />}
                 />
                 <Line
                 dataKey="data"
                 type="linear"
                 className=" stroke-white text-xs"
                 stroke="var(--color-desktop)"
                 strokeWidth={2}
                 dot={{
                     fill: "var(--color-desktop)",
                 }}
                 activeDot={{
                     r: 6,
                 }}
                 >
                 {/* <LabelList
                     position="bottom"
                     offset={12}
                     className="fill-foreground"
                     fontSize={12}
                 /> */}
                 </Line>
             </LineChart>
             </ChartContainer>
         </CardContent>
         <CardFooter className="flex-col items-start gap-2 text-sm">
             <div className="flex gap-2 font-medium leading-none">
             {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
             </div>
             <div className="leading-none text-muted-foreground">
             Showing data {type}
             </div>
         </CardFooter>
         </Card>
    
  )
}
