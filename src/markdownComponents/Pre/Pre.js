import styles from './Pre.module.css'

export default function Pre({ children }) {
    let language = children.props.className
    return <pre className={ styles.pre }>
        { children }
    </pre>
}