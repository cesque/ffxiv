

import styles from './Settings.module.css'

import { ChangeEvent, useContext } from 'react'
import { HideContentContext } from '@/components/HideContentContext/HideContentContext'
import { Role, Roles } from '@/types/Role'

export default function Settings() {
    let { showConsequences, setShowConsequences, role, setRole } = useContext(HideContentContext)

    function handleRoleChange(event: ChangeEvent<HTMLSelectElement>) {
        let value = event.currentTarget.value

        setRole(value == 'all' ? undefined : value as Role)
    }

    return <section className={ styles.settings }>
        <div className={ styles.showConsequencesContainer }>
            <input id="show-consequences"
                type="checkbox"
                className={ styles.showConsequencesInput }
                onChange={ () => setShowConsequences(!showConsequences) }
                role="checkbox"
                checked={ showConsequences }
            />
            <label htmlFor="show-consequences" className={ styles.showConsequencesLabel }>Show consequences</label>
        </div>

        <div className={ styles.roleSection }>
            <label className={ styles.roleLabel } htmlFor="role-select">Show role instructions</label>
            <select className={ styles.roleSelect } id="role-select" onChange={ handleRoleChange }>
                <option value="all">All</option>
                { Roles.map((role: Role) => {
                    return <option value={ role }>{ role }</option>
                })}
            </select>
        </div>
    </section>
}