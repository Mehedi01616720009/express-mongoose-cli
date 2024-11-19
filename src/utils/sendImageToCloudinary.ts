import { v2 as cloudinary } from 'cloudinary';
import multer, { Multer } from 'multer';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import config from '../config';
import path from 'path';

export interface ICloudinaryResponse {
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    type: string;
    url: string;
    secure_url: string;
}

// cloudinary config
cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryApiSecret,
    secure: config.nodeEnv === 'production',
});

export const sendImageToCloudinary = async (
    imageName: string,
    path: string
): Promise<ICloudinaryResponse> => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            path,
            {
                public_id: imageName,
                transformation: {
                    aspect_ratio: 1,
                    width: 400,
                    quality: 60,
                    fetch_format: 'auto',
                },
            },
            (err, result) => {
                if (err) {
                    reject(
                        new AppError(
                            httpStatus.CONFLICT,
                            'Image cannot upload',
                            err?.name
                        )
                    );
                }

                resolve(result as ICloudinaryResponse);
            }
        );
    });
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/uploads');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const extension = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
});

export const upload: Multer = multer({ storage: storage });
