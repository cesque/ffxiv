'use client'

import { Role } from '@/types/Role'
import { ReactNode, createContext, useState } from 'react'

let defaultValue: HideContentContextValue = {
    showConsequences: false,
    setShowConsequences: () => {},

    role: undefined,
    setRole: () => {},
}

export const HideContentContext = createContext(defaultValue)

interface HideContentContextValue {
    showConsequences: boolean,
    setShowConsequences: (value: boolean) => void,

    role?: Role,
    setRole: (role?: Role) => void,
}

interface Props {
    children: ReactNode,
}

export function HideContextProvider({ children }: Props) {
    let [showConsequences, setShowConsequences] = useState(false)
    let [role, setRole] = useState<Role>()

    let value: HideContentContextValue = {
        showConsequences,
        setShowConsequences,

        role,
        setRole,
    }

    return <HideContentContext.Provider value={ value }>{ children }</HideContentContext.Provider>
}