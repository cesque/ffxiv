'use client'

import styles from './Roles.module.css'

import { Role, Roles, getRoleString, roleCanSeeContentForExclusive, roleCanSeeContentForInclusive } from '@/types/Role'
import { ReactNode } from 'react'
import { useSettings } from '../SettingsContext/SettingsContext'

interface ComponentWithChildren {
    children: ReactNode
}

interface Props {
    roles: Role[],
}

const tank: Role[] = ['tank', 'main tank', 'off tank']
const dps: Role[] = ['dps']
const healer: Role[] = ['healer']

function MissingIndicator({ roles }: { roles: Role[] }) {
    let title = `Content specific to role${ roles.length > 1 ? 's' : '' }: ${ roles.map(getRoleString).join(', ') }`

    return <div className={ styles.missingIndicator } title={ title }>
        some content hidden due to your role
    </div>
}

export function OnlyRoles({ roles, children }: ComponentWithChildren & Props) {
    let { role } = useSettings()

    if(roleCanSeeContentForInclusive(roles, role)) {
        return children
    } else {
        return <MissingIndicator roles={ roles } />
    }
}

export function AllExceptRoles({ roles, children }: ComponentWithChildren & Props) {
    let { role } = useSettings()

    if(!role || !roleCanSeeContentForExclusive(roles, role)) {
        return children
    } else {
        return <MissingIndicator roles={ roles } />
    }
}

export function OnlyTank({ children }: ComponentWithChildren) {
    return <OnlyRoles roles={ tank }>{ children }</OnlyRoles>
}

export function AllExceptTank({ children }: ComponentWithChildren) {
    return <AllExceptRoles roles={ tank }>{ children }</AllExceptRoles>
}

export function OnlyMainTank({ children }: ComponentWithChildren) {
    return <OnlyRoles roles={ ['main tank'] }>{ children }</OnlyRoles>
}

export function AllExceptMainTank({ children }: ComponentWithChildren) {
    return <AllExceptRoles roles={ ['main tank'] }>{ children }</AllExceptRoles>
}

export function OnlyOffTank({ children }: ComponentWithChildren) {
    return <OnlyRoles roles={ ['off tank'] }>{ children }</OnlyRoles>
}

export function AllExceptOffTank({ children }: ComponentWithChildren) {
    return <AllExceptRoles roles={ ['off tank'] }>{ children }</AllExceptRoles>
}

export function OnlyDPS({ children }: ComponentWithChildren) {
    return <OnlyRoles roles={ dps }>{ children }</OnlyRoles>
}

export function AllExceptDPS({ children }: ComponentWithChildren) {
    return <AllExceptRoles roles={ dps }>{ children }</AllExceptRoles>
}

export function OnlyHealer({ children }: ComponentWithChildren) {
    return <OnlyRoles roles={ healer }>{ children }</OnlyRoles>
}

export function AllExceptHealer({ children }: ComponentWithChildren) {
    return <AllExceptRoles roles={ healer }>{ children }</AllExceptRoles>
}