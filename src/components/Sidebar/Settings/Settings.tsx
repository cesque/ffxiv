

import styles from './Settings.module.css'

import { ChangeEvent } from 'react'
import { useSettings } from '@/components/SettingsContext/SettingsContext'
import { Role, Roles, getRoleString } from '@/types/Role'

export default function Settings() {
    let { showConsequences, toggleShowConsequences, role, setRole, displayMode, toggleDisplayMode } = useSettings()

    function handleRoleChange(event: ChangeEvent<HTMLSelectElement>) {
        let value = event.currentTarget.value

        setRole(value == 'all' ? undefined : value as Role)
    }

    return <section className={ styles.settings }>
        <div className={ styles.checkboxContainer }>
            <input id="display-mode"
                type="checkbox"
                className={ styles.checkbox }
                onChange={ toggleDisplayMode }
                role="checkbox"
                checked={ displayMode == 'compact' }
            />
            <label htmlFor="display-mode" className={ styles.checkboxLabel }>Compact mode</label>
        </div>

        <div className={ styles.checkboxContainer }>
            <input id="show-consequences"
                type="checkbox"
                className={ styles.checkbox }
                onChange={ toggleShowConsequences }
                role="checkbox"
                checked={ showConsequences }
            />
            <label htmlFor="show-consequences" className={ styles.checkboxLabel }>Show consequences</label>
        </div>

        <div className={ styles.selectSection }>
            <label className={ styles.selectLabel } htmlFor="role-select">Show role instructions</label>
            <select className={ styles.selectInput } id="role-select" onChange={ handleRoleChange } value={ role ?? 'all' }>
                <option value="all">All</option>
                { Roles.map((role: Role) => {
                    return <option value={ role } key={ role }>{ getRoleString(role) }</option>
                })}
            </select>
        </div>
    </section>
}