import { MessageDao } from './../dao/message.dao';
import axios from "axios";
import { APP_CONFIG } from "../config/app.config";
import { error } from "console";
import { IMessage } from "../model/message.model";
import { IMessageHistory } from '../dto/messageHistory.dto';

export class MessageService{

    private static instance: MessageService;
    private MessageDao:MessageDao;
    public static getInstance(): MessageService {
        if(!MessageService.instance){
            MessageService.instance = new MessageService();
        }
        return MessageService.instance;
    }
    private constructor(){
        this.MessageDao = MessageDao.getInstance();

    }
    public async sendMessage(phoneNumber:string, message:string){
        let data = JSON.stringify({
                      "messaging_product": "whatsapp",
                      "recipient_type": "individual",
                      "to": `${phoneNumber}`,
                      "type": "text",
                      "text": {
                        "preview_url": false,
                        "body": message
                      }
                });
                
                let config = {
                      method: 'post',
                      maxBodyLength: Infinity,
                      url: `https://graph.facebook.com/${APP_CONFIG.VERSION}/${APP_CONFIG.PHONE_NUMBER_ID}/messages`,
                      headers: { 
                        'Content-Type': 'application/json', 
                        'Authorization': `Bearer ${APP_CONFIG.WHATSAPP_USER_ACCESS_TOKEN}`
                      },
                  data : data
                    };
                    
           try{
                const response = await axios.request(config)
                if(response.status === 200){
                    console.log('reply send to ',phoneNumber);
                   return true;
                }
           }catch(error){
                console.log(error);  
           }
            return false;
        }

    public async getMessagesByUserId(userId: string): Promise<IMessageHistory[]>{
       try {
         const messages = await MessageDao.getInstance().getMessagesByUserId(userId);
         
         const history: IMessageHistory[] = messages.map((message) => {
            return {
                role: message.role,
                parts:[{ text: message.content}]
            }
         });

         return history;
       } catch (error) {
        console.log(error);
        throw error;
        
       }
    }public async bulkCreateMessages(messages: IMessage[]): Promise<IMessage[]> {

        try{
            return await this.MessageDao.bulkCreateMessages(messages);
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}