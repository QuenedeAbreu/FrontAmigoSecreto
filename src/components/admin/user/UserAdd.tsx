
import * as api from '@/api/admin'
import { InputField } from '@/components/admin/inputField'
import { useEffect, useState } from 'react'
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod'
import { z } from 'zod'
import { Button } from '../Button'
import { IoIosSave } from 'react-icons/io'
import { ModalConfirm } from '../ModalConfirm'
import { IoCloseCircle } from 'react-icons/io5'
import { FaRegCircleCheck } from 'react-icons/fa6'



type Props = {
  refreshAction: () => void,
  setPageLoading: (item: boolean) => void,
  PageLoading: boolean,
  closeModal: (item: null) => {}
}


export const UserAdd = ({ refreshAction, setPageLoading, PageLoading, closeModal }: Props) => {
  const [nameField, setNameField] = useState('')
  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')

  const [isAdminField, setIsAdminFieldField] = useState(false)
  const [isActivedField, setIsActivedField] = useState(true)
  const [isAcessAll, setIsAcessAll] = useState(true)

  //const [loadSendMailPassWord, setLoadSendMailPassWord] = useState(false)

  const [openAndCloseModalConfirm, setOpenAndCloseModalConfirm] = useState(false);
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false);


  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const personSchema = z.object({
    nameField: z.string().min(1, 'O nome é obrigatório'),
    emailField: z.string().email('Email invalido'),
    isAdminField: z.boolean(),
    isActivedField: z.boolean(),
    passwordField: z.string().min(3, 'Senha no mínimo de 3 caracteres')
  });

  useEffect(() => {
    setErrors([])
    const data = personSchema.safeParse({ nameField, emailField, passwordField, isAcessAll, isAdminField, isActivedField })
    if (!data.success) return setErrors(getErrorFromZod(data.error))
  }, [nameField, emailField, passwordField, isAcessAll, isAdminField, isActivedField])

  useEffect(() => {
    setErrors([])
  }, [])
  //Editar usuario
  const handleSaveButton = async () => {
    if (errors.length > 0) return;
    setPageLoading(true);
    const createdser = await api.createdUser({ name: nameField, email: emailField, password: passwordField, is_acessall: isAcessAll, is_admin: isAdminField, is_active: isActivedField })

    if (createdser) {
      setOpenAndCloseModalConfirm(true)
      refreshAction();
      setPageLoading(false);
      closeModal(null)
    } else {
      setPageLoading(false);
      setOpenAndloseModalErro(true)
    }

  }



  return (
    <div>
      {/* Modal de confirmação de Edição de usuário*/}
      {openAndCloseModalConfirm &&
        <ModalConfirm
          title="Adcionar de Usuário"
          description="Usuário criado com sucesso!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndCloseModalConfirm(false)}
          eventTitle={nameField}
          IconElement={FaRegCircleCheck}
          type="success"
        />
      }

      {/* Modal de Erro de Edição de usuário*/}
      {openAndloseModalErro &&
        <ModalConfirm
          title="Editar Usuário"
          description="Erro ao criar este usuário ou email já cadastrado!"
          // onConfirm={handleDeleteButton}
          onCancel={() => setOpenAndloseModalErro(false)}
          eventTitle={nameField}
          IconElement={IoCloseCircle}
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
        <label>Senha</label>

        <InputField
          value={passwordField}
          onChange={(e) => setPasswordField(e.target.value)}
          placeholder="Digite a senha do usuário"
          type='password'
          errorMessage={errors.find(error => error.field === 'passwordField')?.message}
        />

      </div>
      <div className='flex mb-5'>
        <div className='flex flex-col flex-1 items-center justify-center'>
          <label>É administrador?</label>
          <input
            type='checkbox'
            checked={isAdminField}
            onChange={e => setIsAdminFieldField(!isAdminField)}
            className='block w-5 h-5 mt-3'
            disabled={PageLoading}
          />
        </div>
        <div className='flex flex-col flex-1 items-center justify-center'>
          <label>Ativo?</label>
          <input
            type='checkbox'
            checked={isActivedField}
            onChange={e => setIsActivedField(!isActivedField)}
            className='block w-5 h-5 mt-3'
            disabled={PageLoading}
          />
        </div>

        <div className=' flex flex-col flex-1 items-center justify-center'>
          <label>Acesso à todos sistemas?</label>
          <input
            type='checkbox'
            checked={isAcessAll}
            onChange={e => setIsAcessAll(!isAcessAll)}
            className='block w-5 h-5 mt-3'
            disabled={PageLoading}
          />
        </div>

      </div>
      <div>
        <Button
          value={PageLoading ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Salvando...</div> : 'Salvar'}
          onClick={handleSaveButton}
          IconElement={IoIosSave}
          disabled={PageLoading}
        />
      </div>
    </div>
  )
}