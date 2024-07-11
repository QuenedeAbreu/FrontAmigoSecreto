import { InputField } from "@/components/admin/inputField"
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod"
import { useEffect, useState } from "react"
import { Button } from "@/components/admin/Button"
import { IoIosPersonAdd } from "react-icons/io";
import { FullPageLoading } from "@/components/admin/FullPageLoading";
import { z } from "zod";
import * as api from '@/api/admin'
import { ModalConfirm } from "./ModalConfirm";
import { IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";

type Props = {
  setModalScreen: (item: boolean) => void
  setExistsUser: (item: boolean) => void
}

export const RegisterFirstUser = ({ setModalScreen, setExistsUser }: Props) => {
  const [nomeUserField, setNomeUserField] = useState('')
  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [PageLoading, setPageLoading] = useState(false);
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)
  const [openAndloseModalSuccess, setOpenAndloseModalSuccess] = useState(false)


  const userSchema = z.object({
    nomeUserField: z.string().min(1, 'O nome é obrigatório'),
    emailField: z.string().email('Email invalido!'),
    passwordField: z.string().min(1, 'A senha tem que ser preenchida!'),
  });

  useEffect(() => {
    setErrors([])
    const data = userSchema.safeParse({ nomeUserField, emailField, passwordField })
    if (!data.success) return setErrors(getErrorFromZod(data.error))
  }, [nomeUserField, emailField, passwordField])


  useEffect(() => {
    setErrors([])
  }, [])

  const handleAddButton = async () => {
    if (errors.length > 0) return;
    setPageLoading(true)
    const resultUser = await api.firstRegister(nomeUserField, emailField, passwordField)
    if (resultUser) {
      setErrors([])
      setPageLoading(false)
      setErrors([])
      setExistsUser(false)
      setOpenAndloseModalSuccess(true)
      setNomeUserField('')
      setEmailField('')
      setPasswordField('')
    } else {
      setPageLoading(false)
      setOpenAndloseModalErro(true)
      setErrors([])
    }
  }


  return (
    <div>
      {openAndloseModalErro &&
        <ModalConfirm
          title="Error !"
          description={'Erro ao cadastrar o usuário.'}
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndloseModalErro(false)}
          IconElement={IoCloseCircle}
          type="error"
        />
      }
      {openAndloseModalSuccess &&
        <ModalConfirm
          title="Sucesso!"
          description={'Usuário cadastrado com Sucesso!'}
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setModalScreen(false)}
          IconElement={FaCheckCircle}
          type="success"
        />
      }
      {PageLoading && <FullPageLoading />}
      <h1 className="text-2xl font-bold mb-4">Primeiro usuário</h1>

      {/* Inputs */}
      <div className="mb-5 flex flex-col items-start">
        <label>Nome</label>
        <InputField
          value={nomeUserField}
          onChange={(e) => setNomeUserField(e.target.value)}
          placeholder="Digite o nome do usuário"
          errorMessage={errors.find(error => error.field === 'nomeUserField')?.message}
        />
      </div>
      <div className="mb-5 flex flex-col items-start">
        <label>Email</label>
        <InputField
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
          placeholder="Digite o email do usuário"
          errorMessage={errors.find(error => error.field === 'emailField')?.message}
        />
      </div>

      <div className="mb-5 flex flex-col items-start">
        <label>Senha</label>
        <InputField
          value={passwordField}
          type="password"
          onChange={(e) => setPasswordField(e.target.value)}
          placeholder="Digite a senha do usuário"
          errorMessage={errors.find(error => error.field === 'passwordField')?.message}
        />
      </div>

      <div>
        <Button
          value={PageLoading ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Salvando...</div> : 'Cadastrar'}
          onClick={handleAddButton}
          IconElement={IoIosPersonAdd}
        />
      </div>

    </div>
  )
}