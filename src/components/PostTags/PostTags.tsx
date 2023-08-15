import styles from './PostTags.module.css'

import PostTag from './PostTag'

export default function PostTags({ tags }: { tags: string[] }) {
    return <div className={ styles.tags }>
        { tags.map(tag => <PostTag tag={ tag } />) }
    </div>
}