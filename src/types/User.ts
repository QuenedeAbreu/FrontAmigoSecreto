export type User = {
  id:number;
  name: string;
  email: string;
  password?: string;
  is_active: boolean;
  is_admin: boolean;
}