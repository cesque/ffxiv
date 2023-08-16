import getPost from '@/utils/getPost'
import path from 'path'
import getPosts from '@/utils/getPosts'

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
    OnlyRoles, AllExceptRoles,
    OnlyTank, AllExceptTank,
    OnlyMainTank, AllExceptMainTank,
    OnlyOffTank, AllExceptOffTank,
    OnlyDPS, AllExceptDPS,
    OnlyHealer, AllExceptHealer
} from '@/components/Roles/Roles'

import Post from '@/components/Post/Post'

export async function generateStaticParams() {
    let { posts } = await getPosts()

    return posts.map(post => {
        return [post.meta.type, post.slug]
    })
}

interface Props {
    params: {
        slug: string[],
    },
    searchParams: any,
}

export default async function PostPage({ params: { slug }, searchParams }: Props) {
    let actualSlug = slug[slug.length - 1]
    let { default: PostContent, meta, info } = await getPost(actualSlug)

    let components = {
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

    return <Post slug={ actualSlug } meta={ meta } info={ info }>
        <PostContent components={ components } />
    </Post>
}