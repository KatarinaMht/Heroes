import { Message } from './../../models/message.model';
import { ErrorService } from './../../services/error.service';
import { Component, OnInit } from '@angular/core';

@Component({ moduleId: module.id, selector: 'error-visualizer', templateUrl: 'error-visualizer.component.html', styleUrls: ['error-visualizer.component.css'] })
export class ErrorVisualizerComponent implements OnInit {

    message: Message;


    modal: any;



    constructor(private erroreService: ErrorService) {
        erroreService
            .subscribe((e: Message) => {
                console.log('ricevuto',e);
                this.showError(e);
            });

    }

    ngOnInit(): void {
        // console.log('inizializzato error visualizer');
        // $('[data-error-visualizer] .tuttoSchermo').dimmer({closable:false});
    }

    /**
     * Questo metodo si occupa di visualizzare l'errore
     */
    showError(e: Message) {
        console.log('show error', e);
        this.message = e;

        // //gestisco il tipo di visualizzazione
        // switch (e.type) {
        //     default:
        //     case MessageType.APPLICATIVO: 
        //         this.onlyDimmer = false;
        //         break;
        //     case ErrorMessageType.AUTENTICAZIONE:
        //     case ErrorMessageType.BLOCCANTE:
        //         this.onlyDimmer = true;
        // }


        //gestisco il caso se è per sviluppatori

        //lo  mostro
        if (!this.modal) {
            this.modal = $('#message').modal();
        }

        this.modal.modal('show');

        e.gestito();
    }


}
