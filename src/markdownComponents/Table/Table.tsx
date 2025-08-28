import classNames from 'classnames'
import styles from './Table.module.scss'
import { PropsWithChildren } from 'react'

interface Props {
    wide?: boolean
    full?: boolean
}

export default function Table({ wide, full, children }: PropsWithChildren<Props>) {
    let classes = classNames(styles.container, {
        [styles.containerWide]: !!wide,
        [styles.containerFull]: !!full,
    })

    return <div className={ classes }>
        <table className={ styles.table }>
            { children }
        </table>
    </div>
}