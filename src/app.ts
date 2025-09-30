import express from 'express';
import mongoose from 'mongoose';
import { APP_CONFIG } from './config/app.config';
import { WebhookRouter } from './routes/webhook.router';
import { MessageRouter } from './routes/message.router';
import { UserRouter } from './routes/user.roue';

const app = express();
app.use(express.json());


const webhookRouter = WebhookRouter.getInstance();
const messageRouter = MessageRouter.getInstance();
const userRouter = UserRouter.getInstance();

//app.post("/send-message",messageController.sendMessage);

app.use("/webhook", webhookRouter.getRouter());
app.use("/user", userRouter.getRouter());
app.use("/message", messageRouter.getRouter());

app.get('/health', (req, res) => {
    res.send('OK');
});

mongoose.connect(APP_CONFIG.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
    app.listen(5885, () => {
        console.log("Server is running on port 5885");
    });
    }).catch((error) => {
        console.log(error);
    });
//app.listen(5885, () => {
   // console.log("Server is running on port 5885");
//})