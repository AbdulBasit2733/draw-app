import express from "express";
import { AuthRequest, Middleware } from "./middleware";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SigninSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
const bcrypt = require('bcryptjs');
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";


const app = express();
app.use(express.json())

app.post("/signup", async (req, res) => {
  try {
    const parsedData = CreateUserSchema.safeParse(req.body);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map((err) => err.message);
      res.status(300).json({
        success: false,
        message: errorMessages,
      });
      return;
    }
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });
    if (existingUser) {
      res.status(300).json({
        success: false,
        message: "User Is Already Registered",
      });
      return
    }
    const salt = bcrypt.genSaltSync(12);
    const hashedPassword = bcrypt.hashSync(parsedData.data.password, salt);

    await prismaClient.user.create({
      data: {
        email: parsedData.data.email,
        name: parsedData.data.name,
        password: hashedPassword,
      },
    });
    res.status(200).json({
      success: true,
      message: "Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error !",
    });
  }
});
app.post("/signin", async (req, res) => {
  try {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map((err) => err.message);
      res.status(300).json({
        success: false,
        message: errorMessages,
      });
      return;
    }

    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data.email,
      },
    });
    if (!existingUser) {
      res.status(300).json({
        success: false,
        message: "Email Or Password Is Inccorect !",
      });
      return;
    }
    if (existingUser) {
      const isMacthedPassword = bcrypt.compareSync(
        parsedData.data.password,
        existingUser?.password
      );
      if (isMacthedPassword) {
        const token = jwt.sign(
          {
            userId: existingUser.id,
          },
          JWT_SECRET
        );

        res.status(200).cookie("token", token).json({
          success: false,
          message: "LoggedIn Successfully",
          token:token
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error !",
    });
  }
});
app.post("/create-room", Middleware, async (req:AuthRequest, res) => {
  try {
    const userId = req.userId
    if(!userId){
        res.status(404).json({
            success:false,
            message:"Invalid Token Or Token Not Found"
        })
        return
    }
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
      const errorMessages = parsedData.error.errors.map((err) => err.message);
      res.status(300).json({
        success: false,
        message: errorMessages,
      });
      return;
    }
    const existingRoom = await prismaClient.room.findFirst({
        where:{
            slug:parsedData.data.name
        }
    })
    if(existingRoom){
        res.status(300).json({
            success:false,
            message:"Room Already Exists"
        })
        return
    }
    await prismaClient.room.create({
        data:{
            slug:parsedData.data.name,
            adminId:userId
        }
    })
    res.status(200).json({
        success:true,
        message:"Room Created Successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error !",
    });
  }
});

app.listen(5000, () => {
  console.log("App is running on port 5000");
});
