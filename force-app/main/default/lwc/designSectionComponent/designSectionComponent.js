import { LightningElement,track,api } from 'lwc';
import GetStyles from '@salesforce/apex/FormBuilderController.GetStyles';
import StoreStyles from '@salesforce/apex/FormBuilderController.StoreStyles';
import StoreLabelStyles from '@salesforce/apex/FormBuilderController.StoreLabelStyles';
import StoreFormStyles from '@salesforce/apex/FormBuilderController.StoreFormStyles';
import StorePageStyles from '@salesforce/apex/FormBuilderController.StorePageStyles';
import UploadFormImage from '@salesforce/apex/FormBuilderController.UploadFormImage';
import UploadPageImage from '@salesforce/apex/FormBuilderController.UploadPageImage';

export default class DesignSectionComponent extends LightningElement {
    @track StylesProp ;
    @api recordid;
    @api recordId;
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
      }

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
          this.fileData = null;
          console.log(result);
          const cssevent = new CustomEvent("getformcss",{
            detail: result
          });
          console.log('Event:-- '+cssevent);
          this.dispatchEvent(cssevent);
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
          this.fileData = {
              'filename': file.name,
              'base64': base64,
              'recordId': this.recordId
          }
          console.log('filedata>>>',this.fileData);
          var ftype = this.fileData.filename.split('.')[1];
      console.log(ftype);
      UploadFormImage({ id:this.recordid, body:this.fileData.base64, FName:this.fileData.filename, Type:ftype }).then(result=>{
        this.fileData = null;
        console.log(result);
        const cssevent = new CustomEvent("getformcss",{
          detail: result
        });
        console.log('Event:-- '+cssevent);
        this.dispatchEvent(cssevent);
        console.log('after queryselector');
    })
      }
      reader.readAsDataURL(file)
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
        console.log('Nimit str --->'+str);
        console.log('Nimit recordid ---->'+this.recordid);
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
        if(Name == 'font-size:' || Name == 'border-width:' || Name == 'border-radius:'){
          value += 'px';
        }
        console.log('Name->'+Name);
        console.log('value->'+value);
        let str = Name+value+';';
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

      handleFormCSS(event){
        let Str = '';
        let id = event.target.dataset.id;
        let value = event.target.value;
        console.log('id-> '+id);
        console.log('value-> '+value);
      }
    
}