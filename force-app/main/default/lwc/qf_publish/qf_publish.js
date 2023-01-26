import { LightningElement } from 'lwc';
import copyIcon from '@salesforce/resourceUrl/CopyUrlIcon'; //static resource for copy url icon
import { loadStyle } from 'lightning/platformResourceLoader';
import GroupRadio from '@salesforce/resourceUrl/groupRadio';

export default class Qf_publish extends LightningElement {
    copy_Icon = copyIcon;
    trued = true;
    trued1;  //proper // popup
    trued2;  // proper (required image) popup
    trued3; // Not requried
    trued4; // proper popup
    trued5; //proper
    trued6;  // Not required
    trued7 = true; // Required to check css
    trued8 = true; // Not sure
    trued9 = true;// proper required css
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

    // connectedCallback(){
    //     this.newCss();
    // }

    // newCss(){
    //     this.template.querySelector('.checkBoxes').style = "border-bottom : 1px solid lightgrey"
    // }  

    renderedCallback() {
        
        Promise.all([
            loadStyle( this, GroupRadio )
            ]).then(() => {
                console.log( 'Files loaded' );
            })
            .catch(error => {
                console.log( error.body.message );
        });

    }
    // renderedCallback(){
    //     this.template.querySelector('.checkBoxes').style = "border-bottom : 1px solid lightgrey";
    // }

    get option(){
        return [
            {'label': 'Aura Component', 'value': 'aura'},
            {'label': 'LWC', 'value': 'lwc'},
            {'label': 'IFrame', 'value': 'iframe'},
            {'label': 'Link to Form', 'value': 'linkToForm'},
            {'label' :'QR Code' , 'value' : 'QR Code'},
            {'label': 'Lightbox', 'value': 'lightBox'},
        ]
        // this.template.querySelector('.EndTimeDropDown').value = event.target.value;
    }

    publishment(){
        
    }
    
}