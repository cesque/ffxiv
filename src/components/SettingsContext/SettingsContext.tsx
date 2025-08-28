'use client'

import { Role } from '@/types/Role'
import { PropsWithChildren, createContext, useContext, useReducer } from 'react'

type DisplayMode = 'default' | 'compact'

interface SettingsState {
    showConsequences: boolean
    role?: Role
    displayMode: DisplayMode,
}

type SettingsAction =
    | { type: 'TOGGLE_SHOW_CONSEQUENCES' }
    | { type: 'SET_ROLE'; payload?: Role }
    | { type: 'TOGGLE_DISPLAY_MODE'}

function settingsReducer(state: SettingsState, action: SettingsAction): SettingsState {
    switch (action.type) {
        case 'TOGGLE_SHOW_CONSEQUENCES':
            return { ...state, showConsequences: !state.showConsequences }
        case 'SET_ROLE':
            return { ...state, role: action.payload }
        case 'TOGGLE_DISPLAY_MODE':
            return { ...state, displayMode: state.displayMode == 'default' ? 'compact' : 'default' }
    }
}

interface SettingsContextValue extends SettingsState {
    toggleShowConsequences: () => void
    setRole: (role?: Role) => void
    toggleDisplayMode: () => void
}

export const SettingsContext = createContext<SettingsContextValue | undefined>(undefined)

export function SettingsProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(settingsReducer, {
        showConsequences: false,
        role: undefined,
        displayMode: 'default',
    })

    const value: SettingsContextValue = {
        ...state,
        toggleShowConsequences: () => dispatch({ type: 'TOGGLE_SHOW_CONSEQUENCES' }),
        setRole: (role?: Role) => dispatch({ type: 'SET_ROLE', payload: role }),
        toggleDisplayMode: () => dispatch({ type: 'TOGGLE_DISPLAY_MODE' }),
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