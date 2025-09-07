import { MessageController } from './controller/message.controller';
import express from 'express';
import axios from 'axios';
import { APP_CONFIG } from './config/app.config';

const app = express();
app.use(express.json());

const messageController = new MessageController();

app.post("/send-message",messageController.sendMessage);

app.listen(5885, () => {
    console.log("Server is running on port 5885");
});