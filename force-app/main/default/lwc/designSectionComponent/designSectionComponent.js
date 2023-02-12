import { LightningElement,track,api } from 'lwc';
import GetStyles from '@salesforce/apex/FormBuilderController.GetStyles';
import StoreStyles from '@salesforce/apex/FormBuilderController.StoreStyles';
import StoreLabelStyles from '@salesforce/apex/FormBuilderController.StoreLabelStyles';
import StoreFormStyles from '@salesforce/apex/FormBuilderController.StoreFormStyles';
import StorePageStyles from '@salesforce/apex/FormBuilderController.StorePageStyles';
import UploadFormImage from '@salesforce/apex/FormBuilderController.UploadFormImage';
import UploadPageImage from '@salesforce/apex/FormBuilderController.UploadPageImage';
import StoreHoverStyles from '@salesforce/apex/FormBuilderController.StoreHoverStyles';
import StoreFocusStyles from '@salesforce/apex/FormBuilderController.StoreFocusStyles';
import getFieldCSS from '@salesforce/apex/FormBuilderController.getFieldCSS';
import getFormCSS from '@salesforce/apex/FormBuilderController.getFormCSS';
import getPageCSS from '@salesforce/apex/FormBuilderController.getPageCSS';
import getLabelCSS from '@salesforce/apex/FormBuilderController.getLabelCSS';
import RemoveFormImage from '@salesforce/apex/FormBuilderController.RemoveFormImage';
import RemovePageImage from '@salesforce/apex/FormBuilderController.RemovePageImage';
import getFocusCSS from '@salesforce/apex/FormBuilderController.getFocusCSS';
import getHoverCSS from '@salesforce/apex/FormBuilderController.getHoverCSS';
import getBGImages from '@salesforce/apex/FormBuilderController.getBGImages';
import cross from '@salesforce/resourceUrl/cross';

export default class DesignSectionComponent extends LightningElement {
    @track StylesProp ;
    @api recordid;
    @api recordId;
    @track formimageurl;
    @track formimage = false;
    @track pageimageurl;
    @track pageimage = false;
    cross = cross;

    @track formWidth ;
    @track headpadding ;
    @track footpadding ;
    @track leftpadding ;
    @track rightpadding ;
    @track colorpicker ;
    @track formbackSize ;
    @track formbackpagePostion ;
    @track formbackpageRepeat ;
    @track formbackgroundPagefixposition ;

    @track toppadding ;
    @track bottompadding ;
    @track pagecolorpicker ;
    @track backSize ;
    @track backpagePostion ;
    @track backpageRepeat ;
    @track backgroundPagefixposition ;
    @track formbordercolor ;
    @track formborderStyle ;
    @track formborderwidth ;
    @track formborderradius ;
    
    @track labelalign = 'Left';
    @track labelfontfamily = 'Arial';
    @track labelfontweight = 'Normal';
    @track labelfontstyle = 'Normal';
    @track labelfontsize = '12';
    @track labelineheight = 'Single';
    @track labelcolor = '#000000';
    @track labeltopmargin = '0';
    @track labelbottommargin = '0';

    @track inputfontsize ;
    @track inputlineheight ;
    @track bgInput ;
    @track optinputfontfamily ;
    @track inputfontweight ;
    @track inputfontstyle ;
    @track borderInput ;
    @track borderStyle ;
    @track borderWidth ;
    @track borderRadius ;
    @track bordertextcolor ;
    @track inputHpadding ;
    @track inputVpadding ;


    fileData = {};
    fileData1 = {};
    showquickform = false;

     //Design Drop Down Options Creation
     get optlabelalign(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.AlignmentProp);}
       }
       get optlabelfontfamily(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontProp);}
       }
       get optlabelfontweight(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontWeightProp);}
       }
       get optlabelfontstyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontStyleProp);}
       }
       get optlabelineheight(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontLineHeightProp);}
       }
       get optbackSize(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgsizeProp);}
       }
       get optbackpagePostion(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgPositionProp);}
       }
       get optbackpageRepeat(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgRepeatProp);}
       }
      
       get  optBackgroundPagefixposition(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FixPosProp);}
       }
       get optborderStyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BorderStylesProp);}
       }
       get optFormdirection(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FormDirectionProp);}
       }
       get optformbackSize(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgsizeProp);}
       
       }
       get optformbackpagePostion(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgPositionProp);}
       
       }
       get optformbackpageRepeat(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BgRepeatProp);}
      
       }
       get optformbackgroundPagefixposition(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FixPosProp);}
       }
       get optformborderStyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BorderStylesProp);}
       }
       get inputfontfamily(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontProp);}
      
       }
       get optinputfontweight(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontWeightProp);}
      
       }
       get optinputfontstyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontStyleProp);}
       }
       get optinputlineheight(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontLineHeightProp);}
       }
       get optbtnborderstyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.BorderStylesProp);}
       }
       get optbtnJustify(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.AlignmentProp);}
       }
       get optbuttonfontfamily(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontProp);}
      
       }
       get optbuttonfontweight(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontWeightProp);}
      
       }
       get optbuttonfontstyle(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontStyleProp);}
       
       }
       get optinputfontfamily(){
        if(this.StylesProp!=null)
        {return this.optionsCreater(this.StylesProp.FontProp);}
      
       }

       connectedCallback(){
       
          //get Styles Metadata
          GetStyles({id:this.recordid})
          .then(result=>{
            console.log('GetStyles called');
            this.StylesProp = result;
            console.log('Log->>>'+this.StylesProp);
          }).catch(error=>{
            console.log(error);
          })
          
          getBGImages({id:this.recordid})
        .then(result=>{
          console.log('bgimage --> '+result);
          let str = String(result);
          let Arr = str.split(',');
          console.log('Arr0 --> '+Arr[0]);
          console.log('Arr1 --> '+Arr[1]);
          if (Arr[0]=='/sfc/servlet.shepherd/version/download/null'){
            this.formimage=false;
          }else{
            this.formimageurl = Arr[0];
            this.formimage=true;
          }
          if (Arr[1]=='/sfc/servlet.shepherd/version/download/null'){
            this.pageimage=false;
          }else{
            this.pageimageurl = Arr[1];
            this.pageimage=true;
          }
        })
          this.FormCSS();
          // this.FieldCSS();
          this.LabelCSS();
          this.PageCSS();
      }


      FormCSS(){
        getFormCSS({id:this.recordid})
        .then(result=>{
          console.log('getfieldCSS formwidth'+result);
          let str = result;
          
          this.formWidth = (((str.split('width:'))[1].split(';'))[0]).slice(0,-1);
          if (this.formWidth == null || this.formWidth == undefined) {
            this.formWidth = 100;
          }

          this.headpadding = (((str.split('padding-top:'))[1].split(';'))[0]).slice(0,-1);
          if (this.headpadding == null || this.headpadding == undefined) {
            this.headpadding = 0;
          }

          this.footpadding = (((str.split('padding-bottom:'))[1].split(';'))[0]).slice(0,-1);
          if (this.footpadding == null || this.footpadding == undefined) {
            this.footpadding = 0;
          }

          this.leftpadding = (((str.split('padding-left:'))[1].split(';'))[0]).slice(0,-1);
          if (this.leftpadding == null || this.leftpadding == undefined) {
            this.leftpadding = 0;
          }

          this.rightpadding = (((str.split('padding-right:'))[1].split(';'))[0]).slice(0,-1);
          if (this.rightpadding == null || this.rightpadding == undefined) {
            this.rightpadding = 0;
          }

          this.colorpicker = (((str.split('background-color:'))[1].split(';'))[0]);
          if (this.colorpicker == null || this.colorpicker == undefined) {
            this.colorpicker = '#FFFFFF';
          }

          this.formbackSize = (((str.split('background-size:'))[1].split(';'))[0]);
          if (this.formbackSize == null || this.formbackSize == undefined) {
            this.formbackSize = 'auto';
          }

          this.formbackpagePostion = (((str.split('background-position:'))[1].split(';'))[0]);
          if (this.formbackpagePostion == null || this.formbackpagePostion == undefined) {
            this.formbackpagePostion = 'top center';
          }

          this.formbackpageRepeat = (((str.split('background-repeat:'))[1].split(';'))[0]);
          if (this.formbackpageRepeat == null || this.formbackpageRepeat == undefined) {
            this.formbackpageRepeat = 'Repeat';
          }

          this.formbackgroundPagefixposition = (((str.split('background-attachment:'))[1].split(';'))[0]);
          if (this.formbackgroundPagefixposition == null || this.formbackgroundPagefixposition == undefined) {
            this.formbackgroundPagefixposition = 'Fixed';
          }

        }).catch(error=>{
          console.log(error);
        })
      }

      PageCSS(){
        getPageCSS({id:this.recordid})
        .then(result=>{
          let str = result;

          this.toppadding = (((str.split('padding-top:'))[1].split(';'))[0]).slice(0,-1);
          if (this.toppadding == null || this.toppadding == undefined) {
            this.toppadding = 0;
          }

          this.bottompadding = (((str.split('padding-bottom:'))[1].split(';'))[0]).slice(0,-1);
          if (this.bottompadding == null || this.bottompadding == undefined) {
            this.bottompadding = 0;
          }

          this.pagecolorpicker = (((str.split('background-color:'))[1].split(';'))[0]);
          if (this.pagecolorpicker == null || this.pagecolorpicker == undefined) {
            this.pagecolorpicker = '#FFFFFF';
          }

          this.formborderStyle = (((str.split('border-style:'))[1].split(';'))[0]).slice(0,-1);
          if (this.formborderStyle == null || this.formborderStyle == undefined) {
            this.formborderStyle = 'Solid';
          }

          this.formborderwidth = (((str.split('border-width:'))[1].split(';'))[0]).slice(0,-1);
          if (this.formborderwidth == null || this.formborderwidth == undefined) {
            this.formborderwidth = 0;
          }

          this.formborderradius = (((str.split('border-radius:'))[1].split(';'))[0]).slice(0,-1);
          if (this.formborderradius == null || this.formborderradius == undefined) {
            this.formborderradius = 0;
          }

          this.formbordercolor = (((str.split('border-color:'))[1].split(';'))[0]);
          if (this.formbordercolor == null || this.formbordercolor == undefined) {
            this.formbordercolor = '#000000';
          }

          this.backSize = (((str.split('background-size:'))[1].split(';'))[0]);
          if (this.backSize == null || this.backSize == undefined) {
            this.backSize = 'auto';
          }

          this.backpagePostion = (((str.split('background-position:'))[1].split(';'))[0]);
          if (this.backpagePostion == null || this.backpagePostion == undefined) {
            this.backpagePostion = 'top center';
          }

          this.backpageRepeat = (((str.split('background-repeat:'))[1].split(';'))[0]);
          if (this.backpageRepeat == null || this.backpageRepeat == undefined) {
            this.backpageRepeat = 'Repeat';
          }

          this.backgroundPagefixposition = (((str.split('background-attachment:'))[1].split(';'))[0]);
          if (this.backgroundPagefixposition == null || this.backgroundPagefixposition == undefined) {
            this.backgroundPagefixposition = 'Fixed';
          }

        }).catch(error=>{
          console.log(error);
        })
      }

      LabelCSS(){
        getLabelCSS({id:this.recordid})
        .then(result=>{
          console.log('getfieldCSS formwidth'+result);
          let str = result;

          this.labeltopmargin = (((str.split('margin-top:'))[1].split(';'))[0]).slice(0,-1);
          if (this.labeltopmargin == null || this.labeltopmargin == undefined) {
            this.labeltopmargin = 0;
          }

          this.labelbottommargin = (((str.split('margin-bottom:'))[1].split(';'))[0]).slice(0,-1);
          if (this.labelbottommargin == null || this.labelbottommargin == undefined) {
            this.labelbottommargin = 0;
          }

          this.labelcolor = (((str.split('color:'))[1].split(';'))[0]);
          if (this.labelcolor == null || this.labelcolor == undefined) {
            this.labelcolor = '#000000';
          }

          this.labelalign = (((str.split('justify-content:'))[1].split(';'))[0]).slice(0,-1);
          if (this.labelalign == null || this.labelalign == undefined) {
            this.labelalign = 'Left';
          }

          this.labelfontfamily = (((str.split('font-family:'))[1].split(';'))[0]).slice(0,-1);
          if (this.labelfontfamily == null || this.labelfontfamily == undefined) {
            this.labelfontfamily = 'Arial';
          }

          this.labelfontweight = (((str.split('font-weight:'))[1].split(';'))[0]).slice(0,-1);
          if (this.labelfontweight == null || this.labelfontweight == undefined) {
            this.labelfontweight = 'Normal';
          }

          this.labelfontsize = (((str.split('font-size:'))[1].split(';'))[0]);
          if (this.labelfontsize == null || this.labelfontsize == undefined) {
            this.labelfontsize = 12;
          }

          this.labelineheight = (((str.split('background-position:'))[1].split(';'))[0]);
          if (this.labelineheight == null || this.labelineheight == undefined) {
            this.labelineheight = 'Single';
          }

        }).catch(error=>{
          console.log(error);
        })
      }

      // FieldCSS(){
      //   getFieldCSS({id:this.recordid})
      //   .then(result=>{
      //     let str = result;

      //     this.bgInput = (((str.split('background-color:'))[1].split(';'))[0]);
      //     if (this.bgInput == null || this.bgInput == undefined) {
      //       this.bgInput = '#FFFFFF';
      //     }

      //     this.borderInput = (((str.split('border-color:'))[1].split(';'))[0]);
      //     if (this.borderInput == null || this.borderInput == undefined) {
      //       this.borderInput = '#000000';
      //     }

      //     this.borderStyle = (((str.split('border-style:'))[1].split(';'))[0]);
      //     if (this.borderStyle == null || this.borderStyle == undefined) {
      //       this.borderStyle = 'Solid';
      //     }

      //     this.inputfontsize = (((str.split('font-size:'))[1].split(';'))[0]).slice(0,-1);
      //     if (this.inputfontsize == null || this.inputfontsize == undefined) {
      //       this.inputfontsize = 12;
      //     }

      //     this.inputlineheight = (((str.split('margin-bottom:'))[1].split(';'))[0]).slice(0,-1);
      //     if (this.inputlineheight == null || this.inputlineheight == undefined) {
      //       this.inputlineheight = 'Single';
      //     }

      //     this.labelalign = (((str.split('justify-content:'))[1].split(';'))[0]).slice(0,-1);
      //     if (this.labelalign == null || this.labelalign == undefined) {
      //       this.labelalign = 'Left';
      //     }

      //     this.optinputfontfamily = (((str.split('font-family:'))[1].split(';'))[0]).slice(0,-1);
      //     if (this.optinputfontfamily == null || this.optinputfontfamily == undefined) {
      //       this.optinputfontfamily = 'Arial';
      //     }

      //     this.inputfontweight = (((str.split('font-weight:'))[1].split(';'))[0]).slice(0,-1);
      //     if (this.inputfontweight == null || this.inputfontweight == undefined) {
      //       this.inputfontweight = 'Normal';
      //     }

      //     this.inputfontstyle = (((str.split('font-style:'))[1].split(';'))[0]);
      //     if (this.inputfontstyle == null || this.inputfontstyle == undefined) {
      //       this.inputfontstyle = 'Normal';
      //     }

      //   }).catch(error=>{
      //     console.log(error);
      //   })
      // }

      openpagefileUpload(event) {
        console.log({event});
        var file1 = [];
        const file = event.target.files[0]
        file1 = event.target.files[0];
        console.log('file1',file1);
        var reader = new FileReader()
        reader.onload = () => {
            var base64 = reader.result.split(',')[1]
            console.log('base64',base64);
            this.fileData = {
                'filename': file.name,
                'base64': base64,
                'recordId': this.recordId
            }
            console.log('filedata>>>',this.fileData);
            var ftype = this.fileData.filename.split('.')[1];
        console.log(ftype);
        UploadPageImage({ id:this.recordid, body:this.fileData.base64, FName:this.fileData.filename, Type:ftype }).then(result=>{
          console.log(result);
          let Array = result.split(',');
          const cssevent = new CustomEvent("getpagecss",{
            detail: Array[0]
          });
          console.log('Event:-- '+cssevent);
          this.dispatchEvent(cssevent);
        console.log(Array[1]);
        this.pageimageurl = Array[1];
        this.pageimage = true;
          console.log('after queryselector');
      })
        }
        reader.readAsDataURL(file)
    }

    openformfileUpload(event) {
      console.log({event});
      var file1 = [];
      const file = event.target.files[0]
      file1 = event.target.files[0];
      console.log('file1',file1);
      var reader = new FileReader()
      reader.onload = () => {
          var base64 = reader.result.split(',')[1]
          console.log('base64',base64);
          this.fileData1 = {
              'filename': file.name,
              'base64': base64,
              'recordId': this.recordId
          }
          console.log('filedata>>>',this.fileData1);
          var ftype = this.fileData1.filename.split('.')[1];
      console.log(ftype);
      UploadFormImage({ id:this.recordid, body:this.fileData1.base64, FName:this.fileData1.filename, Type:ftype }).then(result=>{
        console.log(result);
        let Array = result.split(',');
        const cssevent = new CustomEvent("getformcss",{
          detail: Array[0]
        });
        console.log('Event:-- '+cssevent);
        this.dispatchEvent(cssevent);
        console.log(Array[1]);
        this.formimageurl = Array[1];
        this.formimage = true;
        console.log('after queryselector');
    })
      }
      reader.readAsDataURL(file)
  }

  removeFormBackground(event){
    console.log('remove form bg image');
    RemoveFormImage({id:this.recordid})
    .then(result=>{
      this.fileData1 = null;
        console.log(result);
        const cssevent = new CustomEvent("getformcss",{
          detail: result
        });
        console.log('Event:-- '+cssevent);
        this.dispatchEvent(cssevent);
        this.formimageurl = '';
        this.formimage = false;
        console.log('after queryselector');
    })
  }

  removePageBackground(event){
    console.log('remove page bg image');
    RemovePageImage({id:this.recordid})
    .then(result=>{
      this.fileData = null;
        console.log(result);
        const cssevent = new CustomEvent("getpagecss",{
          detail: result
        });
        console.log('Event:-- '+cssevent);
        this.dispatchEvent(cssevent);
        this.pageimageurl = '';
        this.pageimage = false;
        console.log('after queryselector '+this.pageimage);
    })
  }


     
    // Creation of Combobox for Design part
      optionsCreater(Props){
        let options=[];
        console.log('in optionsCreater');
         for(let i=0;i<Props.length;i++){
             options.push({value:Props[i].Label , label:Props[i].Label});
             console.log('in for loop'+Props[i].Label);
         }
         console.log('option->> '+options);
         return options;
      }

      handlefieldhover(event){
        let Name = event.target.dataset.name;
        let value = event.target.value;
        console.log(Name);
        console.log(value);
        let str = Name+value+';';
        StoreHoverStyles({Value: str, id:this.recordid})
        .then(result=>{
          console.log(result);
        }).catch(error=>{
          console.log(error);
        })
      }

      handlefieldfocus(event){
        let Name = event.target.dataset.name;
        let value = event.target.value;
        console.log(Name);
        console.log(value);
        let str = Name+value+';';
        StoreFocusStyles({Value: str, id:this.recordid})
        .then(result=>{
          console.log(result);
        }).catch(error=>{
          console.log(error);
        })
      }

      handleFormCss(event){
        let Name = event.target.dataset.name;
        let value = event.target.value;
        if(Name == 'width:' || Name == 'padding-top:' || Name == 'padding-bottom:' || Name == 'padding-left:' || Name == 'padding-right:'){
          value += '%';
        }
        console.log('Name->'+Name);
        console.log('value->'+value);
        let str = Name+value+';';
        StoreFormStyles({Value: str, id:this.recordid})
        .then(result=>{
          console.log(result);
          const cssevent = new CustomEvent("getformcss",{
            detail: result
          });
          console.log('Event:-- '+cssevent);
          this.dispatchEvent(cssevent);
          console.log('after queryselector');
        }).catch(error=>{
          console.log(error);
        })
      }

      handlepageCss(event){
        let Name = event.target.dataset.name;
        let value = event.target.value;
        if(Name == 'width:' || Name == 'padding-top:' || Name == 'padding-bottom:' || Name == 'padding-left:' || Name == 'padding-right:'){
          value += '%';
        }
        if(Name == 'border-width:' || Name == 'border-radius:'){
          value += 'px';
        }
        console.log('Name->'+Name);
        console.log('value->'+value);
        let str = Name+value+';';
        StorePageStyles({Value: str, id:this.recordid})
        .then(result=>{
          console.log(result);
          const cssevent = new CustomEvent("getpagecss",{
            detail: result
          });
          console.log('Event:-- '+cssevent);
          this.dispatchEvent(cssevent);
          console.log('after queryselector');
        }).catch(error=>{
          console.log(error);
        })
      }

      handleLabelCss(event){
        let Name = event.target.dataset.name;
        let value = event.target.value;
        if(Name == 'font-size:' || Name == 'margin-top:' || Name == 'margin-bottom:'){
          value += 'px';
        }
        console.log('Name->'+Name);
        console.log('value->'+value);
        let str = Name+value+';';
        StoreLabelStyles({Value: str, id:this.recordid})
        .then(result=>{
          console.log(result);
          const cssevent = new CustomEvent("getlabelcss",{
            detail: result
          });
          console.log('Event:-- '+cssevent);
          this.dispatchEvent(cssevent);
          console.log('after queryselector');
        }).catch(error=>{
          console.log(error);
        })
      }

      handleFieldCss(event){
        let Name = event.target.dataset.name;
        let value = event.target.value;
        let str='';
        if(Name == 'padding1'){
          str = 'padding-left:'+value+';padding-right'+value+';'; 
        }
        else if(Name == 'padding2'){
          str = 'padding-bottom:'+value+';padding-top'+value+';';
        }
        else{
          if(Name == 'font-size:' || Name == 'border-width:' || Name == 'border-radius:'){
            value += 'px';
          }
          console.log('Name->'+Name);
          console.log('value->'+value);
          str = Name+value+';';
        }
        console.log('OUTPUT : ',str);
        StoreStyles({Value: str, id:this.recordid})
        .then(result=>{
          console.log(result);
          const cssevent = new CustomEvent("getnewcss",{
            detail: result
          });
          console.log('Event:-- '+cssevent);
          this.dispatchEvent(cssevent);
          console.log('after queryselector');
        }).catch(error=>{
          console.log(error);
        })
      }

    
}