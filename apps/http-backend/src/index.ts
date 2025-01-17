import express from "express";
import { Middleware } from "./middleware";
import {CreateRoomSchema, CreateUserSchema, SigninSchema} from '@repo/common/types'
const app = express();

app.post('/signup', async (req, res) => {
    try {
        const parsedData = CreateUserSchema.safeParse(req.body);
        if(!parsedData.success){
            const errorMessages = parsedData.error.errors.map(err => err.message);
            res.status(300).json({
                success:false,
                message:errorMessages
            })
            return;
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
})
app.post('/signin', (req, res) => {
    try {

        const parsedData = SigninSchema.safeParse(req.body);
        if(!parsedData.success){
            const errorMessages = parsedData.error.errors.map(err => err.message);
            res.status(300).json({
                success:false,
                message:errorMessages
            })
            return;
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
})
app.post('/create-room',Middleware, (req, res) => {
    try {
        
        const parsedData = CreateRoomSchema.safeParse(req.body);
        if(!parsedData.success){
            const errorMessages = parsedData.error.errors.map(err => err.message);
            res.status(300).json({
                success:false,
                message:errorMessages
            })
            return;
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error !"
        })
    }
})

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
