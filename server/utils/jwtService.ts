import jwt from 'jsonwebtoken';

export const createAccessToken = (id: string, email: string): string => {
    return jwt.sign(
        {
            userId: id,
            email: email
        },
        (process.env.JWT_SECRET as string) || 'fondo',
        {
            expiresIn: (process.env.JWT_EXPIRES_IN || '30d') as any
        }
    ); 
};

export const createRefreshToken = (id: string): string => {
    return jwt.sign(
        {
            userId: id
        },
        (process.env.JWT_REFRESH_SECRET as string) || 'fondo',
        {
            expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any
        }
    );
};