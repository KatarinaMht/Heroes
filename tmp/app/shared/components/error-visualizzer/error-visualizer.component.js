"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var error_service_1 = require("./../../services/error.service");
var core_1 = require("@angular/core");
var ErrorVisualizerComponent = (function () {
    function ErrorVisualizerComponent(erroreService) {
        var _this = this;
        this.erroreService = erroreService;
        erroreService
            .subscribe(function (e) {
            console.log('ricevuto', e);
            _this.showError(e);
        });
    }
    ErrorVisualizerComponent.prototype.ngOnInit = function () {
        // console.log('inizializzato error visualizer');
        // $('[data-error-visualizer] .tuttoSchermo').dimmer({closable:false});
    };
    /**
     * Questo metodo si occupa di visualizzare l'errore
     */
    ErrorVisualizerComponent.prototype.showError = function (e) {
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
    };
    return ErrorVisualizerComponent;
}());
ErrorVisualizerComponent = __decorate([
    core_1.Component({ moduleId: module.id, selector: 'error-visualizer', template: "<div class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" id=\"message\"><div class=\"modal-dialog\" role=\"document\" *ngIf=\"message\"><div class=\"modal-content\"><div class=\"modal-header\"><button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button><h4 class=\"modal-title\">{{message.title}}</h4></div><div class=\"modal-body\"><p>{{message.message}}</p></div><div class=\"modal-footer\"><button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Chiudi</button></div></div></div></div>", styles: [""] }),
    __metadata("design:paramtypes", [error_service_1.ErrorService])
], ErrorVisualizerComponent);
exports.ErrorVisualizerComponent = ErrorVisualizerComponent;
