
import * as api from '@/api/server'
import { redirect } from 'next/navigation';
import { UserPage } from '@/components/admin/user/UserPage'


export default async function page() {
  const logged = await api.isTokenValid();
  if (!logged) return redirect('/admin/login');
  return <UserPage />
}