import { LCARS } from '../../LCARS-javascript-lib-es6/src/LCARS';
import { LCARSCorner, LCARSText, LCARSRectangle, LCARSButton, LCARSTextArea, LCARSKeypad, LCARSIndicator } from '../../LCARS-javascript-lib-es6/src/LCARSComponents';
import { LCARSBlankScreen } from '../../LCARS-javascript-lib-es6/src/LCARSScreens';
import { BatteryIndicator, AcIndicator } from './AlarmPanelPowerIndicators';

export class KeypadScreenPortrait extends LCARSBlankScreen {
    
    constructor() {
        super('_portrait', "SECURITY SYSTEM", "100%", "100%");
        
        this.divElement = document.createElement("div");
        this.divElement.style.position = "absolute";
        this.divElement.style.width = "705px";
        this.divElement.style.height = "1300px";
        this.divElement.style.top = "5px";
        this.divElement.style.left = "0px";
        
        //this.divElement.style.border = "1px solid blue";
        
        this.drawScreen();
        
        this.divElement.appendChild(this.element);
    }
    
    
    drawScreen() {
        this.ulc = new LCARSCorner("ULC", "", 5, 5, 475, 1, LCARS.ES_SHAPE_NW | LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.ulc);
        
        this.text_title = new LCARSText("text_title", this.title, 485, 34 , LCARS.EC_ORANGE);
        this.text_title.setTextFontSize(34);
        this.addComponent(this.text_title);

        this.ulc_end_cap = new LCARSRectangle("ulc_end_cap", "", 680, 5, 20, 30, LCARS.ES_RECT_RND_E | LCARS.EC_ORANGE);
        this.addComponent(this.ulc_end_cap);

        this.indicatorReady = new LCARSIndicator("ready", "READY", 175, 60, 180, 75, LCARS.EF_SUBTITLE | LCARS.ES_RECT_RND_W | LCARS.ES_LABEL_W | LCARS.EC_BLUE);
        this.indicatorReady.setEnabled(false);
        this.addComponent(this.indicatorReady);
        
        this.indicatorArmed = new LCARSIndicator("armed", "ARMED", 360, 60, 290, 75, LCARS.EF_SUBTITLE | LCARS.ES_RECT_RND_E | LCARS.ES_LABEL_E | LCARS.EC_RED);
        this.indicatorArmed.setEnabled(false);

        this.addComponent(this.indicatorArmed);
        
        this.llc = new LCARSCorner("LLC", "", 5, 102, 350, 1, LCARS.ES_SHAPE_SW | LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.llc);
        
        this.urc = new LCARSCorner("URC", "", 360, 164, 340, 1, LCARS.ES_SHAPE_NE | LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.urc);
        
        this.mode_1 = new LCARSButton("mode_1", "MODE 1", 550, 260, 2, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.addComponent(this.mode_1);
        
        this.indicatorConnected = new LCARSIndicator("rect_c", "CONNECTED", 550, 390, 150, 45, LCARS.ES_LABEL_C | LCARS.EC_BLUE);
        this.indicatorConnected.setEnabled(false);
        this.addComponent(this.indicatorConnected);
        
        this.mode_2 = new LCARSButton("mode_2", "MODE 2", 550, 440, 2, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.addComponent(this.mode_2);
        
        this.lrc = new LCARSCorner("LRC", "", 360, 570, 340, 1, LCARS.ES_SHAPE_SE | LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.lrc);
        
        this.ulc_messages = new LCARSCorner("ULC_MESSAGES", "MESSAGES", 5, 632, 350, 1, LCARS.ES_SHAPE_NW | LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.ulc_messages);
        
        this.llc_messages = new LCARSCorner("LLC_MESSAGES", "", 5, 905, 530, 1, LCARS.ES_SHAPE_SW | LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.llc_messages);
        
        this.llc_end_cap = new LCARSRectangle("llc_end_cap", "", 680, 967, 20, 30, LCARS.ES_RECT_RND_E | LCARS.EC_ORANGE);
        this.addComponent(this.llc_end_cap);
        
        this.clear_button = new LCARSButton("clear_button", "", 5, 729, 1, LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.clear_button);
        
        this.rect_messages = new LCARSRectangle("rect_messages", "", 5, 794, 150, 41, LCARS.ES_LABEL_C | LCARS.EC_ORANGE);
        this.addComponent(this.rect_messages);
        
        this.blank_button = new LCARSButton("blank_button", "", 5, 840, 1, LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.blank_button);
        
        this.keypad = new LCARSKeypad("keypad_1", 20, 230, LCARS.EF_SUBTITLE | LCARS.ES_RECT_RND | LCARS.EC_ORANGE, LCARS.EKP_AUX_KEYS | LCARS.ES_LABEL_SW | LCARS.EF_BUTTON | LCARS.EC_BLUE);
        this.keypad.setAuxText("OFF", "AWAY", "STAY", "MAX", "TEST", "BYPASS", "INSTANT", "CODE", "CHIME", " ", "READY", " ");
        this.addComponent(this.keypad);
        
        this.keypad.setVisible(false);
        
        this.armButton = new LCARSRectangle("arm", "ARM", 30, 260, 475, 125, LCARS.EF_TITLE | LCARS.EC_RED | LCARS.ES_RECT_RND | LCARS.ES_LABEL_C);
        this.armButton.static = 0;
        this.armButton.setComponentDynamics();
        this.armButton.setVisible(false);
        this.addComponent(this.armButton);
        
        this.disarmButton = new LCARSRectangle("disarm", "DISARM", 30, 440, 475, 125, LCARS.EF_TITLE | LCARS.EC_BLUE | LCARS.ES_RECT_RND | LCARS.ES_LABEL_C);
        this.disarmButton.static = 0;
        this.disarmButton.setComponentDynamics();
        this.disarmButton.setVisible(false);
        this.addComponent(this.disarmButton);
        
        this.messagesArea = new LCARSTextArea("textArea", "", 175, 665, 490, 6, LCARS.EC_ORANGE);
        this.messagesArea.setLineSpacing(1.5);
        this.messagesArea.setTextFontSize(30);
        this.addComponent(this.messagesArea);
        
        this.indicatorAC = new AcIndicator("indicatorAC", 550, 957);
        this.addComponent(this.indicatorAC);
        this.indicatorBattery = new BatteryIndicator("indicatorBattery", 615, 957);
        this.addComponent(this.indicatorBattery);
        
    }
    
    updatePowerStatus(batteryState, acState) {
        this.indicatorAC.updatePowerStatus(batteryState, acState);
        this.indicatorBattery.updatePowerStatus(batteryState, acState);
    }
    
    
    setVisible(visible) {
        this.divElement.style.visibility = visible;
    }
    
    setKeypadVisible(visible) {
        this.keypad.setVisible(visible);
    }
    
}
