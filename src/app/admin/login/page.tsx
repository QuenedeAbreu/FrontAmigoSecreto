"use client"

import { Button } from "@/components/admin/Button";
// import { IconLoad } from "@/components/admin/IconLoad";
import { InputField } from "@/components/admin/inputField";
import { useEffect, useState } from "react";
import * as api from '@/api/admin'
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { BiLogIn } from "react-icons/bi";
import { ItemButton } from "@/components/admin/ItemButton";
import { IoMdPersonAdd } from "react-icons/io";
import { Modal } from "@/components/admin/Modal";
import { RegisterFirstUser } from '@/components/admin/RegisterFirstUser'
import { useGlobalContext } from '@/provider/globlalProvider'


export default function page() {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [existsUser, setExistsUser] = useState(false);
  const [modalScreen, setModalScreen] = useState(false);
  const { userOne, setUserOne } = useGlobalContext()
  const router = useRouter()



  const handleVerifyExistsUser = async () => {
    const json = await api.verifyExistsUser()
    setExistsUser(json)
  }
  useEffect(() => {
    handleVerifyExistsUser()
  }, [])

  const handleLoginButton = async () => {

    if (emailInput && passwordInput) {
      setWarningMessage('')
      setWarning(false)
      setLoading(true)
      const json = await api.login(emailInput, passwordInput)
      setLoading(false)
      if (!json.token) {
        setWarning(true)
        setWarningMessage(json.response.data.message)
      } else {
        // console.log(json.user);
        setUserOne(json.user)
        setCookie('user', json.user)
        setCookie('token', json.token)
        router.push('/admin')
      }
    }
  }
  return (
    <div className="text-center py-4">
      <p className="font-bold">Login</p>
      <form className="mx-auto max-w-lg">
        <InputField
          type="email"
          value={emailInput}
          onChange={e => setEmailInput(e.target.value)}
          placeholder="Email"
          error={warning}
          disabled={loading}
        />
        <InputField
          type="password"
          value={passwordInput}
          onChange={e => setPasswordInput(e.target.value)}
          placeholder="Senha"
          error={warning}
          disabled={loading}
        />

        <Button
          value={loading ? <div><i className="pi pi-spin pi-spinner" style={{ fontSize: '1rem' }}></i> Carregando...</div> : 'Entrar'}
          onClick={handleLoginButton}
          IconElement={BiLogIn}
          disabled={emailInput === '' || passwordInput === '' || loading}
        />
        {warning && <p className="text-sm text-red-600 border border-dashed border-gray-400 p-3">{warningMessage}</p>}

        {existsUser &&
          // <div onClick={() => { setModalScreen(true) }}>teste</div>
          <Button
            IconElement={IoMdPersonAdd}
            value="Primeiro Usuário"
            onClick={() => { setModalScreen(true) }}
          />
        }

        {modalScreen &&
          <Modal
            onClose={() => setModalScreen(false)}
          >
            <RegisterFirstUser
              setModalScreen={setModalScreen}
              setExistsUser={setExistsUser}
            />
          </Modal>
        }
      </form>
    </div>
  )
}	