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
var core_1 = require("@angular/core");
var LoadingComponent = (function () {
    function LoadingComponent() {
    }
    return LoadingComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LoadingComponent.prototype, "loading", void 0);
LoadingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'loading',
        template: '<div class="fadeloading" *ngIf="loading"><div  class="sk-cube-grid"><div class="sk-cube sk-cube1"></div><div class="sk-cube sk-cube2"></div><div class="sk-cube sk-cube3"></div><div class="sk-cube sk-cube4"></div><div class="sk-cube sk-cube5"></div><div class="sk-cube sk-cube6"></div><div class="sk-cube sk-cube7"></div><div class="sk-cube sk-cube8"></div><div class="sk-cube sk-cube9"></div></div></div>',
        styles: [".fadeloading{width:100%;height:100%;position:absolute;top:0;left:0;z-index:99;background:rgba(255,255,255,0.8)}.sk-cube-grid{width:40px;height:40px;margin:100px auto}.sk-cube-grid .sk-cube{width:33%;height:33%;background-color:#333;float:left;-webkit-animation:sk-cubeGridScaleDelay 1.3s infinite ease-in-out;animation:sk-cubeGridScaleDelay 1.3s infinite ease-in-out}.sk-cube-grid .sk-cube1{-webkit-animation-delay:0.2s;animation-delay:0.2s}.sk-cube-grid .sk-cube2{-webkit-animation-delay:0.3s;animation-delay:0.3s}.sk-cube-grid .sk-cube3{-webkit-animation-delay:0.4s;animation-delay:0.4s}.sk-cube-grid .sk-cube4{-webkit-animation-delay:0.1s;animation-delay:0.1s}.sk-cube-grid .sk-cube5{-webkit-animation-delay:0.2s;animation-delay:0.2s}.sk-cube-grid .sk-cube6{-webkit-animation-delay:0.3s;animation-delay:0.3s}.sk-cube-grid .sk-cube7{-webkit-animation-delay:0s;animation-delay:0s}.sk-cube-grid .sk-cube8{-webkit-animation-delay:0.1s;animation-delay:0.1s}.sk-cube-grid .sk-cube9{-webkit-animation-delay:0.2s;animation-delay:0.2s}@-webkit-keyframes sk-cubeGridScaleDelay{0%,70%,100%{-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}35%{-webkit-transform:scale3D(0, 0, 1);transform:scale3D(0, 0, 1)}}@keyframes sk-cubeGridScaleDelay{0%,70%,100%{-webkit-transform:scale3D(1, 1, 1);transform:scale3D(1, 1, 1)}35%{-webkit-transform:scale3D(0, 0, 1);transform:scale3D(0, 0, 1)}}"]
    })
], LoadingComponent);
exports.LoadingComponent = LoadingComponent;
