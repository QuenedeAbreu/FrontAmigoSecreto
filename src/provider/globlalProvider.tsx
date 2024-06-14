"use client"

import { User } from '@/types/User';
import { createContext, ReactNode, useContext, useState } from 'react';


type AuthContextType = {
  userOne: User | undefined | null;
  setUserOne: (props: User | null) => void;
}

type Props = {
  children: ReactNode
}

const globlalProvider = createContext({} as AuthContextType);

export const GlobalContextProvider = ({ children }: Props) => {
  const [userOne, setUserOne] = useState<User | null>();

  return (
    <globlalProvider.Provider value={{ userOne, setUserOne }}>
      {children}
    </globlalProvider.Provider>
  );
};
export const useGlobalContext = () => useContext(globlalProvider);
