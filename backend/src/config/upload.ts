import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';

export function upload(folder: string) {
    return {
        storage: multer.diskStorage({
            destination: resolve(__dirname, '..', '..', folder),
            filename: (request, file, callback) => {
                const filehash = crypto.randomBytes(32).toString('hex');
                const filename = `${filehash}-${file.originalname}`;
                return callback(null, filename);
            }
        })
    }
}
