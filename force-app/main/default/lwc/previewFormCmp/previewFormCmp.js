import { LightningElement,track,api } from 'lwc';

import GetFormPage from '@salesforce/apex/FormBuilderController.GetFormPage';
import getFieldsRecords from '@salesforce/apex/FormBuilderController.getFieldsRecords';
import getFormCSS from '@salesforce/apex/FormBuilderController.getFormCSS';
import getPageCSS from '@salesforce/apex/FormBuilderController.getPageCSS';
import getprogressbar from '@salesforce/apex/FormBuilderController.getprogressbar';
import getcaptcha from '@salesforce/apex/FormBuilderController.getcaptcha';
import BackButton from '@salesforce/resourceUrl/BackButton';

import { NavigationMixin } from "lightning/navigation";

export default class PreviewFormCmp  extends NavigationMixin(LightningElement) {

    @api formid ='';
    @track getFieldCSS;
    removeObjFields = [];
    @track page = [];
    @track PageList = [];
    @track FieldList = [];
    @track Mainlist = [];
    @track pageindex = 1;
    @api activepreview = false;
    @track spinnerDataTable = false;
    @track isIndexZero = true;
    @track isIndexLast = false;
    @track Progressbarvalue;
    @track captchavalue;
    BackButton = BackButton;
    @track verify;


    connectedCallback() {
        this.spinnerDataTable = true;
        getprogressbar({id:this.formid})
        .then(result =>{
            this.Progressbarvalue = result;
            });

        getcaptcha({id:this.formid})
        .then(result =>{
            console.log(result);
            this.captchavalue = result;
            console.log('captcha -- ' +this.captchavalue);
            });

        GetFormPage({ Form_Id: this.formid})
        .then(result => {
            this.PageList = result;
            this.secondmethod();
        }).catch(error => {
            console.log(error);
        });
    }
    secondmethod(){
        getFieldsRecords({id:this.formid})
            .then(result => {
                this.FieldList = result;
                console.log('FieldList ====>'+ JSON.stringify(this.FieldList));
                this.setPageField(this.FieldList);
            })
            .catch(error => {
                console.log(error);
            });
    }



    setPageField(fieldLists) {
        let outerlist = [];
        for (let i = 0; i < this.PageList.length; i++) {
            let innerlist = [];
            for (let j = 0; j < fieldLists.length; j++) {
                if (this.PageList[i].Id == fieldLists[j].Form_Page__c) {
                   let fieldofObj =  fieldLists[j].Name.split(',');
                   if(fieldofObj.length==2){
                     if(fieldofObj[1]!='Extra' && fieldofObj[1]!=undefined && fieldofObj[1]!='undefined'){
                        this.removeObjFields.push(fieldofObj[0]);
                     }
                 }
                    innerlist.push(fieldLists[j]);
                }
            }

            let temp = { pageName: this.PageList[i].Name, pageId: this.PageList[i].Id, FieldData: innerlist };

            outerlist.push(temp);
        }
        console.log('outerlist ----->'+ JSON.stringify(outerlist));
        this.Mainlist = outerlist;
        this.page = outerlist[0];
        console.log('MainList ----->'+ JSON.stringify(this.page.pageId))

        getFormCSS({id:this.formid})
        .then(result=>{
            this.getFieldCSS = result;
            let array = this.template.querySelector('.myform');
            let str = this.getFieldCSS;
            array.style=str;
        }).catch(error=>{
            console.log({error});
        })

        getPageCSS({id:this.formid})
        .then(result=>{
            this.getFieldCSS = result;
            let array = this.template.querySelectorAll('.page');
            let str = this.getFieldCSS;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                element.style = str;
            }
        }).catch(error=>{
            console.log({error});
        })
        if(this.pageindex == this.PageList.length){
            this.isIndexZero = true;
            this.isIndexLast = true;
        }
        this.spinnerDataTable = false;
        this.template.querySelector('c-progress-indicator').calculation(this.Progressbarvalue,this.pageindex, this.PageList.length);
       
    }

    backhome(event){
        let cmpDef = {
            componentDef: "c:qf_home"
        };
        let encodedDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
                url: "/one/one.app#" + encodedDef
            }
        });
    }

    onaddpage1(event){
        if(event.currentTarget.dataset.name == 'previous'){
            
            if(this.pageindex == 1){ 
                this.isIndexZero = true;              
            }
            else if(this.PageList.length  > this.pageindex){
                this.pageindex--;  
                if(this.pageindex == 1){
                    this.isIndexLast = false;
                    this.isIndexZero = true;
                }
            }
            else if(this.PageList.length  == this.pageindex){
                console.log('lastindex');
                this.pageindex--;               
                this.isIndexLast = false;
                if(this.pageindex == 1){
                    this.isIndexLast = false;
                    this.isIndexZero = true;
                }
            }
            this.page = this.Mainlist[this.pageindex - 1]; 
            this.template.querySelector('c-progress-indicator').calculation(this.Progressbarvalue,this.pageindex, this.PageList.length);
            
        }

        else if(event.currentTarget.dataset.name == 'next'){
            if(this.pageindex == 1){ 

                if(this.pageindex == this.PageList.length){
                    this.isIndexZero = false;
                    this.isIndexLast = true;
                }
                else{
                    this.pageindex++;
                    this.isIndexZero = false;
                    this.isIndexLast = false;
                    if(this.pageindex == this.PageList.length){
                        this.isIndexLast = true;
                    }
                }              
            }
            else if(this.PageList.length  > this.pageindex){
                this.pageindex++;               
                if(this.pageindex == this.PageList.length ){
                    this.isIndexLast = true;
                }
                else{
                    this.isIndexLast = false;
                }
            }
            else if(this.PageList.length == this.pageindex){
            }
            this.page = this.Mainlist[this.pageindex - 1]; 
            this.template.querySelector('c-progress-indicator').calculation(this.Progressbarvalue,this.pageindex, this.PageList.length);
        }

        else if(event.currentTarget.dataset.name == 'submit'){
            
            if(this.verify == true){
            }
            else if(this.verify == false){
                let toast_error_msg = 'Invalid Captcha';
                this.template.querySelector('c-toast-component').showToast('error',toast_error_msg,3000);
            }
            else {
                console.log(this.verify);
                let toast_error_msg = 'Please Verify Captcha';
                this.template.querySelector('c-toast-component').showToast('error',toast_error_msg,3000);
            }
        }
    }

    verifycaptcha(event){
        this.verify = event.detail;
    }
}