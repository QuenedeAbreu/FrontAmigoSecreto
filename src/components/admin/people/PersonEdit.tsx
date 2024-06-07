import { PersonComplete } from "@/types/PersonComplete"
import * as api from '@/api/admin'
import { useEffect, useState } from "react";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { z } from "zod";
import { ModalConfirm } from "@/components/admin/ModalConfirm";
import { IoCloseCircle } from "react-icons/io5";
import { InputField } from '@/components/admin/inputField';
import { escapeCPF } from "@/utils/escapeCPF";
import { Button } from "@/components/admin/Button";
import { IoIosPersonAdd } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";


type Props = {
  person: PersonComplete,
  refreshAction: () => void;
  setPageLoading: (item: boolean) => void;
  PageLoading: boolean;
}

export const PersonEdit = ({ person, refreshAction, PageLoading, setPageLoading }: Props) => {
  const [nameField, setNameField] = useState(person.name);
  const [cpfField, setCpfField] = useState(person.cpf);
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [errorCpf, setErrorCpf] = useState('')
  // const [loading, setLoading] = useState(false);
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)

  const personSchema = z.object({
    nameField: z.string().min(1, 'O nome é obrigatório'),
    cpfField: z.string().length(11, 'O CPF Invalido'),
  });
  const handleSaveButton = async () => {
    if (errors.length > 0) return;
    setPageLoading(true)
    const editPerson = await api.updatePerson(person.id, person.id_group, person.id_event, {
      name: nameField,
      cpf: cpfField
    })
    // console.log(editPerson);
    if (editPerson) {

      if (editPerson === 1) {
        setErrorCpf('CPF já cadastrado')
        setOpenAndloseModalErro(true)
      }
      setNameField('')
      setCpfField('')
      refreshAction()
      setPageLoading(false)
      setErrors([])
    } else {
      setPageLoading(false)
      setOpenAndloseModalErro(true)
      setErrors([])
    }

  }
  useEffect(() => {
    setErrors([])
    const data = personSchema.safeParse({ nameField, cpfField })
    if (!data.success) return setErrors(getErrorFromZod(data.error))
  }, [nameField, cpfField])


  useEffect(() => {
    setErrors([])
  }, [])

  return (
    <div>
      {openAndloseModalErro &&
        <ModalConfirm
          title="Error !"
          description={errorCpf || 'Erro ao cadastrar a pessoa.'}
          // onConfirm={() => setOpenAndloseModalErro(false)}
          onCancel={() => setOpenAndloseModalErro(false)}
          IconElement={IoCloseCircle}
          type="error"
        />
      }
      <h4 className="text-xl">Editar Pessoa</h4>
      <h5>Pessoa: {person.name}</h5>
      <InputField
        value={nameField}
        onChange={e => setNameField(e.target.value)}
        placeholder="Digite o nome da pessoa"
        errorMessage={errors.find(e => e.field === 'nameField')?.message}
        disabled={PageLoading}
      />
      <InputField
        value={cpfField}
        onChange={e => setCpfField(escapeCPF(e.target.value))}
        placeholder="Digite o CPF da pessoa"
        errorMessage={errors.find(e => e.field === 'cpfField')?.message}
        disabled={PageLoading}
      />
      <div className="flex gap-3">
        <Button
          value={'Cancelar'}
          onClick={refreshAction}
          IconElement={ImCancelCircle}
          disabled={PageLoading}
        />
        <Button
          value={PageLoading ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Salvando...</div> : 'Salvar'}
          onClick={handleSaveButton}
          IconElement={IoIosPersonAdd}
          disabled={PageLoading}
        />
      </div>

    </div>
  )
}