import { api, LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import QuickBotLogo from '@salesforce/resourceUrl/QuickBotLogo';
import QuickBotBody from '@salesforce/resourceUrl/QuickBotBody';
import QuickBot_Cross from '@salesforce/resourceUrl/QuickBot_Cross';
import QuickBotCSS from '@salesforce/resourceUrl/QuickBotCSS';
import quickbotheader from '@salesforce/label/c.QuickBot_Header';
import sendemail from '@salesforce/apex/qfhome.sendemail';
export default class QuickBot extends LightningElement {
    Logo = QuickBotLogo;
    Body = QuickBotBody;
    Cross = QuickBot_Cross;
    quickbotname;
    quickbotemail;
    quickbotmessage;
    quickbotsubject;
    email_msg = true;
    header = quickbotheader;
    get bgimg(){
        return `background-image:url(${QuickBotBody});background-repeat: no-repeat; background-size: cover;`;
    }

    renderedCallback(){
        // console.log('print to list',this.listto);
        Promise.all([
            loadStyle( this,QuickBotCSS)
        ]).then(() => {
                console.log( 'check' );
            })
            .catch(error => {
                // console.log( error.body.message );
        });
    }
    Quickbot_name(event){
        // console.log(event.target.value);
        this.quickbotname = event.target.value;
    }
    Quickbot_email(event){
        // console.log(event.target.value);
        this.quickbotemail = event.target.value;
    }
    Quickbot_message(event){
        // console.log(event.target.value);
        this.quickbotmessage = event.target.value;
    }
    Quickbot_subject(event){
        this.quickbotsubject = event.target.value;
    }
    emailsend;
    quickbot_Submit(){
        var pattern =/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var validation = pattern.test(this.quickbotemail);
        
        if (validation == false) {
            console.log('validation',validation);
            this.email_msg = false;
            console.log('validation',validation);
        }
        else{
            console.log('validation',validation);
            this.email_msg = true;
            console.log('selectedValues:- ',this.quickbotemail);
            sendemail({name: this.quickbotname , email:this.quickbotemail, subject: this.quickbotsubject ,body: this.quickbotmessage})
            .then(result => {
                this.emailsend = true;
                this.dispatchEvent(new CustomEvent('botclose',{detail:this.emailsend}));
                this.dispatchEvent(new CustomEvent('success'));
                console.log('send email',result);
            }).catch(error =>{
                this.emailsend = false;
                this.dispatchEvent(new CustomEvent('botclose',{detail:this.emailsend}));
                this.dispatchEvent(new CustomEvent('error'));
                console.log('Send Email Error ==>',error);
            });
        }
        console.log('quickbotname -->',this.quickbotname);
        console.log('quickbotemail -->',this.quickbotemail);
        console.log('quickbotmessage -->',this.quickbotmessage);
        console.log('quickbotsubject -->',this.quickbotsubject);
    }
    
    quickboe_close(){
        this.dispatchEvent(new CustomEvent('botclose'));
    }
}