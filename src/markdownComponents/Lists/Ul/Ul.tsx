import listStyles from '../List.module.css'
import styles from './Ul.module.css'

import classNames from 'classnames'
import { PropsWithChildren } from 'react'

export default function Ol({ children }: PropsWithChildren) {
    return <ul className={ classNames(listStyles.list, styles.list) }>
        { children }
    </ul>
}