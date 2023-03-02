import { api, LightningElement, track } from 'lwc';
import fieldcancel from '@salesforce/resourceUrl/fieldcancel';
import fielddelete from '@salesforce/resourceUrl/fielddelete';
import fieldsave from '@salesforce/resourceUrl/fieldsave';
import fieldduplicate from '@salesforce/resourceUrl/fieldduplicate';
import deletefield from '@salesforce/apex/fieldvalidation.deletefield';
import savevalidation from '@salesforce/apex/fieldvalidation.savevalidation';
import getfieldvalidation from '@salesforce/apex/fieldvalidation.getfieldvalidation';
import copyfield from '@salesforce/apex/fieldvalidation.copyfield';


export default class FieldValidation extends LightningElement {
    @api tab;
    @api fieldId;
    @track fieldName = '';
    @api labelvalue;
    @track helptext = '';
    @track placeholdervalue = '';
    @track prefixvalue = '';
    @track decimal = '';
    @track helptextcheck = false;
    @track labelcheck = true;
    @track isRequiredcheck = false;
    @track isdisabledcheck = false;
    @track placeholdercheck = false;
    @track richtextinput = false;
    @track FieldValidation = [];
    @track Richtextvalue = '';
    @track minimumvalue = 0;
    @track maximumvalue = 128;
    @track salutation = [];
    @track salutationindex = 0;
    @track salutationvalue = [];
    @track validation = [];
    @track maximumdate = '';
    @track minimumdate = '';
    @track fieldtype;
    @track standardrequired;
    spinnerDataTable = false;

    fieldcancel = fieldcancel;
    fieldduplicate = fieldduplicate;
    fieldsave = fieldsave;
    fielddelete = fielddelete;

    @api
    get field() {
        try {
            if (this.fieldtype == 'Extra') {
                let mydata1 = { data: [{ Name: this.fieldName }] };
                mydata1.data.forEach(element => {
                    if (element.Name == 'QFPHONE') { element.QFPHONE = true }
                    else if (element.Name == 'QFFULLNAME') { element.QFFULLNAME = true }
                    else if (element.Name == 'QFADDRESS') { element.QFADDRESS = true }
                    else if (element.Name == 'QFNAME') { element.QFEMAILID = true }
                    else if (element.Name == 'QFEMAILID') { element.QFEMAILID = true }
                    else if (element.Name == 'QFNUMBER') { element.QFNUMBER = true }
                    else if (element.Name == 'QFPRICE') { element.QFPRICE = true }
                    else if (element.Name == 'QFRADIOBUTTON') { element.QFRADIOBUTTON = true }
                    else if (element.Name == 'QFCHECKBOX') { element.QFCHECKBOX = true }
                    else if (element.Name == 'QFRICHTEXT') { element.QFRICHTEXT = true }
                    else if (element.Name == 'QFLONGTEXT') { element.QFLONGTEXT = true }
                    else if (element.Name == 'QFSHORTTEXT') { element.QFSHORTTEXT = true }
                    else if (element.Name == 'QFFILEUPLOAD') { element.QFFILEUPLOAD = true }
                    else if (element.Name == 'QFTERMSOFSERVICE') { element.QFTERMSOFSERVICE = true }
                    else if (element.Name == 'QFSIGNATURE') { element.QFSIGNATURE = true }
                    else if (element.Name == 'QFDATE') { element.QFDATE = true }
                    else if (element.Name == 'QFTIME') { element.QFTIME = true }
                    else if (element.Name == 'QFDATETIME') { element.QFDATETIME = true }
                    else if (element.Name == 'QFRATING') { element.QFRATING = true }
                    else if (element.Name == 'QFEMOJIRATING') { element.QFEMOJIRATING = true }
                    else if (element.Name == 'QFSCALERATING') { element.QFSCALERATING = true }
                });
                return mydata1;
            }
            else {
                let mydata1 = { data: [{ Name: this.fieldtype }] };
                mydata1.data.forEach(element => {
                    if (element.Name == 'PHONE') { element.QFPHONE = true }
                    else if (element.Name == 'STRING' || element.Name == 'TEXTAREA' || element.Name == 'EMAIL' || element.Name == 'ENCRYPTEDSTRING') { element.QFEMAILID = true }
                    else if (element.Name == 'DOUBLE' || element.Name == 'CURRENCY' || element.Name == 'PERCENT') { element.QFNUMBER = true }
                    else if (element.Name == 'DATE') { element.QFDATE = true }
                    else if (element.Name == 'TIME') { element.QFTIME = true }
                    else if (element.Name == 'DATETIME') { element.QFDATETIME = true }
                });
                return mydata1;
            }
        } catch (error) {
            console.log(error + 'Validation Error');
            this.spinnerDataTable = false;
        }
    }

    @api
    openvalidation(tab, fieldId, fieldName) {
        try {
            console.log('TABA' + tab);
            this.fieldtype = fieldName.split(',')[1];
            this.standardrequired = fieldName.split(',')[2];
            this.tab = tab;
            this.fieldId = fieldId;
            this.fieldName = fieldName.slice(0, fieldName.indexOf(','));
            this.spinnerDataTable = true;
            this.salutationvalue = [];
            this.salutation = [];
            this.salutationindex = 0;

            getfieldvalidation({ fieldId: this.fieldId }).then(result => {
                let str = result.split('?$`~');
                for (let i = 0; i < str.length; i++) {

                    let labels = str[i].split('<!@!>')[0];
                    let value = str[i].split('<!@!>')[1];

                    if (labels == 'isRequired') {
                        this.isRequiredcheck = JSON.parse(value);
                    }
                    else if (labels == 'isDisabled') {
                        this.isdisabledcheck = JSON.parse(value);
                    }
                    else if (labels == 'isLabel') {
                        this.labelcheck = JSON.parse(value);
                    }
                    else if (labels == 'isHelpText') {
                        this.helptextcheck = JSON.parse(value);
                    }
                    else if (labels == 'isPlaceholder') {
                        this.placeholdercheck = JSON.parse(value);
                    }
                    else if (labels == 'isPrefix') {
                        this.prefixcheck = JSON.parse(value);
                    }
                    else if (labels == 'Prefix') {
                        this.prefixvalue = value;
                    }
                    else if (labels == 'Label') {
                        this.labelvalue = value;
                    }
                    else if (labels == 'HelpText') {
                        this.helptext = value;
                    }
                    else if (labels == 'Placeholder') {
                        this.placeholdervalue = value;
                    }
                    else if (labels == 'Salutation') {
                        this.salutationvalue.push(value);
                    }
                    else if (labels == 'MinimumDateTime') {
                        this.minimumdate = value;
                    }
                    else if (labels == 'MaximumDateTime') {
                        this.maximumdate = value;
                    }
                    else if (labels == 'MinimumDate') {
                        this.minimumdate = value;
                    }
                    else if (labels == 'MaximumDate') {
                        this.maximumdate = value;
                    }
                    else if (labels == 'MinimumTime') {
                        this.minimumdate = value;
                    }
                    else if (labels == 'MaximumTime') {
                        this.maximumdate = value;
                    }
                    else if (labels == 'Minimum') {
                        this.minimumvalue = value;
                    }
                    else if (labels == 'Maximum') {
                        this.maximumvalue = value;
                    }
                    else if (labels == 'Richtext') {
                        this.Richtextvalue = value;
                    }
                }
                this.opensalutation();
                this.spinnerDataTable = false;
            })
        } catch (error) {
            console.log(error + 'Validation Error');
            this.spinnerDataTable = false;
        }
    }

    validatingbtnhandle(event) {
        try {
            if (event.currentTarget.dataset.title == 'Close') {
                event.preventDefault();
                const selectEvent = new CustomEvent('closevalidation', {
                    detail: this.tab
                });
                this.dispatchEvent(selectEvent);
            }
            else if (event.currentTarget.dataset.title == 'Delete') {
                if (this.standardrequired != 'isrequired') {
                    deletefield({ fieldId: this.fieldId })
                        .then(result => {
                            event.preventDefault();
                            const deleteEvent = new CustomEvent('updatefields', {
                                detail: this.fieldName
                            });
                            this.dispatchEvent(deleteEvent);

                            const selectEvent = new CustomEvent('closevalidation', {
                                detail: this.tab
                            });
                            this.dispatchEvent(selectEvent);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.template.querySelector('c-toast-component').showToast('error', 'You cannot delete Standard required fields', 3000);
                }
            }
            else if (event.currentTarget.dataset.title == 'Save') {
                this.fieldValidation;

                this.fieldValidation = 'isRequired<!@!>' + this.isRequiredcheck +
                    '?$`~isDisabled<!@!>' + this.isdisabledcheck +
                    '?$`~isLabel<!@!>' + this.labelcheck +
                    '?$`~isHelpText<!@!>' + this.helptextcheck +
                    '?$`~Label<!@!>' + this.labelvalue +
                    '?$`~HelpText<!@!>' + this.helptext +
                    '?$`~isPlaceholder<!@!>' + this.placeholdercheck +
                    '?$`~Placeholder<!@!>' + this.placeholdervalue +
                    '?$`~Minimum<!@!>' + this.minimumvalue +
                    '?$`~Maximum<!@!>' + this.maximumvalue +
                    '?$`~isPrefix<!@!>' + this.prefixcheck +
                    '?$`~Prefix<!@!>' + this.prefixvalue +
                    '?$`~Decimal<!@!>' + this.decimal +
                    '?$`~Richtext<!@!>' + this.Richtextvalue +
                    '?$`~MinimumTime<!@!>' + this.minimumdate +
                    '?$`~MaximumTime<!@!>' + this.maximumdate +
                    '?$`~MinimumDateTime<!@!>' + this.minimumdate +
                    '?$`~MaximumDateTime<!@!>' + this.maximumdate +
                    '?$`~MinimumDate<!@!>' + this.minimumdate +
                    '?$`~MaximumDate<!@!>' + this.maximumdate;

                for (let i = 0; i < this.salutationvalue.length; i++) {
                    if (typeof this.salutationvalue[i] !== 'undefined') {
                        if (this.salutationvalue[i].replaceAll(' ', '') !== '') {
                            this.fieldValidation = this.fieldValidation.concat('?$`~Salutation<!@!>' + this.salutationvalue[i]);
                        }
                    }
                }

                if (this.maximumvalue > this.minimumvalue) {
                    savevalidation({ fieldId: this.fieldId, fieldValidation: this.fieldValidation })
                        .then(result => {
                            event.preventDefault();
                            const selectEvent = new CustomEvent('closevalidation', {
                                detail: this.tab
                            });
                            this.dispatchEvent(selectEvent);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    this.template.querySelector('c-toast-component').showToast('error', 'There is some error in your validations', 3000);
                }

            }
            else if (event.currentTarget.dataset.title == 'Copy') {
                if (this.fieldtype == 'Extra') {
                    copyfield({ fieldId: this.fieldId })
                        .then(result => {
                            event.preventDefault();
                            const selectEvent = new CustomEvent('closevalidation', {
                                detail: this.tab
                            });
                            this.dispatchEvent(selectEvent);

                        })
                        .catch(error => {
                            console.log(error);
                        });
                }
                else {
                    this.template.querySelector('c-toast-component').showToast('error', 'You cannot copy Object Fields', 3000);
                }
            }
        } catch (error) {
            console.log(error + 'Validation Error');
            this.spinnerDataTable = false;
        }
    }

    get showdecimal() {
        return [
            { label: '0', value: '0' },
            { label: '0.00', value: '0.00' },
            { label: '0.000', value: '0.000' },
            { label: '0.0000', value: '0.0000' },
        ];
    }

    validatingvalue(event) {
        try {
            if (event.currentTarget.dataset.title == 'Label') {
                this.labelvalue = event.detail.value;
            }
            else if (event.currentTarget.dataset.title == 'HelpText') {
                this.helptext = event.detail.value;
            }
            else if (event.currentTarget.dataset.title == 'PlaceHolder') {
                this.placeholdervalue = event.detail.value;
            }
            else if (event.currentTarget.dataset.title == 'Prefix') {
                this.prefixvalue = event.detail.value;
            }
            else if (event.currentTarget.dataset.title == 'Maximum') {
                this.maximumvalue = event.detail.value;
            }
            else if (event.currentTarget.dataset.title == 'Minimum') {
                this.minimumvalue = event.detail.value;
            }
            else if (event.currentTarget.dataset.title == 'MinimumDate') {
                this.minimumdate = event.detail.value;
            }
            else if (event.currentTarget.dataset.title == 'MaximumDate') {
                this.maximumdate = event.detail.value;
            }
        } catch (error) {
            console.log(error + 'Validation Error');
            this.spinnerDataTable = false;
        }
    }

    handlevalidation(event) {
        try {
            if (event.currentTarget.dataset.title == 'Label') {
                this.labelcheck = event.target.checked;;
            }
            else if (event.currentTarget.dataset.title == 'HelpText') {
                this.helptextcheck = event.target.checked;;
            }
            else if (event.currentTarget.dataset.title == 'PlaceHolder') {
                this.placeholdercheck = event.target.checked;
            }
            else if (event.currentTarget.dataset.title == 'Prefix') {
                this.prefixcheck = event.detail.checked;
            }
            else if (event.currentTarget.dataset.title == 'Decimal') {
                this.decimal = event.detail.value;
            }
            else if (event.currentTarget.dataset.title == 'RichText') {
                this.richtextinput = true;
            }
        } catch (error) {
            console.log(error + 'Validation Error');
            this.spinnerDataTable = false;
        }
    }

    isRequired(event) {
        try {
            this.isRequiredcheck = event.target.checked;
            if (this.standardrequired == 'isrequired') {
                if (this.isRequiredcheck == false) {
                    this.isRequiredcheck = true;
                    this.isdisabledcheck = false;
                    this.template.querySelector('c-toast-component').showToast('error', 'You cannot change required of Standard Required field', 3000);
                }
            } else {

                if (this.isRequiredcheck == true) {
                    this.isdisabledcheck = false;
                }
            }
        } catch (error) {
            console.log(error + 'Validation Error');
            this.spinnerDataTable = false;
        }
    }

    isdisabled(event) {
        this.isdisabledcheck = event.target.checked;
        if (this.standardrequired == 'isrequired') {
            if (this.isdisabledcheck == true) {
                this.isRequiredcheck = true;
                this.isdisabledcheck = false;
                this.template.querySelector('c-toast-component').showToast('error', 'You cannot disable Standard Required field', 3000);
            }
        } else {
            if (this.isdisabledcheck == true) {
                this.isRequiredcheck = false;
            }
        }
    }

    RichTextData(event) {
        this.Richtextvalue = event.detail.value;
    }

    closerichtext() {
        this.richtextinput = false;
    }

    slider(event) {
        if (event.currentTarget.dataset.title == 'Minimum') {
            this.minimumvalue = event.detail.value;
            this.minimumvalue = parseInt(this.minimumvalue);
            if (this.minimumvalue >= this.maximumvalue) {
                this.template.querySelector('c-toast-component').showToast('error', 'Minimum Value cannot higher then Maximum Value', 3000);
            }
        }
        else if (event.currentTarget.dataset.title == 'Maximum') {
            this.maximumvalue = event.detail.value;
            this.maximumvalue = parseInt(this.maximumvalue);
            if (this.minimumvalue >= this.maximumvalue) {
                this.template.querySelector('c-toast-component').showToast('error', 'Maximum Value cannot lower than Minimum Value ', 3000);
            }
        }
        else if (event.currentTarget.dataset.title == 'Reset') {
            this.minimumvalue = 0;
            this.maximumvalue = 128;
        }
    }
    @api
    get salutations() {
        return this.salutation;
    }
    addsalutation(event) {
        this.salutation.push({ id: this.salutationindex, salutation: '' })
        this.salutationindex++;
    }
    opensalutation() {
        try {
            for (let i = 0; i < this.salutationvalue.length; i++) {
                this.salutation.push({ id: this.salutationindex, salutation: this.salutationvalue[i] })
                this.salutationindex++;
            }
        } catch (error) {
            console.log(error + 'Validation Error');
            this.spinnerDataTable = false;
        }
    }
    deletesalutation(event) {
        this.salutation.splice(event.currentTarget.dataset.id, 1);
        this.salutationvalue.splice(event.currentTarget.dataset.id, 1);
        this.salutationindex--;
        this.salutation = [];
        for (let index = 0; index < this.salutationindex; index++) {
            this.salutation.push({ id: index, salutation: this.salutationvalue[index] });
        }
    }

    salutationvalues(event) {
        this.salutationvalue[event.currentTarget.dataset.id] = event.detail.value;
        this.salutation[event.currentTarget.dataset.id] = ({ id: event.currentTarget.dataset.id, salutation: this.salutationvalue[event.currentTarget.dataset.id] });
    }
}