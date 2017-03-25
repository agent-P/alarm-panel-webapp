import { LCARS } from '../../LCARS-javascript-lib-es6/src/LCARS';
import { KeypadScreenPortrait } from './KeypadScreenPortrait';
import { KeypadScreenLandscape } from './KeypadScreenLandscape';

const OPEN = 'open';
const CLOSE = 'close';
const MESSAGE = 'message';

export class AlarmKeypadScreen {
    
    constructor() {
        
        this.host = window.location.hostname;
        this.connected = false;
        
        this.portraitScreen = new KeypadScreenPortrait();
        this.portraitScreen.setVisible('hidden');
        this.portraitScreen.divElement.style.webkitTransform = 'scale(0.45) translateX(-430px) translateY(-770px)';
        document.body.appendChild(this.portraitScreen.divElement);
        
        this.landscapeScreen = new KeypadScreenLandscape();
        this.landscapeScreen.setVisible('hidden');
        this.landscapeScreen.divElement.style.webkitTransform = 'scale(0.585) translateX(-350px) translateY(-190px)';
        document.body.appendChild(this.landscapeScreen.divElement);
        
        this.pin = false;
        this.mode = 2;
        
        this.ready = false;
        this.armedAway = false;
        this.armedStay = false;
        this.messageBeeps = 0;
        this.acPowerOn = true;
        this.chime = false;
        this.alarmOccurred = false;
        this.alarmSounding = false;
        this.batteryOk = true;
        this.entryDelay = true;
        
        this.showArmedNone();
        this.showReadyNone();
        
        this.updateModeDisplay();
        this.updateStateIndicators();
        
        this.addEventListenerKeypadMessage();
        this.addEventListenerConnectionMessage();
        this.addKeypadEventListener();
        this.addArmEventListener();
        this.addDisarmEventListener();
        this.addModeEventListener();
    }
    
    
    addEventListenerKeypadMessage() {
        let thisObject = this;
        window.addEventListener('keypadMessage', function (event) {
                                //console.log("keypad message event detail: " + event.detail);
                                let stateObject = JSON.parse(event.detail);
                                
                                if(stateObject.type == 'key-pad-message') {
                                thisObject.ready = (stateObject.ready == 'true') ? true : false;
                                thisObject.armedAway = (stateObject.armedAway == 'true') ? true : false;
                                thisObject.armedStay = (stateObject.armedStay == 'true') ? true : false;
                                thisObject.acPowerOn = (stateObject.acPower == 'on') ? true : false;
                                thisObject.chime = (stateObject.chime == 'enabled') ? true : false;
                                thisObject.alarmOccurred = (stateObject.alarmOccurred == 'true') ? true : false;
                                thisObject.alarmSounding = (stateObject.alarmSounding == 'true') ? true : false;
                                thisObject.batteryOk = (stateObject.battery == 'ok') ? true : false;
                                thisObject.entryDelay = (stateObject.entryDelay == 'on') ? true : false;
                                
                                thisObject.messageBeeps = parseInt(stateObject.messageBeeps);
                                
                                thisObject.updateStateIndicators();
                                thisObject.updateModeDisplay();
                                thisObject.appendMessage(stateObject.keypadText);
                                }
                                else if(stateObject.type == 'authentication-message') {
                                    //console.log("received authentication-message");
                                    if(stateObject.pin == 'yes') {
                                        thisObject.pin = true;
                                        thisObject.mode = 1;
                                    }
                                    else {
                                        thisObject.pin = false;
                                        thisObject.mode = 2;
                                    }
                                    thisObject.updateModeDisplay();
                                }
                            });
    }
    
    
    addEventListenerConnectionMessage() {
        let thisObject = this;
        window.addEventListener('connectionMessage', function (event) {
                                let stateObject = JSON.parse(event.detail);
                                
                                if(stateObject.connection == 'connected') {
                                    if(!thisObject.connected) {
                                        thisObject.connect(thisObject.host);
                                        thisObject.connected = true;
                                    }
                                    else {
                                        thisObject.heartbeat();
                                    }
                                }
                                else if(stateObject.connection == 'disconnected') {
                                    thisObject.disconnect(thisObject.host);
                                    thisObject.connected = false;
                                }
                            });
        
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
                this.portraitScreen.setVisible('hidden');
                this.landscapeScreen.setVisible('visible');
                break;
            default:
                //console.log("portrait window orientation: " + window.orientation);
                this.landscapeScreen.setVisible('hidden');
                this.portraitScreen.setVisible('visible');
                break;
        }
    }
    
    
    keypadListener(event) {
        let evt = new CustomEvent('commandMessage', { detail: '{ "key-pressed" : "' + event.target.id[0] + '" }' });
        window.dispatchEvent(evt);
    }
    
    
    armListener(event) {
        let evt = new CustomEvent('commandMessage', { detail: '{ "command" : "ARM" }' });
        window.dispatchEvent(evt);
    }
    
    
    disarmListener(event) {
        let evt = new CustomEvent('commandMessage', { detail: '{ "command" : "DISARM" }' });
        window.dispatchEvent(evt);
    }
    
    
    appendMessage(message) {
        this.portraitScreen.messagesArea.appendLine(message);
    }
    
    updateDisplay(updateType, host, data) {
        if(updateType == OPEN) {
            this.onOpen(host, data);
        }
        else if(updateType == CLOSE) {
            this.onClose(host);
        }
        else if(updateType == MESSAGE) {
            this.onMessage(host, data);
        }
        else {
            this.appendMessage("UNKNOWN update type: " + updateType);
        }
    }
    
    connect(host, message) {
        this.updateConnectionIndicator('connected');
        this.appendMessage("connected to: " + host);
        
        this.portraitScreen.indicatorConnected.on(true);
        this.landscapeScreen.indicatorConnected.on(true);
        
        if(message !== undefined)
            this.appendMessage(message);
    }
    
    disconnect(host) {
        this.updateConnectionIndicator('disconnected');
        this.appendMessage("disconnected from: " + host);
    }
    
    heartbeat() {
        /* Blink the connection indicator. */
        this.portraitScreen.indicatorConnected.offBlink();
        this.landscapeScreen.indicatorConnected.offBlink();
        
        /* Decode the data. */
    }
    
    updateStateIndicators() {

        if(this.armedStay || this.armedAway) {
            this.portraitScreen.indicatorReady.off();
            this.landscapeScreen.indicatorReady.off();
            this.portraitScreen.indicatorArmed.on();
            this.landscapeScreen.indicatorArmed.on();
            
            this.showReadyNone();
            
            if(this.armedStay) {
                if(this.entryDelay) {
                    this.showArmedStay();
                }
                else {
                    this.showArmedInstant();
                }
            }
            else if(this.armedAway) {
                if(this.entryDelay) {
                    this.showArmedAway();
                }
                else {
                    this.showArmedMax();
                }
            }
        }
        else {
            this.portraitScreen.indicatorArmed.off();
            this.landscapeScreen.indicatorArmed.off();
            
            if(this.ready == true) {
                this.portraitScreen.indicatorReady.on();
                this.landscapeScreen.indicatorReady.on();
                
                this.showArmedNone();
            }
            else {
                this.portraitScreen.indicatorReady.off();
                this.landscapeScreen.indicatorReady.off();
            }
            
            if(this.chime) {
                this.showChime();
            }
            else {
                this.hideChime();
            }
        }
        
        this.updateBatteryIndicators();
    }
    
    updateConnectionIndicator(status) {
        if(status == 'connected') {
            this.portraitScreen.indicatorConnected.on();
            this.portraitScreen.indicatorConnected.setText("CONNECTED");
            this.landscapeScreen.indicatorConnected.on();
            this.landscapeScreen.indicatorConnected.setText("CONNECTED");
        }
        else {
            this.portraitScreen.indicatorConnected.warning(LCARS.EC_RED);
            this.portraitScreen.indicatorConnected.setText("NOT CONNECTED");
            this.landscapeScreen.indicatorConnected.warning(LCARS.EC_RED);
            this.landscapeScreen.indicatorConnected.setText("NOT CONNECTED");
            this.portraitScreen.indicatorReady.off();
            this.portraitScreen.indicatorArmed.off();
            this.landscapeScreen.indicatorReady.off();
            this.landscapeScreen.indicatorArmed.off();
            this.portraitScreen.disarmButton.setEnabled(false);
            this.portraitScreen.armButton.setEnabled(false);
            this.landscapeScreen.disarmButton.setEnabled(false);
            this.landscapeScreen.armButton.setEnabled(false);
            this.showArmedNone();
            this.showReadyNone();
        }
    }

    
    updateBatteryIndicators() {
        //console.log("updateBatteryIndicators(): " + this.batteryOk + " - " + this.acPowerOn);
        this.portraitScreen.updatePowerStatus(this.batteryOk, this.acPowerOn);
        this.landscapeScreen.updatePowerStatus(this.batteryOk, this.acPowerOn);
    }
    
    
    updateModeDisplay() {
        //console.log("mode = " + this.mode);
        if(this.mode == 1) {
            this.portraitScreen.keypad.setVisible(false);
            this.landscapeScreen.keypad.setVisible(false);
            this.portraitScreen.armButton.setVisible(true);
            this.portraitScreen.disarmButton.setVisible(true);
            this.landscapeScreen.armButton.setVisible(true);
            this.landscapeScreen.disarmButton.setVisible(true);
            if(this.ready) {
                this.portraitScreen.armButton.setEnabled(true);
                this.portraitScreen.disarmButton.setEnabled(false);
                this.landscapeScreen.armButton.setEnabled(true);
                this.landscapeScreen.disarmButton.setEnabled(false);
            }
            else if(this.armedStay || this.armedAway) {
                this.portraitScreen.armButton.setEnabled(false);
                this.portraitScreen.disarmButton.setEnabled(true);
                this.landscapeScreen.armButton.setEnabled(false);
                this.landscapeScreen.disarmButton.setEnabled(true);
            }
            else {
                this.portraitScreen.armButton.setEnabled(false);
                this.portraitScreen.disarmButton.setEnabled(false);
                this.landscapeScreen.armButton.setEnabled(false);
                this.landscapeScreen.disarmButton.setEnabled(false);
            }
        }
        else if(this.mode == 2) {
            this.portraitScreen.keypad.setVisible(true);
            this.landscapeScreen.keypad.setVisible(true);
            this.portraitScreen.disarmButton.setVisible(false);
            this.portraitScreen.armButton.setVisible(false);
            this.landscapeScreen.disarmButton.setVisible(false);
            this.landscapeScreen.armButton.setVisible(false);
        }
    }

    addKeypadEventListener() {
        this.portraitScreen.keypad.addEventListener('click', this.keypadListener);
        this.landscapeScreen.keypad.addEventListener('click', this.keypadListener);
    }
    
    addArmEventListener() {
        this.portraitScreen.armButton.addEventListener('click', this.armListener);
        this.landscapeScreen.armButton.addEventListener('click', this.armListener);
    }
    
    addDisarmEventListener() {
        this.portraitScreen.disarmButton.addEventListener('click', this.disarmListener);
        this.landscapeScreen.disarmButton.addEventListener('click', this.disarmListener);
    }

    addModeEventListener() {
        var thisObject = this;
        
        let modeListener = function(event) {
            //console.log("mode event: " + event.target.id);
            if(event.target.id[5] == '1') {
                if(thisObject.pin == true) {
                    thisObject.mode = 1;
                }
            }
            else if(event.target.id[5] == '2') {
                thisObject.mode = 2;
            }
            
            thisObject.updateModeDisplay();
        }
        
        this.portraitScreen.mode_1.addEventListener('click', modeListener);
        this.landscapeScreen.mode_1.addEventListener('click', modeListener);
        this.portraitScreen.mode_2.addEventListener('click', modeListener);
        this.landscapeScreen.mode_2.addEventListener('click', modeListener);
    }

    showArmedAway() {
        this.hideArmedStay();
        this.hideArmedMax();
        this.hideArmedInstant();
        this.hideArmedSpacer();
        
        this.landscapeScreen.rect_upper_away.setVisible(true);
        this.landscapeScreen.rectSpacer_upper_away.setVisible(true);
    }
    
    showArmedStay() {
        this.hideArmedAway();
        this.hideArmedMax();
        this.hideArmedInstant();
        this.hideArmedSpacer();
        
        this.landscapeScreen.rect_upper_stay.setVisible(true);
        this.landscapeScreen.rectSpacer_upper_stay.setVisible(true);
        this.landscapeScreen.rectSpacer_lower_stay.setVisible(true);
    }
    
    showArmedMax() {
        this.hideArmedStay();
        this.hideArmedAway();
        this.hideArmedInstant();
        this.hideArmedSpacer();
        
        this.landscapeScreen.rect_upper_max.setVisible(true);
        this.landscapeScreen.rectSpacer_upper_m_i.setVisible(true);
    }
    
    showArmedInstant() {
        this.hideArmedStay();
        this.hideArmedAway();
        this.hideArmedMax();
        this.hideArmedSpacer();
        
        this.landscapeScreen.rect_upper_instant.setVisible(true);
        this.landscapeScreen.rectSpacer_upper_m_i.setVisible(true);
    }
    
    showArmedNone() {
        this.hideArmedStay();
        this.hideArmedAway();
        this.hideArmedMax();
        this.hideArmedInstant();
        
        this.landscapeScreen.rectSpacer_upper.setVisible(true);
    }
    
    showChime() {
        this.landscapeScreen.rectSpacer_lower.setVisible(false);
        
        this.landscapeScreen.rectSpacer_upper_chime.setVisible(true);
        this.landscapeScreen.rect_chime.setVisible(true);
        this.landscapeScreen.rectSpacer_lower_chime.setVisible(true);
    }
    
    showReadyNone() {
        this.hideChime();
    }
    
    hideArmedAway() {
        this.landscapeScreen.rect_upper_away.setVisible(false);
        this.landscapeScreen.rectSpacer_upper_away.setVisible(false);
    }
    
    hideArmedStay() {
        this.landscapeScreen.rect_upper_stay.setVisible(false);
        this.landscapeScreen.rectSpacer_upper_stay.setVisible(false);
    }
    
    hideArmedMax() {
        this.landscapeScreen.rect_upper_max.setVisible(false);
        this.landscapeScreen.rectSpacer_upper_m_i.setVisible(false);
    }
    
    hideArmedInstant() {
        this.landscapeScreen.rect_upper_instant.setVisible(false);
        this.landscapeScreen.rectSpacer_upper_m_i.setVisible(false);
    }
    
    hideArmedSpacer() {
        this.landscapeScreen.rectSpacer_upper.setVisible(false);
    }
    
    hideChime() {
        this.landscapeScreen.rectSpacer_upper_chime.setVisible(false);
        this.landscapeScreen.rect_chime.setVisible(false);
        this.landscapeScreen.rectSpacer_lower_chime.setVisible(false);

        this.landscapeScreen.rectSpacer_lower.setVisible(true);
    }
    

}
