import { promises as fs } from 'fs'
import path from 'path'

const dirPath = path.join(process.cwd(), 'posts/')

export default async function getPost(slug: string) {
    const post = await import('posts/' + slug + '.mdx')

    const postInfo = await fs.stat(path.join(dirPath, slug + '.mdx'))

    const info = {
        inode: postInfo.ino,
        created: postInfo.birthtime.toISOString(),
        modified: postInfo.mtime.toISOString(),
    }

    post.info = info

    return post
}
