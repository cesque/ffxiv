import getPost from '@/utils/getPost'
import { promises as fs } from 'fs'
import path from 'path'
import getPosts from '@/utils/getPosts'

import { H1, H2, H3, H4, H5, H6 } from '@/markdownComponents/Heading/Heading'
import Paragraph from '@/markdownComponents/Paragraph/Paragraph'
import Code from '@/markdownComponents/Code/Code'
import Pre from '@/markdownComponents/Pre/Pre'
import Alert from '@/components/Alert/Alert'
import Trigger from '@/components/Trigger/Trigger'
import ColorText, { Purple, Green, Blue, Gold, Orange, Red, Black } from '@/components/ColorText/ColorText'

import Post from '@/components/Post/Post'

const dirPath = path.join(process.cwd(), 'posts/')

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

        Alert,
        Trigger,

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