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

export function getRoleArray(role?: Role) {
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