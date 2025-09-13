import { MessageController } from './controller/message.controller';
import express from 'express';
import { WebhookController } from './controller/webhook.controller';

const app = express();
app.use(express.json());

const messageController = new MessageController();
const webhookController = new WebhookController();

app.post("/send-message",messageController.sendMessage);

app.get("/webhook", webhookController.webhook);
app.post("/webhook", webhookController.webhookMessage);

app.get('/health', (req, res) => {
    res.send('OK');
});

app.listen(5885, () => {
    console.log("Server is running on port 5885");
})