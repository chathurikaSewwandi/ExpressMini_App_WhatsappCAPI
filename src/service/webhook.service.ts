import { Request, Response } from "express";
import { webhookVerificationDto, webhookVerificationResponsDto } from "../dto/webhookVerification.dto";
import { APP_CONFIG } from "../config/app.config";

export class WebhookService{

    private static instance: WebhookService;

    public static getInstance(): WebhookService{
        if (!WebhookService.instance) {
            WebhookService.instance = new WebhookService();
            
        }
        return WebhookService.instance;
    }

    private constructor(){

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

}