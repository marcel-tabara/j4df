import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type ContextProps = {
  lang: string | undefined
  setLang: Dispatch<SetStateAction<string | undefined>>
}

type Props = {
  children: ReactNode
}

const MdxComponentsContext = createContext({} as ContextProps)

export function MdxComponentsProvider({ children }: Props): ReactElement {
  const [lang, setLang] = useState<string | undefined>(undefined)

  return (
    <MdxComponentsContext.Provider
      value={{
        lang,
        setLang,
      }}
    >
      {children}
    </MdxComponentsContext.Provider>
  )
}

export function useMdxComponentsContext(): ContextProps {
  return useContext(MdxComponentsContext)
}
