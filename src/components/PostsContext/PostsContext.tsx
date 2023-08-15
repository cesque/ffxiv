'use client'

import { DutyDifficulty } from '@/types/DutyDifficulty'
import { DutyType } from '@/types/DutyType'
import fuzzySearch from '@/utils/fuzzySearch'
import { Post } from '@/utils/getPosts'
import { ReactNode, createContext, useMemo, useState } from 'react'

let defaultValue: PostsContextValue = {
    posts: [],
    categories: [],

    filteredPosts: [],
    search: '',
    filters: {
        type: undefined,
        difficulty: undefined,
    },

    setSearch: () => {},
    setTypeFilter: () => {},
    setDifficultyFilter: () => {},
}

export const PostsContext = createContext(defaultValue)

interface PostsContextValue {
    posts: Post[],
    categories: string[],

    filteredPosts: Post[],

    search: string,
    filters: {
        type?: DutyType,
        difficulty?: DutyDifficulty,
    },

    setSearch: (value: string) => void,
    setTypeFilter: (value?: DutyType) => void,
    setDifficultyFilter: (value?: DutyDifficulty) => void,
}

interface Props {
    posts: Post[],
    categories: string[],
    children: ReactNode,
}

export function PostsProvider({ posts, categories, children }: Props) {
    let [search, setSearch] = useState('')
    let [typeFilter, setTypeFilter] = useState<DutyType | undefined>()
    let [difficultyFilter, setDifficultyFilter] = useState<DutyDifficulty | undefined>()

    let filteredPosts = useMemo(() => {
        let filteredByTypeAndDifficulty = posts.filter(post => {
            return (typeFilter ? post.meta.type == typeFilter : true)
                && (difficultyFilter ? post.meta.difficulty == difficultyFilter : true)
        })

        if(search.trim().length == 0) return filteredByTypeAndDifficulty
        
        if(categories.includes(search)) {
            let postsInCategory = filteredByTypeAndDifficulty.filter(post => post.meta.belongsTo?.some(belongs => belongs.name == search));
            
            postsInCategory.sort((a, b) => {
                let aBelongs = a.meta.belongsTo?.find(belongs => belongs.name == search)?.entry || Number.POSITIVE_INFINITY
                let bBelongs = b.meta.belongsTo?.find(belongs => belongs.name == search)?.entry || Number.POSITIVE_INFINITY

                return aBelongs - bBelongs 
            })

            return postsInCategory
        }

        let filtered = fuzzySearch(filteredByTypeAndDifficulty, search, item => item.meta.title)

        return filtered
    }, [posts, search, typeFilter, difficultyFilter])

    let value: PostsContextValue = {
        posts,
        categories,

        filteredPosts,
        search,
        filters: {
            type: typeFilter,
            difficulty: difficultyFilter,
        },

        setSearch,
        setTypeFilter,
        setDifficultyFilter,
    }

    return <PostsContext.Provider value={ value }>{ children }</PostsContext.Provider>
}