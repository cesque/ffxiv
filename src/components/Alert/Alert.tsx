import styles from './Alert.module.css'

import { Color } from '@/types/Color'
import { ReactNode } from 'react'
import classNames from 'classnames'

import WarningIcon from '@/icons/warning.svg'

type Icon = 'warning'

interface Props {
    color: Color,
    icon: Icon,
    title?: string | ReactNode,
    children: ReactNode,
}

export default function Alert({ color = 'black', icon, title, children }: Props) {
    let classes = classNames(styles.alert, {
        [styles[`alert--${ color }`]]: true,
    })

    return <article className={ classes }>
        <div className={ styles.icon }><WarningIcon /></div>
        <div className={ styles.container }>
            { title && <header className={ styles.title }>{ title }</header> }
            <div className={ styles.content }>{ children }</div>
        </div>
    </article>
}