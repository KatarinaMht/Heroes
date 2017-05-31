import { Injectable } from '@angular/core';
import { Http, Response, RequestMethod, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";

// create class RequestConfigOptions ( maybe remove this this)
class RequestConfigOptions {  
    method: RequestMethod;
    url: string;
    headers:  Headers;
    params = {};
    data = {};
}

@Injectable()
export class HttpClientService {

    // define any private properties here that we will need (e.g. errors array)
    private authorizationData: string;

    constructor(private http: Http) {
    }

    setAuthorizationData(authorizationData: string) {
        this.authorizationData = authorizationData;
    }

    //perform Get Request
    //any params will be appended to URL as search parameters
    get(url: string, params: any): Observable<Response> {

        //prepare options for request here
        let options = new RequestConfigOptions;
        options.method = RequestMethod.Get;
        options.url = url;
        options.params = params;

        return this.request(options);
    }


    put(url: string, data: any, params: any): Observable<Response> {

        if (!data) {
            data = params;
            params = {};
        }

        let options = new RequestConfigOptions;
        options.method = RequestMethod.Put;
        options.url = url;
        options.params = params;
        options.data = data;

        return this.request(options);
    }


    private request(options: RequestConfigOptions): Observable<any> {
        
        //safeguards for missing option parameters
        options.method = (options.method || RequestMethod.Get);
        options.url = (options.url || "");
        options.headers = (options.headers? options.headers : new Headers());
        options.params = (options.params || {});
        options.data = (options.data || {});

        this.setAuthorizationHeader(options.headers);
        this.setContentTypeHeader(options.headers);

        let requestOptions = new RequestOptions();
        requestOptions.method = options.method;
        requestOptions.url = options.url;
        requestOptions.headers = options.headers;
        requestOptions.search = this.buildUrlSearchParams(options.params);
        requestOptions.body = JSON.stringify(options.data);

         return this.http.request(options.url, requestOptions);
    }

    private buildUrlSearchParams(params: any): URLSearchParams {
        var searchParams = new URLSearchParams();
        for (var key in params) {
            searchParams.append(key, params[key])
        }
        return searchParams;
    }

    private setAuthorizationHeader(headers: Headers) {
        headers.append("Authorization", "Basic " + this.authorizationData);
    }

    private setContentTypeHeader(headers: Headers) {
        headers.append("Content-Type", "application/json");
    }
}