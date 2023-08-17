import fs from 'fs';

export async function deleteFile(folder: string, filename: string) {
    try {
        fs.promises.stat(`${folder}/${filename}`);
    } catch {
        return;
    }
    fs.promises.unlink(`${folder}/${filename}`);
}