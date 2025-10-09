import  mongoose from 'mongoose';
import express from 'express';
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

mongoose.connect(APP_CONFIG.MONGO_URI).then((mongoose) => {
    const models = mongoose.modelNames();
    for(const model of models){
        mongoose.model(model).createIndexes();
        console.log(`Indexes created for model: ${model}`);
        mongoose.model(model).ensureIndexes();
        mongoose.model(model).createCollection();
    }

    console.log('Connected to MongoDB');
    app.listen(5885, () => {
        console.log("Server is running on port 5885");
    });

    }).catch((err) => {
        console.log(err);
    });
//app.listen(5885, () => {
   // console.log("Server is running on port 5885");
//})