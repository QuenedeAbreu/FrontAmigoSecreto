export type User = {
  id:number;
  name: string;
  email: string;
  password?: string;
  nametoken?:string;
  is_active: boolean;
  is_admin: boolean;
  is_acessall:boolean;
}