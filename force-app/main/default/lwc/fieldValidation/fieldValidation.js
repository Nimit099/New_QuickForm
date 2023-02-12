import { api, LightningElement, track } from 'lwc';
import fieldcancel from '@salesforce/resourceUrl/fieldcancel';
import fielddelete from '@salesforce/resourceUrl/fielddelete';
import fieldsave from '@salesforce/resourceUrl/fieldsave';
import fieldduplicate from '@salesforce/resourceUrl/fieldduplicate';
import deletefield from '@salesforce/apex/fieldvalidation.deletefield';

export default class FieldValidation extends LightningElement {
    mainbody = true;
    shorttext = false;
    shorttextoptions = false;
    shorttextprefix = false;
    longtext = false;
    longtextoptions = false;
    dropdown = false;
    dropdownchoices = false;
    radiobutton = false;
    checkbox = false;
    fileupload = false;
    number = false;
    numberoptions = false;
    numberprefix= false;
    qfemail= false;
    emailoptions= true;
    price = false;
    priceoption = false;
    qffullname = false;
    qfname = false;
    nameoptions = false;
    qfaddress = false;
    qfphone= false;
    phoneoptions = false;
    date = false;
    time = false;
    datetime = false;
    starrating= false;
    emojirating= false;
    scalerating= false;
    scaleratinghelptext= false;
    scaleratingoptions = false;
    termsofservice = false;
    editterms= false;
    link = false;
    linkoptions = false;
    signature= false;
    richtext = false;
    richtextinput = false;
    lookup= false;
    captcha= false;
    formedit= false;
    pageedit= false;
    d43 = false;
    @api tab;
    @api fieldId;
    @api fieldName = '';
    d = true;
    @track labelvalue;
    @track helptext;


    fieldcancel = fieldcancel;
    fieldduplicate = fieldduplicate;
    fieldsave = fieldsave;
    fielddelete = fielddelete;

    connectedCallback(){
        let a = 0;
        this.fieldName = this.fieldName.slice(0, this.fieldName.indexOf(','));
        console.log(this.fieldName);
    }

    @api
    get field(){

        let mydata1 = {data:[{Name:this.fieldName}]};

        mydata1.data.forEach(element => {
            console.log('112');
            if (element.Name == 'QFPHONE') {element.QFPHONE = true} 
            else if(element.Name == 'QFFULLNAME') {element.QFFULLNAME = true}
            else if(element.Name == 'QFADDRESS') {element.QFADDRESS = true}
            else if(element.Name == 'QFNAME') {element.QFNAME = true}
            else if(element.Name == 'QFEMAILID') {element.QFEMAILID = true}
            else if(element.Name == 'QFNUMBER') {element.QFNUMBER = true}
            else if(element.Name == 'QFPRICE') {element.QFPRICE = true}
            else if(element.Name == 'QFRADIOBUTTON') {element.QFRADIOBUTTON = true}
            else if(element.Name == 'QFCHECKBOX') {element.QFCHECKBOX = true}
            else if(element.Name == 'QFRICHTEXT') {element.QFRICHTEXT = true}
            else if(element.Name == 'QFLONGTEXT') {element.QFLONGTEXT = true}
            else if(element.Name == 'QFSHORTTEXT') {element.QFSHORTTEXT = true}
            else if(element.Name == 'QFFILEUPLOAD') {element.QFFILEUPLOAD = true}
            else if(element.Name == 'QFTERMSOFSERVICE') {element.QFTERMSOFSERVICE = true}
            else if(element.Name == 'QFSIGNATURE') {element.QFSIGNATURE = true}
            else if(element.Name == 'QFLINK') {element.QFLINK = true}
            else if(element.Name == 'QFDATE') {element.QFDATE = true}
            else if(element.Name == 'QFTIME') {element.QFTIME = true}
            else if(element.Name == 'QFDATETIME') {element.QFDATETIME = true}
            else if(element.Name == 'QFRATING') {element.QFRATING = true}
            else if(element.Name == 'QFEMOJIRATING') {element.QFEMOJIRATING = true}
            else if(element.Name == 'QFSCALERATING') {element.QFSCALERATING = true}

        });
        return mydata1;
    }

    validatingbtnhandle(event){

        if(event.currentTarget.dataset.title == 'Close'){
            event.preventDefault();
            const selectEvent = new CustomEvent('closevalidation', {
                detail: this.tab
            });
            // Fire the custom event
            this.dispatchEvent(selectEvent);
        }
        else if(event.currentTarget.dataset.title == 'Delete'){
            deletefield({fieldId:this.fieldId})
            .then(result => {

                event.preventDefault();
                const selectEvent = new CustomEvent('closevalidation', {
                    detail: this.tab
                });
                // Fire the custom event
                this.dispatchEvent(selectEvent);
                
            })
            .catch(error => {
                console.log(error);
            });
        }
    }
    get showlabel() {
        return [
            { label: 'Show', value: 'Show' },
            { label: 'Hide', value: 'Hide' },
        
        ];
    }
    validatingvalue(event){
        if(event.currentTarget.dataset.title == 'Label'){
        this.labelvalue = event.detail.value;
        }
        else if(event.currentTarget.dataset.title == 'HelpText'){
            this.helptext = event.detail.value;
        }
    }
}