import {
    LightningElement,
    track,
    api
} from 'lwc';

// import GetFormPage from '@salesforce/apex/FormBuilderController.GetFormPage'; // Form Page 
// import getFieldsRecords from '@salesforce/apex/FormBuilderController.getFieldsRecords'; // Form Field
// import getFormCSS from '@salesforce/apex/FormBuilderController.getFormCSS'; // Form
// import getPageCSS from '@salesforce/apex/FormBuilderController.getPageCSS';// Form
// import getButtonCSS from '@salesforce/apex/FormBuilderController.getButtonCSS'; // Form
// import getprogressbar from '@salesforce/apex/FormBuilderController.getprogressbar'; // Form
// import getcaptcha from '@salesforce/apex/FormBuilderController.getcaptcha'; // Form
import formdetails from '@salesforce/apex/previewFormcmp.formdetails';
import formfielddetails from '@salesforce/apex/previewFormcmp.formfielddetails';
import formpagedetails from '@salesforce/apex/previewFormcmp.formpagedetails';
import processDecryption from '@salesforce/apex/EncryptDecryptController.processDecryption';
import bgimages from '@salesforce/apex/previewFormcmp.bgimages';

import BackButton from '@salesforce/resourceUrl/BackButton';

import {
    NavigationMixin
} from "lightning/navigation";

export default class PreviewFormCmp extends NavigationMixin(LightningElement) {

    BackButton = BackButton;

    @api formid;
    @track getFieldCSS;
    @track page = [];
    @track PageList = [];
    @track Mainlist = [];
    @track pageindex = 1;
    @track spinnerDataTable = false;
    @track isIndexZero = true;
    @track isIndexLast = false;
    @track Progressbarvalue;
    @track captchavalue;
    @track verify;
    @track buttonscss;
    @track PageCSS;
    @api activepreviews=false;

    @track hovercss;
    @track focuscss;
    @track fcss;
    @track pagecss;
    @track formcss;
    @track btncss;
    @track lcss;

    connectedCallback() {
        this.spinnerDataTable = true;
        var pageURL = window.location.href;
        console.log('pageURL ---> ', pageURL);
        if (pageURL.includes("?access_key=")) {
            var accessKey = pageURL.split("access_key=")[1];
            console.log('accessKey ---> ', accessKey);
            processDecryption({
                    encryptedData: accessKey
                })
                .then(result => {
                    console.log('result ---> ', result);
                    this.formid = result;
                    this.FormData();
                });
        } else {
            this.FormData();
        }
    }

    renderedCallback() {
        if (this.Mainlist.length > 0) {
            let value;
            let arr = this.template.querySelectorAll('.btn1');
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                element.style = this.buttonscss;
            }
            let buttoncss = this.buttonscss.split(';');
            for (let i = 0; i < buttoncss.length; i++) {
                buttoncss[i] = buttoncss[i].split(':');
                let label = buttoncss[i][0];

                if (label == 'justify-content') {
                    value = 'justify-content:' + buttoncss[i][1];
                }
            }
            let Arr = this.template.querySelectorAll(".footer");
            for (let i = 0; i < Arr.length; i++) {
                const element = Arr[i];
                element.style = value;
            }
        }
    }


    FormData() {
        try {
            formdetails({ id: this.formid })
                .then(result => {
                    this.Progressbarvalue = result.Progress_Indicator__c;
                    this.captchavalue = result.Captcha_Type__c;
                    this.getFieldCSS = result.Form_Styling__c;
                    this.buttonscss = result.Button_CSS__c;
                    this.buttonscss = this.buttonscss.concat(result.Button_Position__c);
                    this.PageCSS = result.Page_CSS__c;
                    this.hovercss = result.All_Field_Hover__c;
                    this.focuscss = result.All_Field_Focus__c
                    this.fcss = result.All_Field_Styling__c;
                    console.log('fcss -->> '+this.fcss);
                    this.lcss = result.Label_CSS__c;
                    let array;
                    let value;

                    let pagebg = result.PageBgID__c;
                    let formbg = result.FormBgID__c;

                    if (formbg != null && formbg != undefined){
                        bgimages({id:formbg, data:this.getFieldCSS})
                        .then(result => {
                            if (result!=undefined && result!=null){
                                array = this.template.querySelector('.myform');
                                array.style = result;
                                this.getFieldCSS = result;
                            }
                        })
                    }

                    if (pagebg != null && pagebg != undefined){
                        bgimages({id:pagebg, data:this.PageCSS})
                        .then(result => {
                            if (result!=undefined && result!=null){
                                array = this.template.querySelectorAll('.page');
                                for (let i = 0; i < array.length; i++) {
                                    const element = array[i];
                                    element.style = result;
                                }
                                this.PageCSS = result;
                            }
                        })
                    }

                    // FormCss
                    // if (this.getFieldCSS != undefined){
                    //     array = this.template.querySelector('.myform');
                    //     console.log('OUTPUT formcss ->: ',this.getFieldCSS);
                    //     array.style = this.getFieldCSS;
                    // }

                    //PageCss
                    // if (this.PageCSS != undefined){
                    //     array = this.template.querySelectorAll('.page');
                    //     for (let i = 0; i < array.length; i++) {
                    //         const element = array[i];
                    //         element.style = this.PageCSS;
                    //     }
                    // }

                    //ButtonCss
                    if (this.buttonscss != undefined){
                        array = this.template.querySelectorAll('.btn1');
                        for (let i = 0; i < array.length; i++) {
                            const element = array[i];
                            element.style = this.buttonscss;
                        }
                        let buttoncss = this.buttonscss.split(';');
                        for (let i = 0; i < buttoncss.length; i++) {
                            buttoncss[i] = buttoncss[i].split(':');
                            let label = buttoncss[i][0];

                            if (label == 'justify-content') {
                                value = 'justify-content:' + buttoncss[i][1];
                            }
                        }

                        //ButtonPosition
                        array = this.template.querySelectorAll(".footer");
                        for (let i = 0; i < array.length; i++) {
                            const element = array[i];
                            element.style = value;
                        }
                    }

                    this.PageData();
                });
        }
         catch (error) {
            console.log(error + 'preview Error');
            this.spinnerDataTable = false;
        }
    }

    PageData() {
        try {
            formpagedetails({ id: this.formid })
                .then(result => {
                    //PageData
                    this.PageList = result;
                    this.FieldsData();
                });
        } catch (error) {
            console.log(error + 'preview Error');
            this.spinnerDataTable = false;
        }
    }

    FieldsData() {
        try {
            formfielddetails({ id: this.formid })
                .then(result => {
                    // FieldsData
                    this.setPageField(result);
                });
        } catch (error) {
            console.log(error + 'preview Error');
            this.spinnerDataTable = false;
        }
    }


    setPageField(fieldList) {
        try {
            let outerlist = [];
            let innerlist = [];
            let fieldtype;
            
            for (let i = 0; i < this.PageList.length; i++) {
                innerlist = [];
                for (let j = 0; j < fieldList.length; j++) {
                    if (this.PageList[i].Id == fieldList[j].Form_Page__c) {
                        if (fieldList[j].Name.split(',')[1] == 'Extra') {
                            fieldtype = false;
                        } else {
                            fieldtype = true;
                        }

                        let isdisabledcheck;
                        let isRequiredcheck;
                        let labelcheck;
                        let helptextcheck;
                        let placeholdercheck;
                        let prefixcheck;
                        let prefixvalue;
                        let labelvalue;
                        let helptext;
                        let placeholdervalue;
                        let salutationvalue = [];
                        let Richtext;

                        fieldList[j].Field_Validations__c = fieldList[j].Field_Validations__c.split('?$`~');
                        for (let i = 0; i < fieldList[j].Field_Validations__c.length; i++) {
                            fieldList[j].Field_Validations__c[i] = fieldList[j].Field_Validations__c[i].split('<!@!>');
                            let labels = fieldList[j].Field_Validations__c[i][0];
                            let value = fieldList[j].Field_Validations__c[i][1];

                            if (labels == 'isRequired') {
                                isRequiredcheck = JSON.parse(value);
                            } else if (labels == 'isDisabled') {
                                isdisabledcheck = JSON.parse(value);
                            } else if (labels == 'isLabel') {
                                labelcheck = JSON.parse(value);
                            } else if (labels == 'isHelpText') {
                                helptextcheck = JSON.parse(value);
                            } else if (labels == 'isPlaceholder') {
                                placeholdercheck = JSON.parse(value);
                            } else if (labels == 'isPrefix') {
                                prefixcheck = JSON.parse(value);
                            } else if (labels == 'Prefix') {
                                prefixvalue = value;
                            } else if (labels == 'Label') {
                                labelvalue = value;
                            } else if (labels == 'HelpText') {
                                helptext = value;
                            } else if (labels == 'Placeholder') {
                                placeholdervalue = value;
                            } else if (labels == 'Salutation') {
                                salutationvalue.push(value);
                                } else if (labels == 'Richtext') {
                                    Richtext = value;
                            }

                        }
                        fieldList[j].Field_Validations__c = ({
                            isRequired: isRequiredcheck,
                            isDisabled: isdisabledcheck,
                            isLabel: labelcheck,
                            isHelptext: helptextcheck,
                            isPlaceholder: placeholdercheck,
                            isPrefix: prefixcheck,
                            Prefix: prefixvalue,
                            Label: labelvalue,
                            HelpText: helptext,
                            Placeholder: placeholdervalue,
                            Salutation: salutationvalue,
                            fieldtype: fieldtype,
                            Richtext: Richtext
                        });

                        innerlist.push(fieldList[j]);
                    }
                }
                let temp = {
                    pageName: this.PageList[i].Name,
                    pageId: this.PageList[i].Id,
                    FieldData: innerlist
                };
                outerlist.push(temp);
            }
            this.Mainlist = outerlist;
            this.page = outerlist[0];

            if (this.pageindex == this.PageList.length) {
                this.isIndexZero = true;
                this.isIndexLast = true;
            }
            this.spinnerDataTable = false;
            this.template.querySelector('c-progress-indicator').calculation(this.Progressbarvalue, this.pageindex, this.PageList.length);
        } catch (error) {
            console.log(error + 'preview Error');
            this.spinnerDataTable = false;
        }
    }

    backhome(event) {
        let cmpDef = {
            componentDef: "c:qf_home"
        };
        let encodedDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "/one/one.app#" + encodedDef
            }
        });
    }

    handlepagination(event) {

        if (event.currentTarget.dataset.name == 'previous') {
            if (this.pageindex == 1) {
                this.isIndexZero = true;
            } else if (this.PageList.length > this.pageindex) {
                this.pageindex--;
                if (this.pageindex == 1) {
                    this.isIndexLast = false;
                    this.isIndexZero = true;
                }
            } else if (this.PageList.length == this.pageindex) {
                this.pageindex--;
                this.isIndexLast = false;
                if (this.pageindex == 1) {
                    this.isIndexLast = false;
                    this.isIndexZero = true;
                }
            }
            this.page = this.Mainlist[this.pageindex - 1];
            this.template.querySelector('c-progress-indicator').calculation(this.Progressbarvalue, this.pageindex, this.PageList.length);

        } else if (event.currentTarget.dataset.name == 'next') {
            if (this.pageindex == 1) {

                if (this.pageindex == this.PageList.length) {
                    this.isIndexZero = false;
                    this.isIndexLast = true;
                } else {
                    this.pageindex++;
                    this.isIndexZero = false;
                    this.isIndexLast = false;
                    if (this.pageindex == this.PageList.length) {
                        this.isIndexLast = true;
                    }
                }
            } else if (this.PageList.length > this.pageindex) {
                this.pageindex++;
                if (this.pageindex == this.PageList.length) {
                    this.isIndexLast = true;
                } else {
                    this.isIndexLast = false;
                }
            } else if (this.PageList.length == this.pageindex) {}
            this.page = this.Mainlist[this.pageindex - 1];
            this.template.querySelector('c-progress-indicator').calculation(this.Progressbarvalue, this.pageindex, this.PageList.length);
        } else if (event.currentTarget.dataset.name == 'submit') {

            if (this.verify == true) {} else if (this.verify == false) {
                let toast_error_msg = 'Invalid Captcha';
                this.template.querySelector('c-toast-component').showToast('error', toast_error_msg, 3000);
            } else {
                let toast_error_msg = 'Please Verify Captcha';
                this.template.querySelector('c-toast-component').showToast('error', toast_error_msg, 3000);
            }
        }
    }

    verifycaptcha(event) {
        this.verify = event.detail;
    }
}