import { LCARS } from '../../LCARS-javascript-lib-es6/src/LCARS';
import { LCARSCorner, LCARSText, LCARSRectangle, LCARSButton, LCARSTextArea, LCARSKeypad, LCARSClock, LCARSCalendar } from '../../LCARS-javascript-lib-es6/src/LCARSComponents';
import { HTTPStatusScreen, LCARSBasicScreen } from '../../LCARS-javascript-lib-es6/src/LCARSScreens';


export class ErrorScreen {
    
    constructor(id, properties, statusCode, statusMessage) {
        this.portraitDivElement = document.createElement("div");
        
        this.portraitDivElement.style.position = "absolute";
        this.portraitDivElement.style.width = "705px";
        this.portraitDivElement.style.height = "1300px";
        this.portraitDivElement.style.top = "5px";
        this.portraitDivElement.style.left = "5px";
        this.portraitDivElement.style.webkitTransform =  'scale(0.45) translateX(-430px) translateY(-770px)';
        this.portraitDivElement.style.visibility = 'hidden';
        
        document.body.appendChild(this.portraitDivElement);
        
        this.landscapeDivElement = document.createElement("div");
        
        this.landscapeDivElement.style.position = "absolute";
        this.landscapeDivElement.style.width = "1700px";
        this.landscapeDivElement.style.height = "1000px";
        this.landscapeDivElement.style.top = "5px";
        this.landscapeDivElement.style.left = "5px";
        this.landscapeDivElement.style.webkitTransform = 'scale(0.33) translateX(-1730px) translateY(-1020px)';
        this.landscapeDivElement.style.visibility = 'hidden';
        
        document.body.appendChild(this.landscapeDivElement);
        
        this.portraitScreen = new HTTPStatusScreen('_portrait', 705, 1015, properties, statusCode, statusMessage);
        this.portraitDivElement.appendChild(this.portraitScreen.element);

        this.landscapeScreen = new HTTPStatusScreen('_landscape', 1700, 950, properties, statusCode, statusMessage);
        this.landscapeDivElement.appendChild(this.landscapeScreen.element);

    }
    
    
    /**
     * Update the display based on the orientation of the device. Note the 180 degree case
     * is not detected in iOS 8.x.
     *    0: portrait screen is visible, landscape screen is hidden
     *   90: portrait screen is hidden, landscape screen is visible
     *  -90: portrait screen is hidden, landscape screen is visible
     *  180: no screen change, last screen remains
     */
    setOrientation(orientation) {
        switch(orientation) {
            case -90:
            case 90:
                //console.log("landscape window orientation: " + window.orientation);
                this.portraitDivElement.style.visibility = 'hidden';
                this.landscapeDivElement.style.visibility = 'visible';
                break;
            default:
                //console.log("portrait window orientation: " + window.orientation);
                this.landscapeDivElement.style.visibility = 'hidden';
                this.portraitDivElement.style.visibility = 'visible';
                break;
        }
    }

}
