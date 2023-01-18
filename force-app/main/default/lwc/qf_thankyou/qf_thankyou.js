import { LightningElement } from 'lwc';
import thankyoulogo from '@salesforce/resourceUrl/Thankyoulogo';

export default class Qf_thankyou extends LightningElement {
    thankyoulogo = thankyoulogo;
    formats = ['font', 'size', 'bold', 'italic', 'underline', 'strike', 'list', 'indent', 'align', 'link', 'clean', 'table', 
    'header', 'color', 'background'];

    toggleFields(event){
        console.log(event);
    }
}