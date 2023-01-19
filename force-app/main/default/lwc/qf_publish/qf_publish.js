import { LightningElement } from 'lwc';

export default class Qf_publish extends LightningElement {
    trued = true;
    trued1;  //proper // popup
    trued2;  // proper (required image) popup
    trued3; // Not requried
    trued4; // proper popup
    trued5; //proper
    trued6;  // Not required
    trued7; // Required to check css
    trued8; // Not sure
    trued9;// proper required css
    trued10; // proper required css
    trued11; // proper required css
    trued12; // proper required css
    trued13;  
    trued14;
    trued15;
    trued16;
    trued17;
    trued18;
    trued61;
    get option(){
        return [
            {'label': 'Aura Component', 'value': 'aura'},
            {'label': 'LWC', 'value': 'lwc'},
            {'label': 'IFrame', 'value': 'iframe'},
            {'label': 'Link to Form', 'value': 'linkToForm'},
            {'label' :'QR Code' , 'value' : 'QR Code'},
            {'label': 'Lightbox', 'value': 'lightBox'},
        ]
    }
    
}