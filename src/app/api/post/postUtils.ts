import { promises as fs } from "fs";
import path from "path";

const pathToPosts = path.join(process.cwd(), 'messages', 'posts');

export const getPostList = async (lng: string) => {
    try {
        const filenames = await fs.readdir(path.join(pathToPosts, lng));
        const postList = await Promise.all(filenames.map(async filename => {
            const post = await getPostById(lng, filename);
            if(post === undefined) {
                throw new Error('error with json');
            }
            return post;
        }));
        const sortedList = postList.sort((a, b) => b.date.getTime() - a.date.getTime());
        return sortedList;
    } catch (error) {
        console.error(error);
        return undefined;
    }
};

export const getPostById = async (lng: string, filename: string) => {
    try {
        const file = await fs.readFile(path.join(pathToPosts, lng, filename), 'utf-8');
        const data = JSON.parse(file);
        const parsedDate = new Date(data.date);
        const postData = {
            slug: filename.replace('.json', ''),
            title: data.title,
            description: data.description,
            image: data.image,
            articles: data.articles,
            date: parsedDate
        };
        return postData;
    } catch (error) {
        console.error(error);
        return undefined
    }
};
