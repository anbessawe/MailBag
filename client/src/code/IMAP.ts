import axios, {  AxiosResponse } from "axios";
import {config} from "./config"

export interface IMailbox {
    name: string;
    path: string;
}

export interface IMessage{
  id?: string,
  date: string,
  from: string,
  subject: string,
  body?: string
}

export class Worker{

  public async listMailboxes():Promise<IMailbox[]>{
    const response: AxiosResponse = await axios.get(`${config.serverAddress}/mailboxes`);
    return response.data;
  }

  public async listMessages(inMailbox: IMailbox) : Promise<IMessage>{
    const response:AxiosResponse = await axios.get(`${config.serverAddress}/mailboxes/${inMailbox}'}`);
    return response.data;
  }

  public async getMessageBody(inMailbox:IMailbox, inID:string): Promise<IMessage>{
    const response: AxiosResponse = await axios.get(`${config.serverAddress}/messages/${inMailbox}/${inID}`);
    return response.data;
  }

  public async deleteMessage(inMailbox:IMailbox, inID: string):Promise<void>{
    await axios.delete(`${config.serverAddress}/messages/${inMailbox}/${inID}`);

  }
}