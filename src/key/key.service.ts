import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import {firstValueFrom } from 'rxjs';

@Injectable()
export class KeyService implements OnModuleInit{

  private publicKey: string;

  constructor(private configSerivce: ConfigService, private readonly httpService: HttpService){}

  onModuleInit() {
    this.getPublicKey();
  }

  async getPublicKey(): Promise<string> {
    if(!this.publicKey){
      this.publicKey = await this.fetchPublicKey();
      return this.publicKey;
    }
    const promiseWrapper: Promise<string> = new Promise((resolve, reject) => {
      resolve(this.publicKey);
    });

    return promiseWrapper;
  }
  
  async fetchPublicKey(): Promise<string> {
    console.log("Call auth service for key");
    const authServiceUrl = this.configSerivce.get<string>('AUTH_SERVICE_URL');
    const responseObersvable = this.httpService.get(authServiceUrl + '/keys');
    const {data} = await firstValueFrom(responseObersvable);
    return data;
  }


}