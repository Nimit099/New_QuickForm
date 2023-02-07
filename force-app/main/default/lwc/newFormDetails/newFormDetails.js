import { LightningElement,track,wire,api} from 'lwc';
import getProgressindicator from '@salesforce/apex/customMetadata.getProgressindicator'; //import get getProgressindicator method from custom Metadata apex class
import Objects_Type from "@salesforce/apex/customMetadata.f_Get_Types";
import getCaptchatype from '@salesforce/apex/customMetadata.getCaptchatype'; //import get getCaptchatype method from custom Metadata apex class
import Objects_Type_2 from "@salesforce/apex/customMetadata.Get_Captcha_Types";
import ParentObject from '@salesforce/apex/objectSelection.fetchParentObject';
import section_One from '@salesforce/resourceUrl/Section1';
import section_Two from '@salesforce/resourceUrl/Section2';
import section_Three from '@salesforce/resourceUrl/Section3';
import ParentObjectTemp2 from '@salesforce/apex/objectSelection.temp2';
import ParentObjectTemp3 from '@salesforce/apex/objectSelection.temp3';
import fetchChildObject from '@salesforce/apex/objectSelection.fetchChildObject';
import saveMapped_object from '@salesforce/apex/objectSelection.saveMapped_object';
import { NavigationMixin } from "lightning/navigation";
import fetchChildObject1 from '@salesforce/apex/objectSelection.fetchChildObject1';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NewFormDetails extends NavigationMixin(LightningElement) {
    //Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
    @track isModalOpen_2 = false;
    @track testtest = true;
    @track isModalOpen = true;
    @track progressindicator;
    @track formdetails =true;
    @track objectselection = false;
    @wire(getProgressindicator) records;
    @wire(getCaptchatype) captcharecords;
    @track formtitle ;    //this variable used to store formtitle input value
    // progressindicator;     //this variable used to store progressindicator input value
    captchatype;    //this variable used to store captchatype input value
    @track ispreview_show_msg_captcha = true;
    @track ispreview_show_msg = true;
    @track pi = false;
    @track ct = false;
    @track l_All_Types;
    @track TypeOptions;
    @track description;

    @track l_All_Types_2;
    @track TypeOptions_2;
    @track Progressbarvalue='';
    @track captchTypeparent='';
  
    @track global_options


    section_One_img = section_One;
    section_Two_img = section_Two;
    section_Three_img = section_Three;
    @track isselect_msg =true;
    @track popup_2 =false;
    @track temp_One = false;
    @track temp_Two = false;
    @track temp_Third = false;
    @track errorModal = false;
    @track tamplate ='';
    value1 = ''
    value2 = ''
    value3 = ''
    options_object1 = [];
    options_object2 = [];
    options_object2_2 = [];
    isModalOpen = true;
    spinnerDataTable = true;
    spinnerDataTable;
    toast_error_msg = 'Please Enter Form Title';
    @track temp1;
    @track temp2;
    recordid;
    saveerror = false;
    objecterror = false;
    
    connectedCallback() {
        this.global_options = [];
        this.getParentObject();
    }

    @wire(Objects_Type, {})
    WiredObjects_Type_2({ error, data }) {
 
        if (data) {
            console.log('test :- ', data);
            try {
                this.l_All_Types = data; 
                let options = [];
                 
                for (var key in data) {
                    // Here key will have index of list of records starting from 0,1,2,....
                    options.push({ sr: data[key].sr__c, label: data[key].Label, value: data[key].DeveloperName  });
 
                    // Here Name and Id are fields from sObject list.
                }
                // this.TypeOptions = options;
                this.TypeOptions = options.sort(
                    (teamA, teamB) => teamA.sr - teamB.sr,
                  )

                console.log('sort > ',this.TypeOptions);
                 
            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }
 
    }

    @wire(Objects_Type_2, {})
    WiredObjects_Type({ error, data }) {
 
        if (data) {
            
            console.log('ch test :- ', data);
            try {
                this.l_All_Types_2 = data; 
                 
                let options_2 = [];
                 
                for (var key in data) {
                    // Here key will have index of list of records starting from 0,1,2,....
                    options_2.push({ sr: data[key].sr__c, label: data[key].Label, value: data[key].DeveloperName  });
 
                    // Here Name and Id are fields from sObject list.
                }
                // this.TypeOptions_2 = options_2;
                console.log('before sort > ',this.TypeOptions_2);
                this.TypeOptions_2 = options_2.sort(
                    (teamA, teamB) => teamA.sr - teamB.sr,
                  )
                console.log('sort > ',this.TypeOptions_2);
                // console.log('TypeOptions_2:- ',this.TypeOptions_2);
                 
            } catch (error) {
                console.error('check error here', error);
            }
        } else if (error) {
            console.error('check error here', error);
        }
 
    }





    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
        
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        // this.isModalOpen = false;
        // alert('you in close Modal');
        this.dispatchEvent(new CustomEvent('popupclose'));
    }
    submitDetails() {
        // to close modal set isModalOpen tarck value as false
        //Add your code to call apex method or do some processing
        this.dispatchEvent(new CustomEvent('popupclose'));        
    }
    
    changeFormTitle(event){
        this.formtitle = event.target.value;
        console.log('Form Title :- '+this.formtitle);
        this.isModalOpen_2 = false;
        // alert('hiiii :- '+this.formtitle);
    }
    changeDescription(event){
        this.description = event.target.value;
        console.log('Form Title :- '+this.description);

    }
    
    changeProgressIndicator(event){
        try{
        this.Progressbarvalue = event.detail.value; 
        // try {
        //     console.log({event});
        //     // this.template.querySelector('c-progress-indicator').tesmethod('Standard_Steps');
        //     alert(event.detail.value);
        //     if(this.Progressbarvalue != null){
        //         alert('test yash');
        //         var a = this.template.querySelector('c-progress-indicator').tesmethod(this.Progressbarvalue);
        //         console.log({a});
        //     }
             
        // } catch (error) {
        //     console.error('check error here', error);
        //     console.log({error});
        // }
        if (this.Progressbarvalue == 'None') {
            this.ispreview_show_msg = true;
            this.pi = false; 
            // console.log('test :- ',event.target.value);
        }
        else{   
            console.log('you are in Progressbar component');
            this.ispreview_show_msg = false;
            this.pi = true;
            // alert('hiii');
            // console.log('test :- ',event.target.value);
            this.template.querySelector('c-progress-indicator').tesmethod(this.Progressbarvalue);
        }
    
    } catch (error) {
            console.error('check error here', error);
            console.log({error});
        }
        
        
        // console.log('test :-', this.Progressbarvalue);
        // let text = this.Progressbarvalue.toString();
        // let text = 'Custom_Steps';
        // this.progressindicator = event.target.value;
        // console.log('Progress Indicator :- '+this.progressindicator)
        // alert('hiiii :- '+this.progressindicator);
        // this.template.querySelector('c-progress-indicator').tesmethod(event.target.value);
        // this.template.querySelector('c-progress-indicator').test2(event.detail.value);
        // this.test2();
    }

    changeCaptchaType(event){
        try{
            this.captchTypeparent = event.detail.value; 
            if (this.captchTypeparent == 'None') {
                this.testtest = true;
                this.ct = false; 
                // console.log('test :- ',event.target.value);
                // this.template.querySelector('c-captcha-type').preview_chptchatype(this.captchTypeparent);
            }
            else{   
                console.log('you are in Progressbar component');
                this.testtest = false;
                this.ct = true;
                // alert('hiii');
                // console.log('test :- ',event.target.value);
                this.template.querySelector('c-captcha-type').preview_chptchatype(this.captchTypeparent);
            }
        
        } catch (error) {
                console.error('check error here', error);
                console.log({error});
            }
        // // alert('hiii');
        // console.log('event ==>');
        // console.log({event});
        // this.captchTypeparent = event.detail.value;
        // console.log('captchTypeparent > ',this.captchTypeparent);
    
        // if (this.captchTypeparent == 'Select') {
        //     this.testtest = true;
        //     this.ct = false; 
        //     // console.log('test :- ',event.target.value);
        //     // this.template.querySelector('c-captcha-type').preview_chptchatype(this.captchTypeparent);
        // }
        // else{
        //     console.log('you are in captcha component');
        //     this.testtest = false;
        //     this.ct = true;
        //     // console.log('test :- ',event.target.value);
        //     this.template.querySelector('c-captcha-type').preview_chptchatype(this.captchTypeparent);
        // }

        
        
    } 
    next_bt(){
        // alert('hiii :- ' ,this.formtitle);
        if(this.formtitle !='' && this.formtitle != null){
            if(this.formtitle.length > 0 && this.formtitle.replaceAll(' ', '').length > 0){
                this.formdetails = false;
                this.objectselection = true;
            }
            else{
                // alert('eroor');
                // alert('In settime 123');
                this.isModalOpen_2 = true;
                this.template.querySelector('c-toast-component').showToast('error',this.toast_error_msg,3000);
            }

        }else{
            // alert('eroor');
           
            this.isModalOpen_2 = true;
            this.template.querySelector('c-toast-component').showToast('error',this.toast_error_msg,3000);
        }
        
       
        // console.log('formtitle',this.formtitle);
        // this.formdetails = false; this.formtitle.length > 0 && this.formtitle.replaceAll(' ', '').length > 0 && this.formtitle==null
        // this.objectselection = true; this.formtitle != ' ' && this.formtitle !='' && this.formtitle != null
        
        
    }
    Previouus_bt(){
        this.formdetails = true;
        this.objectselection = false;
    }



    // select_tamplate(event){
    //     this.tamplate = event.target.dataset.id;
    //     alert(this.tamplate);
    //     if(this.tamplate =='template_1'){
    //         this.isselect_msg = false;
    //         this.popup_2 = true;
    //         this.temp_One = true;    
    //         this.temp_Two = false;
    //         this.temp_Third = false;
    //         this.openModal();
    //     }
    //     if(this.tamplate =='template_2'){
    //         this.isselect_msg = false;
    //         this.popup_2 = true;
    //         this.temp_One = false;
    //         this.temp_Two = true;
    //         this.temp_Third = false;
    //         this.openModal();

    //     }
    //     if(this.tamplate =='template_3'){
    //         this.isselect_msg = false;
    //         this.popup_2 = true;
    //         this.temp_One = false;
    //         this.temp_Two = false;
    //         this.temp_Third = true;
    //         this.openModal();

    //     }
    // }

// ============ Object Selection =====================================

getParentObject() {
    ParentObject()
    .then( result => {
        console.log('result : ',result);
        console.log('result : ',result[0]);
        this.global_options =  result;
        console.log('global_options : ',this.global_options);
        console.log('global_options type : ',typeof(this.global_options));

        // let opp = [];
        // for(var i=0;i<result.length;i++)
        // {
        //     opp.push({label : result[i] , value: result[i]});
        // }
    })
    .catch(error => {
        console.log('error : ',error);
    }) 
}

firstTemp(event){
    this.value1 = '';
    this.value2 = '';
    this.value3 = '';
    this.options_object1 = [];
    this.options_object2 = [];
    this.options_object2_2 = [];
    this.temp_One = true;    
    this.temp_Two = false;
    this.temp_Third = false;
    this.spinnerDataTable = true;
    this.isselect_msg = false;
    this.popup_2 = true;
    // ParentObject()
    // .then( result => {
    //     let opp = [];
    //     for(var i=0;i<result.length;i++)
    // {
    //     opp.push({label : result[i] , value: result[i]});
    // }
    // this.options_object1 = opp;
    // this.spinnerDataTable = false;
    // })
    // for(var i=0;i<this.global_options.length;i++)
    // {
    //     console.log('Value = '+this.global_options.value);
    //     console.log('Value = '+this.global_options);
    //     // this.options_object1.push(val);
    // }
    this.options_object1 = this.global_options;
    console.log(this.global_options);
    console.log('Hello Ravi',this.options_object1);
    ParentObject()
    .then( result => {
        let opp = [];
        for(var i=0;i<result.length;i++)
    {
        opp.push({label : result[i] , value: result[i]});
    }
    this.options_object1 = opp;
    this.spinnerDataTable = false;
    })
    .catch(error => {
        console.log('error : ',error);
    }) 
}

secondTemp(){
    this.value1 = '';
    this.value2 = '';
    this.value3 = '';
    this.options_object1 = [];
    this.options_object2 = [];
    this.options_object2_2 = [];
    this.temp_One = false;
    this.temp_Two = true;
    this.temp_Third = false;
    this.spinnerDataTable = true;
    this.isselect_msg = false;
    this.popup_2 = true;
    ParentObjectTemp2({Parent : this.global_options})
    .then( result => {
        let opp = [];
        for(var i=0;i<result.length;i++)
    {
        opp.push({label : result[i] , value: result[i]});
    }
    this.options_object1 = opp;
    this.spinnerDataTable = false;
    })
}

thirdTemp(){
    this.value1 = '';
    this.value2 = '';
    this.value3 = '';
    this.options_object1 = [];
    this.options_object2 = [];
    this.options_object2_2 = [];
    this.temp_One = false;
    this.temp_Two = false;
    this.temp_Third = true;
    this.spinnerDataTable = true;
    this.isselect_msg = false;
    this.popup_2 = true;
    ParentObjectTemp3({Parent : this.global_options})
    .then( result => {
        let opp = [];
        for(var i=0;i<result.length;i++)
    {
        opp.push({label : result[i] , value: result[i]});
    }
    this.options_object1 = opp;
    this.spinnerDataTable = false;
    })
}   
// changes by NIMIT =====================================================

openModal() {
this.isModalOpen = true;
}

object1(event){
this.value1 = event.detail.value;
this.spinnerDataTable = true;
if(this.value1 != '')
{
    fetchChildObject({parent : this.value1})
    .then( result => {
        this.value2 = null;
        this.value3 = null;
        let opp = [];
    for(var i=0;i<result.length;i++)
    {
        opp.push({label : result[i] , value: result[i]});
    }
    this.options_object2 = opp;
    this.options_object2_2 = opp;
    this.spinnerDataTable = false;
    })
}
}

object2_1(event){

if(event.detail.value == this.value3){
    this.value2 = null;
    this.objecterror = true;
    this.saveerror = false;
    this.errorModal = true;
}else{
    this.value2 = event.detail.value;
    this.errorModal = false;
    this.options_object2_2 = this.options_object2;
    for(var i=0; i<this.options_object2_2.length;i++)
    {
        if(this.options_object2_2[i].label == this.value2)
        {
            this.options_object2_2.splice(i,1);
        }
    }   
}
}

object2_2(event){

    if(event.detail.value == this.value2){
        this.value3 = null;
        this.saveerror = false;
        this.objecterror = true;
        this.errorModal = true;
    }else {
        this.value3 = event.detail.value;
        this.errorModal = false;
    }
    }

save(event){
    console.log('SAve-->'+this.value1);
    console.log(this.value2);
    console.log(this.value3);
    console.log(this.temp_One);
    console.log(this.temp_Two);
    console.log(this.temp_Third);

if(this.temp_One == true){
    if(this.value1 != null){
        const Mapped_Objects = this.value1;
        console.log(this.captchTypeparent);
        saveMapped_object({Mapped_Objects : Mapped_Objects, FormTitle : this.formtitle, FormDesc : this.description, ProgressIndicator : this.Progressbarvalue, CaptchaType : this.captchTypeparent})
        .then( result => {
            this.recordid = result;
            console.log(result);
            console.log('recordid :- '+this.recordid);
            let cmpDef = {
                componentDef: "c:formBuilder",
                attributes:{
                    ParentMessage:this.recordid!=""?this.recordid:"No Record Created",
                    FormName:this.formtitle!=""?this.formtitle:"No Name"
                }
            };
            
            let encodedDef = btoa(JSON.stringify(cmpDef));
            this[NavigationMixin.Navigate]({
                type: "standard__webPage",
                attributes: {
                    url: "/one/one.app#" + encodedDef
                }
            });
        }).catch(error=>{
            console.log('Error=>'+error);
        });         
    }
    else {
        this.objecterror = false;
        this.saveerror = true;
        this.errorModal = true;
    }
}
else if(this.temp_Two == true){
    if(this.value1 != null && this.value2 != null){
        const Mapped_Objects = this.value1+','+this.value2;
        saveMapped_object({Mapped_Objects : Mapped_Objects, FormTitle : this.formtitle, FormDesc : this.description, ProgressIndicator : this.Progressbarvalue, CaptchaType : this.captchTypeparent})
        .then( result => {
            this.recordid = result;
            console.log(result);
            console.log('recordid :- '+this.recordid);
            let cmpDef = {
                componentDef: "c:formBuilder",
                attributes:{
                    ParentMessage:this.recordid!=""?this.recordid:"No Record Created",
                    FormName:this.formtitle!=""?this.formtitle:"No Name"
                }
            };
            
            let encodedDef = btoa(JSON.stringify(cmpDef));
            this[NavigationMixin.Navigate]({
                type: "standard__webPage",
                attributes: {
                    url: "/one/one.app#" + encodedDef
                }
            });
        }).catch(error=>{
            console.log('Error=>'+error);
        });
        
    }
    else {
        this.objecterror = false;
        this.saveerror = true;
        this.errorModal = true;
    }

}
else if(this.temp_Third == true){
    if(this.value1 != null && this.value2 != null && this.value3 != null){
        const Mapped_Objects = this.value1+','+this.value2+','+this.value3;
        saveMapped_object({Mapped_Objects : Mapped_Objects, FormTitle : this.formtitle, FormDesc : this.description, ProgressIndicator : this.Progressbarvalue, CaptchaType : this.captchTypeparent})
        .then( result => {
            this.recordid = result;
            console.log(result);
            console.log('recordid :- '+this.recordid);
            let cmpDef = {
                componentDef: "c:formBuilder",
                attributes:{
                    ParentMessage:this.recordid!=""?this.recordid:"No Record Created",
                    FormName:this.formtitle!=""?this.formtitle:"No Name"
                }
            };
            
            let encodedDef = btoa(JSON.stringify(cmpDef));
            this[NavigationMixin.Navigate]({
                type: "standard__webPage",
                attributes: {
                    url: "/one/one.app#" + encodedDef
                }
            });
        }).catch(error=>{
            console.log('Error=>'+error);
        });
    }
    else {
        this.objecterror = false;
        this.saveerror = true;
        this.errorModal = true;
    }
}
}

closeModalerror() {
this.isModalOpen = false;
}
closeModalerrortoast() {
    this.isModalOpen_2 = false;
    }
closeerror(){
this.errorModal = false;
}
// ============ Object Selection =====================================




// showErrorToast() {
//     const evt = new ShowToastEvent({
//         title: 'required field error',
//         message: 'please enter form titel',
//         variant: 'error',
//         mode: 'dismissable'
//     });
//     this.dispatchEvent(evt);
// }

// closeModal() {
//     this.isModalOpen = false;
// }

handleTypeChange(event){
    this.value = event.detail.value; 
    console.log('select captcha :- ',this.value4);
    // alert('hiii :- ',value4) 
    // Do Something.
}
closeModal_2(){
    this.isModalOpen_2 = false;
}
}