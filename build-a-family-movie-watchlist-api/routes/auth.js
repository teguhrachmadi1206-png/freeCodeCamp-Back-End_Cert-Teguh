import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findByUsername } from '../utils/db.js';
const router = express.Router();

router.post('/login', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ "error": "Username and password are required" });
    }
    const user = findByUsername(req.body.username)
    if (!user) {
        return res.status(401).json({ error: "Username does not exists" });
    }
    const match = await bcrypt.compare(req.body.password, user.passwordHash)
    if (!match) {
        return res.status(401).json({ "error": "Invalid credentials"});
    }
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    return res.status(200).json({ token });
});

export default router;
