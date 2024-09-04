import { NextApiRequest, NextApiResponse } from "next";
import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;

            // Check if the user exists
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(401).json({ message: 'We don\'t have your details registered. Please, register.' });
            }

            // Compare the provided password with the hashed password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid Password or Email' });
            }

            // Sign a JWT token
            const token = sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

            res.status(200).json({ token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        } finally {
            // Disconnect Prisma client
            await prisma.$disconnect();
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: 'Method not allowed' });
    }
}
