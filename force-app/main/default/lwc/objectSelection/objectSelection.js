import { LightningElement,track, wire,api } from 'lwc';
import ParentObject from '@salesforce/apex/objectSelection.fetchParentObject';
import ParentObjectTemp2 from '@salesforce/apex/objectSelection.temp2';
import ParentObjectTemp3 from '@salesforce/apex/objectSelection.temp3';
import section_One from '@salesforce/resourceUrl/Section1';
import section_Two from '@salesforce/resourceUrl/Section2';
import section_Three from '@salesforce/resourceUrl/Section3';
import fetchChildObject from '@salesforce/apex/objectSelection.fetchChildObject';
import saveMapped_object from '@salesforce/apex/objectSelection.saveMapped_object';
import { NavigationMixin } from "lightning/navigation";


export default class ObjectSelection extends NavigationMixin(LightningElement) {
    section_One_img = section_One;
    section_Two_img = section_Two;
    section_Three_img = section_Three;
    @track temp_One = false;
    @track temp_Two = false;
    @track temp_Third = false;
    value1;
    value2;
    value3;
    @track global_options = [];
    @track options_object1 = [];
    @track options_object2 = [];
    @track options_object2_2 = [];
    @track isModalOpen = true;
    @track spinnerDataTable = false;
    @track temp1;
    @track temp2;
    errorModal = false;
    saveerror = false;
    objecterror = false;

    connectedCallback() {
        this.getParentObject();
    }

    getParentObject() {
        ParentObject()
        .then( result => {
            console.log('result : ',result);
            console.log('result : ',typeof(result));
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

    Temp1Obj(event){
        if (event) {
            this.value1 = event.detail.value;
            console.log(this.value1);
        }
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
        //this.options_object2_2 = opp;
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

save(){
    console.log('object1-'+this.value1);
    console.log('object2-'+this.value2);
    console.log('object3-'+this.value3);

    var formtitle = 'Test Form';
    var description = 'Description of test form';
    var progressbarvalue = 'Progress_Bar';
    var captchTypeParent = 'Normal_Captcha';

    if(this.temp_One == true){
        if(this.value1 != null){
            const Mapped_Objects = this.value1;
            saveMapped_object({Mapped_Objects : Mapped_Objects, FormTitle : formtitle, FormDesc : description, ProgressIndicator : progressbarvalue, CaptchaType : captchTypeParent})
            .then( result => {
                var recordid = result;
                console.log(result);
                console.log('recordid :- '+recordid);
                let cmpDef = {
                    componentDef: "c:formBuilder",
                    attributes:{
                        ParentMessage:recordid!=""?recordid:"No Record Created",
                        FormName:formtitle!=""?formtitle:"No Name"
                    }
                };
                
                let encodedDef = btoa(JSON.stringify(cmpDef));
                this[NavigationMixin.Navigate]({
                    type: "standard__webPage",
                    attributes: {
                        url: "/one/one.app#" + encodedDef
                    }
                });
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
            saveMapped_object({Mapped_Objects : Mapped_Objects, FormTitle : formtitle, FormDesc : description, ProgressIndicator : progressbarvalue, CaptchaType : captchTypeParent})
            .then( result => {
                var recordid = result;
                console.log(result);
                console.log('recordid :- '+recordid);
                let cmpDef = {
                    componentDef: "c:formBuilder",
                    attributes:{
                        ParentMessage:recordid!=""?recordid:"No Record Created",
                        FormName:formtitle!=""?formtitle:"No Name"
                    }
                };
                
                let encodedDef = btoa(JSON.stringify(cmpDef));
                this[NavigationMixin.Navigate]({
                    type: "standard__webPage",
                    attributes: {
                        url: "/one/one.app#" + encodedDef
                    }
                });
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
            saveMapped_object({Mapped_Objects : Mapped_Objects, FormTitle : formtitle, FormDesc : description, ProgressIndicator : progressbarvalue, CaptchaType : captchTypeParent})
            .then( result => {
                var recordid = result;
                console.log(result);
                console.log('recordid :- '+recordid);
                let cmpDef = {
                    componentDef: "c:formBuilder",
                    attributes:{
                        ParentMessage:recordid!=""?recordid:"No Record Created",
                        FormName:formtitle!=""?formtitle:"No Name"
                    }
                };
                
                let encodedDef = btoa(JSON.stringify(cmpDef));
                this[NavigationMixin.Navigate]({
                    type: "standard__webPage",
                    attributes: {
                        url: "/one/one.app#" + encodedDef
                    }
                });
            });
        }
        else {
            this.objecterror = false;
            this.saveerror = true;
            this.errorModal = true;
        }
    }
}

closeModal() {
    this.isModalOpen = false;
}
closeerror(){
    this.errorModal = false;
}










}