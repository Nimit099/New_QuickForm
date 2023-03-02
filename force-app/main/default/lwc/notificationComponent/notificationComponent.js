import { LightningElement,api,track } from 'lwc';
import getContactList from '@salesforce/apex/notificationInsertData.getContactList';
import create from '@salesforce/apex/notificationInsertData.create';
import updated from '@salesforce/apex/notificationInsertData.updated';
import { loadStyle } from 'lightning/platformResourceLoader';
import notification_css from '@salesforce/resourceUrl/notification_css';
import pulsicon from '@salesforce/resourceUrl/Puls_icon';
//import add from '@salesforce/resourceUrl/Puls_icon';

export default class NotificationComponent extends LightningElement {
    pulsicon_img = pulsicon;   
    @api myVal = "";
    @api errorMessage = "You haven't composed anything yet." ;
    testval = false;
    @api validity = this.testval;

    @track Notification__c;
    @track Notification_list=[];
    @track error;
    @track spinnerDataTable = false;
    @track required_to = false;
    @track required_Subject = false;
    @track required_Message = false;
    @track toAddress ='';
    @track ccAddress ='';
    @track bccAddress ='';
    @track text2;
    @track text3;
    @track Subject= '';
    @track Message= '';
    @track Attachment = false;
    @track toast_error_msg;
    @api form_id;
    @track Notification_id;
    @track list_length;
    @track to;
    @track cc;
    @track bcc;
    @track to_list = [];
    @track cc_list = [];
    @track bcc_list = [];
    @track test45;

    @track textto;
    @track textcc;
    @track textbcc;




    @api listto =[];
    @api pillid = 'cc';
    @track email_msg = false;
    @track items = [];
    @track getprogreshbar;
    @track to_list;
    @track cc_list;
    @track bcc_list;
    searchTerm = "";
    blurTimeout;
    boxClass = "slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus";
    _selectedValues = [];
    selectedValuesMap = new Map();





    @track email_msg_cc = false;
    // @track items = [];
    @track get_all_cc_emailid;
    @track cc_list;
    _selectedValues_2 = [];
    selectedValues_2Map = new Map();


    @track email_msg_bcc = false;
    // @track items = [];
    @track get_all_bcc_emailid;
    @track bcc_list;
    _selectedValues_3 = [];
    selectedValues_3Map = new Map();

    @track open_addcc = false;
    @track open_addbcc = false;
    @track open_addcc_label = true;
    @track open_addbcc_label = true;
    @track open_addcc_and_addbcc = true;






    connectedCallback(){
        this.get_records();
    }

    get_records() {
    getContactList({form_id: this.form_id})
        .then(result => {
            console.log('y r in getcontactlist');
            console.log(result);

            this.list_length = result.length;
            this.to = result[0].To_Recipients__c;
            console.log('to :- ', this.to);
            this.to_email(this.to);

            this.cc = result[0].CC_Recipients__c;
            console.log('cc: ', this.cc);
            this.cc_email(this.cc);

            this.bcc = result[0].BCC_Recipients__c;
            console.log('bcc: ', this.bcc);
            this.bcc_email(this.bcc);

            this.Subject = result[0].Subject__c;
            console.log('Subject in get: ', this.Subject);

            this.Message = result[0].Email_Body__c;
            console.log('Message: ', this.Message);

            this.Attachment = result[0].Attachment__c;
            console.log('Attachment: ', this.Attachment);

            // this.Attachment = result[0].Id;
            // console.log('noti: ', this.Attachment);

            this.Notification_id = result[0].Id;

            if (this.cc == '' || this.cc == null || this.bcc == '' || this.bcc == null) {
                this.open_addcc_and_addbcc = true;
                console.log('open_addcc_and_addbcc -->', this.open_addcc_and_addbcc);
            } else {
                console.log('open_addcc_and_addbcc -->', this.open_addcc_and_addbcc);
                this.open_addcc_and_addbcc = false;
                console.log('open_addcc_and_addbcc -->', this.open_addcc_and_addbcc);
            }

            if (this.cc != '' && this.cc != null) {
                this.open_addcc = true;
                this.open_addcc_label = false;
                console.log('cc if checking');
            } else {
                this.open_addcc = false;
                this.open_addcc_label = true;
                console.log('else if cc checking');
            }

            if (this.bcc != '' && this.bcc != null) {
                this.open_addbcc = true;
                this.open_addbcc_label = false;
                console.log('if bcc checking');
            } else {
                this.open_addbcc = false;
                this.open_addbcc_label = true;
                console.log('else if bcc checking');
            }
        })
        .catch(error => {
            this.error = error;
        });
}



    renderedCallback(){
        // console.log('print to list',this.listto);
    
        Promise.all([
            loadStyle( this, notification_css )
            ]).then(() => {
                // console.log( 'icon' );
            })
            .catch(error => {
                // console.log( error.body.message );
        });
    }


    get selectedValues() {
        // console.log('selectedValues :- ',this.selectedValues.To_Recipients__c);
        return this._selectedValues;
    }
    set selectedValues(value) {
        this._selectedValues = value;
        this.handleToAddressChange({ detail: { selectedValues: this._selectedValues} })
        // const selectedValuesEvent = new CustomEvent("selection", { detail: { selectedValues: this._selectedValues} });
        // this.dispatchEvent(selectedValuesEvent);
    }


    get selectedValues_2() {
        // console.log('print to list',this.listto);
        // this.to_email(this.listto);
        return this._selectedValues_2;
    }
    set selectedValues_2(value) {
        this._selectedValues_2 = value;
        this.handleCcAddressChange({ detail: { selectedValues_2: this._selectedValues_2} })
        console.log('selectedValues_2 :- ',this.selectedValues_2);
        // const selectedValuesEvent = new CustomEvent("selection", { detail: { selectedValues_2: this._selectedValues_2} });
        // this.dispatchEvent(selectedValuesEvent);
    }


    get selectedValues_3() {
        // console.log('print to list',this.listto);
        // this.to_email(this.listto);
        return this._selectedValues_3;
    }
    set selectedValues_3(value) {
        this._selectedValues_3 = value;
        this.handleBccAddressChange({ detail: { selectedValues_3: this._selectedValues_3} })
        console.log('selectedValues_3 :- ',this.selectedValues_3);
        // const selectedValuesEvent = new CustomEvent("selection", { detail: { selectedValues_3: this._selectedValues_3} });
        // this.dispatchEvent(selectedValuesEvent);
    }

    handleToAddressChange(event) {
        console.log('in to add');
        console.log({event});
        this.required_to = false;
        this.toAddress = event.detail.selectedValues;
        this.getprogreshbar =+','+this.toAddress;
        console.log('this.toAddress   >    getprogreshbar>>',this.toAddress);
    }

    handleCcAddressChange(event) {
        console.log('in to add');
        console.log({event});
        this.required_to = false;
        this.ccAddress = event.detail.selectedValues_2;
        this.getprogreshbar =+','+this.ccAddress;
        console.log('this.Address   >    getprogreshbar>>',this.ccAddress);
    }

    handleBccAddressChange(event) {
        console.log('in to add');
        console.log({event});
        this.required_to = false;
        this.bccAddress = event.detail.selectedValues_3;
        this.getprogreshbar =+','+this.bccAddress;
        console.log('this.Address   >    getprogreshbar>>',this.bccAddress);
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
        console.log('handleAttachment :- '+this.Attachment);
    }
    validate() {
        if (!this.myVal) {
            this.validity = false;
        }
        else {
            this.validity = true;
        }
    }
    
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
    }
    open_add_cc(){
        console.log();
        this.open_addcc = true;
        this.open_addcc_label = false;
        console.log('open_addcc--> ',this.open_addcc);
        this.remove_cc_and_bcc();     
    }
    open_add_bcc(){
        this.open_addbcc = true;
        this.open_addbcc_label = false;
        console.log('open_addbcc--> ',this.open_addbcc);
        this.remove_cc_and_bcc();     
    }

    remove_cc_and_bcc(){
        if( this.open_addbcc == true && this.open_addcc == true){
            console.log('open_addcc_and_addbcc --> ',this.open_addcc_and_addbcc);
            this.open_addcc_and_addbcc = false;
            console.log('open_addcc_and_addbcc --> ',this.open_addcc_and_addbcc);
        }
    }
 
   inputValue
   handlechange(event){
    this.inputValue = event.target.value;
    console.log('Input value:', this.inputValue);
   }
   inputValue1
   handlechange1(event){
    this.inputValue1 = event.target.value;
    console.log('Input value:', this.inputValue1);
   }
   inputValue2
   handlechange2(event){
    this.inputValue2 = event.target.value;
    console.log('Input value:', this.inputValue2);
   }
//   handleSave() {
//     let toValue = this.inputValue;
//     console.log('handle save toValue', toValue);
   
//     if (toValue === '' || toValue === undefined) {
//         // To address is empty, proceed to save
//         console.log('first if -->');
//         this.save();
//         this.inputValue = '';
//     } else {
//         console.log('first else -->');
//         let isToValid = this.isEmailValid(toValue);
//         if (isToValid) {
//             console.log('second if -->');
//             // To address is valid, proceed to save
//             this.save();
//             this.inputValue = '';
//             toValue = '';
//         } else {
//             console.log('second else -->');
//             this.inputValue = '';
//             toValue = '';
//         }
//     }
// }
handleSave() {
  let toValue = this.inputValue;
  let ccValue = this.inputValue1;
  let bccValue = this.inputValue2;
  
  if ((toValue === '' || toValue === undefined) && (ccValue === '' || ccValue === undefined) && (bccValue === '' || bccValue === undefined)) {
    // All email fields are empty, proceed to save
    this.save();
    this.inputValue = '';
    this.inputValue1 = '';
    this.inputValue2 = '';
  } else {
    let isToValid = this.isEmailValid(toValue);
    let isCcValid = this.isEmailValid(ccValue);
    let isBccValid = this.isEmailValid(bccValue);

    if (isToValid && isCcValid && isBccValid) {
      // All email fields are valid, proceed to save
      this.save();
      this.inputValue = '';
      this.inputValue1 = '';
      this.inputValue2 = '';
    } else {
        this.inputValue = '';
      this.inputValue1 = '';
      this.inputValue2 = '';
      // At least one of the email fields is invalid, show an error message
    //   this.showToast('error', 'Invalid email address', 'Please enter a valid email address for all recipients.');
    }
  }
}



isEmailValid(email) {
    // Regular expression to validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}



    save(){
        console.log('you r in save');
        const testmap = this.selectedValuesMap.keys();
        console.log('yash ;-',testmap);
        console.log('to add ',this.to);
        this.textto = this.toAddress.toString();
        console.log('to add str ',this.textto);
        console.log('cc add ',this.ccAddress);
        if(this.ccAddress != null && this.ccAddress != ''){
            console.log('u r in cc add is not null ', this.ccAddress);
            this.textcc = this.ccAddress.toString();
        }
        if(this.bccAddress != null && this.bccAddress != ''){
            console.log('u r in cc add is not null ', this.bccAddress);
            this.textbcc = this.bccAddress.toString();
        }
        
        if(this.textto == ''){
            // alert('pls insert to');
            this.required_to = true;
            this.email_msg = false;
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
        
        if(this.textto != '' &&this.Subject!='' &&this.Message!=''){
            console.log('you r in req');
           
            let listObj = { 'sobjectType': 'Notification__c' };
                listObj.To_Recipients__c = this.textto;
                console.log('in save To_Recipients__c :- ',this.textto);
                listObj.CC_Recipients__c = this.textcc;
                console.log('in save CC_Recipients__c :- ',this.textcc);
                listObj.BCC_Recipients__c = this.textbcc;
                console.log('in save BCC_Recipients__c :- ',this.textbcc);
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
                    this.template.querySelector('c-toast-component').showToast('success',this.toast_error_msg,3000);
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
                    console.log(data);
                    var datatest = [];
                    datatest = data;
                    console.log({datatest});
                    this.toast_error_msg = 'Successfully Update';
                    this.template.querySelector('c-toast-component').showToast('success',this.toast_error_msg,3000);
                    // this.Cancel();
                    this.spinnerDataTable = false;
                    this.get_records();
                    this.Subject = data.Subject__c;
                   
                })
                .catch(error => {
                    console.log({error});
                })
                
            }
        }
        
    }
    Cancel(){
        getContactList({form_id :this.form_id})
        .then(result => {
            console.log('y r in getcontactlist');
            console.log(result);
            this.list_length = result.length;
            this.to = result[0].To_Recipients__c;
            console.log('to :- ',this.to);
            this.to_email(this.to);
            this.cc = result[0].CC_Recipients__c;
            console.log('cc',this.cc);
            this.cc_email(this.cc);
            this.bcc = result[0].BCC_Recipients__c;
            console.log('bcc',this.bcc);
            this.bcc_email(this.bcc);
            this.Subject = result[0].Subject__c;
            console.log('Subject : ',this.Subject);
            this.Message = result[0].Email_Body__c;
            console.log('Message : ',this.Message);
            this.Attachment = result[0].Attachment__c;
            console.log('Message : ',this.Message);
            this.Notification_id = result[0].Id;
            console.log('noti',this.Notification_id);
        })
        .catch(error => {
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
    }
    remove_error_msg(){
        this.required_to = false;
    }
    



    create_pill_to(event){
    console.log('create_pill');
    event.preventDefault(); // Ensure it is only this code that runs
    const value = this.template.querySelector('lightning-input.input2').value;
    console.log('to email',value);
    var pattern = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (value == null || value == '') {
        this.email_msg = false;
    } else {
        var validation = pattern.test(value);
        if (validation == false) {
            this.email_msg = true;
            this.remove_error_msg();
        } else {
            this.email_msg = false;
            this.selectedValuesMap.set(value, value);
            this.selectedValues = [...this.selectedValuesMap.keys()];
            console.log('selectedValues kvjdfbkdsvj :- ',this.selectedValues);
        }
    }
   this.template.querySelector('lightning-input.input2').value = "";
}


    handleKeyPress(event) {
        if (event.keyCode === 13 || event.keyCode === 44 || event.keyCode === 32 ) {
            this.create_pill_to(event);
        }
    }

    handleRemove(event) {
        const item = event.target.label;
        console.log('delete :- ',{item});
        this.selectedValuesMap.delete(item);
        this.selectedValues = [...this.selectedValuesMap.keys()];
    }


    @api reset() {
        this.selectedValuesMap = new Map();
        this.selectedValues = [];
    }

    @api validate() {
        this.template.querySelector('input').reportValidity();
        const isValid = this.template.querySelector('input').checkValidity();
        return isValid;
    }
    to_email(strString){
        // console.log('hiii');
        this.getprogreshbar = strString;
        // console.log('this.getprogreshbar>>',this.getprogreshbar);
        this.to_list = this.getprogreshbar.split(',');
            // console.log('to',this.to_list[1]);
            for(var i=0; i<this.to_list.length; i++){
                const value = this.to_list[i];
                // console.log('to :-',value);
                this.selectedValuesMap.set(value, value);
                this.selectedValues = [...this.selectedValuesMap.keys()];
                // this.selectedValues=value;
            }
    }
    @api email_erroe_msg(){
        this.email_msg = false;
    }
    

    create_pill_cc(event){
    event.preventDefault(); // Ensure it is only this code that runs
    const value = this.template.querySelector('lightning-input.input3').value;
    console.log('cc value :- ',value);
    var pattern =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var validation = pattern.test(value);
    if (value == null || value == '') {
        this.email_msg_cc = false;
    }
    else if (validation == false) {
        this.email_msg_cc = true;
    }
    else {
        this.email_msg_cc = false;
        this.selectedValues_2Map.set(value, value);
        this.selectedValues_2 = [...this.selectedValues_2Map.keys()];
    }
    this.template.querySelector('lightning-input.input3').value = "";
}


    handleKeyPress_2(event) {
        if (event.keyCode === 13 || event.keyCode === 44 || event.keyCode === 32 ) {
            this.create_pill_cc(event);
        }
    }

    handleRemove_2(event) {
        const item = event.target.label;
        this.selectedValues_2Map.delete(item);
        this.selectedValues_2 = [...this.selectedValues_2Map.keys()];
    }
    @api reset_2() {
        this.selectedValues_2Map = new Map();
        this.selectedValues_2 = [];
    }

    @api validate_2() {
        this.template.querySelector('input').reportValidity();
        const isValid = this.template.querySelector('input').checkValidity();
        return isValid;
    }
    @api cc_email(strString){
        console.log('hiii');
        this.get_all_cc_emailid = strString;
        // console.log('this.get_all_cc_emailid in cc >>',this.get_all_cc_emailid);
        if(this.get_all_cc_emailid != null && this.get_all_cc_emailid !='' ){
            // console.log('you are in cc if');
            this.cc_list = this.get_all_cc_emailid.split(',');
            // console.log('to',this.cc_list[1]);
            for(var i=0; i<this.cc_list.length; i++){
                const value = this.cc_list[i];
                // console.log('to :-',value);
                this.selectedValues_2Map.set(value, value);
                this.selectedValues_2 = [...this.selectedValues_2Map.keys()];
                // this.selectedValues_2=value;
                }
        }

        
    }





    create_pill_bcc(event){
        event.preventDefault(); // Ensure it is only this code that runs
        const value = this.template.querySelector('lightning-input.input4').value;
        console.log('cc value :- ',value);
        var pattern =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (value == null || value == '') {
        this.email_msg_bcc = false;
    }else{
        var validation = pattern.test(value);

        if (validation == false) {
            this.email_msg_bcc = true;
        }
        else{
            this.email_msg_bcc = false;
            this.selectedValues_3Map.set(value, value);
            this.selectedValues_3 = [...this.selectedValues_3Map.keys()];       
        }
    }
        this.template.querySelector('lightning-input.input4').value = "";
    }

    handleKeyPress_3(event) {
        if (event.keyCode === 13 || event.keyCode === 44 || event.keyCode === 32 ) {
            this.create_pill_bcc(event);
        }
    }

    handleRemove_3(event) {
        const item = event.target.label;
        this.selectedValues_3Map.delete(item);
        this.selectedValues_3 = [...this.selectedValues_3Map.keys()];
    }
    @api reset_3() {
        this.selectedValues_3Map = new Map();
        this.selectedValues_3 = [];
    }

    @api validate_3() {
        this.template.querySelector('input').reportValidity();
        const isValid = this.template.querySelector('input').checkValidity();
        return isValid;
    }
    @api bcc_email(strString){
        console.log('hiii');
        this.get_all_bcc_emailid = strString;
        // console.log('this.get_all_bcc_emailid in cc >>',this.get_all_bcc_emailid);
        if(this.get_all_bcc_emailid != null && this.get_all_bcc_emailid !='' ){
            // console.log('you are in cc if');
            this.bcc_list = this.get_all_bcc_emailid.split(',');
            // console.log('to',this.bcc_list[1]);
            for(var i=0; i<this.bcc_list.length; i++){
                const value = this.bcc_list[i];
                console.log('bcc :-',value);
                this.selectedValues_3Map.set(value, value);
                this.selectedValues_3 = [...this.selectedValues_3Map.keys()];
                // this.selectedValues_3=value;
                }
        }

        
    }
    

}