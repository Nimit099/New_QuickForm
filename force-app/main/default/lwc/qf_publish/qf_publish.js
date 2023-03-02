import { LightningElement, wire, track, api } from 'lwc';
import copyIcon from '@salesforce/resourceUrl/CopyUrlIcon'; //static resource for copy url icon
import siteUrl from "@salesforce/apex/customMetadata.siteUrl";
import { loadStyle } from 'lightning/platformResourceLoader';
import GroupRadio from '@salesforce/resourceUrl/groupRadio';
import qrcode from './qrcode.js';

export default class Qf_publish extends LightningElement {
    copy_Icon = copyIcon;
    @track spinner = false;
    readonly = true;
    lightBoxOpt; // Required to check css
    formSiteURL = true; // Not sure
    usingAura = true;// proper required css
    usingLWC; // proper required css
    formIFrame; // proper required css
    formLightBox;
    formTextLink = true;
    formImageLink;
    formAutoPopup;
    floatingButton;
    formQRCode;
    @track formurl;
    @api currentformid;
    @track publishment_value = 'aura';
    @track text_b_color = "background-color: #b2CCE5;";
    @track img_b_color = "background-color: #ffffff;";
    @track auto_b_color = "background-color: #ffffff;";
    @track floating_b_color = "background-color: #ffffff;";
    messages;


    connectedCallback() {
        this.spinner = true;
        console.log('OUTPUT to connectedcallback : ', this.currentformid);
        siteUrl({ Formid: this.currentformid })
            .then(data => {
                this.formurl = data;
                this.spinner = false;
                console.log('formurl : ', this.formurl);
                console.log('OUTPUT : ', data);
                this.messages = data;
                this.error = undefined;
            })
            .catch(error => {
                console.log({ error });
                this.spinner = false;
            })

    }


    renderedCallback() {

        Promise.all([
            loadStyle(this, GroupRadio)
        ]).then(() => {
            console.log('Files loaded');
        })
            .catch(error => {
                console.log(error.body.message);
            });

    }


    get option() {
        return [
            { 'label': 'Aura Component', 'value': 'aura', 'checked': 'true' },
            { 'label': 'LWC', 'value': 'lwc' },
            { 'label': 'IFrame', 'value': 'iframe' },
            { 'label': 'QR Code', 'value': 'QR Code' },
            { 'label': 'Lightbox', 'value': 'lightBox' },
        ]
    }

    copyTextFieldHelper(event) {
        try {
            let hiddenInput = this.template.querySelector('input');
            console.log('OUTPUT : ', hiddenInput);
            let sel_val = hiddenInput.select();
            console.log('sel_val', sel_val);
            hiddenInput.setSelectionRange(0, 9999999);
            var copied = this.template.querySelector('.urlCopied');
            copied.style.display = 'block';
            setTimeout(function () { copied.style.display = 'none'; }, 1500);
        } catch (e) {
            component.find("toastCmp").showToastModel("Something went wrong", "error");

        }
    }




    copyDivToClipboard_1() {
        this.copyToClipboard(".copyCodeSection_12", ".copiedtext1");
    }
    copyDivToClipboard_2() {
        this.copyToClipboard(".copyCodeSection_22", ".copiedtext2");
    }
    copyDivToClipboard_3() {
        this.copyToClipboard(".copyCodeSection_32", ".copiedtext3");
    }

    copyToClipboard(elementSelector, copiedTextSelector) {
        try {
            const range = document.createRange();
            range.selectNode(this.template.querySelector(elementSelector));
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");
            const copied = this.template.querySelector(copiedTextSelector);
            copied.style.display = 'block';
            setTimeout(() => {
                copied.style.display = 'none';
                window.getSelection().removeAllRanges();
            }, 1500);
        } catch (e) {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error',
                    message: 'Something went wrong',
                    variant: 'error'
                })
            );
        }
    }

    copy_code_fir_lwc(event) {
        console.log('method in copy_code_fir_lwc');
        try {
            const parentDiv = event.currentTarget.parentNode.parentNode.querySelector('.codestyle');
            const range = document.createRange();
            range.selectNode(parentDiv);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand("copy");
            setTimeout(function () { window.getSelection().removeAllRanges(); }, 1500);

        } catch (e) {
            console.log('error in copy_code_fir_lwc--->' + e);

        }
    }

    handleRadioChange(event) {
        const selectedOption = event.detail.value;

        if (selectedOption == 'aura') {
            this.usingAura = true;
        } else {
            this.usingAura = false;
        }


        if (selectedOption == 'lwc') {
            this.usingLWC = true;
        } else {
            this.usingLWC = false;
        }


        if (selectedOption == 'iframe') {
            this.formIFrame = true;
        } else {
            this.formIFrame = false;
        }


        if (selectedOption == 'QR Code') {
            this.formQRCode = true;
        }
        else {
            this.formQRCode = false;
        }

        if (selectedOption == 'lightBox') {
            this.formLightBox = true;
            this.lightBoxOpt = true;
        }
        else {
            this.formLightBox = false;
            this.lightBoxOpt = false;
        }
    }

    handleLightBoxChange(event) {
        console.log('u r in select lightbox');

        var getDiv = event.target.dataset.id;
        console.log('u r in select lightbox :-', getDiv);

        var img = 'lightBoxAcc';


        if (getDiv == 'textLink') {
            this.formTextLink = true;
            this.formImageLink = false;
            this.formAutoPopup = false;
            this.floatingButton = false;

            this.text_b_color = "background-color: #b2CCE5;";
            this.img_b_color = "background-color: #ffffff;";
            this.auto_b_color = "background-color: #ffffff;";
            this.floating_b_color = "background-color: #ffffff;";
        }
        if (getDiv == 'imageLink') {
            this.formTextLink = false;
            this.formImageLink = true;
            this.formAutoPopup = false;
            this.floatingButton = false;
            this.text_b_color = "background-color: #ffffff;";
            this.img_b_color = "background-color: #b2CCE5;";
            this.auto_b_color = "background-color: #ffffff;";
            this.floating_b_color = "background-color: #ffffff;";
        }
        if (getDiv == 'autoPopup') {
            this.formTextLink = false;
            this.formImageLink = false;
            this.formAutoPopup = true;
            this.floatingButton = false;
            this.text_b_color = "background-color: #ffffff;";
            this.img_b_color = "background-color: #ffffff;";
            this.auto_b_color = "background-color: #b2CCE5;";
            this.floating_b_color = "background-color: #ffffff;";
        }
        if (getDiv == 'floatingBtn') {
            this.formTextLink = false;
            this.formImageLink = false;
            this.formAutoPopup = false;
            this.floatingButton = true;
            this.text_b_color = "background-color: #ffffff;";
            this.img_b_color = "background-color: #ffffff;";
            this.auto_b_color = "background-color: #ffffff;";
            this.floating_b_color = "background-color: #b2CCE5;";
        }


    }


    qrGenerate() {
        const qrCodeGenerated = new qrcode(0, 'H');

        let strForGenearationOfQRCode = this.formurl;
        qrCodeGenerated.addData(strForGenearationOfQRCode);
        qrCodeGenerated.make();
        let element = this.template.querySelector(".qrcode2");
        element.innerHTML = qrCodeGenerated.createSvgTag({});
    }


}