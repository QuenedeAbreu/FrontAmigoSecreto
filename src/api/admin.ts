import {req} from '@/api/axios'
import { getCookie } from 'cookies-next';
import { Event } from '@/types/events'

export const login = async (email:string, password:string) =>{
  try {
    const json = await req.post('/admin/login',{email,password})
    return json.data ?? false;
  } catch (error) {
    return error
  }
}

// Eventos
export const getEvents = async () =>{
  const token = getCookie('token');
  try {

    const json = await req.get('/admin/events',{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return json.data.events as Event[] ?? [];
  } catch (error) {
    return error
  }
}

export const getOneEvent = async (id: number) =>{
  const token = getCookie('token');
  try {

    const json = await req.get(`/admin/events/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return json.data.event as Event;
  } catch (error) {
    return error
  }
}


export const deleteEvent = async (id:number) =>{
  const token = getCookie('token');
  try {
    const json = await req.delete(`/admin/events/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return !json.data.error;
  } catch (error) {
    return error
  }
}