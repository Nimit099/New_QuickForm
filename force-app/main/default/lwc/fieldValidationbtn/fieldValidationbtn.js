import { LightningElement,api,wire } from 'lwc';
import fieldcancel from '@salesforce/resourceUrl/fieldcancel';
import fielddelete from '@salesforce/resourceUrl/fielddelete';
import fieldsave from '@salesforce/resourceUrl/fieldsave';
import fieldduplicate from '@salesforce/resourceUrl/fieldduplicate';


export default class FieldValidationbtn extends LightningElement {
    d= true;
    fieldcancel = fieldcancel;
    fieldduplicate = fieldduplicate;
    fieldsave = fieldsave;
    fielddelete = fielddelete;
    @api tab;

    connectedCallback(){
    }

    openfieldvalidations(openfromvalid){
     this.tab = openfromvalid;
     console.log(openfromvalid + 'from fieldvalidationbtn');
    }
    validatingbtnhandle(event){
        console.log(event.currentTarget.dataset.title);
        if(event.currentTarget.dataset.title == 'Close'){
            console.log(this.tab + 'frpm btnnn');          
        }
    }
}