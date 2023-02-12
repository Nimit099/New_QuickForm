import { api, LightningElement, track } from 'lwc';

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
    qffullname = true;
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


    connectedCallback(){
        let a = 0;
        console.log(this.tab + 'from field validation');
    }
}