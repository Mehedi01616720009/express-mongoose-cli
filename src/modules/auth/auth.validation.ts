import { z } from 'zod';

// signin validation
const signinValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }),
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

// refresh token validation
const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({
            required_error: 'Token is required',
        }),
    }),
});

// forget password validation
const forgetPasswordValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required',
        }),
    }),
});

// reset password validation
const resetPasswordValidationSchema = z.object({
    body: z.object({
        password: z.string({
            required_error: 'Password is required',
        }),
    }),
});

export const AuthValidations = {
    signinValidationSchema,
    refreshTokenValidationSchema,
    forgetPasswordValidationSchema,
    resetPasswordValidationSchema,
};
