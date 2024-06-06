import {People} from './People'
export type PersonComplete = People &{
  cpf:string;
  id_event:number;
  id_group:number;
}