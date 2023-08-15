import classNames from 'classnames'
import styles from './Heading.module.css'

function Header({ level, className, children }) {
    let classes = classNames(styles.header, styles[`header--${ level }`], className);

    switch(+level) {
        case 1: return <h1 className={ classes }>{ children }</h1>
        case 2: return <h2 className={ classes }>{ children }</h2>
        case 3: return <h3 className={ classes }>{ children }</h3>
        case 4: return <h4 className={ classes }>{ children }</h4>
        case 5: return <h5 className={ classes }>{ children }</h5>
        case 6: return <h6 className={ classes }>{ children }</h6>
        default: throw 'unrecognised header level ' + level
    }
}

export let H1 = props => <Header level="1" { ...props } />
export let H2 = props => <Header level="2" { ...props } />
export let H3 = props => <Header level="3" { ...props } />
export let H4 = props => <Header level="4" { ...props } />
export let H5 = props => <Header level="5" { ...props } />
export let H6 = props => <Header level="6" { ...props } />