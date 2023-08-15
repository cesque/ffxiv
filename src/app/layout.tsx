import Sidebar from '@/components/Sidebar/Sidebar'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import styles from './layout.module.css'

import { DM_Sans, DM_Serif_Display } from 'next/font/google'
import classNames from 'classnames'
import getPosts from '@/utils/getPosts'
import { PostsProvider } from '@/components/PostsContext/PostsContext'
import { HideContextProvider } from '@/components/HideContentContext/HideContentContext'

const display = DM_Serif_Display({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-display',
})

const body = DM_Sans({
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-body',
})

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

interface Props {
    children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
    let { posts, categories } = await getPosts()

    let gradients = [
        ['purple', 'blue'],
        ['purple', 'red'],
        ['purple', 'orange'],
        ['green', 'blue'],
        ['green', 'gold'],
        ['blue', 'gold'],
        ['gold', 'red'],
        ['orange', 'red'],
    ]

    let randomGradient = gradients[Math.floor(Math.random() * gradients.length)]
    let isFlipped = Math.random() > 0.5 ? 0 : 1

    let from = randomGradient[isFlipped]
    let to = randomGradient[1 - isFlipped]

    let colors: any = {
        '--color-from': `var(--color-${ from }-300)`,
        '--color-to': `var(--color-${ to }-300)`,
    }

    return <html lang="en">
        <body className={ classNames(display.variable, body.variable) }>
            <div className={ styles.layout }>
                <HideContextProvider>
                    <PostsProvider posts={ posts } categories={ categories }>
                        <Sidebar />
                        <div className={ styles.content }>
                            <div className={ styles.padder } style={ colors } />
                            { children }
                        </div>
                    </PostsProvider>
                </HideContextProvider>
            </div>
        </body>
    </html>
}
