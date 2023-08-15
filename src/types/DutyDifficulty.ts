const DutyDifficulties = ['normal', 'hard', 'extreme', 'savage'] as const

export type DutyDifficulty = typeof DutyDifficulties[number]

export function isDutyDifficulty(text: string) {
    return DutyDifficulties.includes(text as DutyDifficulty)
}