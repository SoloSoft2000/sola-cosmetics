import { promises as fs } from "fs";
import path from "path";

const pathToAlbum = path.join(process.cwd(), 'public', 'assets', 'album');

const getImageList = async () => {
    try {
        const filenames = await fs.readdir(path.join(pathToAlbum));
        const randomList = filenames.sort(() => 0.5 - Math.random());
        return randomList.map(filename => `/assets/album/${filename}`);
    } catch (error) {
        console.log(error);
        return undefined;
    }
};

export async function GET() {
    return new Response(JSON.stringify(await getImageList()), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
}