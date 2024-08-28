
import * as api from '@/api/server'
import { redirect } from 'next/navigation';
import { NamePage } from '@/components/name/NamePage'

export const runtime = 'edge';
export default async function page() {

  const logged = await api.isTokenValid();
  // console.log(logged.admin);
  if (!logged) return redirect('/admin/login');
  // if (!logged.admin) return redirect('/admin');

  return <NamePage />
}