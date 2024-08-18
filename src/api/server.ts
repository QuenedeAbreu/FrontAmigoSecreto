import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import {req} from './axios';

export const isTokenValid = async () =>{
  try {
    const token = getCookie('token',{cookies});

    const t = await req.get('/admin/isTokenValid', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });

    return true;
  } catch (error) {
    // console.log(error);
    return false;
  }
}