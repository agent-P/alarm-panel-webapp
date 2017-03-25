import { LCARS } from '../../LCARS-javascript-lib-es6/src/LCARS';
import { AlarmKeypadScreen } from './AlarmKeypadScreen';
import { WebConnection } from './WebConnection';
import { ErrorScreen } from './ErrorScreen';


let orientation = null;
let processArgs = function() {
    var parameters = location.search.substring(1).split("&");
    orientation = parameters[0];
}
processArgs();

window.onscroll = function () { window.scrollTo(0, 0); };

LCARS.setFont("LCARS");

//console.log("in Main.js creating WebConnection object...");

//console.log("host: " + document.location.host);
//console.log("hostname: " + document.location.hostname);
//console.log("port: " + document.location.port);

let errorScreen = null;
let alarmKeypadScreen = null;

let webConnection = new WebConnection("/alarm-keypad");

window.addEventListener('connectionMessage', function (event) {
    //console.log("Got a connection message...");
    //console.log("event detail: " + event.detail);
    let stateObject = JSON.parse(event.detail);
    
    if(alarmKeypadScreen == null && errorScreen == null) {
        if(stateObject.statusCode != 200) {
        
            //console.log("creating http status screen...");
        
            if(stateObject.statusCode == 0) {
                errorScreen = new ErrorScreen("error_screen", null, 503, "No Service Available");
            }
            else {
                errorScreen = new ErrorScreen("error_screen", null, stateObject.statusCode, stateObject.message);
            }
        
            let updateOrientation = function() {
                errorScreen.setOrientation(window.orientation);
            }
            window.addEventListener('orientationchange', updateOrientation);
        
            if(orientation == 'portrait') {
                errorScreen.setOrientation(0);}
            else if(orientation == 'landscape') {
                errorScreen.setOrientation(90);}
            else {
                updateOrientation();
            }
        }
        else {
        
            //console.log("creating alarm keypad screen...");
        
            alarmKeypadScreen = new AlarmKeypadScreen();
        
            let updateOrientation = function() {
                alarmKeypadScreen.setOrientation(window.orientation);
            }
            window.addEventListener('orientationchange', updateOrientation);
        
            if(orientation == 'portrait') {
                alarmKeypadScreen.setOrientation(0);}
            else if(orientation == 'landscape') {
                alarmKeypadScreen.setOrientation(90);}
            else {
                updateOrientation();
            }
        }
    }

});


/*
 ********************** Test Code ****************************
 */

