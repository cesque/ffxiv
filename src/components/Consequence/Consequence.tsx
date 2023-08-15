import styles from './Consequence.module.css'

import { ReactNode } from 'react'

interface Props {
    children: ReactNode,
}

export default function Consequence({ children }: Props) {
    return <span className={ styles.consequence }>{ children }</span>
}