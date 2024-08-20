import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import {req} from './axios';

// type IsTokenValid = {
//   isTokenValid: boolean;
//   admin: boolean;
// };
export const isTokenValid = async () =>{
  try {
    const token = getCookie('token',{cookies});

    const t =  await req.get('/admin/isTokenValid', {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    // console.log(t.data);
    return t.data;
  } catch (error) {
    // console.log(error);
    return false;
  }
}