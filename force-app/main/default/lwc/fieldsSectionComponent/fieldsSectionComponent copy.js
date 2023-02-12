import { LightningElement,track,api } from 'lwc';
import GetFieldsMetaData  from '@salesforce/apex/FormBuilderController.GetFieldsMetaData';
import getFields from '@salesforce/apex/FormBuilderController.getFields';

export default class FieldsSectionComponent extends LightningElement {
     spinner=false;
     spinner1 = false;
     imageSpinner = false;
     pageImageSpinner=false;
     notShowField= true;
     showField = false;
     baseField=[];
    @track accfields = [];
   @track  confields = [];
    @track oppfields = [];
     @track ContactDetailes = [];
     @track Essential=[];
     @track UploadandConsent=[];
     @track DateandTime=[];
     @track Rating=[];
     @track Other=[];
     @track activeDropZone=false;
     @track StylesProp ;
     //dropzone variables
     @track PageList=[];
     storeRemovedField=[];
     @track FormTitle= 'tempvlaue';
     @track FieldList=[];
     @api formId='';
     connectedCallback(){

        getFields({id:'a0B1y00000013pXEAQ'}).then(result => {
          let LabelList=[];
          let OnlyLabelList=[];
          for(let i=0;i<result.length;i++){
            let innerList =[];
        
            for(let j=0;j<result[i].length;j++){

                let label  = result[i][j].split('./.');   
                let nottakeField= false;
                for(let k=0;k<this.storeRemovedField.length;k++){
                    if(this.storeRemovedField[k]==label[0])
              {  
                 nottakeField=true;
              }
                  
                }
                if(nottakeField==false)
            {    let labelObj = {Label: label[0],
                    Type: label[1]};
               innerList.push(labelObj);  
            }
            }
            LabelList.push(innerList);
           
          }
        
         
            console.log(LabelList);
            console.log('FirstList'+LabelList[0]);
            //console.log('RecordId is'+recordId);
            // this.pathrecord = result;
            console.log(typeof(result));
            this.accfields = LabelList[0];
            if(LabelList.length!=1){
              console.log(this.accfields.length);
              this.confields = LabelList[1];
              if(LabelList.length!=2){
                console.log(this.accfields.length);
               this.oppfields = LabelList[2];
              }
          
            }
            
            console.log('FolderURL after'+this.accfields.Label);   
            console.log('type'+this.accfields.Type); 
        }).catch(error => {
            this.isLoaded = false;
            console.log('OUTPUT fetch path>>: ');
            console.log({ error });
        });

        GetFieldsMetaData()
          .then(result =>{
            console.log('it is world');
            console.log(result);
           this.baseField = result;
           console.log("whyffff");
           console.log(this.baseField);
           console.log(this.baseField.length);
           console.log(this.baseField[0].DataRecord__c=='QFDROPDOWN');
           for(let i=0;i<this.baseField.length;i++){
            console.log(i);
            if(this.baseField[i].DataRecord__c == 'QFFULLNAME'  || this.baseField[i].DataRecord__c == 'QFNAME' || this.baseField[i].DataRecord__c == 'QFPHONE' || this.baseField[i].DataRecord__c == 'QFEMAILID'|| this.baseField[i].DataRecord__c == 'QFADDRESS' ){
              console.log('whhhl');
              this.ContactDetailes.push(this.baseField[i]);
            }
            if(this.baseField[i].DataRecord__c == 'QFSHORTTEXT' || this.baseField[i].DataRecord__c == 'QFLONGTEXT' || this.baseField[i].DataRecord__c == 'QFDROPDOWN'||this.baseField[i].DataRecord__c == 'QFRICHTEXT' || this.baseField[i].DataRecord__c == 'QFRADIOBUTTON' || this.baseField[i].DataRecord__c == 'QFCHECKBOX' || this.baseField[i].DataRecord__c == 'QFPRICE' || this.baseField[i].DataRecord__c == 'QFNUMBER'){
              this.Essential.push(this.baseField[i]);
            }
            if(this.baseField[i].DataRecord__c == 'QFSIGNATURE' || this.baseField[i].DataRecord__c == 'QFFILEUPLOAD' || this.baseField[i].DataRecord__c == 'QFTERMSOFSERVICE' || this.baseField[i].DataRecord__c == 'QFLINK' || this.baseField[i].DataRecord__c == 'QFPAGEBREAK' ){
              this.UploadandConsent.push(this.baseField[i]);
            }
            if(this.baseField[i].DataRecord__c == 'QFDATE' || this.baseField[i].DataRecord__c == 'QFTIME' || this.baseField[i].DataRecord__c == 'QFDATETIME'){
              this.DateandTime.push(this.baseField[i]);
            }
            if(this.baseField[i].DataRecord__c == 'QFRATING' || this.baseField[i].DataRecord__c == 'QFEMOJIRATING' || this.baseField[i].DataRecord__c == 'QFSCALERATING' ){
              this.Rating.push(this.baseField[i]);
            }
            if( this.baseField[i].DataRecord__c == 'QFLOOKUP'){
              this.Other.push(this.baseField[i]);
            }
          }
          console.log(this.UploadandConsent);
          console.log(this.Essential);
          }).catch(error =>{
           
          });}
          get hasMainObj(){
            return this.accfields.length!=0;
          }
          get hasSecondChild(){
            return this.oppfields.length!=0;
          }
          get hasFirstChild(){
            return this.confields.length!=0;
          }
          onDragStart(event){
          
              try {
      
                  var DraggedLabel = event.target.dataset.record;
                  var DraggedType  = event.target.dataset.type;
               
                 console.log(DraggedLabel);
                 console.log(DraggedType);
                 console.log('On drag start-->');
                  if (DraggedLabel == null) {
                      event.preventDefault();
                      onDragOver();
                  } else {
                    console.log(JSON.stringify(event.target.dataset));
                      event.dataTransfer.setData('text/plain',JSON.stringify( event.target.dataset));
                  
                      console.log('else condition is start-->');
                      this.activeDropZone=true;
                      const custEvent = new CustomEvent(
                        'callpasstoparent', {
                            detail: this.activeDropZone
                        });
                    this.dispatchEvent(custEvent);
                     
                  }
              } catch (e) {
                  console.log(e)
                 console.log("Error", "Error Occur", "Something went wrong to drag the field");
              }
      
          
          }
          onDragOver(event){
            console.log('ondrop starts in ondragOver');
            this.activeDropZone =false;
            const custEvent = new CustomEvent(
              'callpasstoparent', {
                  detail: this.activeDropZone
              });
          this.dispatchEvent(custEvent);
           
        
            event.preventDefault();
          }
          @api removeField(name){
            this.storeRemovedField.push(name);
            console.log('inside the remove field method'+name);
            let tempararyArray = [];
            for(let i=0;i<this.accfields.length;i++){
                   
                    if(this.accfields[i].Label!=name){
                    //  console.log(this.accfields[i].Label);
                      tempararyArray.push(this.accfields[i]);
                    }
            }
            this.accfields = tempararyArray;
            tempararyArray = [];
            for(let i=0;i<this.confields.length;i++){
                   
                    if(this.confields[i].Label!=name){
                     // console.log(this.accfields[i].Label);
                      tempararyArray.push(this.confields[i]);
                    }
            }
            this.confields = tempararyArray;
            tempararyArray = [];
            for(let i=0;i<this.oppfields.length;i++){
                   
                    if(this.oppfields[i].Label!=name){
                    //  console.log(this.accfields[i].Label);
                      tempararyArray.push(this.oppfields[i]);
                    }
            }
            this.oppfields= tempararyArray;

          }
}