import classNames from 'classnames'
import styles from './Table.module.scss'

export default function Table({ wide, full, children }) {
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