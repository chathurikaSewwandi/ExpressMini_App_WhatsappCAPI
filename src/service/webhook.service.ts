import { MessageService } from './message.service';
import { Request, Response } from "express";
import { webhookMessageDto, webhookVerificationDto, webhookVerificationResponsDto } from "../dto/webhookVerification.dto";
import { APP_CONFIG } from "../config/app.config";
import { GeminiService } from './gemini.service';
import { IMessage, Role } from '../model/message.model';

export class WebhookService{

    private static instance: WebhookService;
    private MessageService:MessageService;
    private geminiService:GeminiService;

    public static getInstance(): WebhookService{
        if (!WebhookService.instance) {
            WebhookService.instance = new WebhookService();
            
        }
        return WebhookService.instance;
    }

    private constructor(){
        this.MessageService = MessageService.getInstance();
        this.geminiService = GeminiService.getInstance();

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
         //extracting message from recieved notification via webhook
        //this should be send to the AI model to generate a reply
        const status = data.entry[0].changes[0].value.statuses;
        if(status!== undefined && status.length>0 ){
            console.log('status: ', status[0].status);
            return true;
        }
try{
        const message = data.entry[0].changes[0].value.messages[0].text.body;
        //this should save to db
        //then need to retriew last five mesge reply
         if(message === undefined){
                console.log('message is undefined');
                console.log(JSON.stringify(data));
                return true;
            }
        //extracting phone number and name from recieved notification via webhook
        const phoneNumber = data.entry[0].changes[0].value.contacts[0].wa_id;
        const name = data.entry[0].changes[0].value.contacts[0].profile.name;

        const history = await this.MessageService.getMessagesByUserId(phoneNumber);

        //const replyMessage = `Hello ${name}, Your Message Received thank you !`;
        const replyMessage = await this.geminiService.generateReply(message,history);

        const newMessage:IMessage = {
            userId: phoneNumber,
            role: Role.USER,
            content: message
        }
        const newReplyMessage: IMessage ={
            userId:phoneNumber,
            role:Role.MODEL,
            content: replyMessage
        }

        await this.MessageService.bulkCreateMessages([newMessage,newReplyMessage]);

         //const replyMessage = await this.aiService.generateReply(message);
        const isReplied = await this.MessageService.sendMessage(phoneNumber,replyMessage);
            if (isReplied) {
                return true;
            }
        }catch(error:any){
            console.log(error);
            return true;
        }
        return false;

    }
}