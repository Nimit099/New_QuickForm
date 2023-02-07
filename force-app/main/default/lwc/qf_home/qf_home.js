//  ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used for Edit, Delete, Read or Create New Form
// # Change Version History
// # Version No.     Author          Date            Change Description            Jira Ticket
// #    1.           Nimit         09/01/2023           Home Page UI 				     QUIC-37, QUIC-36
// =================================== 
import { LightningElement,wire,track } from 'lwc';

// ALL ICONS OF HOME PAGE [START]
import searchicon from '@salesforce/resourceUrl/searchBoxIcon';
import addicon from '@salesforce/resourceUrl/addIcon';
import previewicon from '@salesforce/resourceUrl/previewIcon';
import logo from '@salesforce/resourceUrl/Quickformlogo';
import feedbackIcon from '@salesforce/resourceUrl/feedbackIcon';
import helpIcon from '@salesforce/resourceUrl/helpIcon';
import right from '@salesforce/resourceUrl/right';
import cross from '@salesforce/resourceUrl/cross';
import bin from '@salesforce/resourceUrl/bin';
import editpen from '@salesforce/resourceUrl/editpen';
// ALL ICONS OF HOME PAGE [END]

// TO IMPORT USER INFO [START]
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import UserNameFIELD from '@salesforce/schema/User.Name';
// TO IMPORT USER INFO [END]

// IMPORT APEX METHOD [START]
import records from '@salesforce/apex/qfhome.records';                  // GET RECORDS AND COUNT
import status from '@salesforce/apex/qfhome.status';                    // CHANGE STATUS
import deleteform from '@salesforce/apex/qfhome.deleteform';            // DELETE FORM
import search from '@salesforce/apex/qfhome.search';                    // SEARCH FORM
import renameform from '@salesforce/apex/qfhome.renameform'             // RENAME FORM
// IMPORT APEX METHOD [END]
import { NavigationMixin } from "lightning/navigation"; //For LWC Navigation

export default class Qf extends NavigationMixin(LightningElement) {
    PaginationList;                      //LIST OF FORMS
    
    bNoRecordsFound = true; 
    NoRecordsFound = true;
    spinnerDataTable = false;
    deletepopup = false;
    spinnerdelete = false;
    error_toast = true;
    data = false;
    @track activepreview = false;
    @track activehome = true;
    isModalOpen_2;
    renamediv;
    pencheck = false;
    count;                              // COUNT OF FORMS
    searchkey;                          // SEARCH FORMS
    @track id;                                 // ID OF FORM WHILE DOING SOME ACTION
    formname;                           // OLD NAME OF FORM
    newFormName = '';                        // NEW NAME OF FORM
    isOpenRenameForm;                   // BOOLEAN OPEN TEMPLATE OF RENAME
    i=1;                                // INDEX VALUE
    outsideClick;
    keyCode;
    isModalOpen = false;

// ICONS OF HOME PAGE [START] ==========
    searchicon = searchicon;
    addicon = addicon;
    previewicon = previewicon;
    logo = logo;
    feedbackIcon = feedbackIcon;
    helpIcon = helpIcon;
    cross = cross;
    right = right;
    bin = bin;
    editpen = editpen;
// ICONS OF HOME PAGE [END] ============

// GET USER NAME [START] 
    @track currentUserName;
    @wire(getRecord, { recordId: Id, fields: [UserNameFIELD]}) 
    currentUserInfo({error, data}) {
        if (data) {
            this.currentUserName = data.fields.Name.value;
        }
    }
// GET USER NAME [END] 

// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Read All Forms record
// =================================== -->
    connectedCallback(){
      this.spinnerDataTable = true;
        records().then(result => {
          
            for (let key in result) {
                this.count = key;
                if(this.count > 0){
                this.PaginationList = result[key];
                this.data = true;
                this.bNoRecordsFound = true;
                }
                else{
                  this.bNoRecordsFound = false;
                }
             }
             this.spinnerDataTable = false;

  })
    }

// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Search Form From the List
// =================================== -->
    search(event){
        this.spinnerDataTable = true;
        this.searchkey = event.target.value; 
        console.log(this.spinnerDataTable);
        search({searchkey : this.searchkey}).then(result => {
          this.i = 1;
          this.spinnerDataTable = false;
          console.log(result.length);

              for (let key in result) {
                this.count = key;
                if(this.count > 0){
                this.PaginationList = result[key];
                this.data = true;
                this.bNoRecordsFound = true;
                }
                else{
                  console.log('hii');
                  this.bNoRecordsFound = false;
                }
              }
        })
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Change Status of Form
// =================================== -->
    changestatus(event){
        this.id = event.target.dataset.id;
        this.spinnerDataTable = true;
            status({id : this.id, searchkey : this.searchkey}).then(result => {
              this.PaginationList = result;
              this.spinnerDataTable = false;
            })
      }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Functionality of Dropdown Buttons(Rename or Delete)
// =================================== -->
    handleSelectAction(event){

          // DELETE FUNCTIONALITY [START]
        if (event.detail.value == 'Delete') {

          this.deletepopup =true;
          this.id = event.target.dataset.id;
          this.spinnerdelete = true;
          // this.spinnerDataTable = true;
          // deleteform({id : this.id, searchkey : this.searchkey}).then(result => {
          //     this.PaginationList = result;
          //     this.spinnerDataTable = false;
          //     this.count -= 1;
          // })
        }
        else if(event.detail.value == 'Edit'){

          this.id = event.target.dataset.id;
          let FormName = event.target.dataset.name;
          console.log(event.target.dataset);
          console.log('Formname on Home >>>' +FormName);
          let cmpDef = {
            componentDef: "c:formBuilder",
            attributes:{
                ParentMessage:this.id!=""?this.id:"No Record Created",
                FormName:FormName!=""?FormName:"No Name Given"
            }
          };
        
          let encodedDef = btoa(JSON.stringify(cmpDef));
          this[NavigationMixin.Navigate]({
            type: "standard__webPage",
            attributes: {
              url: "/one/one.app#" + encodedDef
            }
          });
        }

    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Read New Form Name
// =================================== -->
    rename(event){
      this.newFormName = event.target.value;  
      this.keyCode = 13; 
      this.error_toast = false;
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Cancel Rename
// =================================== -->
    cancleRenameForm(event){
      this.renamediv = true;
      this.pencheck = false;
      document.removeEventListener('click', this.outsideClick);
      if(event.target.dataset.id != this.id){
      this.template.querySelector("div[data-name ="+this.id+"]").style.display='none';
      this.template.querySelector("lightning-formatted-text[data-id ="+this.id+"]").style.display='block'; }
    }


    insideClick(event) {
      // This event is necessary to not trigger close with an inside click
      event.stopPropagation();
      return false;
  }

// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Update Form Name
// =================================== -->
    renameForm(event){
      // console.log(String.fromCharCode(event.keyCode));
     
      if( this.keyCode === 13){
      if(this.newFormName.length > 0 && this.newFormName.replaceAll(' ', '').length > 0){
      this.spinnerDataTable = true; 
      this.error_toast = false;
      renameform({id : this.id, rename : this.newFormName}).then(result => {
          this.PaginationList = result;
          this.template.querySelector("div[data-name ="+this.id+"]").style.display='none';
          this.template.querySelector("lightning-formatted-text[data-id ="+this.id+"]").style.display='block';   
          this.isOpenRenameForm = false;
          this.spinnerDataTable = false;        
          this.renamediv = true;
          this.pencheck = false;     
      })
    }
    else{
    this.error_toast = true;
    }
  }else {
    
  }
}
new_rename(event){
      this.id = event.currentTarget.dataset.id;
      this.newFormName = event.currentTarget.dataset.name;
      this.pencheck = true;
      this.renamediv = true;
      this.template.querySelector("lightning-formatted-text[data-id ="+event.currentTarget.dataset.id+"]").style.display='none';   
      this.template.querySelector("div[data-name ="+event.currentTarget.dataset.id+"]").style.display='flex';
      if(this.pencheck == true){
      this.template.querySelector("span[data-id ="+event.currentTarget.dataset.id+"]").style.display='none';  }
      document.addEventListener('click', this.outsideClick = this.cancleRenameForm.bind(this));
      event.stopPropagation();
      return false; 
    }
  
    showpen(event) {
        if(this.pencheck == false){
        document.addEventListener('click', this.outsideClick = this.cancleRenameForm.bind(this));
        this.template.querySelector("span[data-id ="+event.currentTarget.dataset.id+"]").style.display='block'; 

        }
      }

      hidepen(event) {
        // this.pencheck = false;
        this.template.querySelector("span[data-id ="+event.currentTarget.dataset.id+"]").style.display='none'; 
        if(renamediv == false){
        this.template.querySelector("div[data-name ="+this.id+"]").style.display='none';
        this.template.querySelector("lightning-formatted-text[data-id ="+this.id+"]").style.display='block';   
        }
      }

      insideClick(event){
        event.stopPropagation();
        return false;
      }
    deleteyes(){
      this.deletepopup = false;
      this.spinnerDataTable = true;
          deleteform({id : this.id, searchkey : this.searchkey}).then(result => {
                        this.PaginationList = result;
                        this.count -= 1;
                        this.spinnerdelete = false;
                       
                        this.spinnerDataTable = false;
                      let toast_error_msg = 'Form is successfully deleted';
                      this.error_toast = true;
                      this.template.querySelector('c-toast-component').showToast('success',toast_error_msg,3000);
                    })
    }
    deleteno(){
      this.deletepopup = false;
      this.error_toast = false;
    }
   
      openModal(){
        this.isModalOpen = true;
        console.log('1');
     }
     modalpopupclose(){
       // alert('hiii');
       this.isModalOpen = false;
           }

          key(event){
            this.keyCode = event.keyCode;
            this.renameForm ();
          }
       // <!-- ===================================
      // # MV Clouds Private Limited
      // # Author: Nimit Shah
      // # Create Date: 09/01/2023
      // # Description: For Index value
      // =================================== -->
          get index(){
            if(this.i > this.count){
              this.i = 1 ;
            }
            return this.i++;
          }

      onpreview(event){
        this.id = event.currentTarget.dataset.id;
        // this.activepreview = true;
        // this.activehome = false;

        let cmpDef = {
          componentDef: "c:previewFormCmp",
          attributes:{
              formid:this.id!=""?this.id:"No Record Created",
          }
        };
        let encodedDef = btoa(JSON.stringify(cmpDef));
        this[NavigationMixin.Navigate]({
          type: "standard__webPage",
          attributes: {
            url: "/one/one.app#" + encodedDef
          }
        });
      }
}