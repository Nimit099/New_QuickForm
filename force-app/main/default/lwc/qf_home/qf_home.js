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


export default class Qf extends LightningElement {
    PaginationList;                      //LIST OF FORMS
    
    bNoRecordsFound = true; 
    NoRecordsFound = true;
    spinnerDataTable = false;

    count;                              // COUNT OF FORMS
    searchkey;                          // SEARCH FORMS
    id;                                 // ID OF FORM WHILE DOING SOME ACTION
    formname;                           // OLD NAME OF FORM
    newFormName;                        // NEW NAME OF FORM
    isOpenRenameForm;                   // BOOLEAN OPEN TEMPLATE OF RENAME
    i=1;                                // INDEX VALUE

// ICONS OF HOME PAGE [START] ==========
    searchicon = searchicon;
    addicon = addicon;
    previewicon = previewicon;
    logo = logo;
    feedbackIcon = feedbackIcon;
    helpIcon = helpIcon;
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
                this.PaginationList = result[key];
                
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
        this.searchkey = event.target.value; 
        search({searchkey : this.searchkey}).then(result => {
          this.i = 1;
              for (let key in result) {
                this.count = key;
                this.PaginationList = result[key];
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
          this.id = event.target.dataset.id;
          this.spinnerDataTable = true;
          deleteform({id : this.id, searchkey : this.searchkey}).then(result => {
              this.PaginationList = result;
              this.spinnerDataTable = false;
              this.count -= 1;
          })
        }
          // DELETE FUNCTIONALITY [END]

          // RENAME FUNCTIONALITY [START]
        else if(event.detail.value == 'Rename'){
          this.isOpenRenameForm = true;
          this.formname = event.target.value;
          this.id = event.target.dataset.id;          
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
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Cancel Rename
// =================================== -->
    cancleRenameForm(){
      this.newFormName = '';
      this.isOpenRenameForm = false;
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Update Form Name
// =================================== -->
    renameForm(){
      this.spinnerDataTable = true;
      renameform({id : this.id, rename : this.newFormName}).then(result => {
          this.PaginationList = result;
          this.isOpenRenameForm = false;
          this.spinnerDataTable = false;
          this.newFormName = '';
      })
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
}