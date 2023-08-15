import { Color, Shade } from "@/types/Color"
import { ReactNode } from "react"

interface Props {
    color: Color,
    shade?: Shade,
    children: ReactNode,
}

export default function ColorText({ color, shade, children }: Props) {
    let css = {
        color: `var(--color-${ color }-${ shade || 300 })`
    }

    return <span style={ css }>{ children }</span>
}

interface QuickProps {
    children: ReactNode,
}

export function Purple({ children }: QuickProps) {
    return <ColorText color="purple">{ children }</ColorText>
}

export function Green({ children }: QuickProps) {
    return <ColorText color="green">{ children }</ColorText>
}

export function Blue({ children }: QuickProps) {
    return <ColorText color="blue">{ children }</ColorText>
}

export function Gold({ children }: QuickProps) {
    return <ColorText color="gold">{ children }</ColorText>
}

export function Orange({ children }: QuickProps) {
    return <ColorText color="orange">{ children }</ColorText>
}

export function Red({ children }: QuickProps) {
    return <ColorText color="red">{ children }</ColorText>
}

export function Black({ children }: QuickProps) {
    return <ColorText color="black">{ children }</ColorText>
}