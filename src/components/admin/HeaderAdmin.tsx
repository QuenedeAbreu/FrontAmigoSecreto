"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";


export const HeaderAdmin = () => {
  const [isToken, setIstokem] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const token = getCookie('token')
    if (token) {
      setIstokem(true)
    }
  }, [])

  const handleLogout = () => {
    setIstokem(false)
    deleteCookie('token')
    router.push('/admin/login')

  }

  return (
    <header className="bg-gray-800 text-center py-5">
      <h3 className="text-3xl">Amigo Secreto</h3>
      <h4 className="text-base">Painel de Controle</h4>
      {isToken ? <a onClick={handleLogout} className="text-red-500">Sair</a> : null}
    </header>
  )
}