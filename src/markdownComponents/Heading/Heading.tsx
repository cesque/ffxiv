import styles from './Heading.module.css'

import classNames from 'classnames'
import { PropsWithChildren } from 'react';

interface BaseProps {
    level: 1 | 2 | 3 | 4 | 5 | 6
    className?: string
}

type SpecificHeadingProps = PropsWithChildren<Omit<BaseProps, 'level'>>

function Heading({ level, className, children }: PropsWithChildren<BaseProps>) {
    let classes = classNames(styles.heading, styles[`heading--${ level }`], className);

    switch(+level) {
        case 1: return <h1 className={ classes }>{ children }</h1>
        case 2: return <h2 className={ classes }>{ children }</h2>
        case 3: return <h3 className={ classes }>{ children }</h3>
        case 4: return <h4 className={ classes }>{ children }</h4>
        case 5: return <h5 className={ classes }>{ children }</h5>
        case 6: return <h6 className={ classes }>{ children }</h6>
        default: throw 'unrecognised heading level ' + level
    }
}

export let H1 = (props: SpecificHeadingProps) => <Heading level={ 1 } { ...props } />
export let H2 = (props: SpecificHeadingProps) => <Heading level={ 2 } { ...props } />
export let H3 = (props: SpecificHeadingProps) => <Heading level={ 3 } { ...props } />
export let H4 = (props: SpecificHeadingProps) => <Heading level={ 4 } { ...props } />
export let H5 = (props: SpecificHeadingProps) => <Heading level={ 5 } { ...props } />
export let H6 = (props: SpecificHeadingProps) => <Heading level={ 6 } { ...props } />