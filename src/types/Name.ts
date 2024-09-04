import {User} from '@/types/User'
import {VoteNameKid} from '@/types/VoteNameKid'

export type Name ={
  id:number;
  id_user:number;
  suggested_name:string;
  sex:number;
  User:User,
  VoteNameKid:VoteNameKid[];
  positiveVoteCount?:number,
  negativeVoteCount?:number,
  description?:string;
  createdAt?:string;
}
