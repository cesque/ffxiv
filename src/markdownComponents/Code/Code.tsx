import styles from './Code.module.css'

import { PropsWithChildren } from 'react'

export default function Code({ children }: PropsWithChildren) {
    return <code className={ styles.code }>
        { children }
    </code>
}