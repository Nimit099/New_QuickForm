import { LightningElement,api,track } from 'lwc';
// import Notification_obj from '@salesforce/schema/Notification__c';
// import toadd from '@salesforce/schema/Notification__c.To_Recipients__c';
// import ccadd from '@salesforce/schema/Notification__c.	CC_Recipients__c';
// // import replyto from '@salesforce/schema/Notification__c.To_Recipients__c';
// import subject from '@salesforce/schema/Notification__c.Subject__c';
// import message from '@salesforce/schema/Notification__c.Attachment__c';
// import attachment from '@salesforce/schema/Notification__c.To_Recipients__c';
// import create from '@salesforce/apex/notificationInsertData.createNotification';
import getContactList from '@salesforce/apex/notificationInsertData.getContactList';
import create from '@salesforce/apex/notificationInsertData.create';
import updated from '@salesforce/apex/notificationInsertData.updated';
//import add from '@salesforce/resourceUrl/Puls_icon';

export default class NotificationComponent extends LightningElement {
    @api myVal = "";
    @api errorMessage = "You haven't composed anything yet." ;
    testval = false;
    @api validity = this.testval;

    @track Notification__c;
    @track Notification_list=[];
    @track error;
    @track spinnerDataTable = true;
    @track required_to = false;
    @track required_Subject = false;
    @track required_Message = false;
    @track toAddress ='';
    @track ccAddress;
    @track text2;
    @track Subject= '';
    @track Message= '';
    @track Attachment;
    @track toast_error_msg;
    @api form_id;
    @track Notification_id;
    @track list_length;
    @track to;
    @track cc;
    @track to_list = [];
    @track cc_list = [];

    connectedCallback(){
        // this.spinnerDataTable = true;
        // console.log('spinnerDataTable',this.spinnerDataTable);
        // setTimeout(()=>{
        this.Cancel();
        // },200);
    }
    handleToAddressChange(event) {
        console.log('in to add');
        console.log({event});
        this.required_to = false;
        this.toAddress = event.detail.selectedValues;
        // console.log('this.toAddress>>>',this.toAddress);
    }

    handleCcAddressChange(event) {
        console.log({event});
        // console.log('in to cc');
        this.ccAddress = event.detail.selectedValues;
        // console.log('this.ccAddress>>>',this.ccAddress);
        // console.log(this.ccAddress);
    }
    // handleReplyTo(event) {
    //     this.replyto = event.target.value;
    //     console.log(this.replyto);
    // }
    handleSubject(event) {
        // console.log('in to sub');
        this.Subject = event.target.value;
        this.required_Subject = false;
        console.log('che subject :- ',this.Subject);
    }
    handlemessage(event) {
        // console.log('in to mes ');
        this.required_Message = false;
        this.Message = event.target.value;
        console.log('che mes :- ',this.Message);
    }
    handleAttachment(event) {
        // console.log('in to attachent'+event);
        this.Attachment = event.target.checked;
        // console.log('yas :- '+this.Attachment);
    }
    validate() {
        if (!this.myVal) {
            this.validity = false;
        }
        else {
            this.validity = true;
        }
    }
    // handleValidation() {
    //     console.log('you r in save');
    //     let nameCmp = this.template.querySelector(".sub");
    //     console.log({nameCmp});
    //     let dateCmp = this.template.querySelector(".msg1");
    //     console.log({dateCmp});
    //     // let emailCmp = this.template.querySelector(".emailCls");
        
    //     if (!nameCmp.value) {
    //         nameCmp.setCustomValidity("Name value is required");
    //     } else {
    //         nameCmp.setCustomValidity(""); // clear previous value
    //     }
    //     nameCmp.reportValidity();
 
    //     if (!dateCmp.value) {
    //         dateCmp.setCustomValidity("Date value is required");
    //     } else {
    //         dateCmp.setCustomValidity(""); // clear previous value
    //     }
    //     dateCmp.reportValidity();
    // }
    handleValidation() {
        console.log('y r in hand');
        this.template.querySelector('c-email-input').handleValidationtest();
        let nameCmp = this.template.querySelector(".nameCls");
        // let msge = this.template.querySelector(".msge");
        console.log({nameCmp});
        
        
        if (!nameCmp.value) {
            console.log('test for form titel');
            nameCmp.setCustomValidity("Form Title is required");
        } else {
            nameCmp.setCustomValidity(""); // clear previous value
            
        }
        // msge.reportValidity();
        // if (!msge.value) {
        //     console.log('test for form titel');
        //     msge.setCustomValidity("Form Title is required for msg");
        // } else {
        //     msge.setCustomValidity(""); // clear previous value
            
        // }
        // msge.reportValidity();
    }
    // handleFocus(event) {
    //     // event.target.className = event.target.className.replace('slds-has-error', '');
    //     let nameCmp = this.template.querySelector(".nameCls");
    //     let msge = this.template.querySelector(".msge");
    //     nameCmp.setCustomValidity("");
    //     msge.setCustomValidity("");
    // }
    save(){
        console.log('you r in save');
        let text = this.toAddress.toString();
        if(this.ccAddress != null && this.ccAddress != ''){
            this.text2 = this.ccAddress.toString();
        }
        
        if(text == ''){
            // alert('pls insert to');
            this.required_to = true;
        }
        if(this.Subject==''){
            this.required_Subject = true;
            // this.required_Message = true;
            // alert('pls insert subject');
        }
        if(this.Message==''){
            this.required_Message = true;
            // alert('pls insert mes');

        }
        
        if(text != '' &&this.Subject!='' &&this.Message!=''){
            console.log('you r in req');
            let listObj = { 'sobjectType': 'Notification__c' };
                listObj.Name = this.form_id;
                listObj.To_Recipients__c = text;
                listObj.CC_Recipients__c = this.text2;
                listObj.Subject__c = this.Subject;
                listObj.Email_Body__c = this.Message;
                listObj.Form__c = this.form_id;
                listObj.Attachment__c = this.Attachment;
                listObj.Id = this.Notification_id;
            // console.log('test '+ listObj);
            if(this.Notification_id == null){
                this.spinnerDataTable = true;
                console.log('you r in insert');
                create({ acc : listObj })
                .then(data =>{
                    console.log({data});
                    console.log();
                    this.toast_error_msg = 'Successfully Saved';
                    this.template.querySelector('c-toast-component').showToast('success',this.toast_error_msg,3000000);
                    this.Cancel();
                    this.spinnerDataTable = false;
                    this.getContactList({form_id :this.form_id});
                })
                .catch(error => {
                    console.log({error});
                })
            }
            else{
                console.log('you r in update');
                this.spinnerDataTable = true;
                updated({ updatelist : listObj})
                .then(data =>{
                    console.log({data});
                    console.log();
                    this.toast_error_msg = 'Successfully Update';
                    this.template.querySelector('c-toast-component').showToast('success',this.toast_error_msg,3000);
                    this.Cancel();
                    this.spinnerDataTable = false;
                   
                })
                .catch(error => {
                    console.log({error});
                })
            }
        }
    }
    Cancel(){
        this.spinnerDataTable = true;
    
        getContactList({form_id :this.form_id})
        .then(result => {
            console.log('y r in getcontactlist');
            console.log(result);
            this.list_length = result.length;
            console.log('list_length',this.list_length);
            this.to = result[0].To_Recipients__c;
            this.template.querySelector('c-email-input').to_email(this.to);
            this.cc = result[0].CC_Recipients__c;
            this.cc_list = this.cc;
            console.log('cc',this.cc);
            this.template.querySelector('c-email-input-c-c').to_email(this.cc);
            this.Subject = result[0].Subject__c;
            this.Message = result[0].Email_Body__c;
            this.Attachment = result[0].Attachment__c;
            this.Notification_id = result[0].Id;
            console.log('noti',this.Notification_id);
        })
        .catch(error => {
            this.spinnerDataTable = false;
            this.error = error;
        });
        if(this.list_length <1){
            console.log('hey you are in if');
            this.toAddress ='';
            this.ccAddress ='';
            this.Subject = '';
            this.Message = '';
            this.Attachment = false;
        }
        setTimeout(()=>{
        this.spinnerDataTable = false;
        },200);
    }
    remove_error_msg(){
        this.required_to = false;
    }
    

    

}