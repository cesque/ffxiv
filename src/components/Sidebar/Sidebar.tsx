'use client'

import styles from './Sidebar.module.css'
import classNames from 'classnames'
import { DutyType } from '@/types/DutyType'
import { DutyDifficulty } from '@/types/DutyDifficulty'
import Link from 'next/link'
import { useContext } from 'react'
import { PostsContext } from '../PostsContext/PostsContext'
import useAccessibility from '@/utils/useAccessibility'

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

    return <li className={ classes } key={ slug } data-key={ slug }>
        <Link className={ styles.link } href={ `/${ type }/${ slug }` }>
            <div className={ styles.difficulty }>{ difficulty[0] }</div>
            <div className={ styles.name }>{ name }</div>
        </Link>
    </li>
}

export default function Sidebar() {
    let { search, setSearch, filters, setTypeFilter, setDifficultyFilter, filteredPosts } = useContext(PostsContext)

    function getSection(type: DutyType) {
        let sectionPosts = filteredPosts.filter(post => post.meta.type == type)

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
                    />
                }) }
            </ul>
        </section>
    }

    let filterCategories = {
        type: ['dungeon', 'trial', 'raid'],
        difficulty: ['normal', 'hard', 'extreme', 'savage'],
    }

    function resetAll() {
        setSearch('')
        setTypeFilter(undefined)
        setDifficultyFilter(undefined)
    }

    let isSearch = search.trim().length > 0

    let isAnyFilter = isSearch || filters.type || filters.difficulty

    return <nav className={ styles.sidebar }>
        <section className={ styles.searchSection }>
            <div className={ styles.searchHeader }>
                <div className={ styles.searchHeaderName }>Search</div>
                { isSearch && <a className={ styles.searchHeaderReset } { ...useAccessibility(() => setSearch('')) }>Reset</a> }
                { isAnyFilter && <a className={ styles.searchHeaderResetAll } { ...useAccessibility(resetAll) }>Reset all</a> }
            </div>
            <input type="text" className={ styles.search } value={ search } onChange={ e => setSearch(e.currentTarget.value) } />
        </section>

        <section className={ styles.filters }>
            { (Object.keys(filterCategories) as Array<keyof typeof filterCategories>).map(category => {
                let selected = filters[category]

                let resetActions = {
                    type: () => setTypeFilter(undefined),
                    difficulty: () => setDifficultyFilter(undefined),
                }

                return <div className={ styles.filterCategory } key={ category }>
                    <div className={ styles.filterCategoryHeader }>
                        <div className={ styles.filterCategoryHeaderName }>{ category }</div>
                        { selected && <a className={ styles.filterCategoryHeaderReset } { ...useAccessibility(resetActions[category]) }>Reset</a> }
                    </div>
                    <div className={ styles.filterCategoryList }>
                        { filterCategories[category].map(filter => {
                            let classes = classNames(styles.filter, {
                                [styles.filterType]: category == 'type',
                                [styles.filterDifficulty]: category == 'difficulty',
                                [styles[`filter--${ filter }`]]: true,
                                [styles.filterSelected]: selected == filter,
                            })

                            let setActions = {
                                type: () => setTypeFilter(filter as DutyType),
                                difficulty: () => setDifficultyFilter(filter as DutyDifficulty),
                            }
                            
                            return <a className={ classes } key={ filter } { ...useAccessibility(setActions[category]) }>{ filter }</a>
                        }) }
                    </div>
                </div>
            })}
        </section>

        { getSection('dungeon') }
        { getSection('trial') }
        { getSection('raid') }

        { filteredPosts.length == 0 && <h2 className={ styles.listHeader }>No results</h2> }
    </nav>
}