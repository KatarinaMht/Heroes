import {Injectable} from '@angular/core';
import * as configurations from '../../configurations';

@Injectable()
export class ConfigurationsService {


    public getApiEndpoint(service: string,base?:string): string {
        base=base||'base';
        if ( !configurations.api.endpoint.hasOwnProperty(service)) 
            throw new Error("Error: Invalid service " + service +".");
        return configurations.api.hosts[base] + configurations.api.endpoint[service];
    }

    public isDevelopMode():boolean{
        return configurations.developMode;
    }

}