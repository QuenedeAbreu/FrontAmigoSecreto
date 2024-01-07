export const escapeCPF = (cpf:string) =>{
  return cpf.replace(/[a-zA-Z]|\.|-/gm, '');
}