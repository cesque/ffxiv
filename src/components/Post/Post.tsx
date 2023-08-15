import { H1 } from '@/markdownComponents/Heading/Heading'
import styles from './Post.module.css'
import { PostMeta } from '@/types/PostMeta'
import PostTags from '../PostTags/PostTags';

interface Props {
    slug: string,
    info: any,
    meta: PostMeta,
    children: any,
}

export default function Post({ slug, info, meta, children }: Props) {
    let { title, type, difficulty, belongsTo } = meta;
    let tags: string[] = [
        type,
        difficulty,
    ]

    if(belongsTo) {
        for(let parent of belongsTo) {
            tags.push(parent.name)
        }
    }

    return <div className={ styles.container }>
        <PostTags tags={ tags } />
        <H1 className={ styles.title }>{ title }</H1>
        
        <aside className={ styles.aside }>
            <p>If an encounter or boss isn't listed, just attack it until it dies</p>
            <p>If a boss ability isn't listed, just dodge any AoEs and otherwise ignore it</p>
        </aside>

        <article className={ styles.post }>
            { children }
        </article>
    </div>
}