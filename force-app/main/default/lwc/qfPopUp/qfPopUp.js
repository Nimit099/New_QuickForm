import { LightningElement,track, wire } from 'lwc';
import ParentObject from '@salesforce/apex/objectSelection.fetchParentObject';
import section_One from '@salesforce/resourceUrl/Section1';
import section_Two from '@salesforce/resourceUrl/Section2';
import section_Three from '@salesforce/resourceUrl/Section3';
import section_Four from '@salesforce/resourceUrl/Section4';
import section_Five from '@salesforce/resourceUrl/Section5';
import section_Six from '@salesforce/resourceUrl/Section6';  
import fetchChildObject1 from '@salesforce/apex/objectSelection.fetchChildObject1';

export default class QfPopUp extends LightningElement {
    section_One_img = section_One;
    section_Two_img = section_Two;
    section_Three_img = section_Three;
    section_Four_img = section_Four;
    section_Five_img = section_Five;
    section_Six_img = section_Six;
    @track temp_One = false;
    @track temp_Two = false;
    @track temp_Third = false;
    value1 = ''
    value2 = ''
    value3 = ''
    @track primaryObject = [];
    @track childObject1 = [];
    @track options_object1 = [];
    @track options_object2 = [];
    @track options_object3 = [];
    @track isModalOpen = false;

    renderedCallback(){
        ParentObject()
        .then( result => {
            console.log({result});
            this.primaryObject = result;
        })
    }
    
    firstTemp(){
        this.temp_One = true;    
        this.temp_Two = false;
        this.temp_Third = false;

        let opp = [];
        for(var i=0;i<this.primaryObject.length;i++)
        {
            opp.push({label : this.primaryObject[i] , value: this.primaryObject[i]});
        }
        this.options_object1 = opp;
        // console.log('Options = ' + this.options_object1);
    }

    secondTemp(){
        this.temp_One = false;
        this.temp_Two = true;
        this.temp_Third = false;

        let opp = [];
        for(var i=0;i<this.primaryObject.length;i++)
        {
            opp.push({label : this.primaryObject[i] , value: this.primaryObject[i]});
        }
        this.options_object1 = opp;
        // console.log('Options = ' + this.options_object1);

        let opp1 = [];
        for(var i=0;i<this.childObject1.length;i++)
        {
            opp1.push({label : this.childObject1[i] , value: this.childObject1[i]});
        }
        this.options_object2 = opp1;
        // console.log('Options = ' + this.options_object2);
    }

    thirdTemp(){
        this.temp_One = false;
        this.temp_Two = false;
        this.temp_Third = true;

        let opp = [];
        for(var i=0;i<this.primaryObject.length;i++)
        {
            opp.push({label : this.primaryObject[i] , value: this.primaryObject[i]});
        }
        this.options_object2 = opp1;
        // console.log('Options = ' + this.options_object2);

        let opp1 = [];
        for(var i=0;i<this.childObject1.length;i++)
        {
            opp1.push({label : this.childObject1[i] , value: this.childObject1[i]});
        }
        this.options_object2 = opp1;
        // console.log('Options = ' + this.options_object2);
    }

    openModal() {
        // to open modal set isModalOpen tarck value as true
        this.isModalOpen = true;
    }
    closeModal() {
        // to close modal set isModalOpen tarck value as false
        this.isModalOpen = false;
    }

    object1(event){
        this.value1 = event.detail.value;
        if(this.value1 != '')
        {
            fetchChildObject1({parent : this.value1})
            .then( result => {
                console.log('result ='+result);
                this.childObject1 = result;
            })
            let opp = [];
            for(var i=0;i<this.primaryObject.length;i++)
            {
                opp.push({label : this.primaryObject[i] , value: this.primaryObject[i]});
            }
            this.options_object1 = opp;
            // console.log('Options = ' + this.options_object1);
            }
    }
    object2_1(event){
        this.value2 = event.detail.value;
        if(this.value1 != '')
        {
            fetchChildObject1({parent : this.value1})
            .then( result => {
                this.childObject1 = result;
            })
            let opp = [];
            for(var i=0;i<this.primaryObject.length;i++)
            {
                opp.push({label : this.primaryObject[i] , value: this.primaryObject[i]});
            }
            this.options_object1 = opp;
            // console.log('Options = ' + this.options_object1);

            let opp1 = [];
            for(var i=0;i<this.childObject1.length;i++)
            {
                opp1.push({label : this.childObject1[i] , value: this.childObject1[i]});
            }
            this.options_object2 = opp1;
            console.log('Options 1 = ' + JSON.stringify(this.options_object2));
        }
    }
    object2_2(event){
        this.value3 = event.detail.value;
    }
}