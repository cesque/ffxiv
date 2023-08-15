import styles from './Code.module.css'

export default function Code({ children }) {
    return <code className={ styles.code }>
        { children }
    </code>
}