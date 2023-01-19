import { LightningElement, wire } from 'lwc';
import thankyoulogo from '@salesforce/resourceUrl/Thankyoulogo';
import { getPicklistValues}  from 'lightning/uiObjectInfoApi';
import pagetype_field from '@salesforce/schema/Thankyou_Page__c.Thankyou_Page_Type__c';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import thankyou_object from '@salesforce/schema/Thankyou_Page__c';
import records from '@salesforce/apex/qfthankyou.insertrecord';


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
  
    toggleFields(event){
 
        const a = this.template.querySelectorAll(".form-control");
        for(let i = 0; i < a.length; i++){
            a[i].style.display = "none";
        }
        this.url ='';
        this.text ='';
        this.richtext ='';
        this.picklist = event.target.value;
        console.log(this.picklist);
        if(event.target.value == 'text'){
            this.picklist = 'Show Text';
        }
        else if(event.target.value == 'text_url'){
            this.picklist = 'Show text, then redirect to web page';
        }
        else if(event.target.value == 'url'){
            this.picklist = 'Redirect to a webpage';
        }
        else if(event.target.value == 'report'){
            this.picklist = 'Show report of User data';
        }
        else if(event.target.value == 'richtext' ){
            this.picklist = 'Show HTML block';
        }
        else if(event.target.value == 'none'){
            this.picklist = 'None';
        }
        
        this.template.querySelector("."+event.target.value).style="display:block"
    }

    input(event){
        console.log(event.target.name);
        if(event.target.name == 'url'){
            this.url = event.target.value;
            console.log(this.url);
        }
        else if(event.target.name == 'text'){
            this.textcheck = true;
            this.richtextcheck = false;
            this.text = event.target.value;
            console.log(this.text);
        }
        else if(event.target.name == 'richtext'){
            this.textcheck = false;
            this.richtextcheck = true;
            this.richtext = event.target.value;
            console.log(this.richtext);
        }
    }
    saveThanksData(){
        records({picklist : this.picklist,text : this.text, richtext : this.richtext,formId : 'a046D0000056T8EQAU', url : this.url}).then(result => {
           
          })
    }
}