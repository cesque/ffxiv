import uFuzzy from '@leeoniya/ufuzzy'

export default function fuzzySearch(haystack: any[], needle: string, accessor: (element: any) => string) {
    if (haystack.length <= 1) return haystack

    const fuzzy = new uFuzzy({})

    const items = accessor ? haystack.map(accessor) : (haystack as string[])

    const [indices, info, order] = fuzzy.search(items, needle)

    if (!indices || !info || !order) return []

    const results = order.map((i) => {
        const index = indices![i]
        return haystack[index]
    })

    return results
}
