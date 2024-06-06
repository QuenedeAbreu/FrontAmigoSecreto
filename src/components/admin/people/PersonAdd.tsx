import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import { useEffect, useState } from "react";
import { InputField } from "@/components/admin/inputField";
import { escapeCPF } from "@/utils/escapeCPF";
import { Button } from "@/components/admin/Button";
import { IoIosPersonAdd } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { z } from "zod";
import * as api from "@/api/admin";
import { ModalConfirm } from "@/components/admin/ModalConfirm";

type Props = {
  eventId: number;
  groupId: number;
  refreshAction: () => void;
  setPageLoading: (loading: boolean) => void;
  PageLoading: boolean;
}

export const PersonAdd = ({ eventId, groupId, refreshAction, PageLoading, setPageLoading }: Props) => {
  const [nameField, setNameField] = useState('');
  const [cpfField, setCpfField] = useState('');
  const [errors, setErrors] = useState<ErrorItem[]>([]);
  const [errorCpf, setErrorCpf] = useState('')
  // const [loading, setLoading] = useState(false);
  const [openAndloseModalErro, setOpenAndloseModalErro] = useState(false)

  const personSchema = z.object({
    nameField: z.string().min(1, 'O nome é obrigatório'),
    cpfField: z.string().length(11, 'O CPF Invalido'),
  });


  const handleSaveButton = async () => {
    setPageLoading(true)
    const newPerson = await api.addPerson(eventId, groupId, {
      name: nameField,
      cpf: cpfField
    })
    if (newPerson) {

      if (newPerson === 1) {
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
      <h4 className="text-xl">Nova Pessoa</h4>
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
      <div>
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