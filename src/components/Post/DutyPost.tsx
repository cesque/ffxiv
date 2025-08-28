import { PostMeta } from '@/types/PostMeta'
import Post from './Post'
import { PropsWithChildren } from 'react'

interface Props {
    slug: string,
    info: any,
    meta: PostMeta,
    children: any,
}

export default function DutyPost({ slug, info, meta, children }: PropsWithChildren<Props>) {
    let { title, type, difficulty, belongsTo } = meta
    let tags: string[] = [
        type,
        difficulty,
    ]

    if(belongsTo) {
        for(let parent of belongsTo) {
            tags.push(parent.name)
        }
    }

    const aside = <>
        <p>If an encounter or boss isn't listed, just attack it until it dies</p>
        <p>If a boss ability isn't listed, just dodge any AoEs and otherwise ignore it</p>
    </>

    return <Post tags={ tags } title={ title } aside={ aside }>
        { children }
    </Post>
}