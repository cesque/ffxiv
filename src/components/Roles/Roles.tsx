'use client'

import styles from './Roles.module.css'

import { Role, getRoleArray } from '@/types/Role'
import { ReactNode, useContext } from 'react'
import { HideContentContext } from '../HideContentContext/HideContentContext'

interface ComponentWithChildren {
    children: ReactNode
}

interface Props {
    roles: Role[],
}

const tank: Role[] = ['tank', 'main tank', 'off tank']
const dps: Role[] = ['dps']
const healer: Role[] = ['healer']

function MissingIndicator() {
    return <div className={ styles.missingIndicator }>
        some content hidden due to your role
    </div>
}

export function OnlyRoles({ roles, children }: ComponentWithChildren & Props) {
    let { role } = useContext(HideContentContext)

    let actualRoles = getRoleArray(role)

    if(actualRoles.some(role => roles.includes(role))) {
        return children
    } else {
        return <MissingIndicator />
    }

}

export function AllExceptRoles({ roles, children }: ComponentWithChildren & Props) {
    return children
}

export function OnlyTank({ children }: ComponentWithChildren) {
    return <OnlyRoles roles={ tank }>{ children }</OnlyRoles>
}

export function AllExceptTank({ children }: ComponentWithChildren) {
    return <AllExceptRoles roles={ tank }>{ children }</AllExceptRoles>
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