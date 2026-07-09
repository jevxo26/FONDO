import jwt from 'jsonwebtoken';

export const createToken = (id: string, email: string, role: string): string => {
    return jwt.sign(
        {
            id: id,
            email: email,
            role: role
        },
        (process.env.JWT_SECRET as string) || 'fallback_secret',
        {
            expiresIn: (process.env.JWT_EXPIRES_IN || '30d') as any
        }
    );
};

export const createRefreshToken = (id: string): string => {
    return jwt.sign(
        {
            id: id
        },
        (process.env.JWT_REFRESH_SECRET as string) || 'refresh_secret',
        {
            expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any
        }
    );
};