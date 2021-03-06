import { ErrorService } from './error.service';
import { Message,MessageType } from './../models/message.model';

import { Injectable } from '@angular/core';
import { Http, XHRBackend, Request, RequestOptionsArgs, Response, RequestOptions, ConnectionBackend, Headers } from "@angular/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Rx";


@Injectable()
export class HttpInterceptor extends Http {
    private http: Http;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions,private errorService:ErrorService) {
        super(backend, defaultOptions);
        this.http = new Http(backend, defaultOptions);
        )
        // console.info('HttpInterceptor done.', loginService);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, this.getRequestOptionArgs(options)));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    patch(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.patch(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, this.getRequestOptionArgs(options)));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        //TODO da prendere da loginservice
        let accessToken: string = localStorage.getItem("userToken");
           
        

        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        if (accessToken && !options.headers.has('Authorization')) {
            options.headers.append('Authorization', 'Bearer '+accessToken);
        }
        return options;
    }




    //            '\
    //        ____' \    {)
    //        \   |  \@  (_/   Ah ah, un errore!
    //       __)  |   `\/|
    //      (___-_)    __|      
    //               //| |    
    // -~-~-~-~-~-~"""""""""*""""""*""
    // ~-~-~-~""""""""""""""""""""""""           
    /**
     * Questo metodo intercetta tutte le chiamate e ne gestisce gli errori.
     */
    intercept(cosaIntercettata: Observable<Response>): Observable<any> {

        return cosaIntercettata.catch(err => {

          
            let errorre=err.json();
              switch (err.status) {
                //caso non c'è internet
                case 0:
                  this.errorService.throwErrorMessageSimple(MessageType.BLOCCANTE,"Non c'è internet","Problemi con la connessione!");
                  break;
                case 401:
                case 403:
                      this.errorService.throwErrorMessageSimple(MessageType.BLOCCANTE,"Non autorizzato","Non sei autorizzato all'operazione che stai tentato di fare");
                      break;
                default:
                if(errorre){
                this.errorService.throwErrorMessageSimple(MessageType.BLOCCANTE,errorre.title,errorre.message);
                }
                console.log("errore", err,errorre);
              }

            
            return Observable.throw(err);
        });
    }

   

}


export const HttpInterceptorProvider: any = {
    provide: Http,
    useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, err:ErrorService) => new HttpInterceptor(xhrBackend, requestOptions,err),
    deps: [XHRBackend, RequestOptions,ErrorService]
};