import { Message,MessageType } from './../models/message.model';

import { FormBuilder } from '@angular/forms';
import { Component, Injectable } from "@angular/core";
import { Subject } from 'rxjs';

//                               *          . ,
//                      .                  - * -  Exception :)
//            .                             ' `
//      ._c   \c    _c/   _c
//        \`-  )`  ' /   '/\
//        >\   |>   /\  -'|

/**
 * Gestisce il lancio di errori all'interno dell'applicativo.
 */
@Injectable()
export class ErrorService {

      errore: Message;
      subj: Subject<Message>;

      constructor() {
            // Observable  sources
            this.subj = new Subject<Message>();
      }

      public subscribe(subme: any) {
            // console.log('si registra');
            this.subj.subscribe(subme);
      };

     
      public throwErrorMessage(e: Message) {
            e.gestito();
            this.subj.next(e);
      }

      public throwErrorMessageSimple(type: MessageType, title: string,message:string) {
            // console.log('qui');
            let err: Message = new Message();
            err.message=message;
            err.title=title;
            err.type=type;
            err.gestito();
            this.subj.next(err);
      }

}
