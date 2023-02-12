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
// import searchicon from '@salesforce/resourceUrl/searchBoxIcon';
// import addicon from '@salesforce/resourceUrl/addIcon';
// import previewicon from '@salesforce/resourceUrl/previewIcon';
// import logo from '@salesforce/resourceUrl/Quickformlogo';
// import feedbackIcon from '@salesforce/resourceUrl/feedbackIcon';
// import helpIcon from '@salesforce/resourceUrl/helpIcon';
// import right from '@salesforce/resourceUrl/right';
// import cross from '@salesforce/resourceUrl/cross';
// import bin from '@salesforce/resourceUrl/bin';
// import editpen from '@salesforce/resourceUrl/editpen';
import iconsZip from '@salesforce/resourceUrl/Iconfolder'; //   Edited as per sheet(qf_home.js - 6)

// ALL ICONS OF HOME PAGE [END]

// TO IMPORT USER INFO [START]
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import UserNameFIELD from '@salesforce/schema/User.Name';
// TO IMPORT USER INFO [END]

// IMPORT APEX METHOD [START]
import records from '@salesforce/apex/QuickFormHome.getFormRecords';                  // GET RECORDS AND COUNT
import status from '@salesforce/apex/QuickFormHome.getFormsByStatus';                    // CHANGE STATUS
import deleteform from '@salesforce/apex/QuickFormHome.deleteFormRecord';            // DELETE FORM
import search from '@salesforce/apex/QuickFormHome.searchForms';                    // SEARCH FORM
import renameform from '@salesforce/apex/QuickFormHome.renameFormRecord';             // RENAME FORM
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
    formId;                             // ID OF FORM WHILE DOING SOME ACTION   //   Edited as per sheet(qf_home.js - 3)
    formname;                           // OLD NAME OF FORM                     
    isOpenRenameForm;                   // BOOLEAN OPEN TEMPLATE OF RENAME      
    indexval=1;                         // INDEX VALUE                          //   Edited as per sheet(qf_home.js - 3)
    outsideClick;
    keyCode;
    isModalOpen = false;

// ICONS OF HOME PAGE [START] ==========

    //   Edited as per sheet(qf_home.js - 6)

    searchicon = iconsZip + '/Iconfolder/searchBoxIcon.jpg';
    addicon = iconsZip + '/Iconfolder/addIcon.png';
    previewicon = iconsZip + '/Iconfolder/previewIcon.png';
    logo = iconsZip + '/Iconfolder/Quickformlogo.png';
    feedbackIcon = iconsZip + '/Iconfolder/feedbackIcon.png'; 
    helpIcon = iconsZip + '/Iconfolder/helpIcon.png';
    cross = iconsZip + '/Iconfolder/cross.png';
    right = iconsZip + '/Iconfolder/right.png';
    bin = iconsZip + '/Iconfolder/bin.png';
    editpen = iconsZip + '/Iconfolder/editpen.png';
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
    // connectedCallback(){
    //   this.spinnerDataTable = true;
    //   try {
    //     records().then(result => {
    //         for (let key in result) {
    //             this.count = key;
    //             if(this.count > 0){
    //             this.PaginationList = result[key];
    //             this.data = true;
    //             this.bNoRecordsFound = true;
    //             }
    //             else{
    //               this.bNoRecordsFound = false;
    //             }
    //          }
    //          this.spinnerDataTable = false;
    //       });
    //     }catch (error) {
    //       console.error(error);
    //       this.spinnerDataTable = false;
    //       }
    // }
        
          //   Edited as per sheet(qf_home.js - 7)

    connectedCallback(){
      this.spinnerDataTable = true; 
      this.fetchRecords();
    }
    
    // fetchRecords(){
    //   try {
    //     records().then(result => {
    //         for (let key in result) {
    //             this.count = key;
    //             if(this.count > 0){
    //             this.PaginationList = result[key];
    //             this.data = true;
    //             this.bNoRecordsFound = true;
    //             }
    //             else{
    //               this.bNoRecordsFound = false;
    //             }
    //          }
    //          this.spinnerDataTable = false;
    //       });
    //     }catch (error) {
    //       console.error(error);
    //       this.spinnerDataTable = false;
    //       }
    // }

    //   Created new method as per sheet(qf_home.js - 7 & 5)

    fetchRecords() {
      try {
        records().then(result => {
          this.count = result.length;
          if (this.count > 0) {
            this.PaginationList = result;
            this.data = true;
            this.bNoRecordsFound = true;
          } else {
            this.bNoRecordsFound = false;
          }
          this.spinnerDataTable = false;
        });
      } 
      catch (error) {
        console.error(error);
        this.spinnerDataTable = false;
      }
    }
  
    

// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Search Form From the List
// =================================== -->
    // search(event){
    //     this.spinnerDataTable = true;
    //     this.searchkey = event.target.value; 
    //     console.log(this.spinnerDataTable);
    //     try {
    //       search({searchkey : this.searchkey}).then(result => {
    //         this.indexval = 1;
    //         this.spinnerDataTable = false;
    //         console.log(result.length);
    //           for (let key in result) {
    //             this.count = key;
    //             if(this.count > 0){
    //             this.PaginationList = result[key];
    //             this.data = true;
    //             this.bNoRecordsFound = true;
    //             }
    //             else{
    //               console.log('hii');
    //               this.bNoRecordsFound = false;
    //             }
    //           }
    //       });
    //     }catch (error) {
    //     console.error(error);
    //     this.spinnerDataTable = false;
    //     }
    // }

    //   Edited as per sheet(qf_home.js - 1 & 5)

    search(event) {
      this.spinnerDataTable = true;
      this.searchkey = event.target.value;
      console.log(this.spinnerDataTable);
      try {
        search({ searchkey: this.searchkey }).then(result => {
          this.indexval = 1;
          this.spinnerDataTable = false;
          console.log(result.length);
          this.count = result.length;
          if (this.count > 0) {
            this.PaginationList = result;
            this.data = true;
            this.bNoRecordsFound = true;
          } else {
            console.log("hii");
            this.bNoRecordsFound = false;
          }
        });
      } 
      catch (error) {
        console.error(error);
        this.spinnerDataTable = false;
      }
    }
    


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Change Status of Form
// =================================== -->

    //   Edited as per sheet(qf_home.js - 1)

    changestatus(event){
        this.formId = event.target.dataset.id;
        this.spinnerDataTable = true;
        try {
            status({id : this.formId, searchkey : this.searchkey}).then(result => {
              this.PaginationList = result;
              this.spinnerDataTable = false;
            });
        }
        catch (error) {
            console.error(error);
            this.spinnerDataTable = false;
        }
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Functionality of Dropdown Buttons(Rename or Delete)
// =================================== -->

    //   Edited as per sheet(qf_home.js - 1)

    handleSelectAction(event){
      try {
          // DELETE FUNCTIONALITY [START]
        if (event.detail.value == 'Delete') {
          this.deletepopup =true;
          this.formId = event.target.dataset.id;
          this.spinnerdelete = true;
        }
        else if(event.detail.value == 'Edit'){
          this.formId = event.target.dataset.id;
          let FormName = event.target.dataset.name;
          console.log(event.target.dataset);
          console.log('Formname on Home >>>' +FormName);
          let cmpDef = {
            componentDef: "c:formBuilder",
            attributes:{
                ParentMessage:this.formId!=""?this.formId:"No Record Created",
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
      catch (error) {
        console.error(error);
      }

    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Read New Form Name
// =================================== -->
    rename(event){
      this.formname = event.target.value;  
      this.keyCode = 13; 
      this.error_toast = false;
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Cancel Rename
// =================================== -->

    //   Edited as per sheet(qf_home.js - 1)
   
    cancleRenameForm(event){
      try {
          this.renamediv = true;
          this.pencheck = false;
          document.removeEventListener('click', this.outsideClick);
          if(event.target.dataset.id != this.formId){
          this.template.querySelector("div[data-name ="+this.formId+"]").style.display='none';
          this.template.querySelector("lightning-formatted-text[data-id ="+this.formId+"]").style.display='block'; }
      }
      catch (error) {
        console.error(error);
      }
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

    //   Edited as per sheet(qf_home.js - 1)

    renameForm(event){
      // console.log(String.fromCharCode(event.keyCode));
      try{
        if( this.keyCode === 13){
          if(this.formname.length > 0 && this.formname.replaceAll(' ', '').length > 0){
              this.spinnerDataTable = true; 
              this.error_toast = false;
                renameform({id : this.formId, rename : this.formname, searchkey : this.searchkey}).then(result => {
                  this.PaginationList = result;
                  this.template.querySelector("div[data-name ="+this.formId+"]").style.display='none';
                  this.template.querySelector("lightning-formatted-text[data-id ="+this.formId+"]").style.display='block';   
                  this.isOpenRenameForm = false;
                  this.spinnerDataTable = false;        
                  this.renamediv = true;
                  this.pencheck = false;     
                })
          }
          else{
              this.error_toast = true;
          }
        }
      }
      catch(error){
          console.error(error);
      }
    }

    //   Edited as per sheet(qf_home.js - 1)

    new_rename(event){
      try {
        this.formId = event.currentTarget.dataset.id;
        this.formname = event.currentTarget.dataset.name;
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
      catch (error) {
        console.error(error);
      }
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
      this.template.querySelector("div[data-name ="+this.formId+"]").style.display='none';
      this.template.querySelector("lightning-formatted-text[data-id ="+this.formId+"]").style.display='block';   
      }
    }

    insideClick(event){
      event.stopPropagation();
      return false;
    }

    //   Edited as per sheet(qf_home.js - 1)

    deleteyes(){
      this.deletepopup = false;
      this.spinnerDataTable = true;
      try {
        deleteform({id : this.formId, searchkey : this.searchkey}).then(result => {
          console.log(this.formId);
          this.PaginationList = result;
          this.count -= 1;
          if (this.count === 0) {
            this.bNoRecordsFound = false;
          }
          this.spinnerdelete = false;              
          this.spinnerDataTable = false;
          let toast_error_msg = 'Form is successfully deleted';
          this.error_toast = true;
          this.template.querySelector('c-toast-component').showToast('success',toast_error_msg,3000);
        });
        
      } 
      catch (error) {
        console.error(error);
        this.spinnerDataTable = false;
        let toast_error_msg = 'Error while deleting the form, Please try again later';
        this.error_toast = true;
        this.template.querySelector('c-toast-component').showToast('error',toast_error_msg,3000);
      }
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
        if(this.indexval > this.count){
          this.indexval = 1 ;
        }
        return this.indexval++;
      }

      onpreview(event){
        this.formId = event.currentTarget.dataset.id;
        // this.activepreview = true;
        // this.activehome = false;
        console.log('formId -->'+ this.formId);
        let cmpDef = {
          componentDef: "c:previewFormCmp",
          attributes:{
              formid:this.formId!=""?this.formId:"No Record Created",
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