"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var error_service_1 = require("./error.service");
var message_model_1 = require("./../models/message.model");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
var HttpInterceptor = (function (_super) {
    __extends(HttpInterceptor, _super);
    function HttpInterceptor(backend, defaultOptions, errorService) {
        var _this = _super.call(this, backend, defaultOptions) || this;
        _this.errorService = errorService;
        _this.http = new http_1.Http(backend, defaultOptions);
        return _this;
        // console.info('HttpInterceptor done.', loginService);
    }
    HttpInterceptor.prototype.request = function (url, options) {
        return this.intercept(_super.prototype.request.call(this, url, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.get = function (url, options) {
        return this.intercept(_super.prototype.get.call(this, url, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.post = function (url, body, options) {
        return this.intercept(_super.prototype.post.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.patch = function (url, body, options) {
        return this.intercept(_super.prototype.patch.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.put = function (url, body, options) {
        return this.intercept(_super.prototype.put.call(this, url, body, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.delete = function (url, options) {
        return this.intercept(_super.prototype.delete.call(this, url, this.getRequestOptionArgs(options)));
    };
    HttpInterceptor.prototype.getRequestOptionArgs = function (options) {
        //TODO da prendere da loginservice
        var accessToken = localStorage.getItem("userToken");
        if (options == null) {
            options = new http_1.RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new http_1.Headers();
        }
        if (accessToken && !options.headers.has('Authorization')) {
            options.headers.append('Authorization', 'Bearer ' + accessToken);
        }
        return options;
    };
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
    HttpInterceptor.prototype.intercept = function (cosaIntercettata) {
        var _this = this;
        return cosaIntercettata.catch(function (err) {
            var errorre = err.json();
            switch (err.status) {
                //caso non c'è internet
                case 0:
                    _this.errorService.throwErrorMessageSimple(message_model_1.MessageType.BLOCCANTE, "Non c'è internet", "Problemi con la connessione!");
                    break;
                case 401:
                case 403:
                    _this.errorService.throwErrorMessageSimple(message_model_1.MessageType.BLOCCANTE, "Non autorizzato", "Non sei autorizzato all'operazione che stai tentato di fare");
                    break;
                default:
                    if (errorre) {
                        _this.errorService.throwErrorMessageSimple(message_model_1.MessageType.BLOCCANTE, errorre.title, errorre.message);
                    }
                    console.log("errore", err, errorre);
            }
            return Rx_1.Observable.throw(err);
        });
    };
    return HttpInterceptor;
}(http_1.Http));
HttpInterceptor = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.ConnectionBackend, http_1.RequestOptions, error_service_1.ErrorService])
], HttpInterceptor);
exports.HttpInterceptor = HttpInterceptor;
exports.HttpInterceptorProvider = {
    provide: http_1.Http,
    useFactory: function (xhrBackend, requestOptions, err) { return new HttpInterceptor(xhrBackend, requestOptions, err); },
    deps: [http_1.XHRBackend, http_1.RequestOptions, error_service_1.ErrorService]
};
