import { MessageController } from './controller/message.controller';
import express from 'express';
import { WebhookController } from './controller/webhook.controller';
import mongoose from 'mongoose';
import { APP_CONFIG } from './config/app.config';

const app = express();
app.use(express.json());

const messageController = new MessageController();
const webhookController = new WebhookController();

//app.post("/send-message",messageController.sendMessage);

app.get("/webhook", webhookController.webhook);
app.post("/webhook", webhookController.webhookMessage);

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