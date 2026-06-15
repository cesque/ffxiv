import { PostMeta } from '@/types/PostMeta'
import { promises as fs } from 'fs'
import path from 'path'

export interface Post {
    slug: string
    meta: PostMeta
    info: {
        inode: number
        created: string
        modified: string
    }
}

interface Data {
    posts: Post[]
    categories: string[]
}

let _data: Data | undefined = undefined

export default async function getPosts() {
    if (_data) return _data

    const dirPath = path.join(process.cwd(), 'posts/')
    const files = await fs.readdir(dirPath)

    const posts = []
    for (const file of files) {
        const postPath = path.join(dirPath, file)
        const postPathObj = path.parse(postPath)

        const { meta } = await import('../../posts/' + postPathObj.name + '.mdx')

        const postInfo = await fs.stat(postPath)

        const info = {
            inode: postInfo.ino,
            created: postInfo.birthtime.toISOString(),
            modified: postInfo.mtime.toISOString(),
        }

        posts.push({
            slug: postPathObj.name,
            meta,
            info,
        })
    }

    posts.sort((a, b) => Date.parse(b.info.created) - Date.parse(a.info.created))

    const categories: string[] = []
    for (const post of posts) {
        if (post.meta.belongsTo) {
            categories.push(...post.meta.belongsTo.map((belongs: any) => belongs.name))
        }
    }
    const uniqueCategories: string[] = Array.from(new Set(categories))

    _data = {
        posts,
        categories: uniqueCategories,
    }

    return _data!
}
