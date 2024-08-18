import { User } from '@/types/User'
import * as api from '@/api/admin'
import { InputField } from '@/components/admin/inputField'
import { useEffect, useState } from 'react'
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod'
import { z } from 'zod'
import { Button } from '../Button'
import { IoIosSave } from 'react-icons/io'
import { SiMinutemailer } from "react-icons/si";
import { ModalConfirm } from '../ModalConfirm'
import { IoCloseCircle } from 'react-icons/io5'
import { FaRegCircleCheck } from 'react-icons/fa6'
import { TbMailCancel } from 'react-icons/tb'
import { RiMailSendLine } from 'react-icons/ri'


type Props = {
  user: User,
  refreshAction: () => void,
  setPageLoading: (item: boolean) => void,
  PageLoading: boolean
}


export const UserEdit = ({ user, refreshAction, setPageLoading, PageLoading }: Props) => {
  const [nameField, setNameField] = useState(user.name)
  const [emailField, setEmailField] = useState(user.email)
  // const [passwordField, setPasswordField] = useState('')

  const [isAdminField, setIsAdminFieldField] = useState(user.is_admin)
  const [isActivedField, setIsActivedField] = useState(user.is_active)

  const [loadSendMailPassWord, setLoadSendMailPassWord] = useState(false)

  const [openAndCloseModalConfirm, setOpenAndCloseModalConfirm] = useState(false);
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false);

  const [openAndCloseModalConfirmEmail, setOpenAndCloseModalConfirmEmail] = useState(false);
  const [openAndloseModalErroEmail, setOpenAndloseModalErroEmail] = useState(false);

  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const personSchema = z.object({
    nameField: z.string().min(1, 'O nome é obrigatório'),
    emailField: z.string().email('Email invalido'),
    isAdminField: z.boolean(),
    isActivedField: z.boolean()
    //passwordField: z.string().min(3, 'Senha no mínimo de 3 caracteres')
  });

  useEffect(() => {
    setErrors([])
    const data = personSchema.safeParse({ nameField, emailField, isAdminField, isActivedField })
    if (!data.success) return setErrors(getErrorFromZod(data.error))
  }, [nameField, emailField, isAdminField, isActivedField])

  useEffect(() => {
    setErrors([])
  }, [])
  //Editar usuario
  const handleSaveButton = async () => {
    if (errors.length > 0) return;
    setPageLoading(true);
    const editUser = await api.updateUser(user.id, { name: nameField, email: emailField, is_admin: isAdminField, is_active: isActivedField })

    if (editUser) {
      setOpenAndCloseModalConfirm(true)
      refreshAction();
      setPageLoading(false);
    } else {
      setPageLoading(false);
      setOpenAndloseModalErro(true)
    }

  }
  const handleSendMailResetPassWord = async () => {
    setPageLoading(true);
    setLoadSendMailPassWord(true);
    const sendMail = await api.sendMailResetPassWord(user.id)
    if (sendMail) {
      setPageLoading(false)
      setLoadSendMailPassWord(false)
      setOpenAndCloseModalConfirmEmail(true)
    } else {
      setPageLoading(false)
      setLoadSendMailPassWord(false)
      setOpenAndloseModalErroEmail(true)
    }
    // setInterval(() => {
    //   setPageLoading(false);
    //   setLoadSendMailPassWord(false);
    // }, 5000)
  }


  return (
    <div>
      {/* Modal de confirmação de Edição de usuário*/}
      {openAndCloseModalConfirm &&
        <ModalConfirm
          title="Edição de Usuário"
          description="Usuário editado com sucesso!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndCloseModalConfirm(false)}
          eventTitle={user.name}
          IconElement={FaRegCircleCheck}
          type="success"
        />
      }

      {/* Modal de Erro de Edição de usuário*/}
      {openAndloseModalErro &&
        <ModalConfirm
          title="Editar Usuário"
          description="Erro ao editar este usuário!"
          // onConfirm={handleDeleteButton}
          onCancel={() => setOpenAndloseModalErro(false)}
          eventTitle={user.name}
          IconElement={IoCloseCircle}
          type="error"
        />
      }

      {/* Modal de confirmação de envio de email */}
      {openAndCloseModalConfirmEmail &&
        <ModalConfirm
          title="Envio de Email"
          description="Email de troca de senha foi enviado com sucesso!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndCloseModalConfirmEmail(false)}
          eventTitle={user.name}
          IconElement={RiMailSendLine}
          type="success"
        />
      }

      {/* Modal de Erro de envio de email */}
      {openAndloseModalErroEmail &&
        <ModalConfirm
          title="Envio de Email"
          description="Erro ao enviar email de troca de senha!"
          // onConfirm={handleDeleteButton}
          onCancel={() => setOpenAndloseModalErroEmail(false)}
          eventTitle={user.name}
          IconElement={TbMailCancel}
          type="error"
        />
      }
      <div className="mb-5">
        <label>Nome</label>
        <InputField
          value={nameField}
          onChange={(e) => setNameField(e.target.value)}
          placeholder="Digite o nome do usuário"
          errorMessage={errors.find(error => error.field === 'nameField')?.message}
        />
      </div>
      <div className="mb-5">
        <label>Email</label>
        <InputField
          value={emailField}
          onChange={(e) => setEmailField(e.target.value)}
          placeholder="Digite o nome do usuário"
          errorMessage={errors.find(error => error.field === 'emailField')?.message}
        />
      </div>
      <div className="mb-5">
        {/* <label>Senha</label>

        <InputField
          value={passwordField}
          onChange={(e) => setPasswordField(e.target.value)}
          placeholder="Digite a senha do usuário"
          type='password'
          errorMessage={errors.find(error => error.field === 'passwordField')?.message}
        /> */}
        <Button
          value={loadSendMailPassWord ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Enviando senha...</div> : 'Enviar Nova Senha'}
          onClick={handleSendMailResetPassWord}
          IconElement={SiMinutemailer}
          disabled={loadSendMailPassWord}
        ></Button>
      </div>
      <div className='flex mb-5'>
        <div className='flex-1 '>
          <label>É administrador?</label>
          <input
            type='checkbox'
            checked={isAdminField}
            onChange={e => setIsAdminFieldField(!isAdminField)}
            className='block w-5 h-5 mt-3'
            disabled={PageLoading}
          />
        </div>
        <div className='flex-1 '>
          <label>Ativo?</label>
          <input
            type='checkbox'
            checked={isActivedField}
            onChange={e => setIsActivedField(!isActivedField)}
            className='block w-5 h-5 mt-3'
            disabled={PageLoading}
          />
        </div>

      </div>
      <div>
        <Button
          value={PageLoading && !loadSendMailPassWord ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Salvando...</div> : 'Salvar'}
          onClick={handleSaveButton}
          IconElement={IoIosSave}
          disabled={PageLoading}
        />
      </div>
    </div>
  )
}