import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface CustomJwtPayload extends JwtPayload {
    id: string;
    email: string;
    role: string;
}

export interface AuthRequest extends Request {
    user?: CustomJwtPayload;
}

export interface AuthenticatedRequest extends Request {
  user: CustomJwtPayload; 
}