import { LCARS } from '../../LCARS-javascript-lib-es6/src/LCARS';
import { LCARSCorner, LCARSText, LCARSRectangle, LCARSButton, LCARSTextArea, LCARSKeypad, LCARSIndicator } from '../../LCARS-javascript-lib-es6/src/LCARSComponents';
import { LCARSBlankScreen } from '../../LCARS-javascript-lib-es6/src/LCARSScreens';
import { BatteryIndicator, AcIndicator } from './AlarmPanelPowerIndicators';

export class KeypadScreenLandscape extends LCARSBlankScreen {
    
    constructor() {
        super('_landscape', "SECURITY SYSTEM", "100%", "100%");
        
        this.divElement = document.createElement("div");
        this.divElement.style.position = "absolute";
        this.divElement.style.width = "970px";
        this.divElement.style.height = "530px";
        this.divElement.style.top = "5px";
        this.divElement.style.left = "5px";
        
        //this.divElement.style.border = "1px solid blue";
        
        this.drawScreen();
        
        this.divElement.appendChild(this.element);
    }
    
    
    drawScreen() {
        this.urc_end_cap = new LCARSRectangle("l_urc_end_cap", "", 5, 15, 20, 30, LCARS.ES_RECT_RND_W | LCARS.EC_ORANGE);
        this.addComponent(this.urc_end_cap);
        
        this.text_title = new LCARSText("l_text_title", "SECURITY SYSTEM", 30, 44, LCARS.EC_ORANGE);
        this.text_title.setTextFontSize(34);
        this.addComponent(this.text_title);
        
        this.urc = new LCARSCorner("L_URC", "", 225, 15, 475, 1, LCARS.ES_SHAPE_NE | LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.urc);
        
        this.mode_1 = new LCARSButton("mode_1_l", "MODE 1", 550, 111, 2, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.addComponent(this.mode_1);
        
        this.armButton = new LCARSRectangle("arm_l", "ARM", 30, 111, 475, 125, LCARS.EF_TITLE | LCARS.EC_RED | LCARS.ES_RECT_RND | LCARS.ES_LABEL_C);
        this.armButton.static = 0;
        this.armButton.setComponentDynamics();
        this.armButton.setVisible(false);
        this.addComponent(this.armButton);

        this.indicatorConnected = new LCARSIndicator("l_rect_c", "CONNECTED", 550, 241, 150, 45, LCARS.ES_LABEL_C | LCARS.EC_BLUE);
        this.indicatorConnected.setEnabled(false);
        this.addComponent(this.indicatorConnected);
        
        this.mode_2 = new LCARSButton("mode_2_l", "MODE 2", 550, 291, 2, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.addComponent(this.mode_2);
        
        this.disarmButton = new LCARSRectangle("disarm_l", "DISARM", 30, 291, 475, 125, LCARS.EF_TITLE | LCARS.EC_BLUE | LCARS.ES_RECT_RND | LCARS.ES_LABEL_C);
        this.disarmButton.static = 0;
        this.disarmButton.setComponentDynamics();
        this.disarmButton.setVisible(false);
        this.addComponent(this.disarmButton);
        
        this.keypad = new LCARSKeypad("l_keypad_1", 20, 81, LCARS.EF_SUBTITLE | LCARS.ES_RECT_RND | LCARS.EC_ORANGE, LCARS.EKP_AUX_KEYS | LCARS.ES_LABEL_SW | LCARS.EF_BUTTON | LCARS.EC_BLUE);
        this.keypad.setAuxText("OFF", "AWAY", "STAY", "MAX", "TEST", "BYPASS", "INSTANT", "CODE", "CHIME", " ", "READY", " ");
        this.addComponent(this.keypad);
        
        this.keypad.setVisible(false);
        
        this.lrc = new LCARSCorner("L_LRC", "", 165, 421, 535, 1, LCARS.ES_SHAPE_SE | LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.lrc);
        
        this.lrc_end_cap = new LCARSRectangle("l_lrc_end_cap", "", 5, 483, 20, 30, LCARS.ES_RECT_RND_W | LCARS.EC_ORANGE);
        this.addComponent(this.lrc_end_cap);
        
        this.ulc = new LCARSCorner("L_ULC", "", 705, 15, 235, 1, LCARS.ES_SHAPE_NW | LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.ulc);
        
        this.ulc_end_cap = new LCARSRectangle("l_ulc_end_cap", "", 945, 15, 20, 30, LCARS.ES_RECT_RND_E | LCARS.EC_ORANGE);
        this.addComponent(this.ulc_end_cap);
        
        this.rect_upper_away = new LCARSRectangle("l_rect_upper_away", "AWAY", 705, 111, 150, 45, LCARS.ES_LABEL_C | LCARS.EF_BUTTON | LCARS.EC_RED);
        this.rect_upper_away.setVisible(false);
        this.addComponent(this.rect_upper_away);
        
        this.rectSpacer_upper_away = new LCARSRectangle("l_rectSpacer_upper_away", "", 705, 160, 150, 76, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.rectSpacer_upper_away.setVisible(false);
        this.addComponent(this.rectSpacer_upper_away);
        
        this.rect_upper_stay = new LCARSRectangle("l_rect_upper_stay", "STAY", 705, 151, 150, 45, LCARS.ES_LABEL_C | LCARS.EF_BUTTON | LCARS.EC_YELLOW);
        this.rect_upper_stay.setVisible(false);
        this.addComponent(this.rect_upper_stay);
        
        this.rectSpacer_upper_stay = new LCARSRectangle("l_rectSpacer_upper_stay", "", 705, 111, 150, 35, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.rectSpacer_upper_stay.setVisible(false);
        this.addComponent(this.rectSpacer_upper_stay);
        
        this.rectSpacer_lower_stay = new LCARSRectangle("l_rectSpacer_lower_stay", "", 705, 201, 150, 35, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.rectSpacer_lower_stay.setVisible(false);
        this.addComponent(this.rectSpacer_lower_stay);
        
        this.rect_upper_max = new LCARSRectangle("l_rect_upper_max", "MAX", 705, 191, 150, 45, LCARS.ES_LABEL_C | LCARS.EF_BUTTON | LCARS.EC_RED);
        this.rect_upper_max.setVisible(false);
        this.addComponent(this.rect_upper_max);
        
        this.rect_upper_instant = new LCARSRectangle("l_rect_upper_instant", "INSTANT", 705, 191, 150, 45, LCARS.ES_LABEL_C | LCARS.EF_BUTTON | LCARS.EC_RED);
        this.rect_upper_instant.setVisible(false);
        this.addComponent(this.rect_upper_instant);
        
        this.rectSpacer_upper_m_i = new LCARSRectangle("l_rectSpacer_upper_m_i", "", 705, 111, 150, 76, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.rectSpacer_upper_m_i.setVisible(false);
        this.addComponent(this.rectSpacer_upper_m_i);
        
        this.rectSpacer_upper = new LCARSRectangle("l_rectSpacer_upper", "", 705, 111, 150, 125, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.rectSpacer_upper.setVisible(false);
        this.addComponent(this.rectSpacer_upper);
        
        this.indicatorReady = new LCARSIndicator("l_indicator_ready", "READY", 860, 291, 105, 125, LCARS.EF_BUTTON | LCARS.ES_RECT_RND_E | LCARS.ES_LABEL_E | LCARS.EC_BLUE);
        this.indicatorReady.setEnabled(false);
        this.addComponent(this.indicatorReady);
        
        this.rect_chime = new LCARSRectangle("l_rect_chime", "CHIME", 705, 331, 150, 45, LCARS.ES_LABEL_C | LCARS.EF_BUTTON | LCARS.EC_BLUE);
        this.rect_chime.setVisible(false);
        this.addComponent(this.rect_chime);
        
        this.rectSpacer_upper_chime = new LCARSRectangle("l_rectSpacer_upper_chime", "", 705, 291, 150, 35, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.rectSpacer_upper_chime.setVisible(false);
        this.addComponent(this.rectSpacer_upper_chime);
        
        this.rectSpacer_lower_chime = new LCARSRectangle("l_rectSpacer_lower_chime", "", 705, 381, 150, 35, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.rectSpacer_lower_chime.setVisible(false);
        this.addComponent(this.rectSpacer_lower_chime);
        
        this.rectSpacer = new LCARSRectangle("l_rect_spacer", "STATUS", 705, 241, 150, 45, LCARS.EF_BUTTON | LCARS.EC_ORANGE);
        this.addComponent(this.rectSpacer);
        
        this.indicatorArmed = new LCARSIndicator("l_indicator_armed", "ARMED", 860, 111, 105, 125, LCARS.EF_BUTTON | LCARS.ES_RECT_RND_E | LCARS.ES_LABEL_E | LCARS.EC_RED);
        this.indicatorArmed.setEnabled(false);
        this.addComponent(this.indicatorArmed);
        
        this.rectSpacer_lower = new LCARSRectangle("l_rectSpacer_lower", "", 705, 291, 150, 125, LCARS.EF_SUBTITLE | LCARS.EC_ORANGE);
        this.rectSpacer_lower.setVisible(false);
        this.addComponent(this.rectSpacer_lower);
        
        this.llc = new LCARSCorner("L_LLC", "", 705, 421, 235, 1, LCARS.ES_SHAPE_SW | LCARS.EC_ORANGE | LCARS.ES_STATIC);
        this.addComponent(this.llc);
        
        this.llc_end_cap = new LCARSRectangle("l_llc_end_cap", "", 945, 483, 20, 30, LCARS.ES_RECT_RND_E | LCARS.EC_ORANGE);
        this.addComponent(this.llc_end_cap);

        this.indicatorAC = new AcIndicator("l_indicatorAC", 37, 473);
        this.addComponent(this.indicatorAC);
        this.indicatorBattery = new BatteryIndicator("l_indicatorBattery", 102, 473);
        this.addComponent(this.indicatorBattery);
    }
    
    updatePowerStatus(batteryState, acState) {
        this.indicatorAC.updatePowerStatus(batteryState, acState);
        this.indicatorBattery.updatePowerStatus(batteryState, acState);
    }
    
    
    setVisible(visible) {
        this.divElement.style.visibility = visible;
    }
    

}
