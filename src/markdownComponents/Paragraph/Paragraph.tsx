import styles from './Paragraph.module.css'

import { PropsWithChildren } from 'react'

export default function Paragraph({ children }: PropsWithChildren) {
    return <p className={ styles.paragraph }>{ children }</p>
}