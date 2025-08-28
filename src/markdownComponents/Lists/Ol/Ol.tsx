import listStyles from '../List.module.css'
import styles from './Ol.module.css'

import classNames from 'classnames'
import { PropsWithChildren } from 'react'

export default function Ol({ children }: PropsWithChildren) {
    return <ol className={ classNames(listStyles.list, styles.list) }>
        { children }
    </ol>
}