import { DutyDifficulty } from './DutyDifficulty'
import { DutyType } from './DutyType'

type BelongsTo = {
    name: string,
    entry?: number,
}

export type PostMeta = {
    title: string,
    type: DutyType,
    difficulty: DutyDifficulty,
    belongsTo?: BelongsTo[],
    alias?: string[],
}