import { NextApiRequest, NextApiResponse } from "next";
import * as  bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({ where: { email } })
        if(existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //To hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //To create a new user
        const newUser = await prisma.user.create({
            data: { name, email, password:  hashedPassword },
        });

        res.status(201).json(newUser)
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: 'Unable to create User' })
    }
}