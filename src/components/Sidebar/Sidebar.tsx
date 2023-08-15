import getPosts from '@/utils/getPosts'
import styles from './Sidebar.module.css'
import classNames from 'classnames'
import { DutyType } from '@/types/DutyType'
import { DutyDifficulty } from '@/types/DutyDifficulty'
import Link from 'next/link'

interface ItemProps {
    name: string,
    type: DutyType,
    difficulty: DutyDifficulty,
    slug: string,
}

function Item({ name, type, difficulty, slug }: ItemProps) {
    let classes = classNames(styles.item, {
        [styles[`item--${ type }`]]: true,
        [styles[`item--${ difficulty }`]]: true,
    })

    return <li className={ classes } key={ slug }>
        <Link className={ styles.link } href={ `/${ type }/${ slug }` }>
            <div className={ styles.difficulty }>{ difficulty[0] }</div>
            <div className={ styles.name }>{ name }</div>
        </Link>
    </li>
}

export default async function Sidebar() {
    let { posts, categories } = await getPosts()

    function getSection(type: DutyType) {
        let filteredPosts = posts.filter(post => post.meta.type == type)

        if(filteredPosts.length == 0) return null

        return <>
            <h2 className={ styles.listHeader }>{ type }</h2>
            <ul className={ styles.list }>
                { filteredPosts.map(post => {
                    let { title, type, difficulty, belongsTo } = post.meta
                    return <Item name={ title }
                        slug={ post.slug }
                        difficulty={ difficulty }
                        type={ type }
                    />
                }) }
            </ul>
        </>
    }

    return <nav className={ styles.sidebar }>
        { getSection('dungeon') }
        { getSection('trial') }
        { getSection('raid') }
    </nav>
}