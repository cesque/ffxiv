'use client'

import styles from './Sidebar.module.css'
import classNames from 'classnames'
import { DutyType } from '@/types/DutyType'
import { DutyDifficulty } from '@/types/DutyDifficulty'
import Link from 'next/link'
import { useContext } from 'react'
import { PostsContext } from '../PostsContext/PostsContext'
import useAccessibility from '@/utils/useAccessibility'
import Filters from './Filters/Filters'
import Search from './Search/Search'
import Settings from './Settings/Settings'

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

    return <li className={ classes }>
        <Link className={ styles.link } href={ `/${ type }/${ slug }` }>
            <div className={ styles.difficulty }>{ difficulty[0] }</div>
            <div className={ styles.name }>{ name }</div>
        </Link>
    </li>
}

export default function Sidebar() {
    let { search, setSearch, filters, setTypeFilter, setDifficultyFilter, filteredPosts } = useContext(PostsContext)

    function getSection(type: DutyType) {
        let sectionPosts = filteredPosts
            .filter(post => post.meta.type == type)
            .sort((a, b) => a.meta.title.toLowerCase().localeCompare(b.meta.title.toLowerCase()))

        if(sectionPosts.length == 0) return null

        return <section className={ styles.section } key={ type }>
            <h2 className={ styles.listHeader }>{ type }</h2>
            <ul className={ styles.list }>
                { sectionPosts.map(post => {
                    let { title, type, difficulty, belongsTo } = post.meta
                    return <Item name={ title }
                        slug={ post.slug }
                        difficulty={ difficulty }
                        type={ type }
                        key={ post.slug }
                    />
                }) }
            </ul>
        </section>
    }

    return <nav className={ styles.sidebar }>
        <div className={ styles.content }>
            <div className={ styles.inner }>
                <Search />
                <Filters />

                { getSection('dungeon') }
                { getSection('trial') }
                { getSection('raid') }

                { filteredPosts.length == 0 && <h2 className={ styles.listHeader }>No results</h2> }
            </div>
        </div>

        <Settings />
    </nav>
}