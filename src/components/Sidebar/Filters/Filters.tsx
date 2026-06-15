import styles from './Filters.module.css'

import { useContext } from 'react'
import { PostsContext } from '@/components/PostsContext/PostsContext'
import classNames from 'classnames'
import useAccessibility from '@/utils/useAccessibility'
import { DutyType } from '@/types/DutyType'
import { DutyDifficulty } from '@/types/DutyDifficulty'

export default function Filters() {
    const { filters, setTypeFilter, setDifficultyFilter } = useContext(PostsContext)

    const filterCategories = {
        type: ['dungeon', 'trial', 'raid'],
        difficulty: ['normal', 'hard', 'extreme', 'savage'],
    }

    return (
        <section className={styles.filters}>
            {(Object.keys(filterCategories) as Array<keyof typeof filterCategories>).map((category) => {
                const selected = filters[category]

                const resetActions = {
                    type: () => setTypeFilter(undefined),
                    difficulty: () => setDifficultyFilter(undefined),
                }

                return (
                    <div className={styles.filterCategory} key={category}>
                        <div className={styles.filterCategoryHeader}>
                            <div className={styles.filterCategoryHeaderName}>{category}</div>
                            {selected && (
                                <a className={styles.filterCategoryHeaderReset} {...useAccessibility(resetActions[category])}>
                                    Reset
                                </a>
                            )}
                        </div>
                        <div className={styles.filterCategoryList}>
                            {filterCategories[category].map((filter) => {
                                const classes = classNames(styles.filter, {
                                    [styles.filterType]: category === 'type',
                                    [styles.filterDifficulty]: category === 'difficulty',
                                    [styles[`filter--${filter}`]]: true,
                                    [styles.filterSelected]: selected === filter,
                                })

                                const setActions = {
                                    type: () => setTypeFilter(filter as DutyType),
                                    difficulty: () => setDifficultyFilter(filter as DutyDifficulty),
                                }

                                return (
                                    <a className={classes} key={filter} {...useAccessibility(setActions[category])}>
                                        {filter}
                                    </a>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </section>
    )
}
