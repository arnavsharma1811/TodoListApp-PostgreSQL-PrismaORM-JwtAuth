import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../db.js'
import dotenv from 'dotenv';
import prisma from '../prismaClient.js';
dotenv.config();

const router = express.Router()

router.post('/register', async (req, res) =>{

    const {username, password} = req.body


    const hashedPassword = bcrypt.hashSync(password, 8)
    try{
        const user = await prisma.user.create(
            {data: {
                username,
                password: hashedPassword
            }}
        )
            const defaultTodo = `Hello :) Add your first todo!`
            await prisma.todo.create({
                data: {
                    task,
                    userId : user.id
                }
            })
                const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '24h'})
                    
                    res.json({token})

    }
    catch(err){
       console.log(err.message)
       res.sendStatus(503) 
    }
})

router.post('/login', async (req,res)=>{
    const{username, password} = req.body;
    try{
    
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
    if(!user){return res.status(404).send({message: "User not found"})}
    const passwordIsValid = bcrypt.compareSync(password, user.password)
    if(!passwordIsValid){
        return res.sendStatus(401).send({message: "Invalid password"})
    }
    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
        expiresIn:'24h'
    })  
    res.json({token})
}
catch(err){
    console.log(err.message)
    res.sendStatus(503)
} 
} )

export default router 