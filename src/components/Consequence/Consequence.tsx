'use client'

import styles from './Consequence.module.css'

import { ReactNode } from 'react'

import StarIcon from '@/icons/five-point-asterisk.svg'
import { useSettings } from '../SettingsContext/SettingsContext'

interface Props {
    children: ReactNode,
}

export default function Consequence({ children }: Props) {
    let { showConsequences } = useSettings()

    if(showConsequences) {
        return <span className={ styles.consequence }>{ children }</span>
    } else {
        return <span className={ styles.missing } title="Some content hidden due to your 'Show consequences' setting"><StarIcon /></span>
    }
}