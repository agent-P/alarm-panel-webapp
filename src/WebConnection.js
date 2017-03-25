import { LCARS } from '../../LCARS-javascript-lib-es6/src/LCARS';
import { AlarmKeypadScreen } from './AlarmKeypadScreen';

const NOT_INITIALIZED = 0;
const CONNECTED = 1;
const REQUEST_RECEIVED = 2;
const PROCESSING_REQUEST = 3;
const DONE = 4;


const CONNECT = "?requestType=connect";
const RECEIVE = "?requestType=receive";


export class WebConnection {
    
    constructor(url) {
        this.url = url;
        this.updateMessage = null;
        this.nextReadyState = CONNECTED;
        
        this.xhttpReceive = new XMLHttpRequest();
        this.xhttpSend = new XMLHttpRequest();
        
        let thisObject = this;
        
        this.xhttpReceive.onreadystatechange = function() {
            //console.log("ready state: " + this.readyState);
            //console.log("status: " + this.status);
            var date = new Date();
            if(this.readyState == CONNECTED) {
            }
            else if(this.readyState == REQUEST_RECEIVED) {
            }
            else if(this.readyState == PROCESSING_REQUEST) {
                if(this.status == 200) {
                    let evt = new CustomEvent('connectionMessage', { detail: '{"type":"connection-message","connection":"connected","statusCode":"' + this.status + '"}' });
                    window.dispatchEvent(evt);
                }
            }
            else if(this.readyState == DONE) {
                if(this.status == 200) {
                    let evt = new CustomEvent('keypadMessage', { detail: this.responseText });                        
                    window.dispatchEvent(evt);
                    thisObject.receive();
                }
                else {
                    if(this.status == 0) {
                        let evt = new CustomEvent('connectionMessage', { detail: '{"type":"connection-message","connection":"disconnected"}' });
                        window.dispatchEvent(evt);
                        setTimeout(function(){thisObject.connect()}, 1000);
                    }
                    else {
                        let evt = new CustomEvent('connectionMessage', { detail: '{"statusCode":"' + thisObject.status + '","message":"' + thisObject.responseText + '"}' });
                        window.dispatchEvent(evt);
                    }
                }
            }
        };
        
        
        window.addEventListener('commandMessage', function (event) {
                                    //console.log("commandMessage: " + event.detail);
                                    thisObject.send(event.detail);
                                });
        
        this.connect();
    }
    
    connect() {
        this.xhttpReceive.open("GET", this.url + CONNECT);
        this.xhttpReceive.send();
    }
    
    receive() {
        this.xhttpReceive.open("GET", this.url + RECEIVE);
        this.xhttpReceive.send();
    }
    
    disconnect() {
        
    }
    
    send(message) {
        this.xhttpSend.open("POST", this.url);
        this.xhttpSend.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        this.xhttpSend.send(message);
    }
    
}
