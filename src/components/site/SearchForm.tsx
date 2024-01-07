"use client"

import { escapeCPF } from "@/utils/escapeCPF"
import { useState } from "react"

type Props = {
  onSearchButton: (cpf: string) => void;
  loading?: boolean;
}

export default function SearchForm({ onSearchButton, loading }: Props) {
  const [cpfInput, setCpfInput] = useState('')
  return (
    <div>
      <p className="mb-3 text-xl">Qual o seu CPF?</p>
      <input
        value={cpfInput}
        onChange={e => setCpfInput(escapeCPF(e.target.value))}
        maxLength={11}
        minLength={11}
        required={true}

        type="text"
        name="cpf"
        id="cpf"
        placeholder="Digite seu CPF"
        inputMode="numeric"
        autoFocus
        disabled={loading}
        className="w-full p-3 bg-white text-black text-center text-4xl outline-none rounded-lg disabled:opacity-20" />
      <button
        className="w-full p-3 mt-3 rounded-lg bg-blue-800 text-white text-4xl border-b-4 border-blue-600 active:border-t-4 active:border-b-0 disabled:opacity-20"
        onClick={() => onSearchButton(cpfInput)}
        disabled={loading}
      >
        {!loading && 'Pesquisar'}
        {loading && 'Buscando...'}

      </button>
    </div>
  )
}