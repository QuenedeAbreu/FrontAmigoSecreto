"use client"

import { Button } from "@/components/admin/Button";
// import { IconLoad } from "@/components/admin/IconLoad";
import { InputField } from "@/components/admin/inputField";
import { useEffect, useState } from "react";
import * as api from '@/api/admin'
import z from "zod";
import { useRouter } from "next/navigation";
import { BiLogIn } from "react-icons/bi";
// import { ItemButton } from "@/components/admin/ItemButton";
import { IoMdPersonAdd } from "react-icons/io";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { ModalConfirm } from "@/components/admin/ModalConfirm";
import { FaKey } from "react-icons/fa";
export const runtime = 'edge';

type Props = {
  params: {
    tokenid: string;
  }
}


export default function page({ params }: Props) {

  const [newpassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [modalTokenInvalid, setModalTokenInvalid] = useState(false)
  const [modalRestPasswordOK, setModalRestPasswordOK] = useState(false)
  const [modalRestPasswordNok, setModalRestPasswordNok] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const router = useRouter()


  const personSchema = z.object({
    newpassword: z.string().min(3, 'Senha no mínimo de 3 caracteres'),
    confirmNewPassword: z.string().min(3, 'Senha no mínimo de 3 caracteres')
  });

  useEffect(() => {
    handleVerifyToken()
  }, [])

  useEffect(() => {
    setWarning(false)
    setWarningMessage('')
  }, [])

  useEffect(() => {
    setErrors([])
    const data = personSchema.safeParse({ newpassword, confirmNewPassword })
    if (!data.success) return setErrors(getErrorFromZod(data.error))
  }, [newpassword, confirmNewPassword])

  useEffect(() => {
    setErrors([])
  }, [])

  // Verificar token passado pela url e valido na api
  const handleVerifyToken = async () => {
    const token = params.tokenid
    const result = await api.verifyTokenResetPasswordAndUpdatePasseword(token)
    // console.log(result);
    if (!result) {
      setModalTokenInvalid(true)
    } else {
      setShowForm(true)
      return
    }


    // const eventItem = await api.getEvent(parseInt(params.id));
  }
  const redirectuserOk = () => {
    router.push('/admin')
  }

  const handleresPasswordButton = async () => {

    if (newpassword && confirmNewPassword && newpassword === confirmNewPassword) {
      const token = params.tokenid
      setLoading(true)
      const ResultRestPassword = await api.verifyTokenResetPasswordAndUpdatePasseword(token, newpassword)
      setLoading(false)
      if (ResultRestPassword) {
        setModalRestPasswordOK(true)
      } else {
        setModalRestPasswordNok(true)
      }

    }
  }



  //Verifica se as senhas são iguais
  useEffect(() => {
    if (newpassword !== confirmNewPassword) {
      setWarning(true)
      setWarningMessage('As senhas não coincidem')
    } else {
      setWarning(false)
      setWarningMessage('')
    }
  }, [newpassword, confirmNewPassword])

  return (
    <div className="text-center py-4">
      {modalTokenInvalid &&
        <ModalConfirm
          title="Token Invalido!"
          description="Token invalido ou Expirado!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => { setModalTokenInvalid(false) }}
          // eventTitle={user.name}
          IconElement={FaKey}
          type="error"
        />
      }
      {modalRestPasswordOK &&
        <ModalConfirm
          title="Senha Alterada"
          description="Senha Alterada com sucesso!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => { redirectuserOk(), setModalRestPasswordOK(false) }}
          // eventTitle={user.name}
          IconElement={FaKey}
          type="success"
        />
      }
      {modalRestPasswordNok &&
        <ModalConfirm
          title="Alterar Senha"
          description="Error ao alterar senha!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => { setModalRestPasswordNok(false) }}
          // eventTitle={user.name}
          IconElement={FaKey}
          type="error"
        />
      }
      {/* <p className="font-bold">Nova Senha</p> */}
      {showForm &&
        <form className="mx-auto max-w-lg">
          <InputField
            type="password"
            value={newpassword}
            onChange={e => setNewPassword(e.target.value)}
            placeholder="Nova Senha"
            errorMessage={errors.find(error => error.field === 'newpassword')?.message}
            error={warning}
            disabled={loading}
          />
          <InputField
            type="password"
            value={confirmNewPassword}
            onChange={e => setConfirmNewPassword(e.target.value)}
            placeholder="Confirma Nova senha"
            errorMessage={errors.find(error => error.field === 'confirmNewPassword')?.message}
            error={warning}
            disabled={loading}
          />

          <Button
            value={loading ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Carregando...</div> : 'Salvar'}
            onClick={handleresPasswordButton}
            IconElement={BiLogIn}
            disabled={newpassword === '' || confirmNewPassword === '' || loading}
          />
          {warning && <p className="text-sm text-red-600 border border-dashed border-gray-400 p-3">{warningMessage}</p>}
        </form>
      }
    </div>
  )
}	