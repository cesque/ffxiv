'use client'

import { Role } from '@/types/Role'
import { PropsWithChildren, createContext, useContext, useReducer } from 'react'

interface SettingsState {
    showConsequences: boolean
    role?: Role
}

type SettingsAction =
    | { type: 'SET_SHOW_CONSEQUENCES'; payload: boolean }
    | { type: 'SET_ROLE'; payload?: Role }

function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
    switch (action.type) {
        case 'SET_SHOW_CONSEQUENCES':
            return { ...state, showConsequences: action.payload }
        case 'SET_ROLE':
            return { ...state, role: action.payload }
        default: return state
    }
}

interface SettingsContextValue extends SettingsState {
    setShowConsequences: (value: boolean) => void
    setRole: (role?: Role) => void
}

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

export function SettingsProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(settingsReducer, {
        showConsequences: false,
        role: undefined,
    })

    const value: SettingsContextValue = {
        ...state,
        setShowConsequences: (value: boolean) => dispatch({ type: 'SET_SHOW_CONSEQUENCES', payload: value }),
        setRole: (role?: Role) => dispatch({ type: 'SET_ROLE', payload: role }),
    }

    return <SettingsContext.Provider value={value}>
        {children}
    </SettingsContext.Provider>
}

export function useSettings() {
    const context = useContext(SettingsContext)

    if (!context) {
        throw new Error(`useSettings must be called from a component that has SettingsProvider in its heirarchy!`)
    }

    return context
}