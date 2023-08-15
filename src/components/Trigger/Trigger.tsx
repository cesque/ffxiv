import styles from './Trigger.module.css'

import classNames from 'classnames'

import ArrowIcon from '@/icons/curved-arrow.svg'
import { ReactNode } from 'react'
import { Color } from '@/types/Color'

// type TriggerType = 'on'
//     | 'when'
//     | 'before'
//     | 'during'
//     | 'after'
//     | 'if'
//     | 'on cast'
//     | 'before cast'
//     | 'during cast'
//     | 'after cast'
//     | 'on spawn'

interface Props {
    type: string,
    trigger: string | ReactNode,
    color: Color,
    children: ReactNode,
}

export default function Trigger({ type, trigger, color = 'black', children }: Props)  {
    let classes = classNames(styles.trigger, {
        [styles[`trigger--${ color }`]]: true,
    })

    return <article className={ classes }>
        <header className={ styles.header }>
            <div className={ styles.type }>{ type }</div>
            <div className={ styles.separator } />
            <div className={ styles.triggerText }>{ trigger }</div>
        </header>
        <div className={ styles.container }>
            <ArrowIcon className={ styles.icon } />
            <div className={ styles.content }>{ children }</div>
        </div>
    </article>
}