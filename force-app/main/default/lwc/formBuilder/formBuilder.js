import {
    LightningElement,
    track,
    wire,
    api
} from 'lwc';
import {
    ShowToastEvent
} from 'lightning/platformShowToastEvent';
import GetFormPage from '@salesforce/apex/FormBuilderController.GetFormPage';
import iconzip from '@salesforce/resourceUrl/NavigationBar'
import getFieldsRecords from '@salesforce/apex/FormBuilderController.getFieldsRecords';
import CreateFieldRecord from '@salesforce/apex/FormBuilderController.CreateFieldRecord';
import createPage from '@salesforce/apex/FormBuilderController.createPage';
import renameform from '@salesforce/apex/FormBuilderController.renameform';
import addPageBreak from '@salesforce/apex/FormBuilderController.addPageBreak';
import Add_icon from '@salesforce/resourceUrl/Add_icon';
import Edit_page_icon from '@salesforce/resourceUrl/Edit_page_icon';
import Edit_icon from '@salesforce/resourceUrl/Edit_icon';
import Delete_icon from '@salesforce/resourceUrl/Delete_icon';
// import getFormCSS from '@salesforce/apex/FormBuilderController.getFormCSS';
// import getPageCSS from '@salesforce/apex/FormBuilderController.getPageCSS';
// import getButtonCSS from '@salesforce/apex/FormBuilderController.getButtonCSS';
import right from '@salesforce/resourceUrl/right';
import cross from '@salesforce/resourceUrl/cross';
import dropHere from '@salesforce/resourceUrl/dropHere'
import deletePage from '@salesforce/apex/FormBuilderController.deletePage';
import {
    NavigationMixin
} from "lightning/navigation";
import iconsZip from '@salesforce/resourceUrl/Iconfolder';
// edit form part imports 
import Objects_Type from "@salesforce/apex/customMetadata.f_Get_Types";
import getCaptchatype from '@salesforce/apex/customMetadata.getCaptchatype'; //import get getCaptchatype method from custom Metadata apex class
import Objects_Type_2 from "@salesforce/apex/customMetadata.Get_Captcha_Types";
import getProgressindicator from '@salesforce/apex/customMetadata.getProgressindicator'; //import get getProgressindicator method from custom Metadata apex class

import pageDetails from '@salesforce/apex/FormBuilderController.pageDetails';
import updatePage from '@salesforce/apex/FormBuilderController.updatePage';
import editFormSubmit from '@salesforce/apex/FormBuilderController.editFormSubmit';

// Importing Apec Metods
import reOrderField from '@salesforce/apex/FormBuilderController.reOrderField';
import formdetails from '@salesforce/apex/FormBuilderController.formdetails';

export default class FormBuilder extends NavigationMixin(LightningElement) {


    @track spinnerDataTable = false;

    @api homeIcon = iconzip + '/home.png';
    fieldicon = iconzip + '/fields.png';
    designIcon = iconzip + '/designdesign.png';
    notificationicon = iconzip + '/notificationnotification.png';
    thankyouicon = iconzip + '/thankyou.png';
    previewIcon = iconzip + '/previewPreview.png';
    publishIcon = iconzip + '/Vectorpublishment.png';
    DeleteIcon = Delete_icon;

    editpageIcon = Edit_page_icon;
    addIcon = Add_icon;
    EditIcon = Edit_icon;
    cross = cross;
    right = right;
    outsideClick;
    dropHere = dropHere;
    @track newFormName = '';

    isModalOpen = false;
    isModalOpen1 = false;
    isModalOpen2 = false;
    spinnerTable = false;
    error_toast = true;

    @api ParentMessage = '';
    @api FormName = '';

    @track MainList = [];
    WieredResult;
    imageSpinner = false;
    pageImageSpinner = false;
    notShowField = true;
    showField = false;
    @track activeDropZone = true;
    @track FormId = this.ParentMessage;
    //dropzone variables
    count = 0;
    @track activeDesignsidebar = false;
    @track activesidebar = false;
    @track activeNotification = false;
    @track activethankyou = false;
    @track activepreview = false;
    @track activeqf_publish = false;
    @track PageList = [];
    @track FormTitle;
    @track FieldList = [];
    Id = this.ParentMessage; // Change When LMS Service Starts
    // Id='a0B1y00000013pXEAQ'
    EditButtonName = "Edit" //"{!'form:::'+v.FormId}"
    nextButton = 'NextButton';
    previousButton = 'previousButton';
    @track index = 0;
    @track newCSS;
    newPageId;
    @track newMainFormName;
    fieldcount = 0;
    removeObjFields = [];
    fieldvalidationdiv = false;
    @track tab = 'tab-2';
    @track fieldId;
    @track fieldName;

    @track isReorderingDrag = false;
    @track startFielId = '';

    @track hovercss;
    @track focuscss;
    @track fcss;
    @track lcss;
    @track pagecss;
    @track formcss;
    @track btncss;

    connectedCallback() {

        formdetails({
                id: this.ParentMessage
            })
            .then(result => {
                this.formcss = result.Form_Styling__c;
                this.btncss = result.Button_CSS__c;
                this.pagecss = result.Page_CSS__c;
                this.hovercss = result.All_Field_Hover__c;
                this.focuscss = result.All_Field_Focus__c
                this.fcss = result.All_Field_Styling__c;
                this.lcss = result.Label_CSS__c;
            })
        this.spinnerDataTable = true;
        this.activesidebar = true;
        this.reloadform();

    }

    reloadform() {
        GetFormPage({
                Form_Id: this.ParentMessage
            })
            .then(result => {
                this.PageList = result;
                console.log('this-->>');
                console.log('*** pageList ==>', result);
                console.log(this.PageList[0].Name);
                console.log(this.PageList.length);

            }).catch(error => {
                console.log(error);
            });
        getFieldsRecords({
                id: this.ParentMessage
            })
            .then(result => {
                console.log('whyyyy');
                console.log('*** FieldList ==>', result);
                this.FieldList = result;
                this.setPageField(result);
                if (this.tab == 'tab-2') {
                    var allDiv = this.template.querySelector('.tab-2');
                    allDiv.style = 'background-color: #8EBFF0;padding: 12%;border-radius: 50%;';
                }
                console.log(this.FieldList.length);
            })
            .catch(error => {
                console.log(error);
                var allDiv = this.template.querySelector('.tab-2');
                allDiv.style = 'background-color: #8EBFF0;padding: 12%;border-radius: 50%;';
            });

        if (this.tab == 'tab-2') {
            this.activesidebar = true;
        }

    }

    renderedCallback() {
        console.log('inside the renderedcallBack--->>>');
        console.log(this.removeObjFields.length);
        this.tempararyfun();
        console.log('Renderedcallback formbuilder');
        // getFormCSS({
        //         id: this.ParentMessage
        //     })
        //     .then(result => {
                if (this.formcss !=undefined && this.formcss != null) {   
                    // this.getFieldCSS = result;
                    console.log('FormCSS->> ' + this.formcss);
                    let array = this.template.querySelector('.myform');
                    let str = this.formcss;
                    array.style = str;
                }
            // }).catch(error => {
            //     console.log('Error in getFormCSS ==>' + error);
            //     console.log({
            //         error
            //     });
            // })

        // getButtonCSS({
        //         id: this.ParentMessage
        //     })
        //     .then(result => {
        //         console.log(result);
                if (this.btncss !=undefined && this.btncss != null) {
                    let str = this.btncss;
                    let arr = this.template.querySelectorAll('.btn1');
                    for (let i = 0; i < arr.length; i++) {
                        const element = arr[i];
                        element.style = str;
                    }
                    let arr2 = this.template.querySelectorAll('.footer');
                    for (let i = 0; i < arr2.length; i++) {
                        const element = arr2[i];
                        element.style = 'justify-content:' + (str.split(';justify-content:')[1]);;
                    }
                }
            // }).catch(error => {
            //     console.log('Error in getButtonCSS ==>' + error);
            //     console.log({
            //         error
            //     });
            // })

        // getPageCSS({
        //         id: this.ParentMessage
        //     })
        //     .then(result => {
        //         console.log(result);
                if (this.pagecss !=undefined && this.pagecss != null) {
                    // this.getFieldCSS = this.pagecss;
                    console.log('PageCSS->> ' + this.pagecss);
                    let array = this.template.querySelectorAll('.page');
                    let str = this.pagecss;
                    for (let i = 0; i < array.length; i++) {
                        const element = array[i];
                        console.log(i + '*--*' + element);
                        element.style = str;
                    }
                    // this.spinnerDataTable = false;
                }
            // }).catch(error => {
            //     console.log('Error in getPageCSS ==>' + error);
            //     console.log({
            //         error
            //     });
            //     // this.spinnerDataTable = false;
            // })


    }

    get isIndexZero() {

        if (this.index == 0) {
            this.index += 1;
            return true;
        }
        return false;
    }
    get isIndexIsNotLast() {

        if (this.index != this.PageList.length - 1) {
            this.index += 1;
            return true;
        }
        return false;
    }
    get isIndexLast() {
        if (this.index == this.PageList.length - 1) {
            return true;
        }
        return false;
    }

    handlelabelcss(event) {
        this.newCSS = event.detail;
        console.log(event.detail);
        console.log('newCSS->> ' + this.newCSS);
        console.log(this.template.querySelectorAll("c-quickformfieldcomponent"));
        let Arr = this.template.querySelectorAll("c-quickformfieldcomponent");
        for (let i = 0; i < Arr.length; i++) {
            const element = Arr[i];
            console.log(i + '--' + element);
            element.LabelCSSUpdate(this.newCSS);
        }
        // this.template.querySelector("c-quickformfieldcomponent").FieldCSSUpdate(this.newCSS);
        console.log('After handlelabelCSS');
    }

    handlehovercss(event) {
        console.log(event.detail);
        console.log(this.template.querySelectorAll("c-quickformfieldcomponent"));
        let Arr = this.template.querySelectorAll("c-quickformfieldcomponent");
        for (let i = 0; i < Arr.length; i++) {
            const element = Arr[i];
            console.log(i + '--' + element);
            element.handleeffect('hover', event.detail);
        }
        // this.template.querySelector("c-quickformfieldcomponent").FieldCSSUpdate(this.newCSS);
        console.log('After handlelabelCSS');
    }

    handlefocuscss(event) {
        console.log(event.detail);
        console.log(this.template.querySelectorAll("c-quickformfieldcomponent"));
        let Arr = this.template.querySelectorAll("c-quickformfieldcomponent");
        for (let i = 0; i < Arr.length; i++) {
            const element = Arr[i];
            console.log(i + '--' + element);
            element.handleeffect('focus', event.detail);
        }
        // this.template.querySelector("c-quickformfieldcomponent").FieldCSSUpdate(this.newCSS);
        console.log('After handlelabelCSS');
    }

    handlepagecss(event) {
        // let str = event.detail;
        // let array = this.template.querySelectorAll('.page');
        // for (let i = 0; i < array.length; i++) {
        //     const element = array[i];
        //     console.log(i+'--'+element);
        //     element.style = str;
        // }
        // this.spinnerDataTable = false;
        this.spinnerDataTable = false;
        // getPageCSS({
        //         id: this.ParentMessage
        //     })
        //     .then(result => {
                console.log(event.detail);
                this.pagecss = event.detail;
                console.log('PageCSS->> ' + this.pagecss);
                let array = this.template.querySelectorAll('.page');
                let str = this.pagecss;
                for (let i = 0; i < array.length; i++) {
                    const element = array[i];
                    console.log(i + '--' + element);
                    element.style = str;
                }
                this.spinnerDataTable = false;
            // }).catch(error => {
            //     console.log({
            //         error
            //     });
            //     this.spinnerDataTable = false;
            // })
    }

    handleformcss(event) {
        this.spinnerDataTable = false;
        // getFormCSS({
        //         id: this.ParentMessage
        //     })
        //     .then(result => {
                console.log(event.detail);
                this.formcss = event.detail;
                console.log('FieldCSS->> ' + this.formcss);
                let array = this.template.querySelector('.myform');
                let str = this.formcss;
                array.style = str;
            // }).catch(error => {
            //     console.log({
            //         error
            //     });
            // })
        // console.log(event.detail);
        // let str = event.detail;
        // let array = this.template.querySelector('.myform');
        // array.style=str;
    }

    handlebtnpos(event) {
        var str = event.detail;
        console.log('btnpost :- ' + str);
        let Arr = this.template.querySelectorAll(".footer");
        console.log('Arr btn pos:- ' + Arr.length);
        for (let i = 0; i < Arr.length; i++) {
            const element = Arr[i];
            console.log(i + '--' + {
                element
            });
            element.style = str;
        }
    }

    handlebtncss(event) {
        var str = event.detail;
        console.log('btnpost :- ' + str);
        let Arr = this.template.querySelectorAll(".btn1");
        console.log('Arr btn pos:- ' + Arr.length);
        for (let i = 0; i < Arr.length; i++) {
            const element = Arr[i];
            console.log(i + '--' + {
                element
            });
            element.style = str;
        }
        // this.template.querySelector('footer').style = 'gap:' + ((str.split(';gap:')[1]).split(';')[0]);
    }

    handlenewCSS(event) {
        try {
            this.fcss = event.detail;
            console.log('After handlenewCSS');
            console.log('FieldCSS->> ' + this.fcss);
            console.log(this.template.querySelectorAll('c-quickformfieldcomponent'));
            let array = this.template.querySelectorAll('c-quickformfieldcomponent');
            console.log(array.length);
            let str = '';
            if (this.fcss == undefined || this.fcss == null || this.fcss == '') {
                str = this.getFieldCSS1;
            } else {
                str = this.fcss;
            }
            let Arr = str.split(';color:');
            let Arr2 = Arr[1].split(';');
            let pcolor = Arr2[0];
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                element.FieldCSSUpdate(str);
                // element.style.setProperty("--c", pcolor);
            }
            // this.template.querySelector('select').style = str;
        } catch (error) {
            console.log("In the catch block ==> Method :** FieldCSSUpdate ** || LWC:** formbuilder ** ==>", {
                error
            });
            console.log('above error ==>' + error);
        }
    }


    //  @wire(getFieldsRecords)
    //  wiredCallback(result) {
    //   this.WieredResult = result;
    //   if (result.data) {
    //       this.FieldList = result.data;
    //       console.log('get fields method called-->');
    //   } else if (result.error) {
    //       this.error = result.error;
    //   }
    //  }
    handleActive(event) {
        this.tab = event.currentTarget.dataset.title;
        console.log(event.currentTarget.dataset.title);
        console.log('inside onclick');
        var divid = '.' + event.currentTarget.dataset.title;

        var allDiv = this.template.querySelectorAll('.image-tab');
        console.log(allDiv.length);
        for (var i = 0; i < allDiv.length; i++) {
            allDiv[i].style = 'background-color:none';
        }
        var Div = this.template.querySelector(divid);
        console.log(Div);
        Div.style = 'background-color: #8EBFF0;padding: 12%;border-radius: 50%;';

        console.log(event.currentTarget.dataset.title);
        console.log('check if condition-=->');
        if (event.currentTarget.dataset.title == 'tab-1') {
            console.log('tab-1 if ..');
            let cmpDef = {
                componentDef: "c:qf_home",
            };
            let encodedDef = btoa(JSON.stringify(cmpDef));
            console.log('OUTPUT : ', encodedDef);
            this[NavigationMixin.Navigate]({
                type: "standard__webPage",
                attributes: {
                    url: "/one/one.app#" + encodedDef
                }
            });
        } else if (event.currentTarget.dataset.title == 'tab-2' || event.currentTarget.dataset.title == 'tab-3') {
            console.log('in tab-2 or tab-3 code-->');
            if (event.currentTarget.dataset.title == 'tab-2') {
                if (this.fieldvalidationdiv == true) {
                    this.template.querySelector('.fieldvalidationdiv').style = "display:none;";
                    this.fieldvalidationdiv = false;
                }
                if (this.activesidebar == false) {
                    this.spinnerDataTable = true;
                }
                // this.activeDropZone = true

                this.activesidebar = true;
                this.activeDesignsidebar = false;
                this.activeNotification = false;
                this.activethankyou = false;

            } else if (event.currentTarget.dataset.title == 'tab-3') {
                if (this.fieldvalidationdiv == true) {
                    this.template.querySelector('.fieldvalidationdiv').style = "display:none;";
                    this.fieldvalidationdiv = false;
                }
                this.activeDesignsidebar = true;
                this.activesidebar = false;
                this.activeNotification = false;
                this.activethankyou = false;

            }


            console.log('in the if condition');
            this.activepreview = false;
            this.activeqf_publish = false;
            this.activeDropZone = true;
            console.log(this.activeDropZone);
        } else if (event.currentTarget.dataset.title == 'tab-4') {
            console.log('Tab-4');
            this.fieldvalidationdiv = false;
            this.activeDesignsidebar = false;
            this.activesidebar = false;
            this.activeDropZone = false;
            this.activeNotification = true;
            this.activethankyou = false;
            this.activepreview = false;
            this.activeqf_publish = false;
        } else if (event.currentTarget.dataset.title == 'tab-5') {
            this.fieldvalidationdiv = false;
            this.activeDesignsidebar = false;
            this.activesidebar = false;
            this.activeDropZone = false;
            this.activeNotification = false;
            this.activethankyou = true;
            this.activepreview = false;
            this.activeqf_publish = false;
        } else if (event.currentTarget.dataset.title == 'tab-6') {
            this.fieldvalidationdiv = false;
            this.activeDesignsidebar = false;
            this.activesidebar = false;
            this.activeDropZone = false;
            this.activeNotification = false;
            this.activethankyou = false;
            this.activepreview = false;
            this.activeqf_publish = false;
        } else if (event.currentTarget.dataset.title == 'tab-7') {
            this.fieldvalidationdiv = false;
            this.activepreview = true;
            this.activeqf_publish = false;
            this.activeDesignsidebar = false;
            this.activesidebar = false;
            this.activeDropZone = false;
            this.activeNotification = false;
            this.activethankyou = false;
        } else if (event.currentTarget.dataset.title == 'tab-8') {
            this.fieldvalidationdiv = false;
            this.activeDesignsidebar = false;
            this.activesidebar = false;
            this.activeDropZone = false;
            this.activeNotification = false;
            this.activethankyou = false;
            this.activepreview = false;
            this.activeqf_publish = true;
        } else {
            this.fieldvalidationdiv = false;
            this.activesidebar = false;
            this.activeDropZone = false;
            this.activeDesignsidebar = false;

        }
    }

    dragLeave() {

    }

    onDragOver(event) {
        try {
            var dropzone = this.template.querySelector('.example-dropzone');
            dropzone.style = "opacity:1.0";
            event.preventDefault();
        } catch (error) {
            console.log("In the catch block ==> Method :** onDragOver ** || LWC:** formBuilder ** ==>", {
                error
            });
            console.log('above error ==>' + error);
        }
    }

    /***************************************************************
     ** Author             : Nitin
     ** Created Date       : 22/02/2023
     ** Last Modified Date : 22/02/2023
     ** Description        : Used when field is draged for Reordering
     ***************************************************************/
    onDragStart(event) {
        try {
            this.isReorderingDrag = true;

            var DraggedLabel = event.target.dataset.record;
            var classname = event.target.className;
            var pageId = event.target.dataset.pageRecord;
            this.startFielId = event.target.dataset.fieldId;
            var SenddataObj = {
                record: DraggedLabel,
                type: classname,
                PageId: pageId
            };
            console.log(DraggedLabel);

            console.log('*** DragLabel ==>' + DraggedLabel);
            console.log('*** classname ==>' + classname);
            console.log('*** pageId ==>' + pageId);
            console.log('*** startFielId ==>' + this.startFielId);
            console.log('*** SenddataObj ==>' + JSON.stringify(SenddataObj));
            console.log('event.target.dataset JSON==>', JSON.stringify(event.target.dataset));
            console.log('event.target.dataset ==>', event.target.dataset);
            console.log('evenet ==>', event.target);
            console.log('On drag start-->');

            // if (DraggedLabel == null) {
            //     this.onDragOver();
            // } else {
            //     console.log('in else condition');
            //     event.dataTransfer.setData('text/plain', JSON.stringify(SenddataObj));
            // }

            event.dataTransfer.setData('text/plain', JSON.stringify(event.target.dataset));

        } catch (error) {
            console.log("In the catch block ==> Method :** onDragStart ** || LWC:** formBuilder ** ==>", {
                error
            });
            console.log('above error ==>' + error);
        }
    }

    async onDrop(event) {

        if (this.isReorderingDrag) {
            // this.spinnerDataTable = true;
            // event.dataTransfer.getData('text/plain', JSON.stringify(event.target.dataset));
            var dropFieldId = event.target.dataset.fieldId;
            var dropPageId = event.target.dataset.pageRecord;

            // Checking variable is undefined or not if undifined that it will be replaced with empty string.
            dropFieldId = typeof dropFieldId === 'undefined' ? '' : dropFieldId;

            console.log('*** dropFieldId ==>', dropFieldId);
            console.log('*** on drop event.target ==>', event.target);
            console.log('*** dropFieldId JSON==>', JSON.stringify(dropFieldId));
            console.log('*** dropPageId ==>', dropPageId);

            reOrderField({
                    dropFieldId: dropFieldId,
                    currentFieldId: this.startFielId,
                    dropPageId: dropPageId
                })
                .then((result) => {
                    console.log("*** result from apex class ==>", result);
                    this.setPageField(result);

                })
                .catch((error) => {
                    console.log('*** Error From reOrderField ==>');
                    console.log({
                        error
                    });
                    // this.spinnerDataTable = false;
                });
            // this.spinnerDataTable = false;

        } else {
            var dropzone = this.template.querySelectorAll('.example-dropzone');
            for (let i = 0; i < dropzone.length; i++) {
                let field = dropzone[i].querySelectorAll('.field');
                if (field.length == 0) {
                    dropzone[i].style = "opacity:1.0;background-image:none;height:auto";
                } else {
                    dropzone[i].style = "opacity:1.0";
                }
            }

            console.log('ondrop start -->', dropzone);
            let Fieldid = event.dataTransfer.getData('text');
            let FieldLabel = JSON.parse(Fieldid);
            var classname = event.target.className;
            var pageIdOfField = '';
            var PageRecordId = event.target.dataset.pageRecord;
            var position = 0;
            var OldFieldSend = false;
            let fieldLabelOfRemovedFeild = FieldLabel.record;

            //console.log('Dropzone length' + dropzone.length);
            console.log(classname);
            console.log({
                FieldLabel
            });
            console.log('ondrop start-->');
            console.log(Fieldid);
            console.log('parent class->' + event.target.parentElement.className);

            let isPageBreak = false;
            let oldfieldId = 'na';
            console.log('inside the fieldlalbe---->>>>' + FieldLabel.record);
            if (FieldLabel.record == 'QFPAGEBREAK') {
                isPageBreak = true;
            }
            console.log(isPageBreak);
            if (classname == 'field') {
                if (FieldLabel.type == 'field') {
                    OldFieldSend = true;
                    oldfieldId = event.target.dataset.record;
                    pageIdOfField = FieldLabel.PageId;
                    position = event.target.dataset.orderId - 1;
                    console.log(pageIdOfField);
                } else {
                    position = event.target.dataset.orderId;
                }
                console.log('position :- ' + position);
            }

            if (classname == '') {
                classname = event.target.parentElement.className;
                PageRecordId = event.target.parentElement.dataset.pageRecord;
                if (FieldLabel.type == 'field') {
                    OldFieldSend = true;
                    pageIdOfField = FieldLabel.PageId;
                    console.log(pageIdOfField);
                    console.log(PageRecordId);
                    position = event.target.parentElement.dataset.orderId - 1;

                } else {
                    position = event.target.parentElement.dataset.orderId;
                }

                console.log(classname);
            }

            console.log(event.target.dataset);
            console.log(PageRecordId);
            console.log(FieldLabel);
            console.log(FieldLabel.record);
            console.log(FieldLabel.type);
            var FieldName = FieldLabel.record;


            if (FieldLabel.type != 'Extra' && FieldLabel.type != 'field') {
                FieldName = FieldName + ',' + FieldLabel.type;

            }
            console.log('field label type------->' + FieldLabel.type);
            if (FieldLabel.type == 'Extra') {

                this.checkCount(FieldName);
                console.log('get count successfully-->', this.count);
                FieldName = FieldName + ',' + FieldLabel.type + ',' + this.count;


                console.log('inside field extra');

            }

            var FieldElement = document.querySelectorAll('.field');
            if (isPageBreak) {
                var dropFieldId = event.target.dataset.fieldId;
                // Checking variable is undefined or not if undifined that it will be replaced with empty string.
                dropFieldId = typeof dropFieldId === 'undefined' ? '' : dropFieldId;
                console.log('*** dropField From PageBreak ====>' + dropFieldId);

                await this.makePageBreak(FieldName, PageRecordId, position, dropFieldId);
            } else {
                await this.SaveFields(FieldName, PageRecordId, position, OldFieldSend, pageIdOfField, fieldLabelOfRemovedFeild);

                console.log('both methods are called and finish');
            }

        }
    }

    async makePageBreak(FieldName, pageId, position, dropFieldId) {
        try {
            console.log('inside the page break---');
            console.log("field id -->" + FieldName);
            console.log("pageId-->" + pageId);
            console.log('postion-->' + position);
            console.log('dropFieldId-->' + dropFieldId);
            addPageBreak({
                    FormId: this.ParentMessage,
                    Name: FieldName,
                    Position: position,
                    Form_Page_Id: pageId,
                    dropFieldId: dropFieldId
                })
                .then(result => {
                    this.FieldList = result.fieldList;
                    console.log('inside the result in page break-->');
                    console.log(result);
                    this.PageList = result.pageList;
                    this.setPageField(result.fieldList);
                })
                .catch(err => {
                    console.log('inside the error in page break');
                    console.log({
                        err
                    });
                })
        } catch (error) {
            console.log("In the catch block ==> Method :** makePageBreak ** || LWC:** formBuilder ** ==>", {
                error
            });
            console.log('above error ==>' + error);
        }

    }


    async SaveFields(FieldName, pageId, position, OldFieldSend, fieldPageId, fieldlabelname) {
        console.log('inside saveField');
        console.log(pageId);
        console.log(fieldPageId);

        CreateFieldRecord({
            Form_Id: this.ParentMessage,
            Name: FieldName,
            Form_Page_Id: pageId,
            Field_Page_Id: fieldPageId,
            Position: position,
            isold: OldFieldSend
        }).then(result => {
            this.FieldList = result;
            this.setPageField(result);

        }).catch(err => {
            console.log(err);
        });
        this.template.querySelector("c-fields-section-component").removeField(fieldlabelname);
        console.log('log---------------->' + this.template.querySelector("c-fields-section-component"));
    }

    passToParent(event) {
        if (event.detail == true) {
            console.log('in pass to parent');
            // var dropzone = document.querySelector('div');
            var dropzone = this.template.querySelectorAll('.example-dropzone');
            for (let i = 0; i < dropzone.length; i++) {
                var field = dropzone[i].querySelectorAll('.field');
                // console.log('important message --->>>>', field.length);
                // console.log({ dropzone });
                // console.log('drop zone length' + dropzone.length);
                // console.log(JSON.stringify(dropzone));
                if (field.length == 0) {
                    dropzone[i].style = "background-image: url('/resource/dropHere');background-size: cover;background-repeat: no-repeat;height:120px;";
                    //     dropzone[i].style = "background-size: cover";
                    // dropzone[i].style = "background-repeat: no-repeat";
                } else {
                    dropzone[i].style = "opacity:0.4";
                }
            }
        } else {
            console.log('else part executed successfully---->');
            var dropzone = this.template.querySelectorAll('.example-dropzone');
            for (let i = 0; i < dropzone.length; i++) {
                var field = dropzone[i].querySelectorAll('.field');
                //console.log('important message --->>>>', field.length);
                // console.log({ dropzone });
                // console.log('drop zone length' + dropzone.length);
                // console.log(JSON.stringify(dropzone));
                if (field.length == 0) {
                    console.log('inside dropzone');
                    dropzone[i].style = 'background-image:none;height:auto;opacity:1.0';
                } else {
                    dropzone[i].style = "opacity:1.0";
                }
            }
        }
    }


    setPageField(fieldList) {
        try {
            console.log('in set PageField');
            let outerlist = [];
            let isIndexZero = false;
            let islast = false;
            let isnotlast = false;
            for (let i = 0; i < this.PageList.length; i++) {
                let innerlist = [];
                if (i == 0) {
                    isIndexZero = true;
                } else if (i == this.PageList.length - 1) {
                    islast = true;
                } else if (i != this.PageList.length - 1) {
                    isnotlast = true;
                }
                for (let j = 0; j < fieldList.length; j++) {
                    if (this.PageList[i].Id == fieldList[j].Form_Page__c) {
                        console.log('inside inner loop');
                        let fieldofObj = fieldList[j].Name.split(',');
                        let fieldtype;
                        if (fieldofObj[1] == 'Extra') {
                            fieldtype = false;
                        } else {
                            fieldtype = true;
                        }
                        console.log(fieldtype + 'fieldtpys');
                        console.log('in setpage field----->' + fieldofObj);
                        if (fieldofObj.length == 2) {
                            console.log(fieldofObj.length);
                            if (fieldofObj[1] != 'Extra' && fieldofObj[1] != undefined && fieldofObj[1] != 'undefined') {
                                console.log(fieldofObj[0]);
                                this.removeObjFields.push(fieldofObj[0]);
                            }
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

                        if (fieldList[j].Field_Validations__c) {
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
                        }
                        innerlist.push(fieldList[j]);
                    }
                }

                let temp = {
                    pageName: this.PageList[i].Name,
                    pageId: this.PageList[i].Id,
                    isIndexZero: isIndexZero,
                    isIndexLast: islast,
                    isIndexIsNotLast: isnotlast,
                    FieldData: innerlist
                };
                isIndexZero = false;
                islast = false;
                isnotlast = false;
                outerlist.push(temp);
            }
            this.MainList = outerlist;
            // console.log('***Main List ==>', JSON.stringify(outerlist));
            console.log('***Main List ==>', JSON.stringify(this.MainList));
            console.log('before renderedCallback');
        } catch (error) {
            console.log("In the catch block ==> Method :** setPageField ** || LWC:** formBuilder ** ==>", {
                error
            });
            console.log('above error ==>' + error);
        }

    }

    tempararyfun() {
        for (let i = 0; i < this.removeObjFields.length; i++) {
            console.log('log---------------->' + this.template.querySelector("c-fields-section-component"));
            this.template.querySelector("c-fields-section-component").removeField(this.removeObjFields[i]);
        }
    }

    checkCount(fieldname) {
        console.log('fieldList--->' + this.FieldList.length);
        let fieldAttributeList = [];
        let count1 = 0;
        for (let i = 0; i < this.FieldList.length; i++) {
            var tmmp = this.FieldList[i].Name;
            fieldAttributeList = tmmp.split(',');
            if (fieldAttributeList.length == 3) {
                console.log('in if condition ------>>>>');
                if (fieldAttributeList[0] == fieldname) {
                    count1 = count1 + 1;
                }
            }
        }
        console.log('after for loop-->');
        this.count = count1;
    }

    editPageName(event) {
        this.newFormName = event.currentTarget.dataset.record;
        console.log(event.target.dataset.record);
        console.log('inside the editpage-->');

        this.template.querySelector("div[data-record-id =" + event.currentTarget.dataset.id + "]").style.display = 'none';
        this.template.querySelector("div[data-name =" + event.currentTarget.dataset.id + "]").style.display = 'flex';
        // document.addEventListener('click', this.outsideClick = this.cancleRenameForm.bind(this));
        event.stopPropagation();
        return false;
    }

    renameForm(event) {
        // console.log(String.fromCharCode(event.keyCode));
        console.log('inside the rename Form--->>>');
        this.template.querySelector("div[data-record-id =" + event.currentTarget.dataset.id + "]").style.display = 'block';
        console.log('qury selectro one =>>>');
        this.template.querySelector("div[data-name =" + event.currentTarget.dataset.id + "]").style.display = 'none';
        console.log('query selector executed suc=>>>');
        if (this.newFormName.length > 0 && this.newFormName.replaceAll(' ', '').length > 0) {
            renameform({
                id: event.currentTarget.dataset.id,
                rename: this.newFormName,
                FormId: this.ParentMessage
            }).then(result => {
                this.FieldList = result.fieldList;
                console.log('inside the result in page rename-->');
                console.log(result);
                this.PageList = result.pageList;
                this.setPageField(result.fieldList);
                console.log('page  name changed');

            }).catch(err => {
                console.log(err);
            })
        }
    }

    rename(event) {
        console.log('inside on change-->');
        console.log(event.target.value);
        this.newFormName = event.target.value;
    }

    cancleRenameForm(event) {
        //this.pencheck = false;
        //document.removeEventListener('click', this.outsideClick);
        console.log('inside canleRenameForm');
        this.template.querySelector("div[data-record-id =" + event.currentTarget.dataset.id + "]").style.display = 'block';
        this.template.querySelector("div[data-name =" + event.currentTarget.dataset.id + "]").style.display = 'none';
    }

    handleeditForm(event) {
        // this.newFormName = event.currentTarget.dataset.record;
        // console.log(event.target.dataset.record);
        console.log('inside the editpage-->');
        console.log('id----------------->' + this.ParentMessage);
        this.isModalOpen = true;
        console.log('method calles');
        formdetails({
            id: this.ParentMessage
        }).then(result => {
            console.log('handleeditForm-------->' + result);
            this.FormDetails = result;
            console.log('formdetails called');
            if (this.FormDetails.Name != null) {
                this.formtitle = this.FormDetails.Name;
                this.FormName = this.FormDetails.Name;
            }

            if (this.FormDetails.hasOwnProperty("Captcha_Type__c")) {
                console.log(this.FormDetails.Captcha_Type__c);

                this.captchTypeparent = this.FormDetails.Captcha_Type__c;
                this.template.querySelector('c-captcha-type').preview_chptchatype(this.captchTypeparent);
            } else {
                console.log('in none');
                this.captchTypeparent = 'None';
            }

            if (this.FormDetails.hasOwnProperty("Progress_Indicator__c")) {
                console.log('inside the hasownPorperty');
                this.Progressbarvalue = this.FormDetails.Progress_Indicator__c;
                this.template.querySelector('c-progress-indicator').tesmethod(this.Progressbarvalue);
            } else {
                this.Progressbarvalue = 'None';
            }
        }).catch(err => {
            console.log(err);
        })
    }


    handleAddPage() {
        try {
            console.log('total pages--------->' + this.PageList.length);
            console.log('handle add page............');
            this.isModalOpen1 = true;
        } catch (error) {
            console.log("In the catch block ==> Method :** handleAddPage ** || LWC:** formBuilder ** ==>", {
                error
            });
            console.log('above error ==>' + error);
        }
    }

    pageeeee
    @track pagetitle;
    @track pagenumber;
    @track pagetitle2;
    @track pagenumber2;
    openmodal2(event) {
        console.log('openmodel2 is called...............');
        this.isModalOpen2 = true;
        console.log('form id---------->' + this.ParentMessage);
        console.log('page id----------->' + event.currentTarget.dataset.id);
        this.IdId = event.currentTarget.dataset.id;
        pageDetails({
            FormId: this.ParentMessage,
            PageId: event.currentTarget.dataset.id
        }).then(result => {
            console.log('page detail result ---------->' + result);
            this.PageDetails = result;

            if (this.PageDetails.Name != null) {
                this.pagetitle2 = this.PageDetails.Name;
                console.log('pagetitle2------------->' + this.pagetitle2);
            }
            if (this.PageDetails.hasOwnProperty("Page_Number__c")) {
                this.pagenumber2 = this.PageDetails.Page_Number__c;
                this.pageeeee = this.PageDetails.Page_Number__c;
                console.log('pagenumber2------------>' + this.pagenumber2);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    changePageTitle(event) {
        this.pagetitle = event.target.value;
        console.log('Page Title :- ' + this.pagetitle);
    }

    changePageTitle2(event) {
        // this.IdId = event.currentTarget.dataset.id
        this.pagetitle2 = event.target.value;
        console.log('Page Title2 :- ' + this.pagetitle2);
        // console.log('IdId :- '+this.IdId);
    }

    changePageNo(event) {
        this.pagenumber = event.target.value;
        console.log('Page Number :- ' + this.pagenumber);
    }

    changePageNo2(event) {
        this.pagenumber2 = event.target.value;
        console.log('Page Number2 :- ' + this.pagenumber2);
    }

    handleeditPage(event) {
        console.log('page id----------->' + this.IdId);
        console.log('pageTitle2----------->' + this.pagetitle2);
        console.log('pageNumber2----------->' + this.pagenumber2);
        if (this.pagenumber2 < this.pageeeee) {
            this.pagenumber2 = this.pagenumber2 - 1;
        }
        updatePage({
            formId: this.ParentMessage,
            pageId: this.IdId,
            pageTitle: this.pagetitle2,
            pageNumber: this.pagenumber2
        }).then(result => {
            this.FieldList = result.fieldList;
            console.log('inside the result in page break-->');
            console.log(result);
            this.PageList = result.pageList;
            this.setPageField(result.fieldList);
            // this.showToast('Form Page updated Successfully','success');
            let toast_error_msg = 'Form Page updated Successfully';
            this.error_toast = true;
            this.template.querySelector('c-toast-component').showToast('success', toast_error_msg, 3000);
        }).catch(err => {
            console.log({
                err
            });
            let toast_error_msg = 'Error while updating in the form page, Please try again later';
            this.error_toast = true;
            this.template.querySelector('c-toast-component').showToast('error', toast_error_msg, 3000);
        })
        this.isModalOpen2 = false;
    }

    handleValidation() {
        let nameCmp = this.template.querySelector(".nameCls");
        console.log({
            nameCmp
        });

        if (!nameCmp.value || nameCmp.value.trim().length == 0) {
            console.log('test for form titel');
            nameCmp.setCustomValidity("Form Title is required");
        } else {
            nameCmp.setCustomValidity(""); // clear previous value
            // this.formdetails = false;
            // this.objectselection = true;
            this.submitDetails();
        }
        nameCmp.reportValidity();
    }

    handleValidation1() {
        try {
            let nameCmp1 = this.template.querySelector(".nameCls1");
            if (!nameCmp1.value || nameCmp1.value.trim().length == 0) {
                console.log('test for form titel');
                nameCmp1.setCustomValidity("Page Title is required");
            } else {
                nameCmp1.setCustomValidity(""); // clear previous value
                // this.formdetails = false;
                // this.objectselection = true;
                this.handlecreatePage();
            }
            nameCmp1.reportValidity();
        } catch (error) {
            console.log("In the catch block ==> Method :** handleValidation1 ** || LWC:** formBuilder ** ==>", {
                error
            });
            console.log('above error ==>' + error);
        }
    }

    handleValidation2() {
        let nameCmp2 = this.template.querySelector(".nameCls2");
        if (!nameCmp2.value || nameCmp2.value.trim().length == 0) {
            console.log('test for form titel');
            nameCmp2.setCustomValidity("Page Title is required");
        } else {
            nameCmp2.setCustomValidity(""); // clear previous value
            // this.formdetails = false;
            // this.objectselection = true;
            this.handleeditPage();
        }
        nameCmp2.reportValidity();
    }

    handlecreatePage() {
        try {
            console.log('total pages--------->' + this.PageList.length);
            createPage({
                pageNumber: this.pagenumber,
                totalPages: this.PageList.length,
                formId: this.ParentMessage,
                pagename: this.pagetitle
            }).then(result => {
                this.FieldList = result.fieldList;
                console.log('inside the result in page break-->');
                console.log(result);
                this.PageList = result.pageList;
                this.setPageField(result.fieldList);
                // this.showToast('Form Page create Successfully','success');
                let toast_error_msg = 'Form Page create Successfully';
                this.error_toast = true;
                this.template.querySelector('c-toast-component').showToast('success', toast_error_msg, 3000);
            }).catch(err => {
                console.log({
                    err
                });
                let toast_error_msg = 'Error while creating page, Please try again later';
                this.error_toast = true;
                this.template.querySelector('c-toast-component').showToast('error', toast_error_msg, 3000);
            })
            this.isModalOpen1 = false;
            this.handleModalClose();

        } catch (error) {
            console.log("In the catch block ==> Method :** handlecreatePage ** || LWC:** formBuilder ** ==>", {
                error
            });
            console.log('above error ==>' + error);
        }
    }

    handleModalClose() {
        this.pagetitle = '';
        this.pagenumber = null;
    }

    closeModal1() {
        this.isModalOpen1 = false;
    }

    closeModal2() {
        this.isModalOpen2 = false;
    }

    deletePage(event) {
        console.log('deleting---------------->' + event.currentTarget.dataset.record);
        deletePage({
            FormId: this.ParentMessage,
            PageId: event.currentTarget.dataset.record
        }).then(result => {
            this.FieldList = result.fieldList;
            console.log('inside the result in page break-->');
            console.log(result);
            var pagelength = result.pageList.length == this.PageList.length;
            this.PageList = result.pageList;
            this.setPageField(result.fieldList);
            if (pagelength) {
                this.template.querySelector('c-toast-component').showToast('error', 'You cannot delete the page', 3000);

            } else {
                this.template.querySelector('c-toast-component').showToast('success', 'Page deleted successfully', 3000);
            }
        })
    }

    showToast(title, variant) {
        const event = new ShowToastEvent({
            title: title,
            variant: variant,
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    startspinner(event) {
        this.spinnerDataTable = true;
        console.log('Spinner Start');
    }

    stopspinner(event) {
        this.spinnerDataTable = false;
        console.log('Spinner Stop');
    }

    @track formtitle;
    @track description;
    @track ispreview_show_msg_captcha = true;
    @track ispreview_show_msg = false;
    @track pi = true;
    @track ct = true;
    @track l_All_Types;
    @track TypeOptions;
    @track FormDetails;
    @track PageDetails;
    @wire(getProgressindicator) records;
    @wire(getCaptchatype) captcharecords;
    @track l_All_Types_2;
    @track TypeOptions_2;
    @track Progressbarvalue;
    @track captchTypeparent;

    @track global_options
    changeFormTitle(event) {
        this.formtitle = event.target.value;
        console.log('Form Title :- ' + this.formtitle);
        this.isModalOpen_2 = false;
        // alert('hiiii :- '+this.formtitle);
    }

    changeDescription(event) {
        this.description = event.target.value;
        console.log('Form Title :- ' + this.description);

    }

    changeProgressIndicator(event) {
        try {
            this.Progressbarvalue = event.detail.value;
            if (this.Progressbarvalue == 'None') {
                this.ispreview_show_msg = true;
                this.pi = false;
                // console.log('test :- ',event.target.value);
            } else {
                console.log('you are in Progressbar component');
                this.ispreview_show_msg = false;
                this.pi = true;
                // alert('hiii');
                // console.log('test :- ',event.target.value);
                this.template.querySelector('c-progress-indicator').tesmethod(this.Progressbarvalue);
            }
        } catch (error) {
            console.error('check error here', error);
            console.log({
                error
            });
        }
    }

    changeCaptchaType(event) {
        try {
            this.captchTypeparent = event.detail.value;
            console.log(this.captchTypeparent);
            if (this.captchTypeparent == 'None') {
                this.testtest = true;
                this.ct = false;
                // console.log('test :- ',event.target.value);
                // this.template.querySelector('c-captcha-type').preview_chptchatype(this.captchTypeparent);
            } else {
                console.log('you are in Progressbar component');
                this.testtest = false;
                this.ct = true;
                // alert('hiii');
                // console.log('test :- ',event.target.value);
                console.log("loggggggggg of query---->" + this.template.querySelector('c-captcha-type'));
                this.template.querySelector('c-captcha-type').preview_chptchatype(this.captchTypeparent);
            }

        } catch (error) {
            console.error('check error here', error);
            console.log({
                error
            });
        }

    }

    @wire(Objects_Type, {})
    WiredObjects_Type_2({
        error,
        data
    }) {

        if (data) {
            console.log('test :- ', data);
            try {
                this.l_All_Types = data;
                let options = [];

                for (var key in data) {
                    // Here key will have index of list of records starting from 0,1,2,....
                    options.push({
                        sr: data[key].sr__c,
                        label: data[key].Label,
                        value: data[key].DeveloperName
                    });

                    // Here Name and Id are fields from sObject list.
                }
                // this.TypeOptions = options;
                // this.TypeOptions = options.sort(
                //     (teamA, teamB) => teamA.sr - teamB.sr,
                // )
                this.TypeOptions = options;
                console.log('sort in WiredObjects_Type_2== > ', this.TypeOptions);

            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }

    }

    @wire(Objects_Type_2, {})
    WiredObjects_Type({
        error,
        data
    }) {

        if (data) {

            console.log('ch test :- ', data);
            try {
                this.l_All_Types_2 = data;

                let options_2 = [];

                for (var key in data) {
                    // Here key will have index of list of records starting from 0,1,2,....
                    options_2.push({
                        sr: data[key].sr__c,
                        label: data[key].Label,
                        value: data[key].DeveloperName
                    });

                    // Here Name and Id are fields from sObject list.
                }
                // this.TypeOptions_2 = options_2;
                console.log('before sort > ', this.TypeOptions_2);
                // this.TypeOptions_2 = options_2.sort(
                //     (teamA, teamB) => teamA.sr - teamB.sr,
                // )
                this.TypeOptions_2 = options_2;
                console.log('sort > ', JSON.stringify(this.TypeOptions_2));
                // console.log('TypeOptions_2:- ',this.TypeOptions_2);

            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }

    }

    closeModal() {
        // to close modal set isModalOpen tarck value as false
        // this.isModalOpen = false;
        // alert('you in close Modal');
        this.isModalOpen = false;
    }

    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        console.log('submit edit form ..........');
        console.log('form id------->' + this.ParentMessage);
        console.log('form name------->' + this.formtitle);
        console.log('form progressIn------->' + this.Progressbarvalue);
        console.log('form captcha------->' + this.captchTypeparent);
        this.FormName = this.formtitle;
        editFormSubmit({
            id: this.ParentMessage,
            name: this.formtitle,
            progressIn: this.Progressbarvalue,
            captcha: this.captchTypeparent
        }).then(result => {
            console.log('editformsubmit result ------->' + result);
            // const event = new ShowToastEvent({
            //     title: 'Form Changes Done Successfully',
            //     variant: 'success',
            //     mode: 'dismissable'
            // });
            // this.dispatchEvent(event);
            let toast_error_msg = 'Form Changes Done Successfully';
            this.error_toast = true;
            this.template.querySelector('c-toast-component').showToast('success', toast_error_msg, 3000);

        }).catch(err => {
            console.log('editformsubmit error' + err);
            let toast_error_msg = 'Error while changes in the form, Please try again later';
            this.error_toast = true;
            this.template.querySelector('c-toast-component').showToast('error', toast_error_msg, 3000);
        });
        this.isModalOpen = false;
    }

    openfieldvalidation(event) {
        this.fieldId = event.currentTarget.dataset.id;
        this.fieldName = event.currentTarget.dataset.fieldName;
        this.activesidebar = false;
        this.activeDesignsidebar = false
        this.fieldvalidationdiv = true;
        this.template.querySelector('.fieldvalidationdiv').style = "display:block;";
        var array = this.template.querySelectorAll('.field');
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            if (event.currentTarget.dataset.id == element.dataset.id) {
                element.style = "background-color:rgba(210,201,201,0.4); border-radius:4px";
            } else {
                element.style = "background-color:none;";
            }
        }
        this.template.querySelector('c-field-validation').openvalidation(this.tab, this.fieldId, this.fieldName);

        // this.template.querySelector('c-field-validation').openvalidation(this.tab,this.fieldId,fieldName);
    }

    closevalidation(event) {
        this.spinnerDataTable = true;
        this.tab = event.detail;
        this.activeDesignsidebar = false;
        this.activeNotification = false;
        this.activethankyou = false;
        this.fieldvalidationdiv = false;
        this.reloadform();
        if (this.tab == 'tab-2') {
            this.activesidebar = true;
        } else if (this.tab == 'tab-3') {
            this.activeDesignsidebar = true;
        }
        this.template.querySelector('.fieldvalidationdiv').style = "display:none;";
        var array = this.template.querySelectorAll('.field');
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            element.style = "background-color:none;";
        }
    }

    afterfielddelete(event) {
        console.log('after delete event --> ' + event.detail);
        var name = event.detail;
        const temp = this.template.querySelectorAll('.childref');
        console.log('length temp --> ' + temp.length);
        console.log('queryselector childcomponent --> ' + this.template.querySelectorAll('.childref'));
        for (let i = 0; i < temp.length; i++) {
            const element = temp[i];
            console.log('element :- ' + element);
            element.AddField(name);
        }
    }

    bin = iconsZip + '/Iconfolder/bin.png';
    deletepopup = false;
    pageIds;

    handleDeleteAction(event) {
        this.pageIds = event.currentTarget.dataset.record
        this.deletepopup = true;
        // this.spinnerdelete = true;
    }

    deleteyes() {
        this.deletepopup = false;
        // this.spinnerDataTable = true;
        deletePage({
            FormId: this.ParentMessage,
            PageId: this.pageIds
        }).then(result => {
            this.FieldList = result.fieldList;
            console.log('inside the result in page break-->');
            console.log(result);
            var pagelength = result.pageList.length == this.PageList.length;
            this.PageList = result.pageList;
            this.setPageField(result.fieldList);
            if (pagelength) {
                let toast_error_msg = 'Error while deleting the page, Please try again later';
                this.error_toast = true;
                this.template.querySelector('c-toast-component').showToast('error', toast_error_msg, 3000);
            } else {
                let toast_error_msg = 'Page is successfully deleted';
                this.error_toast = true;
                this.template.querySelector('c-toast-component').showToast('success', toast_error_msg, 3000);
            }
        })
    }

    deleteno() {
        this.deletepopup = false;
        this.error_toast = false;
    }
}