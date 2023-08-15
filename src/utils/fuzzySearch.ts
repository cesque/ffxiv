import uFuzzy from "@leeoniya/ufuzzy"

export default function fuzzySearch(haystack: any[], needle: string, accessor: (element: any) => string) {
    if(haystack.length <= 1) return haystack

    let fuzzy = new uFuzzy({})

    let items = accessor ? haystack.map(accessor) : haystack as string[]

    let [indices, info, order] = fuzzy.search(items, needle)

    if(!indices || !info || !order) return []

    let results = order.map(i => {
        let index = indices![i]
        return haystack[index]
    })

    return results
}