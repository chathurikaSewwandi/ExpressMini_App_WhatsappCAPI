import { Request, Response } from "express";
import { APP_CONFIG } from "../config/app.config";


export class WebhookController {

    webhook = (req: Request, res: Response) => {
        console.log(JSON.stringify(req.query));
        const mode = req.query['hub.mode'];
        const challenge = req.query['hub.challenge'];
        let verify_token = req.query['hub.verify_token'];
        console.log(mode, challenge, verify_token);

        if(mode === 'subscribe' && verify_token === '87654321'){
             console.log("WEBHOOK_VERIFIED ✅");
            res.send(challenge);
            return;
            } 
        res.send('Error, wrong validation token');

}
    webhookMessage = async (req: Request, res: Response) => {
        console.log(JSON.stringify(req.body));

        res.sendStatus(200);
    }
}
