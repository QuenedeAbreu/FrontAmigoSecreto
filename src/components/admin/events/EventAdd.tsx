"use client"
import { InputField } from "@/components/admin/inputField";
import { useState } from "react";
import { Button } from "@/components/admin/Button";
import { MdEventAvailable } from "react-icons/md";
import { z } from "zod";
import { ErrorItem, getErrorFromZod } from "@/utils/getErrorFromZod";
import * as api from '@/api/admin'
type Props = {
  refreshAction: () => void;
  setPageLoading: (item: boolean) => void;
  PageLoading: boolean;
}

export const EventAdd = ({ refreshAction, setPageLoading, PageLoading }: Props) => {

  const [titleField, setTitleField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');
  const [groupField, setGroupField] = useState(false);
  const [errors, setErrors] = useState<ErrorItem[]>([]);

  const eventSchema = z.object({
    titleField: z.string().min(1, 'Preencha o título!'),
    descriptionField: z.string().min(1, 'Preencha a descrição!'),
    groupField: z.boolean()
  })

  const handleAddButton = async () => {
    setErrors([])
    setPageLoading(true)
    const data = eventSchema.safeParse({
      titleField,
      descriptionField,
      groupField
    })
    if (!data.success) {
      setPageLoading(false)
      return setErrors(getErrorFromZod(data.error))
    }
    const eventItem = await api.addEvent({
      title: data.data.titleField,
      description: data.data.descriptionField,
      grouped: data.data.groupField
    })
    if (eventItem) {
      refreshAction()
      setPageLoading(false)
    };

  }

  return (
    <div>
      <div className="mb-5 ">
        <label>Título</label>
        <InputField
          value={titleField}
          onChange={(e) => setTitleField(e.target.value)}
          placeholder="Digite o título do evento"
          errorMessage={errors.find(error => error.field === 'titleField')?.message}
        />
      </div>
      <div className="mb-5 ">
        <label>Descrição</label>
        <InputField
          value={descriptionField}
          onChange={(e) => setDescriptionField(e.target.value)}
          placeholder="Digite a descrição do evento"
          errorMessage={errors.find(error => error.field === 'descriptionField')?.message}
        />
      </div>
      <div className="mb-5">
        <label>Agrupar sorteio?</label>
        <input
          type="checkbox"
          checked={groupField}
          onChange={(e) => setGroupField(!groupField)}
          className="block w-5 h-5 mt-3"
        />
      </div>
      <div>
        <Button
          value={PageLoading ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Salvando...</div> : 'Adicionar'}
          onClick={handleAddButton}
          IconElement={MdEventAvailable}
        />
      </div>
    </div>
  );
}