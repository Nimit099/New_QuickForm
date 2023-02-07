import { LightningElement,api, track } from 'lwc';
export default class CaptchaType extends LightningElement {
    @track getprogreshbar='Select';
    @track Captcha = false;
    @track Slider_Captcha = false;
    @track Image_Captcha = false;
    @track Normal_Captcha = false;
    @track Maths_Captcha = false;
   


    @track showBool = false;
    alphabets = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz";
    alphabetslength = this.alphabets.length;
    @track msg_verified_captcha = false;
    @track msg_invalid_captcha = false;
    @track get_normal_captcha_value;
    @track get_math_captcha_value;
    @track normal_captcha;
    @track sum_mat_captcha;
    @track mat_captcha_1;
    @track mat_captcha_2;
    @track set_normal_captcha_value;
    @track set_math_captcha_value;
    @track value = 0;
    @track styleColor;
    @track pickListValueList=[];
    @track rendomcolor;
    @track color;
    @track BackgroundColor;
    @track test;

    @api captypetypes='Select';

    connectedCallback() {
        this.generate_new_math_captcha();
        this.generate_new_normal_captcha();
        this.generate_new_slider_captcha(); 
        this.getrendomcolore();    
        this.preview_chptchatype(this.captypetypes);  
        // console.log('test >>>',captype);
    }
    
    // Start Captcha 1 Normal Captcha
    verify_normal_captcha(event){
        // this.get_normal_captcha_value = event.target.value;
        this.get_normal_captcha_value = this.template.querySelector('input[data-id=normal_captch_usr_input]').value;
        console.log('re '+this.normal_captcha);
        console.log('input '+this.get_normal_captcha_value);
        if(this.get_normal_captcha_value == this.normal_captcha){
            console.log('Captcha Verified');
            this.msg_verified_captcha = true;
            this.msg_invalid_captcha = false;
            this.set_normal_captcha_value = this.get_normal_captcha_value; 
        }
        else{
            console.log('Invalid Captcha');
            this.msg_invalid_captcha = true;
            this.msg_verified_captcha = false; 
            this.set_normal_captcha_value = null;
        }
    }
    generate_new_normal_captcha() {
        this.first = this.alphabets[Math.floor(Math.random() * this.alphabetslength)];
        this.second = Math.floor(Math.random() * 10);
        this.third = Math.floor(Math.random() * 10);
        this.fourth = this.alphabets[Math.floor(Math.random() * this.alphabetslength)];
        this.fifth = this.alphabets[Math.floor(Math.random() * this.alphabetslength)];
        this.sixth = Math.floor(Math.random() * 10);
        this.normal_captcha = this.first+this.second+this.third+this.fourth+this.fifth+this.sixth;
        this.set_normal_captcha_value = null;
    }
    // End Captcha 1 Normal Captcha

    // Start Captcha 2 Math Captcha
    generate_new_math_captcha(){
        this.mat_captcha_1 = Math.floor(Math.random() * 100);
        this.mat_captcha_2 = Math.floor(Math.random() * 10);
        this.sum_mat_captcha = parseInt(this.mat_captcha_1) + parseInt(this.mat_captcha_2);
        this.set_math_captcha_value = null;
    }

    verify_math_captcha(event){
        this.get_math_captcha_value = this.template.querySelector('input[data-id=math_captch_usr_input]').value;
        console.log('re '+this.sum_mat_captcha);
        console.log('input '+this.get_math_captcha_value);
        if(this.get_math_captcha_value == this.sum_mat_captcha){
            console.log('Captcha Verified');
            this.msg_verified_captcha = true;
            this.msg_invalid_captcha = false;
            this.set_math_captcha_value = this.get_math_captcha_value;
        }
        else{
            console.log('Invalid Captcha');
            this.msg_invalid_captcha = true;
            this.msg_verified_captcha = false; 
            this.set_math_captcha_value = null;
        }
       
    }
    
    
    // End Captcha 2 Math Captcha

    // Start Captcha 3 Slider Captcha
    generate_new_slider_captcha(){
        this.slider_captcha_1 = Math.floor(Math.random() * 50);
    }
    handleValueChange(event) {
        this.value = event.target.value;
        if(this.value == this.slider_captcha_1){
            console.log('Captcha Verified');
            this.msg_verified_captcha = true;
            this.msg_invalid_captcha = false;
        }
        else{
            console.log('Invalid Captcha');
            this.msg_invalid_captcha = true;
            this.msg_verified_captcha = false; 
        }

    }
    // End Captcha 3 Slider Captcha



    getrendomcolore(){
        this.pickListValueList=[];
        for(var i=1; i<=8; i++){
            // console.log(i);
            const letter = "0123456789ABCDEF";
            this.color = "#";
            for (let j = 0; j < 6; j++) {
                this.color += letter[Math.floor(Math.random() * 16)];
            }
            // console.log(this.color);
            this.BackgroundColor = 'background-color:' + this.color;

            this.pickListValueList.push(this.BackgroundColor);
            this.rendomcolor = this.pickListValueList[Math.floor(Math.random() * 8)];
        }
        // console.log('hoiiii ' +this.pickListValueList);
        this.msg_verified_captcha=false;
    }
    verfication_color_captcha(event){
        this.test = event.target.dataset.name;
        if (this.test==this.rendomcolor) {
            // alert('you are verified');
            // this.pickListValueList=null;
            this.msg_verified_captcha = true;
            this.msg_invalid_captcha = false;
        }
        else{
            // alert('you are select wrong option');
            this.msg_invalid_captcha = true;
            this.msg_verified_captcha = false;
            this.getrendomcolore();
           
        }
    }




    @api preview_chptchatype(strString){
        this.getprogreshbar = strString;
        console.log('yash ',this.getprogreshbar);
        if(this.getprogreshbar=='Select'){
            this.Captcha = false;
            this.Slider_Captcha = false;
            this.Image_Captcha = false;
            this.Normal_Captcha = false;
            this.Maths_Captcha = false;
        }
        if(this.getprogreshbar=='Slider_Captcha'){
            this.Captcha = false;
            this.Slider_Captcha = true;
            this.Image_Captcha = false;
            this.Normal_Captcha = false;
            this.Maths_Captcha = false;
        }
        if(this.getprogreshbar=='Image_Captcha'){
            this.Captcha = false;
            this.Slider_Captcha = false;
            this.Image_Captcha = true;
            this.Normal_Captcha = false;
            this.Maths_Captcha = false;
        }
        if(this.getprogreshbar=='Normal_Captcha'){
            this.Captcha = false;
            this.Slider_Captcha = false;
            this.Image_Captcha = false;
            this.Normal_Captcha = true;
            this.Maths_Captcha = false;
        }
        if(this.getprogreshbar=='Maths_Captcha'){
            this.Captcha = false;
            this.Slider_Captcha = false;
            this.Image_Captcha = false;
            this.Normal_Captcha = false;
            this.Maths_Captcha = true;
        }

    }

    
}