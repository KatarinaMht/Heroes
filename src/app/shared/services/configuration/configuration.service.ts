import {Injectable} from '@angular/core';
import * as configurations from '../../configurations';

@Injectable()
export class ConfigurationsService {


    public getApiEndpoint(attribute: string): string {

        if (!configurations.api.hosts.hasOwnProperty(attribute) || !configurations.api.endpoint.hasOwnProperty(attribute)) 
            throw new Error("Error: Invalid attribute " + attribute +".");

        return configurations.api.hosts[attribute] + configurations.api.endpoint[attribute];
    }

    public isDevelopMode():boolean{
        return configurations.developMode;
    }

}