import { MessageService } from './message.service';
import { Request, Response } from "express";
import { webhookMessageDto, webhookVerificationDto, webhookVerificationResponsDto } from "../dto/webhookVerification.dto";
import { APP_CONFIG } from "../config/app.config";

export class WebhookService{

    private static instance: WebhookService;
    private MessageService:MessageService;

    public static getInstance(): WebhookService{
        if (!WebhookService.instance) {
            WebhookService.instance = new WebhookService();
            
        }
        return WebhookService.instance;
    }

    private constructor(){
        this.MessageService = MessageService.getInstance();

    }
   
    public handleWebhookVerification(data: webhookVerificationDto):webhookVerificationResponsDto {

        const password = APP_CONFIG.WEBHOOK_VERIFICATION_PASSWORD;

        if (data.mode ===  'subscribe' && data.verify_token === password){
            return {
                status: true,
                challenge:data.challenge
            }
        } 
        return {
            status:false,
            challenge: ''
        };
        
    }
    public async handleReceiveMessage(data:webhookMessageDto):Promise<boolean>{
        const message = data.entry[0].changes[0].value.messages[0].text.body;
        const phoneNumber = data.entry[0].changes[0].value.contacts[0].wa_id;
        const name = data.entry[0].changes[0].value.contacts[0].profile.name;

        const replyMessage = `Hello ${name}, Your Message Received thank you !`;
        
        const isReplied = await this.MessageService.sendMessage(phoneNumber,replyMessage);
            if (isReplied) {
                return true;
            }
        return false;
        }
}