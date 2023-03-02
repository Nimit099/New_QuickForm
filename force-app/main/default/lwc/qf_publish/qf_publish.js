import { LightningElement,wire,track,api } from 'lwc';
import copyIcon from '@salesforce/resourceUrl/CopyUrlIcon'; //static resource for copy url icon
import siteUrl from "@salesforce/apex/customMetadata.siteUrl";
import { loadStyle } from 'lightning/platformResourceLoader';
import GroupRadio from '@salesforce/resourceUrl/groupRadio';
// import getformid from '@salesforce/apex/customMetadata.getformid';
import qrcode from './qrcode.js';

export default class Qf_publish extends LightningElement {
    @api day = { id: '123', name: 'my_day', label: 'My Day' };
    copy_Icon = copyIcon;
    @track spinnerDataTable = false;
    @track spinner = false;
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
    trued14 = true;
    trued15;
    trued16;
    trued17;
    trued18;
    trued61;
    @track testurl; 
    @api currentformid ;
    @track publishment_value = 'aura';
    @track text_b_color = "background-color: #b2CCE5;";
    @track img_b_color = "background-color: #ffffff;";
    @track auto_b_color = "background-color: #ffffff;";
    @track floating_b_color = "background-color: #ffffff;";
    messages; 

    // connectedCallback(){
    //     this.newCss();
    // }

    // newCss(){
    //     this.template.querySelector('.checkBoxes').style = "border-bottom : 1px solid lightgrey"
    // }  
    connectedCallback(){
        this.spinner = true;
        console.log('OUTPUT to connectedcallback : ',this.currentformid);
        siteUrl({Formid:this.currentformid})
        .then(data =>{
            this.testurl = data;
            this.spinner = false;
            console.log('testurl : ',this.testurl);
            console.log('OUTPUT : ',data);
            this.messages = data;
            this.error = undefined;
        })
        .catch(error => {
            console.log({error});
            this.spinner = false;
        })
        // getformid({Formid:this.currentformid})
        // this.spinner = false;
    }
    // @wire(siteUrl) wiredsiteUrl({ error, data }) {
    //     if (data) {
    //         this.testurl = data;
    //         console.log('testurl : ',this.testurl);
    //         console.log('OUTPUT : ',data);
    //         this.messages = data;
    //         this.error = undefined;
    //     } else if (error) {
    //         this.error = error;
    //         this.messages = undefined;
    //     }
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
            {'label': 'Aura Component', 'value': 'aura','checked':'true'},
            {'label': 'LWC', 'value': 'lwc'},
            {'label': 'IFrame', 'value': 'iframe'},
            {'label': 'Link to Form', 'value': 'linkToForm'},
            {'label' :'QR Code' , 'value' : 'QR Code'},
            {'label': 'Lightbox', 'value': 'lightBox'},
        ]
        // this.template.querySelector('.EndTimeDropDown').value = event.target.value;
    }
    
    copyTextFieldHelper(event) {

        try {
            // alert('hiiii');
            // let h1 = this.template.querySelector('.inputBox');
            // let hiddenInput = this.template.querySelector('input').value;
            let hiddenInput = this.template.querySelector('input');
            console.log('OUTPUT : ',hiddenInput);
            let sel_val = hiddenInput.select();
            console.log('sel_val',sel_val);
            hiddenInput.setSelectionRange( 0, 9999999);
            let testcopy =document.execCommand('copy');
            console.log('testcopy : ',testcopy);
            var copied = this.template.querySelector('.urlCopied');
            copied.style.display = 'block';
            setTimeout(function() { copied.style.display = 'none'; }, 1500);

            //  var hiddenInput1 = document.createElement("input");
            // document.body.appendChild(hiddenInput);
            // hiddenInput1.select();
            // var a = document.execCommand("copy");
            // console.log('a-->>',a);
            // document.body.removeChild(hiddenInput);
            

            // console.log('OUTPUT : ',hiddenInput);
            // hiddenInput.setAttribute("value", text);
            // document.body.appendChild(hiddenInput);
            // hiddenInput.select();
            // document.execCommand("copy");
            // document.body.removeChild(hiddenInput);
            // var copied = document.querySelector('.urlCopied');
            // copied.style.display = 'block';
            // setTimeout(function() { copied.style.display = 'none'; }, 1500);

        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong", "error");

        }
    }
//  copyDivToClipboard() {
//         console.log('y r in copy code lwc');
//         let h1 = this.template.querySelector('.copyCodeSection_2');
//         console.log({h1});
//         console.log('OUTPUT 123456: ',h1);
//         let tetet1 = h1.select();
//         onsole.log('tetet1: ',tetet1);
//         // h1.setSelectionRange( 0, 999999);
//         var range = document.createRange();
//         range.selectNode(this.template.querySelector('.copyCodeSection_2'));
//         window.getSelection().removeAllRanges(); // clear current selection
//         window.getSelection().addRange(range); // to select text
//         document.execCommand("copy");
//         window.getSelection().removeAllRanges();// to deselect
//         var copied = this.template.querySelector('.urlCopied');
//             copied.style.display = 'block';
//             setTimeout(function() { copied.style.display = 'none'; }, 1500);
//     }
    copyDivToClipboard_1() {
        var range = document.createRange();
        range.selectNode(this.template.querySelector(".copyCodeSection_1"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        var copied = this.template.querySelector('.copiedtext1');
        copied.style.display = 'block';
        setTimeout(function() { copied.style.display = 'none'; }, 1500000);
    }
    copyDivToClipboard_2() {
        var range = document.createRange();
        range.selectNode(this.template.querySelector(".copyCodeSection_2"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        var copied = this.template.querySelector('.copiedtext2');
        copied.style.display = 'block';
        setTimeout(function() { copied.style.display = 'none'; }, 1500);
    }
    copyDivToClipboard_3() {
        var range = document.createRange();
        range.selectNode(this.template.querySelector(".copyCodeSection_3"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        var copied = this.template.querySelector('.copiedtext3');
        copied.style.display = 'block';
        setTimeout(function() { copied.style.display = 'none'; }, 1500);
    }
    copyDivToClipboard_4() {
        var range = document.createRange();
        range.selectNode(this.template.querySelector(".textlink"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        var copied = this.template.querySelector('.copiedtext4');
        copied.style.display = 'block';
        setTimeout(function() { copied.style.display = 'none'; }, 1500);
    }
    copyDivToClipboard_5() {
        var range = document.createRange();
        range.selectNode(this.template.querySelector(".imagelink"));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges();// to deselect
        var copied = this.template.querySelector('.copiedtext5');
        copied.style.display = 'block';
        setTimeout(function() { copied.style.display = 'none'; }, 1500);
    }
    copy_code_fir_lwc(event) {

        try {
            var s = event.target.firstElementChild.firstElementChild.id;
            var r = document.createRange();
            r.selectNode(document.getElementById(s));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(r);
            document.execCommand('copy');
            var copied = document.querySelector('.copiedtext');
            copied.style.display = 'block';
            setTimeout(function() { copied.style.display = 'none'; }, 1500);
        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong", "error");

        }
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
      
        if (selectedOption == 'QR Code'){
            this.trued18 = true;
        }
        else{
            this.trued18 = false;
        }

        if (selectedOption == 'lightBox'){
            this.trued13 = true;
            this.trued7 = true;
        }
        else{
            this.trued13 = false;
            this.trued7 = false;
        }
    }

    handleLightBoxChange(event) {
        console.log('u r in select lightbox');
        // const selectedOption = event.detail.value;
        // var getDiv = event.target.id;
        var getDiv = event.target.dataset.id;
        console.log('u r in select lightbox :-',getDiv);
        // var img = document.getElementById('imageLink');
        // console.log('img :-',img);
        // var popup = document.getElementById('autoPopup');
        // console.log('autoPopup :-',autoPopup);
        // var fBtn = document.getElementById('floatingBtn');
        // var aura = document.getElementById('textLink');
        // var img = this.template.querySelector(".imagelink");
        var img = 'lightBoxAcc';


        if (getDiv == 'textLink'){
            this.trued14 = true;
            this.trued15 = false;
            this.trued16 = false;
            this.trued17 = false;
            
            this.text_b_color = "background-color: #b2CCE5;";
            this.img_b_color = "background-color: #ffffff;";
            this.auto_b_color = "background-color: #ffffff;";
            this.floating_b_color = "background-color: #ffffff;";
        }
        if (getDiv == 'imageLink'){
            this.trued14 = false;
            this.trued15 = true;
            this.trued16 = false;
            this.trued17 = false;
            this.text_b_color = "background-color: #ffffff;";
            this.img_b_color = "background-color: #b2CCE5;";
            this.auto_b_color = "background-color: #ffffff;";
            this.floating_b_color = "background-color: #ffffff;";
        }
        if (getDiv == 'autoPopup'){
            this.trued14 = false;
            this.trued15 = false;
            this.trued16 = true;
            this.trued17 = false;
            this.text_b_color = "background-color: #ffffff;";
            this.img_b_color = "background-color: #ffffff;";
            this.auto_b_color = "background-color: #b2CCE5;";
            this.floating_b_color = "background-color: #ffffff;";
        }
        if (getDiv == 'floatingBtn'){
            this.trued14 = false;
            this.trued15 = false;
            this.trued16 = false;
            this.trued17 = true;
            this.text_b_color = "background-color: #ffffff;";
            this.img_b_color = "background-color: #ffffff;";
            this.auto_b_color = "background-color: #ffffff;";
            this.floating_b_color = "background-color: #b2CCE5;";
        }
        
            
    }

    // renderedCallback() {
    qrGenerate(){    
        const qrCodeGenerated = new qrcode(0, 'H');
        // https://mvclouds.com
        let strForGenearationOfQRCode  = this.testurl;
        qrCodeGenerated.addData(strForGenearationOfQRCode);
        qrCodeGenerated.make();
        let element = this.template.querySelector(".qrcode2");
        element.innerHTML = qrCodeGenerated.createSvgTag({});
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