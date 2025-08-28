'use client'

import { H1 } from '@/markdownComponents/Heading/Heading'
import styles from './Post.module.css'
import PostTags from '../PostTags/PostTags'
import classNames from 'classnames'
import { useSettings } from '../SettingsContext/SettingsContext'
import { PropsWithChildren, ReactNode } from 'react'

interface Props {
    title: string,
    tags?: string[],
    aside?: string | ReactNode,
}

export default function Post({ tags, title, aside, children }: PropsWithChildren<Props>) {
    const { displayMode } = useSettings()

    const postClasses = classNames(styles.post, {
        compact: displayMode == 'compact'
    })

    console.log({ tags, title })

    return <div className={ styles.container }>
        { tags && <PostTags tags={ tags } /> }
        <H1 className={ styles.title }>{ title }</H1>
        
        { aside && <aside className={ styles.aside }>{ aside }</aside> }

        <article className={ postClasses }>
            { children }
        </article>
    </div>
}