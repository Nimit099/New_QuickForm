import { LightningElement, wire } from 'lwc';
import thankyoulogo from '@salesforce/resourceUrl/Thankyoulogo';
import { getPicklistValues}  from 'lightning/uiObjectInfoApi';
import pagetype_field from '@salesforce/schema/Thankyou_Page__c.Thankyou_Page_Type__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import thankyou_object from '@salesforce/schema/Thankyou_Page__c';
import records from '@salesforce/apex/qfthankyou.insertrecord';
import getrecords from '@salesforce/apex/qfthankyou.getthankyoupage';


export default class Qf_thankyou extends LightningElement {
    thankyoulogo = thankyoulogo;
    formats = ['font', 'size', 'bold', 'italic', 'underline', 'strike', 'list', 'indent', 'align', 'link', 'clean', 'table', 
    'header', 'color', 'background'];
    text;
    url;
    richtext;
    truedd = true;
    textcheck = false;
    richtextcheck = false;
    picklist;
    currentformid = 'a046D0000056TGHQA2';
    currentthankyouid;
    None = true;
    ThankYou_Text;
    ThankYou_URL;
    Redirect_Text_And_URL;
    ThankYou_Report;
    ThankYou_RichText;
    classtext;
   

    connectedCallback(){
        getrecords({currentformid : this.currentformid}).then(result => {
                this.currentthankyouid = result.Id;
                this.None = false;
            if(result.Thankyou_Page_Type__c == 'Show Text'){
            this.text = result.Thankyou_Text__c;
            this.textcheck = true;
            this.ThankYou_Text = true;
            ni
            this.template.querySelector(".text").style="display:block"
           }
           else if(result.Thankyou_Page_Type__c == 'Redirect to a webpage'){
            this.url = result.Thank_you_URL__c;
            this.template.querySelector(".url").style="display:block"
            this.ThankYou_URL =true;
           }
           else if(result.Thankyou_Page_Type__c == 'Show text, then redirect to web page'){
            this.url = result.Thank_you_URL__c;
            this.text = result.Thankyou_Text__c;
            this.textcheck = true;
            this.Redirect_Text_And_URL = true;
            this.template.querySelector(".text_url").style="display:block"
           }
           else if(result.Thankyou_Page_Type__c == 'Show HTML block'){
            this.richtext = result.Thankyou_Text__c;
            this.richtextcheck = true;
            this.ThankYou_RichText = true;
            this.template.querySelector(".richtext").style="display:block"
           }
           else if(result.Thankyou_Page_Type__c == 'None'){
            this.None = true;
           }
           else if(result.Thankyou_Page_Type__c == 'Show report of User date'){
            this.ThankYou_Report = true;
           }
        
        })
    }


    toggleFields(event){

        this.textcheck = false;
        this.richtextcheck = false;
        const a = this.template.querySelectorAll(".form-control");
        for(let i = 0; i < a.length; i++){
            a[i].style.display = "none";
        }
    
        this.picklist = event.target.value;
        if(event.target.value == 'text'){
            this.picklist = 'Show Text';
            this.None =false;
            this.ThankYou_Text = true;
            this.ThankYou_URL = false;
            this.Redirect_Text_And_URL = false;
            this.ThankYou_Report = false;
            this.ThankYou_RichText = false;
            this.textcheck = true;
            this.richtextcheck = false;
        }
        else if(event.target.value == 'text_url'){
            this.picklist = 'Show text, then redirect to web page';
            this.None =false;
            this.ThankYou_Text = false;
            this.ThankYou_URL = false;
            this.Redirect_Text_And_URL = true;
            this.ThankYou_Report = false;
            this.ThankYou_RichText = false;
            this.textcheck = true;
            this.richtextcheck = false;
            
        }
        else if(event.target.value == 'url'){
            this.picklist = 'Redirect to a webpage';
            this.None =false;
            this.ThankYou_Text = false;
            this.ThankYou_URL = true;
            this.Redirect_Text_And_URL = false;
            this.ThankYou_Report = false;
            this.ThankYou_RichText = false;
            this.textcheck = false;
            this.richtextcheck = false;
        }
        else if(event.target.value == 'report'){
            this.picklist = 'Show report of User data';
            this.None =false;
            this.ThankYou_Text = false;
            this.ThankYou_URL = false;
            this.Redirect_Text_And_URL = false;
            this.ThankYou_Report = true;
            this.ThankYou_RichText = false;
            this.textcheck = false;
            this.richtextcheck = false;
        }
        else if(event.target.value == 'richtext' ){
            this.picklist = 'Show HTML block';
            this.None =false;
            this.ThankYou_Text = false;
            this.ThankYou_URL = false;
            this.Redirect_Text_And_URL = false;
            this.ThankYou_Report = false;
            this.ThankYou_RichText =true;
            this.richtextcheck = true;
            this.textcheck = false;
        }
        else if(event.target.value == 'none'){
            this.picklist = 'None';
            this.None =true;
            this.ThankYou_Text = false;
            this.ThankYou_URL = false;
            this.Redirect_Text_And_URL = false;
            this.ThankYou_Report = false;
            this.ThankYou_RichText =false;
            this.textcheck = false;
            this.richtextcheck = false;
        }
        
        this.template.querySelector("."+event.target.value).style="display:block"
    }

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
    saveThanksData(){
        if( this.ThankYou_URL == true || this.Redirect_Text_And_URL == true){
            console.log('1');
           const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/ ;
            if (regexp.test(this.url))
            { 
                console.log('2132');
                records({picklist : this.picklist,classtext :this.classtext,formId : this.currentformid, url : this.url , currentthankyouid : this.currentthankyouid}).then(result => {
           
                })
              return true;
            }
            else
            {
                console.log('134345');
              return false;
            }
        }
        else{
            console.log('21');
        records({picklist : this.picklist,classtext :this.classtext,formId : this.currentformid, url : this.url , currentthankyouid : this.currentthankyouid}).then(result => {
           
          })
        }
    }
    cancelThanksData(){
       
        if(this.currentthankyouid == null){
            const a = this.template.querySelectorAll(".form-control");
            for(let i = 0; i < a.length; i++){
                a[i].style.display = "none";
            }
            this.None =true;
            this.ThankYou_Text = false;
            this.ThankYou_URL = false;
            this.Redirect_Text_And_URL = false;
            this.ThankYou_Report = false;
            this.ThankYou_RichText =false;
        }
    }
}


 // @wire(getObjectInfo, { objectApiName: thankyou_object })
    // thankyouInfo;

    // @wire(getPicklistValues,
    //     {
    //         recordTypeId: '$thankyouInfo.data.defaultRecordTypeId',
    //         fieldApiName: pagetype_field
    //     }
    // )
    // pagetypeValues;

    // overseasPoliceOps;

    // @wire(getPicklistValues,
    //     {
    //         recordTypeId: '$thankyouInfo.data.defaultRecordTypeId',
    //         fieldApiName: pagetype_field
    //     }
    // )
    // workRightValues(data,error){
    //     console.log(data);
    //     if(data && data.data && data.data.values){
    //         let options = [];
    //         data.data.values.forEach( objPicklist => {
    //             options.push({ label: objPicklist.value, value: objPicklist.value});
    //         });
    //         this.overseasPoliceOps = options;
    //         console.log(this.overseasPoliceOps);
    //     } else if(error){
    //         console.log(error);
    //     }
    // };