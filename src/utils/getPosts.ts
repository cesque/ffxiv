import { PostMeta } from '@/types/PostMeta'
import { promises as fs } from 'fs'
import path from 'path'

interface Post {
    slug: string,
    meta: PostMeta,
    info: {
        inode: number,
        created: string,
        modified: string,
    }
}

interface Data {
    posts: Post[],
    categories: string[] 
}

let _data: Data | undefined = undefined

export default async function getPosts() {
    if(_data) return _data

    const dirPath = path.join(process.cwd(), 'posts/')
    let files = await fs.readdir(dirPath)

    let posts = []
    for(let file of files) {
        let postPath = path.join(dirPath, file)
        let postPathObj = path.parse(postPath)

        let { meta } = await import('../../posts/' + postPathObj.name + '.mdx')

        let postInfo = await fs.stat(postPath)

        let info = {
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

    let categories: string[] = []
    for(let post of posts) {
        if(post.meta.belongsTo) {
            categories.push(...post.meta.belongsTo)
        }
    }
    categories = Array.from(new Set(categories))

    _data = {
        posts,
        categories,
    }

    return _data!
}