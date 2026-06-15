import styles from './Alert.module.css'

import { Color } from '@/types/Color'
import { ReactNode } from 'react'
import classNames from 'classnames'

import WarningIcon from '@/icons/warning.svg'
import InfoCircleIcon from '@/icons/info-circle.svg'

type Icon = 'warning' | 'info-circle'

interface Props {
    color: Color
    icon: Icon
    title?: string | ReactNode
    children: ReactNode
}

const icons: Record<Icon, ReactNode> = {
    warning: <WarningIcon />,
    'info-circle': <InfoCircleIcon />,
}

export default function Alert({ color = 'black', icon, title, children }: Props) {
    const classes = classNames(styles.alert, {
        [styles[`alert--${color}`]]: true,
    })

    return (
        <article className={classes}>
            <div className={styles.icon}>{icons[icon]}</div>
            <div className={styles.container}>
                {title && <header className={styles.title}>{title}</header>}
                <div className={styles.content}>{children}</div>
            </div>
        </article>
    )
}
