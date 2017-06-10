"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var configurations = require("../../../configurations");
var ConfigurationsService = (function () {
    function ConfigurationsService() {
    }
    ConfigurationsService.prototype.getApiEndpoint = function (service, base) {
        base = base || 'base';
        if (!configurations.api.endpoint.hasOwnProperty(service)) {
            throw new Error("Error: Invalid service " + service + ".");
        }
        return configurations.api.hosts[base] + configurations.api.endpoint[service];
    };
    ConfigurationsService.prototype.isDevelopMode = function () {
        return configurations.developMode;
    };
    return ConfigurationsService;
}());
ConfigurationsService = __decorate([
    core_1.Injectable()
], ConfigurationsService);
exports.ConfigurationsService = ConfigurationsService;
