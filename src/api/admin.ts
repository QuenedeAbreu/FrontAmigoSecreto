import {req} from '@/api/axios'
import { getCookie } from 'cookies-next';
import { Event } from '@/types/events'
import { Group } from '@/types/Group';
import { PersonComplete } from '@/types/PersonComplete';
import { User } from '@/types/User'


// Uses
export const login = async (email:string, password:string) =>{
  try {
    const json = await req.post('/admin/login',{email,password})
    return json.data ?? false;
  } catch (error) {
    //console.log(error);
    return error
  }
}
export const verifyExistsUser = async () =>{
  try {
    const json = await req.get('/admin/verifyexistsuser/')
    return json.data.exists ?? false;
  } catch (error) {
    // console.log(error);
    return false
  }
}
 export const firstRegister = async (name:string,email:string, password:string) =>{
  try {
    const json = await req.post('/admin/firstregister/',{name,email, password})
    return json.data ?? false;
  } catch (error) {
    // console.log(error);
    return false
  }
 }




// Eventos
export const getEvents = async (id_user:number,search:string,take:number,skip:number) =>{
  const token = getCookie('token');
  try {

    const json = await req.get(`/admin/events/user/${id_user}?search=${search}&take=${take}&skip=${skip}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return {
      events:json.data.events.events as Event[] ?? [],
      countEvents:json.data.events.countEvents as number
    };
  } catch (error) {
    console.log(error);
    return false
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
    console.log(error);
    return false
  }
}

type AddEventData ={
  title:string,
  description:string,
  grouped:boolean,
  id_user?:number
}
export const addEvent = async (id_user:number,data: AddEventData): Promise<Event | false | Error > =>{
  const token = getCookie('token');
  try {
    
    const json = await req.post(`/admin/events/user/${id_user}`,data,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return json.data.event as Event ?? false;
  } catch (error) {
    console.log(error);
    return false
  }
}

type UpdateEventData = {
  title?:string,
  description?:string,
  grouped?:boolean,
  status?: boolean
}

export const updateEvent = async ( id:number, data: UpdateEventData): Promise<Event | false  > =>{
  const token = getCookie('token');
  try {
    const json = await req.put(`/admin/events/${id}`,data,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return json.data.event as Event ?? false;
  } catch (error) {
    console.log(error);
    return false
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
    console.log(error);
    return false
  }
}

//Grupos 
export const getGroups = async (eventId:number): Promise<Group[] | false> =>{
  const token = getCookie('token');
  try {
    const json = await req.get(`/admin/events/${eventId}/groups`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return json.data.groups as Group[] ?? [];
  } catch (error) {
    console.log(error);
    return false
  }
}

type AddGroupData = {
  name:string
}
export const addGroup = async (eventId:number, data:AddGroupData): Promise<Group | false> =>{
    const token = getCookie('token');
    try {
      const json = await req.post(`/admin/events/${eventId}/groups`,data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return json.data.group as Group ?? false;
    } catch (error) {
      console.log(error);
      return false
    }
}

type UpdateroupData = {
  name:string
}
export const updateGroup = async (id:number,eventId:number, data:UpdateroupData): Promise<Group | false> =>{
    const token = getCookie('token');
    try {
      const json = await req.put(`/admin/events/${eventId}/groups/${id}/`,data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return json.data.group as Group ?? false;
    } catch (error) {
      console.log(error);
      return false
    }
}
export const deleteGroup = async (id:number, eventId:number) =>{
  const token = getCookie('token');
  try {
    const json = await req.delete(`/admin/events/${eventId}/groups/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return !json.data.error;
  } catch (error) {
    console.log(error);
    return false
  }
}

//Pessoas 
export const getPeople = async (eventId: number,groupId:number) =>{
  const token = getCookie('token');
  try {
    const json = await req.get(`/admin/events/${eventId}/groups/${groupId}/people`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return json.data.peoples as PersonComplete[] ?? [];
  } catch (error) {
    console.log(error);
    return false
  }
}

type AddPersonData={
  name:string,
  cpf:string
}
export const addPerson = async (EventId:number,groupId:number,data:AddPersonData):Promise<PersonComplete | false | number> =>{
  const token = getCookie('token');
    try {
      // Consultar de ja existe usuario com o cpf informado
      // Se existir retornar false
      const jsonresultCpf = await req.get(`/admin/events/${EventId}/groups/${groupId}/people`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
        })
        const resultCpf = jsonresultCpf.data.peoples as PersonComplete[] ?? [];
        const result = resultCpf.find(item => item.cpf === data.cpf);
        if(result) return 1;

      const json = await req.post(`/admin/events/${EventId}/groups/${groupId}/people`,data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return json.data as PersonComplete ?? false;
    } catch (error) {
      console.log(error);
      return false
    }
}

type UpdatePersonData={
  name?:string,
  cpf?:string
}
export const updatePerson = async (id:number,groupId:number,EventId:number,data:UpdatePersonData):Promise<PersonComplete | false | number> =>{
  const token = getCookie('token');
  // // Consultar de ja existe usuario com o cpf informado
  //     // Se existir retornar false
  //     const jsonresultCpf = await req.get(`/admin/events/${EventId}/groups/${groupId}/people`,{
  //       headers:{
  //         Authorization: `Bearer ${token}`
  //       }
  //       })
  //       const resultCpf = jsonresultCpf.data.peoples as PersonComplete[] ?? [];
  //       const result = resultCpf.find(item => item.cpf === data.cpf);
  //       if(result) return 1;
  try {
      const json = await req.put(`/admin/events/${EventId}/groups/${groupId}/people/${id}`,data,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return json.data.peopleItem as PersonComplete ?? false;
    } catch (error) {
      console.log(error);
      return false
    }
}

export const deletePerson = async (id:number, groupId:number,EventId:number ) =>{
  const token = getCookie('token');
  try {
    const json = await req.delete(`/admin/events/${EventId}/groups/${groupId}/people/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return !json.data.error;
  } catch (error) {
    console.log(error);
    return false
  }
}

//User
export const getUsers = async () =>{
  const token = getCookie('token');
  try {
    const json = await req.get(`/admin/users`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    })
    return json.data.users as User[] ?? [];
  } catch (error) {
    console.log(error);
    return []
  }
}
