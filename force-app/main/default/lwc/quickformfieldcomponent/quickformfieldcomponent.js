import getFieldCSS from '@salesforce/apex/FormBuilderController.getFieldCSS';
import getLabelCSS from '@salesforce/apex/FormBuilderController.getLabelCSS';
import { LightningElement,api,wire,track } from 'lwc';
import EmojiRating1 from '@salesforce/resourceUrl/EmojiRating1';
import EmojiRating5 from '@salesforce/resourceUrl/EmojiRating5';
import EmojiRating2 from '@salesforce/resourceUrl/EmojiRating2';
import EmojiRating3 from '@salesforce/resourceUrl/EmojiRating3';
import EmojiRating4 from '@salesforce/resourceUrl/EmojiRating4';
export default class Quickformfieldcomponent extends LightningElement {

    // icons
    emojiRating1 = EmojiRating1;
    emojiRating2 = EmojiRating2;
    emojiRating3 = EmojiRating3;
    emojiRating4 = EmojiRating4;
    emojiRating5 = EmojiRating5;

    @api compview;
    @api tView; 
   @api disableField;
   @api fieldAttribute;
   @api fieldAttributeValue;
   @api fieldId;
   @api formid;
   @track FieldShown = true;
   @track LabelShown =true;
   @track isReqired =true;
   @track fieldHelpText = 'please fill the help text';
   @track fieldValidations='';
   FieldLabel;
   FieldType;
   count;
   
   @track getFieldCSS;

    connectedCallback(){
        console.log('c callback ');
        // getFieldCSS({id:this.formid})
        // .then(result=>{
        //     console.log(result);
        //     this.getFieldCSS = result;
        //     console.log('FieldCSS->> '+this.getFieldCSS);
        //   }).catch(error=>{
        //     console.log(error);
        //   })
        // for (let i = 0; i < Tags.length; i++) {
        //     console.log('connected callback '+i);
        //     const element = Tags[i];
        //     element.classList.add('AllfieldCSS');
        //     element.style="color:red";
        // }
        // this.template.querySelectorAll('.AllfieldCSS').style="color:green";
    }
    renderedCallback(){
        getFieldCSS({id:this.formid})
        .then(result=>{
            console.log(result);
            this.getFieldCSS = result;
            console.log('FieldCSS->> '+this.getFieldCSS);
            console.log(this.template.querySelectorAll('input'));
            let array = this.template.querySelectorAll('input');
            console.log(array.length);
            let str = this.getFieldCSS;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                element.style=str;
            
            }
            this.template.querySelector('select').style = str;
        }).catch(error=>{
            console.log({error});
        })

        getLabelCSS({id:this.formid})
        .then(result=>{
            console.log(result);
            this.getFieldCSS = result;
            console.log('FieldCSS->> '+this.getFieldCSS);
            console.log(this.template.querySelectorAll('label'));
            let array = this.template.querySelectorAll('label');
            console.log(array.length);
            let str = this.getFieldCSS;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                element.style=str;
            }
        }).catch(error=>{
            console.log({error});
        })
        
    }
    
    @api FieldCSSUpdate(CSSString){
        getFieldCSS({id:this.formid})
        .then(result=>{
            console.log(result);
            this.getFieldCSS = result;
            console.log('FieldCSS->> '+this.getFieldCSS);
            console.log(this.template.querySelectorAll('input'));
            let array = this.template.querySelectorAll('input');
            console.log(array.length);
            let str = this.getFieldCSS;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                element.style=str;
            
            }
            this.template.querySelector('select').style = str;
        }).catch(error=>{
            console.log({error});
        })

        // console.log('CSS->> '+CSSString);
        // console.log(this.template.querySelectorAll('input'));
        // let array = this.template.querySelectorAll('input');
        // for (let i = 0; i < array.length; i++) {
        //     const element = array[i];
        //     element.style=CSSString;
        // }
        // this.template.querySelector('select').style = str;
    }

    @api LabelCSSUpdate(CSSString){
        getLabelCSS({id:this.formid})
        .then(result=>{
            console.log(result);
            this.getFieldCSS = result;
            console.log('FieldCSS->> '+this.getFieldCSS);
            console.log(this.template.querySelectorAll('label'));
            let array = this.template.querySelectorAll('label');
            console.log(array.length);
            let str = this.getFieldCSS;
            for (let i = 0; i < array.length; i++) {
                const element = array[i];
                element.style=str;
            }
        }).catch(error=>{
            console.log({error});
        })
    }

    ApplyCSS(event){
        // event.target.style = "color:blue";
    }

    handlehover(event){
        console.log('Hover On Field');
        console.log(event);
    }

    handleblur(event){
        console.log('Blur On Field');
        console.log(event);
    }
    get CheckBoxOp(){
        return [
            { label: 'first', value: 'option1' },
            { label: 'second', value: 'option2' },
        ];
    }
    get hasType(){
  
        if(this.tView.includes(',')){
            let tempararyList = this.tView.split(',');
            this.FieldLabel= tempararyList[0];
            this.FieldType= tempararyList[1];
if(tempararyList.length==3){
    this.count= parseInt(tempararyList[2]);
}
            this.tView = this.FieldLabel;

if(this.FieldType!=undefined && this.FieldType!='undefined' && this.FieldType!='Extra')
{

    return true;}
        }
        return false;
   
    }
   @track placeHolder='New Field';
    get isFieldCompView(){
        return this.compview =='Field' ;
    }
    get isFullView(){
        return this.compview=='Full';
    }
  get isTrueEmail(){
    console.log(this.FieldLabel);
   return this.tView=='QFEMAILID'|| this.FieldLabel=='QFEMAILID';
    }

   get isTrueFullName(){
   
    return this.tView == 'QFFULLNAME' || this.FieldLabel=='QFFULLNAME';
   }
   get isTrueName(){
    return this.tView == 'QFNAME' || this.FieldLabel=='QFNAME';
   }
   get isTrueAddress(){
    return this.tView == 'QFADDRESS'|| this.FieldLabel=='QFADDRESS';
   }
   get isTruePhone(){
    return this.tView == 'QFPHONE';
   }
   get isTrueCheckBox(){
    return this.tView=='QFCHECKBOX';
     }
 
    get isTrueShortText(){
     return this.tView == 'QFSHORTTEXT' ;
    }
    get isTrueLongText(){
     return this.tView == 'QFLONGTEXT';
    }
    get isTrueFileUpload(){
     return this.tView == 'QFFILEUPLOAD';
    }
    get isTrueRadioButton(){
     return this.tView == 'QFRADIOBUTTON';
    }
    get isTrueDropDown(){
        return this.tView == 'QFDROPDOWN';
       }
       get isTrueNumber(){
        return this.tView=='QFNUMBER';
       }
       get isTruePrice(){
        return this.tView == 'QFPRICE';
       }


       get isTrueDate(){
        return this.tView=='QFDATE';
         }
     
        get isTrueTime(){
         return this.tView == 'QFTIME';
        }
        get isTrueDateTime(){
         return this.tView == 'QFDATETIME';
        }
        get isTrueRating(){
         return this.tView == 'QFRATING';
        }
        get isTrueEmojiRating(){
         return this.tView == 'QFEMOJIRATING';
        }
        get isTrueScaleRating(){
            return this.tView == 'QFSCALERATING';
           }
           get isTrueTerms(){
            return this.tView=='QFTERMSOFSERVICE';
           }
           get isTrueLink(){
            return this.tView == 'QFLINK';
           }
           get isTrueSign(){
            return this.tView == 'QFSIGNATURE';
           }
           get isTrueRichText(){
            console.log('inside the true rich text');
            return this.tView == 'QFRICHTEXT';
           }
       
           get isTruePageBreak(){
               return this.tView == 'QFPAGEBREAK';
              }

              OnFieldClick(event){

              }
    signInit(event){
        var canvas, ctx, flag = false,
        prevX = 0,
        currX = 0,
        prevY = 0,
        currY = 0,
        dot_flag = false;
    var x = "black",
        y = 2,
        w, h;
    canvas = this.template.querySelector('signaturefield');
    var ratio = Math.max(window.devicePixelRatio || 1, 1);
    w = canvas.width * ratio;
    h = canvas.height * ratio;
    ctx = canvas.getContext("2d");

   

        canvas.addEventListener("mousemove", function(e) {
            findxy('move', e)
        }, false);
        canvas.addEventListener("mousedown", function(e) {
            findxy('down', e)
        }, false);
        canvas.addEventListener("mouseup", function(e) {
            findxy('up', e)
        }, false);
        canvas.addEventListener("mouseout", function(e) {
            findxy('out', e)
        }, false);

        // Set up touch events for mobile, etc
        canvas.addEventListener("touchstart", function(e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousedown", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
            e.preventDefault();
        }, false);
        canvas.addEventListener("touchend", function(e) {
            var mouseEvent = new MouseEvent("mouseup", {});
            canvas.dispatchEvent(mouseEvent);
        }, false);
        canvas.addEventListener("touchmove", function(e) {
            var touch = e.touches[0];
            var mouseEvent = new MouseEvent("mousemove", {
                clientX: touch.clientX,
                clientY: touch.clientY
            });
            canvas.dispatchEvent(mouseEvent);
            e.preventDefault();

        }, false);

        function findxy(res, e) {
            const rect = canvas.getBoundingClientRect();
            if (res == 'down') {
                prevX = currX;
                prevY = currY;
                currX = e.clientX - rect.left;
                currY = e.clientY - rect.top;
                flag = true;
                dot_flag = true;
                if (dot_flag) {
                    ctx.beginPath();
                    ctx.fillStyle = x;
                    ctx.fillRect(currX, currY, 2, 2);
                    ctx.closePath();
                    dot_flag = false;
                }
            }
            if (res == 'up' || res == "out") {
                flag = false;
            }
            if (res == 'move') {
                if (flag) {
                    prevX = currX;
                    prevY = currY;
                    currX = e.clientX - rect.left;
                    currY = e.clientY - rect.top;
                    draw(component, ctx);
                }
            }
        }

        function draw() {
            ctx.beginPath();
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currX, currY);
            ctx.strokeStyle = x;
            ctx.lineWidth = y;
            ctx.stroke();
            ctx.closePath();
        }
    
} catch (error) {
    console.log({ error });
}
    renderedCallback(){
    } 
}