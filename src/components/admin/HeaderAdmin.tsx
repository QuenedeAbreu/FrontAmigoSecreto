"use client"
import { useEffect, useState, useContext, createContext } from "react"
import { useRouter } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import { useGlobalContext } from "@/provider/globlalProvider";


export const HeaderAdmin = () => {
  const { userOne, setUserOne } = useGlobalContext()
  const router = useRouter()
  const cookiesUser = getCookie('user');

  useEffect(() => {
    if (cookiesUser) {
      setUserOne(cookiesUser ? JSON.parse(cookiesUser as string) : null)
    }
  }, [cookiesUser])

  const handleLogout = () => {
    deleteCookie('token')
    deleteCookie('user')
    setUserOne(null)
    router.push('/admin/login')
  }

  return (
    <header className="bg-gray-800 text-center py-5">
      <h3 className="text-3xl">Amigo Secreto</h3>
      <h4 className="text-base">Painel de Controle</h4>
      {userOne && <p className="text-sm mt-2">Bem-vindo, {userOne?.name}</p>}
      {userOne && <a onClick={handleLogout} className="text-red-500">Sair</a>}
    </header>
  )
}
