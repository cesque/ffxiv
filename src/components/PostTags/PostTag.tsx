'use client'

import classNames from 'classnames'
import styles from './PostTags.module.css'

import { DutyDifficulty, isDutyDifficulty } from '@/types/DutyDifficulty'
import { DutyType, isDutyType } from '@/types/DutyType'
import { UIEventHandler, useContext } from 'react'
import { PostsContext } from '@/components/PostsContext/PostsContext'
import useAccessibility from '@/utils/useAccessibility'

export default function PostTag({ tag }: { tag: string }) {
    let { setSearch, setTypeFilter, setDifficultyFilter } = useContext(PostsContext)

    let isType = isDutyType(tag)
    let isDifficulty = isDutyDifficulty(tag)

    let classes = classNames(styles.tag, {
        [styles[`tag--${ tag }`]]: isType || isDifficulty,
    })

    let action: UIEventHandler = () => setSearch(tag)
    if(isType) {
        action = () => setTypeFilter(tag as DutyType)
    } else if(isDifficulty) {
        action = () => setDifficultyFilter(tag as DutyDifficulty)
    }

    return <a className={ classes } { ...useAccessibility(action) }>{ tag }</a>
}