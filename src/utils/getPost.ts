import { promises as fs } from 'fs'
import path from 'path'

const dirPath = path.join(process.cwd(), 'posts/')

export default async function getPost(slug: string) {
    let post = await import('posts/' + slug + '.mdx')

    let postInfo = await fs.stat(path.join(dirPath, slug + '.mdx'))

    let info = {
        inode: postInfo.ino,
        created: postInfo.birthtime.toISOString(),
        modified: postInfo.mtime.toISOString(),
    }

    post.info = info

    return post
}
