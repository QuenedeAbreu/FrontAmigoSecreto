import * as api from '@/api/server'
import { AdminPage } from '@/components/admin/AdminPage';
import { redirect } from 'next/navigation';

export default async function page() {
  const logged = await api.pingAdmin();
  if (!logged) return redirect('/admin/login');

  return <AdminPage />
}	