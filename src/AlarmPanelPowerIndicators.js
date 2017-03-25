import { LCARS } from '../../LCARS-javascript-lib-es6/src/LCARS';
import { ICONS } from '../../LCARS-javascript-lib-es6/src/ICONS';
import { LCARSIndicator, LCARSIcon } from '../../LCARS-javascript-lib-es6/src/LCARSComponents';


export class BatteryIndicator extends LCARSIcon {
    constructor(id, x, y) {
        super(id, x, y, LCARS.EC_BLUE, ICONS.BATTERY_FULL);
        
        this.id = id;
        this.x = x;
        this.y = y;
        
        this.batteryOk = false;
        this.acOn = false;
        this.setVisible(false);
    }
    
    updatePowerStatus(batteryState, acState) {
        //console.log("updatePowerStatus: " + batteryState + " - " + acState);
        this.batterOk = batteryState;
        this.acOn = acState;
        
        if(this.acOn && this.batterOk) {
            this.setBlinking(false);
            this.setIcon(ICONS.BATTERY_FULL, LCARS.EC_BLUE);
            this.setVisible(true);
        }
        else if(!this.acOn && this.batterOk) {
            this.setIcon(ICONS.BATTERY_HALF, LCARS.EC_YELLOW);
            this.setVisible(true);
            this.setBlinking(true, LCARS.EC_YELLOW);
        }
        else if(this.acOn && !this.batterOk) {
            this.setBlinking(false);
            this.setIcon(ICONS.BATTERY_EMPTY, LCARS.EC_RED);
            this.setVisible(true);
        }
        else if(!this.acOn && !this.batterOk) {
            this.setIcon(ICONS.BATTERY_HALF, LCARS.EC_RED);
            this.setVisible(true);
            this.setBlinking(true, LCARS.EC_RED);
        }
    }
}

export class AcIndicator extends LCARSIcon {
    constructor(id, x, y) {
        super(id, x, y, LCARS.EC_BLUE, ICONS.BATTERY_ON_AC);
        
        this.id = id;
        this.x = x;
        this.y = y;
        
        this.batteryOk = false;
        this.acOn = false;
        this.setVisible(false);
    }
    
    updatePowerStatus(batteryState, acState) {
        //console.log("updatePowerStatus: " + batteryState + " - " + acState);
        this.batterOk = batteryState;
        this.acOn = acState;
        
        if(this.acOn) {
            this.setBlinking(false);
            this.setIcon(ICONS.BATTERY_ON_AC, LCARS.EC_BLUE);
            this.setVisible(true);
        }
        else if(!this.acOn && this.batterOk) {
            this.setBlinking(false);
            this.setIcon(ICONS.BATTERY_ON_AC_NEGATIVE, LCARS.EC_RED);
            this.setVisible(true);
        }
        else if(!this.acOn && !this.batterOk) {
            this.setIcon(ICONS.BATTERY_ON_AC_NEGATIVE, LCARS.EC_RED);
            this.setVisible(true);
            this.setBlinking(true, LCARS.EC_RED);
        }
    }
}


