import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postDirectory = path.join(process.cwd(), 'posts');
console.log("process.cwd()", process.cwd())
console.log("postDirectory", postDirectory)

export function getSortedPostData(){
    const fileNames = fs.readdirSync(postDirectory);
    console.log("fileNames", fileNames)

    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/,'')

        const fullPath = path.join(postDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        const matterResult = matter(fileContents);

        return {
            id,
            ...(matterResult.data as {date: string; title: string;})
        }
    })

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1;
        } else {
            return -1;
        }
    })
}