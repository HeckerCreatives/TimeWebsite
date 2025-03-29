'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleApiError } from "@/lib/errorHandler";
import { Register, registeruser } from "@/validation/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { EyeOff, Eye } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function page() {
  const [username, setUsername] = useState('')
    const [password, SetPassword] = useState('')
    const [showconfirm, setShowconfirm] = useState('password')
    const [showpassword, setShowpassword] = useState('password')
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const params = useSearchParams()
    const uid = params.get('uid')
    const [getusername, setGetusername] = useState('')

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        trigger,
        formState: { errors },
      } = useForm<Register>({
        resolver: zodResolver(registeruser),
      });
    
      const onSubmit = async (data: Register) => {
        setLoading(true)
        const { confirm, ...submitData } = data;
        try {
             const request = axios.post(`${process.env.NEXT_PUBLIC_URL}/auth/register`,{
            username: submitData.username,
            password: submitData.password,
            referral: uid,
            phonenumber: submitData.phonenumber
            })
    
            const response = await toast.promise(request, {
                loading: 'Registering account....',
                success: `Registered successfully`,
                error: 'Error while registering your account out',
            });
    
            if (response.data.message === 'success'){
                router.push('/')
                setLoading(false)
    
            }
    
            
        } catch (error) {
            setLoading(false)
           handleApiError(error)
            
        }
        
      };
    
    
      useEffect(() => {
        const getUsername = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/getreferralusername?id=${uid}`)
            setGetusername(res.data.data)
        }
        getUsername()
      },[])
        

  return (
    <div className=" w-full h-screen bg-black flex items-center justify-center px-4">
       <video
        className="absolute z-10 top-0 left-0 w-full h-full object-cover"
        src="/Loop Video BG.mp4" // Place your video in the "public" folder
        autoPlay
        loop
        muted
      />

      <div className=" relative z-50 w-full grid md:grid-cols-1 lg:grid-cols-2 max-w-[600px] lg:max-w-[1200px] h-auto bg-zinc-950 rounded-xl">
        <div className=" w-full h-full relative hidden lg:flex items-center justify-center"
          style={{ backgroundImage: `url('/Side Background.png')` }}
        >
          <img src="/Login Mascot.png" alt="login" className=" absolute bottom-0 w-[85%]" loading="lazy"/>

        </div>

        <div className=" w-full max-w-[600px] h-full py-4 flex flex-col items-center justify-center text-white">

          <div className=" w-full flex items-center justify-center">
            <img src="/GTIME-LOGO.png" alt="logo" loading="lazy" width={150} height={150} className=" w-[80px] md:w-[100px]"/>
            <img src="/game-time-png-words.png" alt="logo" loading="lazy" width={200} height={200} className=" w-[150px] md:w-[200px]" />
          </div>

          <h1 className=" text-2xl font-bold mt-4">Welcome</h1>
          <p className=" italic text-sm text-yellow-400">Log in with your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className=" w-[80%] md:w-[60%] flex flex-col gap-1 items-center justify-center mt-4">
            <div className=" w-full flex flex-col gap-1">
              <Label className=" text-yellow-400 ">Username</Label>
              <Input type="text" placeholder="Username" className=" text-black" {...register('username')}/>
              {errors.username && <p className=' text-[.6em] text-red-400'>{errors.username.message}</p>}

            </div>

            <div className=" w-full flex flex-col gap-1 mt-2">
              <Label className=" text-yellow-400 ">Phone Number</Label>
              <Input type="number" maxLength={11} placeholder="Phone number" className=" text-black" {...register('phonenumber')}/>
              {errors.phonenumber && <p className=' text-[.6em] text-red-400'>{errors.phonenumber.message}</p>}

            </div>

            <div className=" w-full flex flex-col gap-1 mt-2">
              <Label className=" text-yellow-400">Password</Label>
              <div className=' w-full relative'>
                  <Input placeholder="Password" type={showpassword} className=" text-black" {...register('password')}/>

                   {showpassword === 'password' ? (
                   <p onClick={() => setShowpassword('text')} className=' cursor-pointer absolute top-[7px] right-2 bg-zinc-300 p-1 rounded-full text-black'><EyeOff size={15}/></p>
                  
                   ) : (
                   <p onClick={() => setShowpassword('password')} className=' cursor-pointer absolute top-[7px] right-2 bg-zinc-300 p-1 rounded-full text-black'><Eye size={15}/></p>
                   )}
                </div>
              {errors.password && <p className=' text-[.6em] text-red-400'>{errors.password.message}</p>}

            </div>

            <div className=" w-full flex flex-col gap-1 mt-2">
              <Label className=" text-yellow-400">Confirm Password</Label>
              <div className=' w-full relative'>
                  <Input type={`${showconfirm}`} placeholder="Confirm Password" className=" text-black" {...register('confirm')} />

                   {showconfirm === 'password' ? (
                   <p onClick={() => setShowconfirm('text')} className=' cursor-pointer absolute top-[7px] right-2 bg-zinc-300 p-1 rounded-full text-black'><EyeOff size={15}/></p>
                  
                   ) : (
                   <p onClick={() => setShowconfirm('password')} className=' cursor-pointer absolute top-[7px] right-2 bg-zinc-300 p-1 rounded-full text-black'><Eye size={15}/></p>
                   )}
                </div>
              {errors.confirm && <p className=' text-[.6em] text-red-400'>{errors.confirm.message}</p>}

            </div>

            <div className=" w-full flex flex-col gap-1 mt-2">
                <Label htmlFor="" className=' text-xs text-zinc-300'>Referral</Label>
                <Input disabled={true} value={getusername} type="text" placeholder='Referral' className=' text-sm w-full bg-white p-2 text-black' />
            </div>

            
          <Button disabled={loading} className=" clip-btn w-fit px-16 text-black mt-8 flex items-center justify-center gap-1">
          {loading && ( <div className='spinner'></div>)}
            Log in</Button>

          </form>



          <p className=" italic text-sm text-yellow-400 mt-6">When every seconds count, Time's Ticking</p>
          <h1 className=" text-xl font-bold">Game on</h1>

        </div>
      </div>
    </div>
  );
}
