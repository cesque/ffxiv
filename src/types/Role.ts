export const Roles = ['tank', 'dps', 'healer', 'main tank', 'off tank'] as const

export type Role = typeof Roles[number]

export function getRoleString(role: Role) {
    let map = {
        'tank': 'Tank',
        'dps': 'DPS',
        'healer': 'Healer',
        'main tank': 'Main Tank',
        'off tank': 'Off Tank'
    }

    return map[role]
}  


// this functionality below needs to get replaced my something
// more robust... this is just a hacked together version of
// tree-based roles with permission
export function getInclusiveRoles(role?: Role) {
    if(!role) return Roles

    let map: { [key in Role]: Role[] } = {
        'tank': ['tank', 'main tank', 'off tank'],
        'dps': ['dps'],
        'healer': ['healer'],
        'main tank': ['tank', 'main tank'],
        'off tank': ['tank', 'off tank'],
    }

    return map[role]
}

export function getExclusiveRoles(role?: Role) {
    if(!role) return Roles

    let map: { [key in Role]: Role[] } = {
        'tank': ['tank', 'main tank', 'off tank'],
        'dps': ['dps'],
        'healer': ['healer'],
        'main tank': ['main tank'],
        'off tank': ['off tank'],
    }

    return map[role]
}

export function roleCanSeeContentForInclusive(contentRoles: Role[], currentRole?: Role) {
    let roles = contentRoles.flatMap(getInclusiveRoles)

    return currentRole ? roles.includes(currentRole) : true
}

export function roleCanSeeContentForExclusive(contentRoles: Role[], currentRole?: Role) {
    let roles = contentRoles.flatMap(getExclusiveRoles)

    return currentRole ? roles.includes(currentRole) : true
}