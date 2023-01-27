import Longitude from '@salesforce/schema/Lead.Longitude';
import { LightningElement,track,api} from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import CancleIcon from '@salesforce/resourceUrl/cancleIcon';
import cross_gery from '@salesforce/resourceUrl/cross_gery';
export default class ToastComponent extends LightningElement {
    @track type='success';
    @track message;
    @track messageIsHtml=true;
    @track showToastBar_success = false;
    @track showToastBar_error = false;
    @api autoCloseTime = 3000;
    @track icon='';
    cross_gery_img = cross_gery;
    
    @api messagee ;


    @api
    showToast(type, message, time) {
        this.type = type;
        this.message = message;
      
        if(this.type == "success"){
            this.showToastBar_success = true;
            this.showToastBar_error = false;
        }
        else{
            this.showToastBar_success = false;
            this.showToastBar_error = true;

        }
        console.log('OUTPUT toast: ',message);
        setTimeout(() => {
            this.closeModel();
        }, this.autoCloseTime);
    }

    
    closeModel() {
        this.showToastBar_success = false;
        this.showToastBar_error = false;
        this.type = '';
        this.message = '';
    }

    renderedCallback(){
        Promise.all([
            loadStyle( this, CancleIcon )
            ]).then(() => {
                console.log( 'icon' );
            })
            .catch(error => {
                console.log( error.body.message );
        });
    }
 
    get outerClass() {
        return 'slds-notify slds-notify_toast ';
    }
}