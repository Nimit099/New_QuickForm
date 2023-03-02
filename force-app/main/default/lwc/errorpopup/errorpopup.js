import { api, LightningElement, track } from 'lwc';

export default class Errorpopup extends LightningElement {
    @track show = false;
    showError() {
        this.show = true;
    }
    
    hideError() {
        this.show = false;
    }
}