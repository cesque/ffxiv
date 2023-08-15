import styles from './Search.module.css'

import { useContext } from 'react'
import { PostsContext } from '@/components/PostsContext/PostsContext'
import useAccessibility from '@/utils/useAccessibility'

export default function Search() {
    let { search, setSearch, filters, setTypeFilter, setDifficultyFilter } = useContext(PostsContext)
    function resetAll() {
        setSearch('')
        setTypeFilter(undefined)
        setDifficultyFilter(undefined)
    }

    let isSearch = search.trim().length > 0

    let isAnyFilter = isSearch || filters.type || filters.difficulty

    return  <section className={ styles.searchSection }>
        <div className={ styles.searchHeader }>
            <div className={ styles.searchHeaderName }>Search</div>
            { isSearch && <a className={ styles.searchHeaderReset } { ...useAccessibility(() => setSearch('')) }>Reset</a> }
            { isAnyFilter && <a className={ styles.searchHeaderResetAll } { ...useAccessibility(resetAll) }>Reset all</a> }
        </div>
        <input type="text" className={ styles.search } value={ search } onChange={ e => setSearch(e.currentTarget.value) } />
    </section>
}