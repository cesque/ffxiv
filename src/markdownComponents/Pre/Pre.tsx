import styles from './Pre.module.css'

import { PropsWithChildren } from 'react'

export default function Pre({ children }: PropsWithChildren) {
    return <pre className={ styles.pre }>
        { children }
    </pre>
}