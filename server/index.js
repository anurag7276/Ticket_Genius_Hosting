import dotenv from "dotenv";
dotenv.config();


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';


import {serve} from 'inngest/express'
import userRoutes from './routes/user.js'
import ticketRoutes from './routes/ticket.js'
import {inngest} from './inngest/client.js'
import {onUserSignup} from './inngest/functions/on-signup.js'
import {onTicketCreated} from './inngest/functions/on-ticket-create.js'


const PORT = process.env.PORT || 3000;


const app = express();

app.use(cors({
//   origin: "http://localhost:5173", // your React dev server
  origin: "*", 
  credentials: true
}));

app.use(express.json());


app.use("/api/auth" , userRoutes )
app.use("/api/tickets",ticketRoutes)
 

app.use("/api/inngest" , serve({
        client: inngest,
        functions:[onUserSignup,onTicketCreated]
}))

mongoose
       .connect(process.env.MONGO_URI)
       .then(()=>{
        console.log("MongoDB connected successfully");
        app.listen(PORT , ()=>{
                console.log(`Server is running on port ${PORT}`);
        })
       })
       .catch((err)=> console.log("MongoDB connection error:", err));

       

// mongoose.connection.once("open", () => {
//   console.log("Connected to DB:", mongoose.connection.name);
// });