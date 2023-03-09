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
import getthankyoupage from '@salesforce/apex/qfthankyou.getthankyoupage';

import BackButton from '@salesforce/resourceUrl/BackButton';

import {NavigationMixin} from "lightning/navigation";

// add by yash
import getFieldsRecords_page from '@salesforce/apex/FormBuilderController.getFieldsRecords_page';
import GetFormObject from '@salesforce/apex/FormBuilderController.GetFormObject';
import createrecord from '@salesforce/apex/FormBuilderController.createrecord';
import createrecord_for_secod_object from '@salesforce/apex/FormBuilderController.createrecord_for_secod_object';
import createrecord_for_third_object from '@salesforce/apex/FormBuilderController.createrecord_for_third_object';
import GetFormValidation from '@salesforce/apex/FormBuilderController.GetFormValidation';


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
    @api activepreviews = false;

    @track hovercss;
    @track focuscss;
    @track fcss;
    @track pagecss;
    @track formcss;
    @track btncss;
    @track lcss;

    // add by yash
    @track PageFieldList = [];
    @track PageFieldListName = [];
    fieldvalues = [];
    @track listofkey = [];
    @track listofvalue = [];
    // @track list_third_obj;
    @track first_object;
    @track second_object;
    @track third_object;
    @track ext_object;
    @track form_object = [];
    @track form_mapped_Objects = [];
    @track obj;
    @track s_ob;
    @track list_first_obj = {
        'sobjectType': 'filde_vlue'
    };
    @track list_second_obj = {
        'sobjectType': 'filde_vlue'
    };
    @track list_third_obj = {
        'sobjectType': 'filde_vlue'
    };
    @track list_ext_obj = {
        'sobjectType': 'Extra'
    };
    @track list_validetion = {};
    @track checkbool = true;
    @track current_bt;
    @track datawithleabel;
    @track form_validation;
    @track custom_validation;
    @track error_validation_json = {};
    // error_josn_key_list = new Set();
    @track error_josn_key_list = [];
    // @track chack_bt = 0;

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

        // add by yash
        GetFormObject({
            id: this.formid
        })
            .then(result => {
                this.form_object = result;
                this.testtocall();
            })
            .catch(error => {
                console.log(error);
            });


        GetFormValidation({
            form_id: this.formid
        })
            .then(result => {
                this.form_validation = result;
                console.log('fild val lenghy:-', this.form_validation);
                //  for(let i=0; i<this.form_validation.length; i++){
                //     console.log(' this list of fild validation :- ',JSON.stringify(this.form_validation[i].Field_Mapping__c));
                //  }
                //  console.log(' this list of fild validation :- ',JSON.stringify(this.form_validation.Field_Validations__c));
            })
            .catch(error => {
                console.log(error);
            });
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
            formdetails({
                id: this.formid
            })
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
                    console.log('fcss -->> ' + this.fcss);
                    this.lcss = result.Label_CSS__c;
                    let array;
                    let value;

                    let pagebg = result.PageBgID__c;
                    let formbg = result.FormBgID__c;

                    if (formbg != null && formbg != undefined) {
                        bgimages({
                            id: formbg,
                            data: this.getFieldCSS
                        })
                            .then(result => {
                                if (result != undefined && result != null) {
                                    array = this.template.querySelector('.myform');
                                    array.style = result;
                                    this.getFieldCSS = result;
                                }
                            })
                    }

                    if (pagebg != null && pagebg != undefined) {
                        bgimages({
                            id: pagebg,
                            data: this.PageCSS
                        })
                            .then(result => {
                                if (result != undefined && result != null) {
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
                    if (this.buttonscss != undefined) {
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
        } catch (error) {
            console.log(error + 'preview Error');
            this.spinnerDataTable = false;
        }
    }

    PageData() {
        try {
            formpagedetails({
                id: this.formid
            })
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
            formfielddetails({
                id: this.formid
            })
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

                        // add by yash
                        let minimum;
                        let maximum;
                        let minimumtime;
                        let maximumtime;
                        let minimumdatetime;
                        let maximumdatetime;
                        let minimumdate;
                        let maximumdate;


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
                            } else if (labels == 'Minimum') {
                                minimum = value;
                            } else if (labels == 'Maximum') {
                                maximum = value;
                            } else if (labels == 'MinimumTime') {
                                minimumtime = value;
                            } else if (labels == 'MaximumTime') {
                                maximumtime = value;
                            } else if (labels == 'MinimumDateTime') {
                                minimumdatetime = value;
                            } else if (labels == 'MaximumDateTime') {
                                maximumdatetime = value;
                            } else if (labels == 'MinimumDate') {
                                minimumdate = value;
                            } else if (labels == 'MaximumDate') {
                                maximumdate = value;
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
                            Richtext: Richtext,
                            Minimum: minimum,
                            Maximum: maximum,
                            MinimumTime: minimumtime,
                            MaximumTime: maximumtime,
                            MinimumDateTime: minimumdatetime,
                            MaximumDateTime: maximumdatetime,
                            MinimumDate: minimumdate,
                            MaximumDate: maximumdate
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
        let chack_bt = 0;
        this.current_bt = event.currentTarget.dataset.name;

        if (event.currentTarget.dataset.name == 'previous') {
            // this.error_josn_key_list = [];
            if (this.error_josn_key_list.length == 0) {
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
            }
        } else if (event.currentTarget.dataset.name == 'next') {
            console.log('this.custom_validation :-', this.error_josn_key_list.length);
            if (this.error_josn_key_list.length == 0) {
                this.spinnerDataTable = true;
                console.log('total page :- ', JSON.stringify(this.PageList[this.pageindex - 1]));
                getFieldsRecords_page({
                    id: this.PageList[this.pageindex - 1].Id
                })
                    .then(result => {
                        this.PageFieldList = result;
                        this.check_validation();
                        this.spinnerDataTable = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.spinnerDataTable = false;
                    });

            }

        } else if (event.currentTarget.dataset.name == 'submit') {
            if (this.error_josn_key_list.length == 0) {
                this.spinnerDataTable = true;
                getFieldsRecords_page({
                    id: this.PageList[this.pageindex - 1].Id
                })
                    .then(result => {
                        this.PageFieldList = result;
                        this.check_validation();
                        this.spinnerDataTable = false;
                    })
                    .catch(error => {
                        console.log(error);
                        this.spinnerDataTable = false;
                    });
            }
        }
    }

    verifycaptcha(event) {
        this.verify = event.detail;
    }

    // add by yash
    testtocall(event) {
        // console.log('form_object OUTPUT : ',JSON.stringify(this.form_object));
        // console.log('form_object OUTPUT : ====>'+ JSON.stringify(this.form_object[0].Mapped_Objects__c));
        this.obj = this.form_object[0].Mapped_Objects__c;
        // console.log('obj : ',this.obj);
        this.form_mapped_Objects = this.obj.split(',');
        // console.log('form_mapped_Objects :- ',this.form_mapped_Objects[0]);
        this.first_object = this.form_mapped_Objects[0];
        this.list_first_obj.sobjectType = this.form_mapped_Objects[0];
        this.second_object = this.form_mapped_Objects[1];
        this.list_second_obj.sobjectType = this.form_mapped_Objects[1];
        this.third_object = this.form_mapped_Objects[2];
        this.list_third_obj.sobjectType = this.form_mapped_Objects[2];
        // console.log('first_object: ',this.first_object );
        // console.log(' this.second_object: ',this.second_object );
        // console.log('third_object: ',this.third_object );

    }
    check_validation(event) {
        console.log('PageFieldList ====>' + JSON.stringify(this.PageFieldList));
        for (let i = 0; i < this.PageFieldList.length; i++) {
            console.log('OUTPUT in next bt : ', this.PageFieldList[i].Field_Mapping__c);
            let test2 = this.PageFieldList[i].Field_Mapping__c;
            console.log('test2 : ', test2);
            let test3 = this.PageFieldList[i].Field_Validations__c;
            var fild_validetionArr = test3.split('?$`~');
            console.log('test3 : ', test3);
            console.log('fild_validetionArr : ', JSON.stringify(fild_validetionArr));
            console.log('fild_validetionArr 123 : ', fild_validetionArr[0]);
            let is_req = fild_validetionArr[0];
            var requiredArr = is_req.split('<!@!>');
            let req_value = requiredArr[1];
            console.log('req_value OUTPUT : ', req_value);
            var nameArr = test2.split('<!@!>');
            const fildAPI = nameArr[0];
            this.list_validetion[test2] = req_value;
            this.s_ob = nameArr[0];
            console.log('fildAPI : ', fildAPI);
            const objectAPI = nameArr[1];
            console.log('objectAPI : ', objectAPI);
            console.log('second_object : ', this.second_object);

            if (this.first_object == objectAPI) {
                console.log(' u r in next if condition ');
                console.log('fildAPI : ', fildAPI);
                console.log('OUTPUT sec_ob : ', JSON.stringify(this.list_first_obj[fildAPI]));
                let fil_val = JSON.stringify(this.list_first_obj[fildAPI]);
                console.log('fil_val OUTPUT : ', fil_val);
                if (req_value == 'true') {
                    console.log('fil_val OUTPUT in if condition : ', fil_val);
                    if (fil_val != '' && fil_val != null && fil_val != ' ' && fil_val != undefined && fil_val != '""' && fil_val != 'undefined') {
                        console.log('u r in fil_val if condition');
                        this.checkbool = true;

                    } else {
                        this.checkbool = false;
                        let error_msg = 'Please fill out alls required fields.';
                        this.template.querySelector('c-toast-component').showToast('error', error_msg, 3000);

                        getthankyoupage({
                            currentformid: this.formid
                        })
                            .then(result => {
                               if (result.Thankyou_Page_Type__c == 'None') {

                                let cmpDef = {
                                    componentDef: "c:thankyouComponent",
                                    attributes: {
                                        thankyoutype : result.Thankyou_Page_Type__c,
                                      }
                                };
                                let encodedDef = btoa(JSON.stringify(cmpDef));
                                console.log('OUTPUT : ', encodedDef);
                                this[NavigationMixin.Navigate]({
                                    type: "standard__webPage",
                                    attributes: {
                                        url: "/one/one.app#" + encodedDef
                                    }
                                });
                                
                               } else if(result.Thankyou_Page_Type__c == 'Show Text'){

                                let cmpDef = {
                                    componentDef: "c:thankyouComponent",
                                    attributes: {
                                        thankyoutype : result.Thankyou_Page_Type__c,
                                        label : result.ThankYou_Label__c,
                                        changelabel : result.ThankYou_Label__c,
                                        text : result.Thankyou_Text__c
                                      }
                                };
                                let encodedDef = btoa(JSON.stringify(cmpDef));
                                console.log('OUTPUT : ', encodedDef);
                                this[NavigationMixin.Navigate]({
                                    type: "standard__webPage",
                                    attributes: {
                                        url: "/one/one.app#" + encodedDef
                                    }
                                });

                               }
                               else if(result.Thankyou_Page_Type__c == 'Show HTML block'){
                                let cmpDef = {
                                    componentDef: "c:thankyouComponent",
                                    attributes: {
                                        thankyoutype : result.Thankyou_Page_Type__c,
                                        label : result.ThankYou_Label__c,
                                        changelabel : result.ThankYou_Label__c,
                                        richtext : result.Thankyou_Text__c
                                      }
                                };
                                let encodedDef = btoa(JSON.stringify(cmpDef));
                                console.log('OUTPUT : ', encodedDef);
                                this[NavigationMixin.Navigate]({
                                    type: "standard__webPage",
                                    attributes: {
                                        url: "/one/one.app#" + encodedDef
                                    }
                                });
                               }
                               else if(result.Thankyou_Page_Type__c == 'Redirect to a webpage'){
                                const config = {
                                    type: 'standard__webPage',
                                    attributes: {
                                        url: result.Thank_you_URL__c
                                    }
                                };
                                this[NavigationMixin.Navigate](config);
                               }
                               else if(result.Thankyou_Page_Type__c == 'Show text, then redirect to web page'){

                                let cmpDef = {
                                    componentDef: "c:thankyouComponent",
                                    attributes: {
                                        thankyoutype : result.Thankyou_Page_Type__c,
                                        label : result.ThankYou_Label__c,
                                        changelabel : result.ThankYou_Label__c,
                                        text : result.Thankyou_Text__c,
                                        url :  result.Thank_you_URL__c
                                      }
                                };
                                let encodedDef = btoa(JSON.stringify(cmpDef));
                                console.log('OUTPUT : ', encodedDef);
                                this[NavigationMixin.Navigate]({
                                    type: "standard__webPage",
                                    attributes: {
                                        url: "/one/one.app#" + encodedDef
                                    }
                                });

                               }
                            })
                            .catch(error => {
                                console.log(error);
                                this.spinnerDataTable = false;
                            });
                        break;
                    }
                }
            } else if (this.second_object == objectAPI) {
                console.log(' u r in next if condition ');
                console.log('fildAPI : ', fildAPI);
                console.log('OUTPUT sec_ob : ', JSON.stringify(this.list_second_obj[fildAPI]));
                let fil_val = JSON.stringify(this.list_second_obj[fildAPI]);
                console.log('fil_val OUTPUT : ', fil_val);
                if (req_value == 'true') {
                    if (fil_val != '' && fil_val != null && fil_val != ' ' && fil_val != undefined && fil_val != '""') {
                        this.checkbool = true;
                    } else {
                        console.log('u r in else in submit vald');
                        this.checkbool = false;
                        let error_msg = 'Please fill outs all required fields.';
                        this.template.querySelector('c-toast-component').showToast('error', error_msg, 3000);
                        break;
                    }
                }

            } else if (this.third_object == objectAPI) {
                console.log(' u r in next if condition ');
                console.log('fildAPI : ', fildAPI);
                console.log('OUTPUT sec_ob : ', JSON.stringify(this.list_third_obj[fildAPI]));
                let fil_val = JSON.stringify(this.list_third_obj[fildAPI]);
                console.log('fil_val OUTPUT : ', fil_val);
                if (req_value == 'true') {
                    if (fil_val != '' && fil_val != null && fil_val != ' ' && fil_val != undefined && fil_val != '""') {
                        this.checkbool = true;

                    } else {
                        this.checkbool = false;
                        // alert('pls enter val');
                        let error_msg = 'Pleases fill out all required fields.';
                        this.template.querySelector('c-toast-component').showToast('error', error_msg, 3000);
                        break;
                    }
                }

            }
            else {
                console.log(' u r in next if condition ');
                console.log('fildAPI : ', fildAPI);
                console.log('OUTPUT sec_ob : ', JSON.stringify(this.list_ext_obj[fildAPI]));
                let fil_val = JSON.stringify(this.list_ext_obj[fildAPI]);
                console.log('fil_val OUTPUT : ', fil_val);
                if (req_value == 'true') {
                    console.log('fil_val OUTPUT in if condition : ', fil_val);
                    if (fil_val != '' && fil_val != null && fil_val != ' ' && fil_val != undefined && fil_val != '""' && fil_val != 'undefined') {
                        console.log('u r in fil_val if condition');
                        this.checkbool = true;

                    }
                    else {
                        this.checkbool = false;
                        let error_msg = 'Please fill out all requireds fields.';
                        this.template.querySelector('c-toast-component').showToast('error', error_msg, 3000);
                        break;
                    }
                }

            }
        }
        console.log('list_validetion OUTPUT : ', JSON.stringify(this.list_validetion));
        if (this.checkbool == true) {
            console.log('u r in checkbool if');
            console.log('current_bt :- ', this.current_bt);
            if (this.current_bt == 'next') {
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
            } else if (this.PageList.length == this.pageindex) { }
            this.page = this.Mainlist[this.pageindex - 1];
            this.template.querySelector('c-progress-indicator').calculation(this.Progressbarvalue, this.pageindex, this.PageList.length);
            } else if (this.current_bt == 'submit') {
                console.log('u r clike submit bt ',);
                if (this.verify == true) {
                    console.log(this.verify);
                    let toast_error_msg = 'you enter Verify Captcha';
                    this.template.querySelector('c-toast-component').showToast('success', toast_error_msg, 3000);
                    this.onsubmit();
                } else {
                let toast_error_msg = 'Invalid Captcha';
                this.template.querySelector('c-toast-component').showToast('error', toast_error_msg, 3000);
                }

            }
        }
    }
    onsubmit(event) {
        let list_submission_obj = {
            'sobjectType': 'Form_Submission__c'
        };
        console.log('u clike submit bt');
        list_submission_obj['Form__c'] = this.formid;
        list_submission_obj['First_object_data__c'] = JSON.stringify(this.list_first_obj);
        list_submission_obj['Second_object_data__c'] = JSON.stringify(this.list_second_obj);
        list_submission_obj['Third_object_data__c'] = JSON.stringify(this.list_third_obj);
        list_submission_obj['Other_fields_data__c'] = JSON.stringify(this.list_ext_obj);
        console.log('this is list_submission_obj :- ', JSON.stringify(list_submission_obj));
        console.log('form_mapped_Objects.length :- ', this.form_mapped_Objects.length);
        if (this.form_mapped_Objects.length == 1) {
            console.log('y r in form_mapped_Objects.length = 1 if');
            createrecord({
                acc: list_submission_obj,
                first_obj_list: this.list_first_obj
            })
                .then(data => {
                    console.log({
                        data
                    });
                    alert('y r data is save');
                })
                .catch(error => {
                    console.log({
                        error
                    });
                })
        } else if (this.form_mapped_Objects.length == 2) {
            console.log('y r in form_mapped_Objects.length = 2 if');
            createrecord_for_secod_object({
                acc: list_submission_obj,
                first_obj_list: this.list_first_obj,
                list_second_obj: this.list_second_obj
            })
                .then(data => {
                    console.log({
                        data
                    });
                    alert('y r data is save');
                })
                .catch(error => {
                    console.log({
                        error
                    });
                })

        } else if (this.form_mapped_Objects.length == 3) {
            console.log('y r in form_mapped_Objects.length = 3 if');
            createrecord_for_third_object({
                acc: list_submission_obj,
                first_obj_list: this.list_first_obj,
                list_second_obj: this.list_second_obj,
                list_third_obj: this.list_third_obj
            })
                .then(data => {
                    console.log({
                        data
                    });
                    alert('y r data is save');
                })
                .catch(error => {
                    console.log({
                        error
                    });
                })

        }

    }
    next_val_by(event) {
        let key = event.detail;
        let push_val = 'yes';
        for (let i = 0; i < this.error_josn_key_list.length; i++) {
            console.log('for loop :- ', this.error_josn_key_list[i]);
            console.log('key :-', key);
            if (this.error_josn_key_list[i] == key) {
                push_val = 'no'
                break;
            }
        }
        if (push_val == 'yes') {
            this.error_josn_key_list.push(key);
        }
        // console.log('yash stru :- ',JSON.stringify(this.error_validation_json));
        // console.log('ysy error :-',JSON.stringify(this.error_josn_key_list));
        // console.log('len :-',Object.keys(this.error_josn_key_list).length);

    }
    next_val_true(event) {
        let key = event.detail;
        for (let i = 0; i < this.error_josn_key_list.length; i++) {
            console.log('for loop :- ', this.error_josn_key_list[i]);
            console.log('key :-', key);
            if (this.error_josn_key_list[i] == key) {
                this.error_josn_key_list.splice(i, 1);
            }
        }
        // console.log('yash stru t:- ',JSON.stringify(this.error_validation_json));
        // console.log('ysy error t:-',JSON.stringify(this.error_josn_key_list));
        // console.log('len t:-',Object.keys(this.error_josn_key_list).length);

    }

    storefielddata(event) {
        console.log('OUTPUT yash test : ', event.detail);
        this.datawithleabel = event.detail
        var nameArr = this.datawithleabel.split('<!@!>');
        console.log('data key OUTPUT : ', nameArr[0]);
        console.log('data object OUTPUT : ', nameArr[1]);
        console.log('data value OUTPUT : ', nameArr[2]);
        let testt = 'no';
        let ind;

        if (this.first_object == nameArr[1]) {
            for (let i = 0; i < this.list_first_obj.length; i++) {
                if (this.list_first_obj[i] == nameArr[0]) {
                    console.log('u r in for loop if ');
                    testt = 'yes'
                    ind = i;
                }
            }
            if (testt == 'yes') {
                console.log(' u r in testt if');
                this.list_first_obj[ind].filde_vlue = nameArr[2];

            } else {
                console.log(' u r in testt else');
                this.list_first_obj[nameArr[0]] = nameArr[2];

            }
        } else if (this.second_object == nameArr[1]) {
            for (let i = 0; i < this.list_second_obj.length; i++) {
                if (this.list_second_obj[i] == nameArr[0]) {
                    console.log('u r in for loop if ');
                    testt = 'yes'
                    ind = i;
                }
            }
            if (testt == 'yes') {
                console.log(' u r in testt if');
                this.list_second_obj[ind].filde_vlue = nameArr[2];

            } else {
                console.log(' u r in testt else');
                this.list_second_obj[nameArr[0]] = nameArr[2];

            }
        } else if (this.third_object == nameArr[1]) {
            for (let i = 0; i < this.list_third_obj.length; i++) {
                if (this.list_third_obj[i] == nameArr[0]) {
                    console.log('u r in for loop if ');
                    testt = 'yes'
                    ind = i;
                }
            }
            if (testt == 'yes') {
                console.log(' u r in testt if');
                this.list_third_obj[ind].filde_vlue = nameArr[2];

            } else {
                console.log(' u r in testt else');
                this.list_third_obj[nameArr[0]] = nameArr[2];

            }
            } else {
            for (let i = 0; i < this.list_ext_obj.length; i++) {
                if (this.list_ext_obj[i] == nameArr[0]) {
                    console.log('u r in for loop if ');
                    testt = 'yes'
                    ind = i;
            }
        }
            if (testt == 'yes') {
                console.log(' u r in testt if');
                this.list_ext_obj[ind].filde_vlue = nameArr[2];

            } else {
                console.log(' u r in testt else');
                this.list_ext_obj[nameArr[0]] = nameArr[2];

    }

        }
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_first_obj)));
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_second_obj)));
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_third_obj)));
        console.log('Store field data OUTPUT : ', JSON.parse(JSON.stringify(this.list_ext_obj)));

    }
}