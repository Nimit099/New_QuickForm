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
    trued7; // Required to check css
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
    
    handleRadioChange(event) {
        const selectedOption = event.detail.value;
        //alert('selectedOption ' + selectedOption);
        if (selectedOption == 'aura'){
            this.trued9 = true;
        }else{
            this.trued9 = false;
        }
      
        
        if (selectedOption == 'lwc'){
            this.trued10 = true;
        }else{
            this.trued10 = false;
        }
        
 
        if (selectedOption == 'iframe'){
            this.trued11 = true;
        }else{
            this.trued11 = false;
        }
        
 
        if (selectedOption == 'linkToForm'){
            this.trued12 = true;
        }
        else{
            this.trued12 = false;
        }
      
        // if (selectedOption == 'QR Code'){
        //     this.salesforceLwcFieldValue = true;
        // }
        // else{
        //     this.salesforceLwcFieldValue = false;
        // }

        if (selectedOption == 'lightBox'){
            this.trued13 = true;
        }
        else{
            this.trued13 = false;
        }
        
        
    }
    // publishment(event){
    //     let Name = event.currentTarget.dataset.name;
    //     if (Name == 'aura') {
    //         this.trued9 = true;
    //         this.trued10 = false;


    //     } else if (publishCheckboxes == 'lwc') {
    //         this.trued9 = false;
    //         this.trued10 = true;
    //     }            
    //     // } else if (Name == 'iframe') {
            

    //     // } else if (Name == 'linkToForm') {
            




    //     // } else if (Name == 'lightBox') {
            


    //     // } else if (Name == 'QR Code') {
            

    //     // } 
    //     else {
    //         console.log('else');

    //     }
    // }
    
}