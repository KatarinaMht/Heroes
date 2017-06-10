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
var message_model_1 = require("./../models/message.model");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
//                               *          . ,
//                      .                  - * -  Exception :)
//            .                             ' `
//      ._c   \c    _c/   _c
//        \`-  )`  ' /   '/\
//        >\   |>   /\  -'|
/**
 * Gestisce il lancio di errori all'interno dell'applicativo.
 */
var ErrorService = (function () {
    function ErrorService() {
        // Observable  sources
        this.subj = new rxjs_1.Subject();
    }
    ErrorService.prototype.subscribe = function (subme) {
        // console.log('si registra');
        this.subj.subscribe(subme);
    };
    ;
    ErrorService.prototype.throwErrorMessage = function (e) {
        e.gestito();
        this.subj.next(e);
    };
    ErrorService.prototype.throwErrorMessageSimple = function (type, title, message) {
        // console.log('qui');
        var err = new message_model_1.Message();
        err.message = message;
        err.title = title;
        err.type = type;
        err.gestito();
        this.subj.next(err);
    };
    return ErrorService;
}());
ErrorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ErrorService);
exports.ErrorService = ErrorService;
