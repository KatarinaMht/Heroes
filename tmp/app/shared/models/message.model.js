//                                             \ / _
//                                       ___,,,
//                                       \_[o o]
//      Errare humanum est!              C\  _\/
//              /                     _____),_/__
//         ________                  /     \/   /
//       _|       .|                /      o   /
//      | |       .|               /          /
//       \|       .|              /          /
//        |________|             /_        \/
//        __|___|__             _//\        \
//  _____|_________|____       \  \ \        \
//                     _|       ///  \        \
//                    |               \       /
//                    |               /      /
//                    |              /      /
//  ________________  |             /__    /_
//  b'ger        ...|_|.............. /______\.......
"use strict";
/**
 * Rappresenta un messaggio
 */
var Message = (function () {
    function Message() {
        /**
         * Tipo di messaggio d'errore
         */
        this._type = MessageType.BLOCCANTE;
        /**
         * Indica se il messaggio d'errore è stato gestito
         */
        this._gestito = false;
    }
    /**
     * Dichiara gestito il messaggio d'errore.
     */
    Message.prototype.gestito = function () {
        console.log("l'errore è stato gestito");
        this._gestito = true;
    };
    /**
     * Info se il messaggio d'errore è stato gestito o meno
     */
    Message.prototype.isGestito = function () {
        return this._gestito;
    };
    Object.defineProperty(Message.prototype, "statusCode", {
        get: function () {
            return this._statusCode;
        },
        set: function (value) {
            this._statusCode = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "message", {
        get: function () {
            return this._message;
        },
        set: function (value) {
            this._message = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Message.prototype, "title", {
        get: function () {
            return this._title;
        },
        set: function (value) {
            this._title = value;
        },
        enumerable: true,
        configurable: true
    });
    return Message;
}());
exports.Message = Message;
/**
 * Indentifica le tipologie di messaggi d'errore
 */
var MessageType;
(function (MessageType) {
    /**
     * L'applicazione non può funzionare con questo errore. -> di solito tradotto dal dimmer
     */
    MessageType[MessageType["BLOCCANTE"] = 0] = "BLOCCANTE";
    /**
     * L'applicazione ha ricevuto un messaggio gestito. -> di solito viene comunicato l'errore all'utente
     */
    MessageType[MessageType["APPLICATIVO"] = 1] = "APPLICATIVO";
    /**
     * L'errore riguarda l'autenticazione -> di solito l'utente viene buttato fuori dall'applicativo.
     */
    MessageType[MessageType["AUTENTICAZIONE"] = 2] = "AUTENTICAZIONE";
    /* Solo per comunicare qualcosa all'utente*/
    MessageType[MessageType["INFORMATIVO"] = 3] = "INFORMATIVO";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
