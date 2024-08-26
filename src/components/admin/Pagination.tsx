'use client'
import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ItemButtonPagination } from '@/components/admin/ItemButtonPagination'
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Select, Field, Label } from '@headlessui/react'
// import { Bs1CircleFill } from "react-icons/bs";
import { ItensPagination } from '@/utils/ItensPagination'
type Props = {
  qtdPages: number,
  loadEvents: (activePage: number, search?: string) => void,
  qtdItensPage: number,
  setQtdItemPage: (qtdItensPage: number) => void
  search: string
}

export const Pagination = ({ qtdPages, loadEvents, qtdItensPage, setQtdItemPage, search }: Props) => {
  const [active, setActive] = useState(1);
  // const [qtdPages, setQtdPages] = useState(50)
  const [itemPagination, setItemPagination] = useState<String[]>([])


  const getItemProps = (index: number) => {
    setActive(index)
  };

  const next = () => {
    if (active === qtdPages) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  useEffect(() => {

    loadEvents(active - 1, search ? search : '')
    setItemPagination(ItensPagination(active, qtdPages).filter(item => (item !== '')))
    //console.log(ItensPagination(active, qtdPages));
  }, [active])


  return (
    <>
      <Field>
        <Label>Linhas por página:</Label>
        <Select
          onChange={(e) => { setQtdItemPage(parseInt(e.target.value)) }}
          name="qtdlinhas"
          defaultValue={qtdItensPage}
          className="text-center w-11 ml-3 bg-gray-950 rounded border-gray-700 border" aria-label="Quantidade de Registros">
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={6}>6</option>
          <option value={8}>8</option>
          <option value={10}>10</option>
        </Select>
      </Field>
      <div className=" flex flex- items-center justify-between">
        <Button
          variant="text"
          className={`flex items-center gap-2 px-3 py-2 ${active !== 1 ? 'hover:bg-gray-800' : ''}`}
          onClick={prev}
          disabled={active === 1}
          placeholder=""
          onPointerEnterCapture={() => { }}
          onPointerLeaveCapture={() => { }}
        >
          <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Anterior
        </Button>
        <div className="flex items-center gap-2 justify-center flex-wrap ">

          {itemPagination.map((item, index) => {
            if (item === '...') {
              return <span key={index} className="">{item}</span>
            }
            return (
              <ItemButtonPagination
                key={index}
                label={item as string}
                select={active === index + 1}
                onClick={() => getItemProps(index + 1)}
              />
            )
          })}
        </div>

        <Button
          variant="text"
          className={` flex items-center gap-2 px-3 py-2 ${active !== qtdPages ? 'hover:bg-gray-800' : ''}`}
          onClick={next}
          disabled={active === qtdPages}
          placeholder=""
          onPointerEnterCapture={() => { }}
          onPointerLeaveCapture={() => { }}
        >
          Próximo
          <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}