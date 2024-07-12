import { User } from '@/types/User'
import { InputField } from '@/components/admin/inputField'
import { useEffect, useState } from 'react'
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod'
import { z } from 'zod'
import { Button } from '../Button'
import { IoIosSave } from 'react-icons/io'

type Props = {
  user: User,
  refreshAction: () => void,
  setPageLoading: (item: boolean) => void,
  PageLoading: boolean
}


export const UserEdit = ({ user, refreshAction, setPageLoading, PageLoading }: Props) => {
  const [nameField, setNameField] = useState(user.name)
  const [emailField, setEmailField] = useState(user.email)
  const [passwordField, setPasswordField] = useState('')

  const [isAdminField, setIsAdminFieldField] = useState(user.is_admin)
  const [isActivedField, setIsActivedField] = useState(user.is_active)

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
  const handleSaveButton = async () => {
    if (errors.length > 0) return;
    setPageLoading(true);
    setInterval(() => {
      setPageLoading(false);
    }, 5000)

  }

  return (
    <div>
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
          value={PageLoading ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Salvando...</div> : 'Salvar'}
          onClick={handleSaveButton}
          IconElement={IoIosSave}
          disabled={PageLoading}
        />
      </div>
    </div>
  )
}