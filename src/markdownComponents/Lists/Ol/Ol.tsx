import listStyles from '../List.module.css'
import styles from './Ol.module.css'

import classNames from 'classnames';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode
}

export default function Ol({ children }: Props) {
    console.log(listStyles, styles)
    return <ol className={ classNames(listStyles.list, styles.list) }>
        { children }
    </ol>
}