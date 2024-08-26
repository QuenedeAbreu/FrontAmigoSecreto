
import * as api from '@/api/admin'
import { InputField } from '@/components/admin/inputField'
import { useEffect, useState } from 'react'
import { ErrorItem, getErrorFromZod } from '@/utils/getErrorFromZod'
import { Name } from '@/types/Name'
import { z } from 'zod'
import { Button } from '@/components/admin/Button'
import { IoIosSave } from 'react-icons/io'
import { ModalConfirm } from '@/components/admin/ModalConfirm'
import { IoCloseCircle } from 'react-icons/io5'
import { FaChild, FaChildDress, FaRegCircleCheck } from 'react-icons/fa6'
import { useGlobalContext } from "@/provider/globlalProvider";
import { jwtDecode } from 'jwt-decode'
import { getCookie } from 'cookies-next'
// import { SelectWithIcons } from '@/components/admin/SelectWithIcons'
// import { SingleValue, MultiValue, ActionMeta } from 'react-select';


type Props = {
  refreshAction: () => void,
  name: Name,
  setPageLoading: (item: boolean) => void,
  PageLoading: boolean,
  closeModal: (item: null) => {}
}


export const NameEdit = ({ name, refreshAction, setPageLoading, PageLoading, closeModal }: Props) => {
  const [suggestedNameField, setSuggestedNameField] = useState(name.suggested_name)
  const [sexField, setSexField] = useState<number | undefined>(name.sex)
  const [descriptionField, setDescriptionField] = useState(name.description ? name.description : '')
  const [openAndCloseModalConfirm, setOpenAndCloseModalConfirm] = useState(false);
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false);
  const [errors, setErrors] = useState<ErrorItem[]>([]);


  // const options = [
  //   { value: '0', label: 'Menino', icon: <FaChild className='text-blue-500' /> },
  //   { value: '1', label: 'Menina', icon: <FaChildDress className='text-pink-500' /> },
  // ];
  // type OptionType = {
  //   value: string;
  //   label: string;
  //   icon: JSX.Element;
  // };
  // const handleChangeSelect = (
  //   newValu: SingleValue<OptionType> | MultiValue<OptionType>,
  //   actionMeta: ActionMeta<OptionType>
  // ) => {
  //   console.log('Selected:', newValu);
  // };

  // Pegar id do usuario do cookie

  const handleCheckboxChange = (value: number) => {
    setSexField(value === sexField ? undefined : value);
  };

  const personSchema = z.object({
    suggestedNameField: z.string().min(1, 'O nome é obrigatório'),
    sexField: z.number(),
    descriptionField: z.string()
  });

  useEffect(() => {
    setErrors([])
    const data = personSchema.safeParse({ suggestedNameField, sexField, descriptionField })
    if (!data.success) return setErrors(getErrorFromZod(data.error))
  }, [suggestedNameField, sexField, descriptionField])

  useEffect(() => {
    setErrors([])
  }, [])

  //Criar novo nome
  const handleSaveButton = async () => {
    const token = getCookie('token');
    const userTokenDecod = jwtDecode(token as string)
    if (!userTokenDecod) return
    const userTokenDecodString = JSON.stringify(userTokenDecod)
    const userTokenJson = JSON.parse(userTokenDecodString)
    if (errors.length > 0) return;
    setPageLoading(true);
    // console.log(userTokenJson);
    const createdUser = await api.editName(userTokenJson.id, name.id, { suggested_name: suggestedNameField, sex: sexField, description: descriptionField })
    // console.log(createdUser);
    if (createdUser) {
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
          title="Editar nome"
          description="Nome editado com sucesso!"
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndCloseModalConfirm(false)}
          eventTitle={suggestedNameField}
          IconElement={FaRegCircleCheck}
          type="success"
        />
      }

      {/* Modal de Erro de Edição de usuário*/}
      {openAndloseModalErro &&
        <ModalConfirm
          title="Editar nome"
          description="Erro ao editar o nome!"
          // onConfirm={handleDeleteButton}
          onCancel={() => setOpenAndloseModalErro(false)}
          eventTitle={suggestedNameField}
          IconElement={IoCloseCircle}
          type="error"
        />
      }
      <div className="mb-5">
        <label>Sugerir Nome</label>
        <InputField
          value={suggestedNameField}
          onChange={(e) => setSuggestedNameField(e.target.value)}
          placeholder="Digite o nome sugerido"
          errorMessage={errors.find(error => error.field === 'suggestedNameField')?.message}
        />
      </div>
      <div className="mb-5">
        <label>Sexo</label>
        <div className='flex'>
          <div className='flex items-center justify-center '>
            <FaChild className='text-blue-500' />
            <input
              type='checkbox'
              checked={sexField === 1}
              onChange={e => handleCheckboxChange(1)}
              className='block mr-2 w-5 h-5 '
              disabled={PageLoading}
            />
            <label>Menino</label>
          </div>
          <div className='flex  items-center justify-center ml-10'>
            <FaChildDress className='text-pink-500' />
            <input
              type='checkbox'
              checked={sexField === 0}
              onChange={e => handleCheckboxChange(0)}
              className='block  mr-2 w-5 h-5'
              disabled={PageLoading}
            />
            <label>Menina</label>
          </div>
        </div>
        {/* <select
          onChange={e => setSexField(parseInt(e.target.value))}
          className='w-full rounded bg-gray-900  text-white text-xl p-3 outline-none'
        >
          <option className='bg-gray-800' value={0}><FaChild /> Menina</option>
          <option selected className='bg-gray-800' value={1}><FaChild /> Menino</option>

        </select> */}
        {/* <SelectWithIcons options={options} onChange={handleChangeSelect} /> */}
      </div>
      <div className="mb-5">
        <label>Descrição do nome</label>

        <InputField
          value={descriptionField}
          onChange={(e) => setDescriptionField(e.target.value)}
          placeholder="Descreva a origem do nome"
          errorMessage={errors.find(error => error.field === 'descriptionField')?.message}
        />

        {/* <textarea className='bg-gray-900 w-full'>

        </textarea> */}

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