'use client'

import classNames from 'classnames'
import styles from './PostTags.module.css'

import { DutyDifficulty, isDutyDifficulty } from '@/types/DutyDifficulty'
import { DutyType, isDutyType } from '@/types/DutyType'

export default function PostTag({ tag }: { tag: string }) {
    let classes = classNames(styles.tag, {
        [styles[`tag--${ tag }`]]: isDutyType(tag) || isDutyDifficulty(tag),
    })

    console.log(styles)

    return <a className={ classes } onClick={ () => {} }>{ tag }</a>
}