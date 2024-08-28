import {req} from '@/api/axios'
import { SearchResult } from '@/types/SearchResult'
import {Event} from '@/types/events'
export const runtime = 'edge';
export async function getEvent( id:number):Promise<Event|false>{
  try {
    const resultEvent = await req.get(`/events/${id}`)
    return resultEvent.data.event as Event ?? false
  } catch (error) {
      return false
  }
  // console.log(resultEvent.data.events);
} 

export async function searchCPF(eventId:number, cpf:string):Promise<SearchResult|false>{
  try {
    const result = await req.get(`/events/${eventId}/search?cpf=${cpf}`);
    if(result.data.people && result.data.peopleMatch){
      return result.data as SearchResult;
    }
    return false;
    
  } catch (error) {
    return false
  }
    
  }