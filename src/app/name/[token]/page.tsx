"use client"

import { useEffect, useState } from "react";
import * as api from '@/api/admin'
import { useRouter } from "next/navigation";
import { useGlobalContext } from '@/provider/globlalProvider'
import { BgAnimated } from '@/components/admin/BgAnimated'
import { setCookie } from "cookies-next";
import { Button } from "@/components/admin/Button";
import { IoMdPersonAdd } from "react-icons/io";
import { RiLoginCircleLine } from "react-icons/ri";
export const runtime = 'edge';
type Props = {
  params: {
    token: string;
  }
}

export default function page({ params }: Props) {

  const [tokenParams, setTokenParams] = useState(params.token)
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [msgRedirecting, setMsgRedirecting] = useState(false);
  const { userOne, setUserOne } = useGlobalContext()
  const router = useRouter()




  const handleLoginFromToken = async () => {
    if (tokenParams) {
      setWarningMessage('')
      setWarning(false)
      setLoading(true)
      const json = await api.loginFromToken(tokenParams)
      setLoading(false)
      if (!json.token) {
        setWarning(true)
        setWarningMessage(json.response.data.message)
      } else if (json.is_acessall === false) {
        setWarning(true)
        setWarningMessage(json.response.data.message)
      } else {
        // console.log(json.user);
        setUserOne(json.user)
        setCookie('user', json.user)
        setCookie('token', json.token)
        setMsgRedirecting(true)
        router.push(`/name/`)
      }
    }
  }
  useEffect(() => {
    handleLoginFromToken()
  }, [])

  return (

    <div className="flex flex-col items-center justify-center py-4 ">
      <p className="font-bold text-3xl mb-4">Login</p>
      <div className="flex flex-col gap-2 mx-auto max-w-lg w-10/12 h-52 bg-slate-700/30 backdrop-blur-sm rounded-lg justify-center items-center">
        {loading === false && warning === true &&
          <>
            <p className="text-center justify-center text-white ">{warningMessage}</p>
            {/* //botão para tentar fazer login novamente */}
            <div>
              <Button
                IconElement={RiLoginCircleLine}
                value="Tentar Novamente"
                onClick={handleLoginFromToken}
              />
            </div>

          </>
        }

        {loading &&
          <div className='flex space-x-2 justify-center items-center  h-screen dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-black rounded-full animate-bounce'></div>
          </div>
        }
        {msgRedirecting &&

          <p>Redirecionando...</p>
        }

      </div>
      <BgAnimated />
    </div>

  )
}	