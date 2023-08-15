'use client'

import styles from './Consequence.module.css'

import { HideContentContext } from '../HideContentContext/HideContentContext'
import { ReactNode, useContext } from 'react'

interface Props {
    children: ReactNode,
}

export default function Consequence({ children }: Props) {
    let { showConsequences } = useContext(HideContentContext)

    if(showConsequences) {
        return <span className={ styles.consequence }>{ children }</span>
    } else {
        return <span className={ styles.missing } title="Some content hidden due to your 'Show consequences' setting">*</span>
    }
}