import { NextApiRequest, NextApiResponse } from "next";
import { verify } from 'jsonwebtoken';

interface UserPayload {
    id: string;
    name: string;
    email: string;
    password: string;
}

interface CustomNextApiRequest extends NextApiRequest {
    user?: UserPayload;
}

export function authenticated(handler: (req: CustomNextApiRequest, res: NextApiResponse) => void) {
    return async (req: CustomNextApiRequest, res: NextApiResponse) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = verify(token, process.env.JWT_SECRET as string) as UserPayload;
            req.user = decoded;
            return handler(req, res);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
}
