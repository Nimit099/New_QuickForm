import { LightningElement,track } from 'lwc';
// import Notification_obj from '@salesforce/schema/Notification__c';
// import toadd from '@salesforce/schema/Notification__c.To_Recipients__c';
// import ccadd from '@salesforce/schema/Notification__c.	CC_Recipients__c';
// // import replyto from '@salesforce/schema/Notification__c.To_Recipients__c';
// import subject from '@salesforce/schema/Notification__c.Subject__c';
// import message from '@salesforce/schema/Notification__c.Attachment__c';
// import attachment from '@salesforce/schema/Notification__c.To_Recipients__c';
// import create from '@salesforce/apex/notificationInsertData.createNotification';
import create from '@salesforce/apex/notificationInsertData.create';
//import add from '@salesforce/resourceUrl/Puls_icon';

export default class NotificationComponent extends LightningElement {
    @track toAddress;
    @track ccAddress;
    @track Subject;
    @track Message;
    @track Attachment;

    
    handleToAddressChange(event) {
        console.log('in to add');
        console.log({event});

        this.toAddress = event.detail.selectedValues;
        // alert(this.toAddress);
        console.log('this.toAddress>>>',this.toAddress);
        // alert(this.toAddress);
    }

    handleCcAddressChange(event) {
        console.log({event});
        console.log('in to cc');
        this.ccAddress = event.detail.selectedValues;
        console.log('this.ccAddress>>>',this.ccAddress);
        // alert(this.ccAddress);
        console.log(this.ccAddress);
    }
    // handleReplyTo(event) {
    //     this.replyto = event.target.value;
    //     console.log(this.replyto);
    // }
    handleSubject(event) {
        console.log('in to sub');
        this.Subject = event.target.value;
        console.log('dfbfhn ',this.Subject);
    }
    handlemessage(event) {
        // console.log('in to mes ');
        this.Message = event.target.value;
        // console.log(this.Message);
    }
    handleAttachment(event) {
        console.log('in to attachent'+event);
        this.Attachment = event.target.checked;
        console.log('yas :- '+this.Attachment);
    }
    save(){
        console.log('in save method');
        console.log('toAddress '+this.toAddress);
        let text = this.toAddress.toString();
        console.log('ccAddress '+this.ccAddress);
        let text2 = this.ccAddress.toString();
        console.log('Subject '+this.Subject);
        console.log('Message '+this.Message);
        let listObj = { 'sobjectType': 'Notification__c' };
            listObj.To_Recipients__c = text;
            listObj.CC_Recipients__c = text2;
            listObj.Subject__c = this.Subject;
            listObj.Email_Body__c = this.Message;
        // // console.log(this.toAddress);
        // // console.log(this.ccAddress);
        // // console.log(this.Subject);
        // // console.log(this.Message);

        // data ={
        //     // To_Recipients__c: this.toAddress,
        //     // CC_Recipients__c : this.ccAddress,
        //     Subject__c : this.Subject,
        //     // Email_Body__c : this.Message
        // }
        console.log('test '+ listObj);
        create({ acc : listObj })
        .then(data =>{
            console.log({data});
        })
        .catch(error => {
            console.log({error});
        })
    }

    

}