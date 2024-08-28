import { HeaderPassword } from "@/components/admin/HeaderPassword"
import { Metadata } from "next"
import { ReactNode } from "react"
import { GlobalContextProvider } from '@/provider/globlalProvider'
export const runtime = 'edge';
export const metadata: Metadata = {
  title: 'Amigo Secreto - Admin',
  description: 'Generated by create next app',
}
type Props = {
  children: ReactNode
}

export default async function page({ children }: Props) {
  return (
    <GlobalContextProvider>
      <HeaderPassword />
      <main className="mx-auto w-full max-w-3xl p-3">{children}</main>
    </GlobalContextProvider>
  )
}	