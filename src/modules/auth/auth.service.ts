import { IAuth } from './auth.interface';
import config from '../../config';
import { JwtPayload } from 'jsonwebtoken';
import generateImageName from '../../utils/generateImageName';
import path from 'path';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import fs from 'fs';

// image upload
const imageUpload = async (file: Express.Multer.File) => {
    if (file?.path) {
        // paths for original and resized images
        const originalFilePath = file.path;
        const resizedFilePath = path.resolve(
            file.destination,
            `resized-${file.filename}`
        );

        // generate image name
        const imageName = generateImageName('userData.id');

        // wait for cloudinary response
        const image = await sendImageToCloudinary(imageName, resizedFilePath);

        [originalFilePath, resizedFilePath].forEach(filePath => {
            fs.unlink(filePath, err => {
                if (err) {
                    console.log({
                        success: false,
                        message: 'Image cannot be deleted',
                        errorMessages: {
                            path: '/',
                            message: err?.message,
                        },
                        stack: err,
                    });
                }
            });
        });
    }
};

// signin
const signInFromDB = async (payload: IAuth) => {
    // const user = await Admin.findOne({ email: payload.email }).select(
    //     '+password'
    // );
    // if (!user) {
    //     throw new AppError(httpStatus.FORBIDDEN, 'Email or Password is wrong');
    // }

    // if (user.isDeleted === true) {
    //     throw new AppError(
    //         httpStatus.FORBIDDEN,
    //         'Sorry, Something is suspecious'
    //     );
    // }

    // if (user.status === 'Blocked') {
    //     throw new AppError(
    //         httpStatus.FORBIDDEN,
    //         'Sorry, Something is suspecious'
    //     );
    // }

    // const isPasswordMatched = await Admin.isPasswordMatched(
    //     payload.password,
    //     user.password
    // );
    // if (!isPasswordMatched) {
    //     throw new AppError(httpStatus.FORBIDDEN, 'Email or Password is wrong');
    // }

    // const jwtPayload = {
    //     userId: user.id,
    //     role: user.role,
    // };

    // const accessToken = await createToken(
    //     jwtPayload,
    //     config.accessSecret as string,
    //     config.accessTokenExp as string
    // );

    // const refreshToken = await createToken(
    //     jwtPayload,
    //     config.refreshSecret as string,
    //     config.refreshTokenExp as string
    // );

    // return {
    //     accessToken,
    //     refreshToken,
    // };

    return {
        accessToken: 'string',
        refreshToken: 'string',
    };
};

// get me
const getMeFromDB = async (payload: JwtPayload) => {
    // const result = await Admin.findOne({ id: payload.userId });
    const result = {};
    return result;
};

// get new access token by refresh token
const getNewAccessTokenByRefreshToken = async (token: string) => {
    // const decoded = await verifyToken(token, config.refreshSecret as string);
    // const user = await Admin.findOne({
    //     id: (decoded as JwtPayload).userId,
    //     status: 'Active',
    //     isDeleted: false,
    // });
    // if (!user) {
    //     throw new AppError(
    //         httpStatus.FORBIDDEN,
    //         'Sorry, Something is suspecious'
    //     );
    // }

    // const jwtPayload = {
    //     userId: user.id,
    //     role: user.role,
    // };

    // const accessToken = await createToken(
    //     jwtPayload,
    //     config.accessSecret as string,
    //     config.accessTokenExp as string
    // );

    // return { accessToken };

    return { accessToken: 'string' };
};

// forget password reset link only
const forgetPasswordLinkGenerate = async (payload: { email: string }) => {
    // const user = await Admin.isUserExistByEmail(payload.email);
    // if (!user) {
    //     throw new AppError(
    //         httpStatus.FORBIDDEN,
    //         'Sorry, Something is suspecious'
    //     );
    // }

    // if (user.isDeleted === true) {
    //     throw new AppError(
    //         httpStatus.FORBIDDEN,
    //         'Sorry, Something is suspecious'
    //     );
    // }

    // if (user.status === 'Blocked') {
    //     throw new AppError(
    //         httpStatus.FORBIDDEN,
    //         'Sorry, Something is suspecious'
    //     );
    // }

    // const jwtPayload = {
    //     userId: user.id,
    //     role: user.role,
    // };

    // // create access token for reset password
    // const accessToken = await createToken(
    //     jwtPayload,
    //     config.accessSecret as string,
    //     '10m'
    // );

    const accessToken = 'string';
    const resetLink = `${config.frontendUrl}/reset-password?token=${accessToken}`;
    return resetLink;
};

// reset password reset link only
const resetPasswordIntoDB = async (
    userData: JwtPayload,
    payload: { password: string }
) => {
    // const user = await Admin.findOne({
    //     id: userData.userId,
    //     status: 'Active',
    //     isDeleted: false,
    // });
    // if (!user) {
    //     throw new AppError(
    //         httpStatus.FORBIDDEN,
    //         'Sorry, Something is suspecious'
    //     );
    // }

    // const result = Admin.findOneAndUpdate(
    //     {
    //         id: userData.userId,
    //     },
    //     payload,
    //     { new: true }
    // );

    const result = {};
    return result;
};

export const AuthServices = {
    imageUpload,
    signInFromDB,
    getMeFromDB,
    getNewAccessTokenByRefreshToken,
    forgetPasswordLinkGenerate,
    resetPasswordIntoDB,
};
