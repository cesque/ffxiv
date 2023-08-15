const DutyTypes = ['dungeon', 'trial', 'raid'] as const

export type DutyType = typeof DutyTypes[number]

export function isDutyType(text: string) {
    return DutyTypes.includes(text as DutyType)
}