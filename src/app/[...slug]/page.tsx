import getPost from '@/utils/getPost'
import getPosts from '@/utils/getPosts'
import type { Metadata } from 'next'

import { H1, H2, H3, H4, H5, H6 } from '@/markdownComponents/Heading/Heading'
import Paragraph from '@/markdownComponents/Paragraph/Paragraph'
import Code from '@/markdownComponents/Code/Code'
import Pre from '@/markdownComponents/Pre/Pre'
import Alert from '@/components/Alert/Alert'
import Trigger from '@/components/Trigger/Trigger'
import ColorText, { Purple, Green, Blue, Gold, Orange, Red, Black } from '@/components/ColorText/ColorText'
import Consequence from '@/components/Consequence/Consequence'
import Ol from '@/markdownComponents/Lists/Ol/Ol'
import Ul from '@/markdownComponents/Lists/Ul/Ul'
import {
    OnlyRoles,
    AllExceptRoles,
    OnlyTank,
    AllExceptTank,
    OnlyMainTank,
    AllExceptMainTank,
    OnlyOffTank,
    AllExceptOffTank,
    OnlyDPS,
    AllExceptDPS,
    OnlyHealer,
    AllExceptHealer,
} from '@/components/Roles/Roles'

import DutyPost from '@/components/Post/DutyPost'

export async function generateStaticParams() {
    const { posts } = await getPosts()

    return posts.map((post) => {
        return [post.meta.type, post.slug]
    })
}

interface Props {
    params: {
        slug: string[]
    }
    searchParams: any
}

export async function generateMetadata({ params: { slug } }: Props): Promise<Metadata> {
    const actualSlug = slug[slug.length - 1]
    const { meta } = await getPost(actualSlug)

    const description = `Laconic mechanics guide for ${meta.title}, a ${meta.difficulty} ${meta.type} in Final Fantasy XIV.`

    return {
        title: `${meta.title} - Duty Guide`,
        description,
        ...(meta.alias?.length ? { keywords: meta.alias } : {}),
    }
}

export default async function PostPage({ params: { slug }, searchParams }: Props) {
    const actualSlug = slug[slug.length - 1]
    const { default: PostContent, meta, info } = await getPost(actualSlug)

    const components = {
        h1: H1,
        h2: H2,
        h3: H3,
        h4: H4,
        h5: H5,
        h6: H6,

        p: Paragraph,
        code: Code,
        pre: Pre,

        ol: Ol,
        ul: Ul,

        Alert,
        Trigger,
        Consequence,
        OnlyRoles,
        AllExceptRoles,
        OnlyTank,
        AllExceptTank,
        OnlyMainTank,
        AllExceptMainTank,
        OnlyOffTank,
        AllExceptOffTank,
        OnlyDPS,
        AllExceptDPS,
        OnlyHealer,
        AllExceptHealer,

        ColorText,
        Purple,
        Green,
        Blue,
        Gold,
        Orange,
        Red,
        Black,
    }

    return (
        <DutyPost slug={actualSlug} meta={meta} info={info}>
            <PostContent components={components} />
        </DutyPost>
    )
}
