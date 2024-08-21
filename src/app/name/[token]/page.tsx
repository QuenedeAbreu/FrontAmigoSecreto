"use client"

import { useEffect, useState } from "react";
import * as api from '@/api/admin'
import { useRouter } from "next/navigation";
import { useGlobalContext } from '@/provider/globlalProvider'
import { BgAnimated } from '@/components/admin/BgAnimated'
import { setCookie } from "cookies-next";

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
  const { userOne, setUserOne } = useGlobalContext()
  const router = useRouter()




  const handleLoginFromToken = async () => {
    if (tokenParams) {
      setWarningMessage('')
      setWarning(false)
      setLoading(true)
      const json = await api.loginFromToken(tokenParams)
      console.log(json);
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
        // router.push(`/name/${tokenParams}/name`)
      }
    }
  }
  useEffect(() => {
    handleLoginFromToken()
  }, [])

  return (

    <div className="flex flex-col items-center justify-center py-4 ">
      <p className="font-bold">Login</p>
      <div className="flex flex-col gap-2 mx-auto max-w-lg w-10/12 h-52 bg-slate-700 opacity-30 rounded-lg">
        {warningMessage}
      </div>
      <BgAnimated />
    </div>

  )
}	