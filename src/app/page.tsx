'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleApiError } from "@/lib/errorHandler";
import axios, { AxiosError } from "axios";
import { EyeOff, Eye } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Home() {
  const [username, setUsername] = useState('')
    const [password, SetPassword] = useState('')
    const [showpassword, setShowpassword] = useState('password')
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const login = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/login?username=${username}&password=${password}&ipAddress=${ip}`,
                {
                    withCredentials: true,
                    headers: {
                    'Content-Type': 'application/json'
                    }
                }
            )


        if (response.data.data.auth === 'user' ){
            toast.success('Successfully logged in')
            router.push('/user/dashboard')
            setLoading(false)


        } else if(response.data.data.auth === 'superadmin'){
            toast.success('Successfully logged in')
            router.push('/superadmin/dashboard')
            setLoading(false)
        } else if(response.data.data.auth === 'admin'){
            toast.success('Successfully logged in')
            router.push('/admin/dashboard')
            setLoading(false)
        } else {
            toast.error(response.data.data)
            setLoading(false)

        }
            
        } catch (error) {
            setLoading(false)
            handleApiError(error)
        }
    }

    const [ip, setIp] = useState('');

    useEffect(() => {
      const fetchIP = async () => {
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          setIp(data.ip);
        } catch (error) {
        }
      };

      fetchIP();
    }, []);

  return (
    <div className=" w-full h-screen bg-black flex items-center justify-center px-4">
       <video
        className="absolute z-10 top-0 left-0 w-full h-full object-cover"
        src="/Loop Video BG.mp4" // Place your video in the "public" folder
        autoPlay
        loop
        muted
      />

      <div className=" relative z-50 w-full grid md:grid-cols-1 lg:grid-cols-2 max-w-[600px] lg:max-w-[1200px] h-[600px] bg-zinc-950 rounded-xl">
        <div className=" w-full h-full relative hidden lg:flex items-center justify-center"
          style={{ backgroundImage: `url('/Side Background.png')` }}
        >
          <img src="/Login Mascot.png" alt="login" className=" absolute bottom-0" loading="lazy"/>

        </div>

        <div className=" w-full max-w-[600px] h-full flex flex-col items-center justify-center text-white">

          <div className=" w-full flex items-center justify-center">
            <img src="/GTIME-LOGO.png" alt="logo" loading="lazy" width={150} height={150} className=" w-[80px] md:w-[100px]"/>
            <img src="/game-time-png-words.png" alt="logo" loading="lazy" width={200} height={200} className=" w-[150px] md:w-[200px]" />
          </div>

          <h1 className=" text-3xl font-bold mt-8">Welcome</h1>
          <p className=" italic text-sm text-yellow-400">Log in with your account</p>

          <form action="" className=" w-[80%] md:w-[60%] flex flex-col gap-1 items-center justify-center mt-4">
            <div className=" w-full flex flex-col gap-1">
              <Label className=" text-yellow-400 ">Username</Label>
              <Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" className=" text-black"/>
            </div>

            <div className=" w-full flex flex-col gap-1 mt-2">
              <Label className=" text-yellow-400">Password</Label>
              <div className=' w-full relative'>
                  <Input value={password} onChange={(e) => SetPassword(e.target.value)} type={`${showpassword}`} placeholder="Password" className=" text-black" />

                   {showpassword === 'password' ? (
                   <p onClick={() => setShowpassword('text')} className=' cursor-pointer absolute top-[7px] right-2 bg-zinc-300 p-1 rounded-full text-black'><EyeOff size={15}/></p>
                  
                   ) : (
                   <p onClick={() => setShowpassword('password')} className=' cursor-pointer absolute top-[7px] right-2 bg-zinc-300 p-1 rounded-full text-black'><Eye size={15}/></p>
                   )}
                </div>
            </div>
           



          </form>

          <Button disabled={loading} onClick={login} className=" clip-btn w-fit px-16 text-black mt-8 flex items-center justify-center gap-1">
          {loading && ( <div className='spinner'></div>)}
            Log in</Button>


          <p className=" italic text-sm text-yellow-400 mt-8">When every seconds count, Time's Ticking</p>
          <h1 className=" text-xl font-bold">Game on</h1>

        </div>
      </div>
    </div>
  );
}
