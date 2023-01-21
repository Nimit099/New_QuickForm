import { LightningElement,track, wire,api } from 'lwc';
import ParentObject from '@salesforce/apex/objectSelection.fetchParentObject';
import section_One from '@salesforce/resourceUrl/Section1';
import section_Two from '@salesforce/resourceUrl/Section2';
import section_Three from '@salesforce/resourceUrl/Section3';
import fetchChildObject1 from '@salesforce/apex/objectSelection.fetchChildObject1';
import saveMapped_object from '@salesforce/apex/objectSelection.saveMapped_object';


export default class ObjectSelection extends LightningElement {
    Id;
    section_One_img = section_One;
    section_Two_img = section_Two;
    section_Three_img = section_Three;
    @track temp_One = false;
    @track temp_Two = false;
    @track temp_Third = false;
    value1;
    value2;
    value3;
    @api options_object1 = [];
    @api options_object2 = [];
    @track isModalOpen = true;
    @track spinnerDataTable = false;
    @track temp1;
    @track temp2;
    errorModal = false;
    saveerror = false;
    objecterror = false;


    firstTemp(event){
        this.temp_One = true;    
        this.temp_Two = false;
        this.temp_Third = false;
        this.spinnerDataTable = true;
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
    }

    secondTemp(){
        this.temp_One = false;
        this.temp_Two = true;
        this.temp_Third = false;
        this.spinnerDataTable = true;
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
    }

    thirdTemp(){
        this.temp_One = false;
        this.temp_Two = false;
        this.temp_Third = true;
        this.spinnerDataTable = true;
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
        fetchChildObject1({parent : this.value1})
        .then( result => {
            this.value2 = null;
            this.value3 = null;
            console.log(result);
            let opp = [];
        for(var i=0;i<result.length;i++)
        {
            opp.push({label : result[i] , value: result[i]});
        }
        this.options_object2 = opp;
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
    console.log(this.value1);
    console.log(this.value2);
    console.log(this.value3);

    if(this.temp_One == true){
        if(this.value1 != null){
            const Mapped_Objects = JSON.stringify(JSON.parse('[{"ParentObject":"'+this.value1+'"}]'));
            saveMapped_object({Mapped_Objects : Mapped_Objects, Id: this.Id})
            .then( result => {
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
            const Mapped_Objects = JSON.stringify(JSON.parse('[{"ParentObject":"'+this.value1+'"},{"ChildObject1":"'+this.value2+'"}]'));
            saveMapped_object({Mapped_Objects : Mapped_Objects, Id: this.Id})
            .then( result => {
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
            const Mapped_Objects = JSON.stringify(JSON.parse('[{"ParentObject":"'+this.value1+'"},{"ChildObject1":"'+this.value2+'"},{"ChildObject2":"'+this.value3+'"}]'));
            saveMapped_object({Mapped_Objects : Mapped_Objects, Id: this.Id})
            .then( result => {
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