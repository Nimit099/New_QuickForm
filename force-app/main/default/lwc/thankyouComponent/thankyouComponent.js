//  ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 18/01/2023
// # Description: Used for Edit, Delete, Read or Create New Form
// # Change Version History
// # Version No.     Author          Date            Change Description            Jira Ticket
// #    1.           Nimit         18/01/2023           Home Page UI 		     QUIC-18, QUIC-27
// =================================== 

import { LightningElement, api } from 'lwc';
import thankyoulogo from '@salesforce/resourceUrl/Thankyoulogo';
import whitepen from '@salesforce/resourceUrl/whitepen';
import records from '@salesforce/apex/qfthankyou.insertrecord';
import getrecords from '@salesforce/apex/qfthankyou.getthankyoupage';

export default class ThankyouComponent extends LightningElement {
    thankyoulogo = thankyoulogo;
    whitepen = whitepen;
    formats = ['font', 'size', 'bold', 'italic', 'underline', 'strike', 'list', 'indent', 'align', 'link', 'clean', 'table', 
    'header', 'color', 'background'];
    text;
    url;
    richtext;
    label;
    changelabel;
    textcheck = false;
    richtextcheck = false;
    editlabelcheck = false;
    error_toast = false;
    picklist;
    @api currentformid ;
    @api currentthankyouid;
    @api formname = '';
    None = true;
    ThankYou_Text;
    ThankYou_URL;
    Redirect_Text_And_URL;
    ThankYou_Report;
    ThankYou_RichText;
    classtext;
    spinner;
    

// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 18/01/2023
// # Description: Used to Check and get already created thank you page for the selected form
// =================================== -->
    connectedCallback(){
        this.spinner = true;
        getrecords({currentformid : this.currentformid}).then(result => {
            this.label = result.ThankYou_Label__c;
            this.changelabel = result.ThankYou_Label__c;
            this.currentthankyouid = result.Id;
            console.log(this.label);
            if(result.Thankyou_Page_Type__c == 'Show Text'){
            this.text = result.Thankyou_Text__c;
            this.textfunc();
           }
            else if(result.Thankyou_Page_Type__c == 'Redirect to a webpage'){
            this.url = result.Thank_you_URL__c;
            this.urlfunc();
           }
           else if(result.Thankyou_Page_Type__c == 'Show text, then redirect to web page'){
            this.url = result.Thank_you_URL__c;
            this.text = result.Thankyou_Text__c;
            this.text_urlfunc();
           }
           else if(result.Thankyou_Page_Type__c == 'Show HTML block'){
            this.richtext = result.Thankyou_Text__c;
            this.richtextfun();
           }
           else if(result.Thankyou_Page_Type__c == 'None'){
           this.nonefunc();
           }
           else if(result.Thankyou_Page_Type__c == 'Show report of User data'){
           this.reportfunc();  
        }
        })
        .catch(error => {
            this.spinner = false;
		})
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 18/01/2023
// # Description: Used to Select Options and open correct field for selected option of thank you type
// =================================== -->
    toggleFields(event){

        this.textcheck = false;
        this.richtextcheck = false;
        const a = this.template.querySelectorAll(".form-control");
        for(let i = 0; i < a.length; i++){
            a[i].style.display = "none";
        }
    
        this.picklist = event.target.value;
        if(event.target.value == 'text'){
            this.textfunc();
        }
        else if(event.target.value == 'text_url'){
            this.text_urlfunc();
        }
        else if(event.target.value == 'url'){
            this.urlfunc();
        }
        else if(event.target.value == 'report'){
          this.reportfunc();
        }
        else if(event.target.value == 'richtext' ){
            this.richtextfun();
        }
        else if(event.target.value == 'none'){
            this.nonefunc();
        }
        
        this.template.querySelector("."+event.target.value).style="display:block"
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 18/01/2023
// # Description: Used to take input of text, html block or url
// =================================== -->
    input(event){
        
        if(event.target.name == 'url'){
            this.url = event.target.value;
        }
        else if(event.target.name == 'text'){
            this.text = event.target.value;
            this.classtext = this.text;
        }
        else if(event.target.name == 'richtext'){
            this.richtext = event.target.value;
            this.classtext = this.richtext;
        }
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 18/01/2023
// # Description: Used to save thank you page
// =================================== -->
    saveThanksData(){
        this.spinner = true;
        if( this.ThankYou_URL == true || this.Redirect_Text_And_URL == true){
           const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/ ;
            if (regexp.test(this.url))
            { 
                records({picklist : this.picklist,label : this.label, classtext :this.classtext,formId : this.currentformid, url : this.url , currentthankyouid : this.currentthankyouid}).then(result => {
                    this.spinner = false;
                })
              return true;
            }
            else{
                let toast_error_msg = 'Enter Correct URL';
                this.spinner = false;
                this.error_toast = true;
                this.template.querySelector('c-toast-component').showToast('Error',toast_error_msg,3000);

            }
        }
        else{
        records({picklist : this.picklist,label : this.label, classtext :this.classtext,formId : this.currentformid, url : this.url , currentthankyouid : this.currentthankyouid}).then(result => { 
            this.spinner = false;
        })
        }
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 18/01/2023
// # Description: Used to cancel changes or creation
// =================================== -->
    cancelThanksData(){
       
        if(this.currentthankyouid == null){
            const a = this.template.querySelectorAll(".form-control");
            for(let i = 0; i < a.length; i++){
                a[i].style.display = "none";
            }
            this.None = true;
            this.ThankYou_Text = false;
            this.ThankYou_URL = false;
            this.Redirect_Text_And_URL = false;
            this.ThankYou_Report = false;
            this.ThankYou_RichText = false;
        }
    }

    nonefunc(){
        this.picklist = 'None';
        this.None = true;
        this.ThankYou_Text = false;
        this.ThankYou_URL = false;
        this.Redirect_Text_And_URL = false;
        this.ThankYou_Report = false;
        this.ThankYou_RichText =false;
        this.textcheck = false;
        this.richtextcheck = false;
        this.spinner = false;
    }
    textfunc(){
        this.picklist = 'Show Text';
        this.None = false;
        this.ThankYou_Text = true;
        this.ThankYou_URL = false;
        this.Redirect_Text_And_URL = false;
        this.ThankYou_Report = false;
        this.ThankYou_RichText =false;
        this.textcheck = true;
        this.richtextcheck = false;
        this.template.querySelector(".text").style="display:block"
        this.spinner = false;
    }
    text_urlfunc(){
        this.picklist = 'Show text, then redirect to web page';
        this.None = false;
        this.ThankYou_Text = false;
        this.ThankYou_URL = false;
        this.Redirect_Text_And_URL = true;
        this.ThankYou_Report = false;
        this.ThankYou_RichText =false;
        this.textcheck = true;
        this.richtextcheck = false;
        this.template.querySelector(".text_url").style="display:block"
        this.spinner = false;
    }
    richtextfun(){
        this.picklist = 'Show HTML block';
        this.None = false;
        this.ThankYou_Text = false;
        this.ThankYou_URL = false;
        this.Redirect_Text_And_URL = false;
        this.ThankYou_Report = false;
        this.ThankYou_RichText = true;
        this.textcheck = false;
        this.richtextcheck = true;
        this.template.querySelector(".richtext").style="display:block"
        this.spinner = false;
    }
    reportfunc(){
        console.log('12334');
        this.picklist = 'Show report of User data';
        this.None = false;
        this.ThankYou_Text = false;
        this.ThankYou_URL = false;
        this.Redirect_Text_And_URL = false;
        this.ThankYou_Report = true;
        this.ThankYou_RichText =false;
        this.textcheck = false;
        this.richtextcheck = false;
        this.spinner = false;
    }
    urlfunc(){
        this.picklist = 'Redirect to a webpage';
        this.None = false;
        this.ThankYou_Text = false;
        this.ThankYou_URL = true;
        this.Redirect_Text_And_URL = false;
        this.ThankYou_Report = false;
        this.ThankYou_RichText =false;
        this.textcheck = false;
        this.richtextcheck = false;
        this.template.querySelector(".url").style="display:block"
        this.spinner = false;
    }
    editlabel(){
        this.editlabelcheck = true;
    }
    labelinput(event){
        this.changelabel = event.target.value;
        console.log(this.label);
    }
    closeLabel(){
        this.editlabelcheck = false;
    }
    saveLabel(){
        this.editlabelcheck = false;
        this.label = this.changelabel
    }
}