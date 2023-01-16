import { LightningElement,wire } from 'lwc';


import searchicon from '@salesforce/resourceUrl/searchBoxIocn';
import allpage from '@salesforce/resourceUrl/allPageIcon';
import addicon from '@salesforce/resourceUrl/addIcon';
import previewicon from '@salesforce/resourceUrl/previewIcon';
import logo from '@salesforce/resourceUrl/Quickformlogo';

import records from '@salesforce/apex/qfhome.records';
import status from '@salesforce/apex/qfhome.status';
import deleteform from '@salesforce/apex/qfhome.deleteform';
import search from '@salesforce/apex/qfhome.search';
import renameform from '@salesforce/apex/qfhome.renameform'

export default class Qf extends LightningElement {
    PaginationList;
    bNoRecordsFound = true;
    NoRecordsFound = true;
    spinnerDataTable = false;
    arrowDirection = true;
    count;
    searchkey;
    formname;
    id;
    newFormName; 
    i=1;

    searchicon = searchicon;
    allpage = allpage;
    addicon = addicon;
    previewicon = previewicon;
    logo = logo;
    searchkey;
    isOpenRenameForm;
    
    connectedCallback(){
        records().then(result => {
            for (let key in result) {
                this.count = key;
                this.PaginationList = result[key];
             }
             console.log(this.PaginationList);
		})
    }
    search(event){
        this.searchkey = event.target.value;
        search({searchkey : this.searchkey}).then(result => {
			for (let key in result) {
                this.count = key;
                this.PaginationList = result[key];
             }
		})
    }
    changestatus(event){
      this.i =1;
        this.id = event.target.dataset.id;
            status({id : this.id, searchkey : this.searchkey}).then(result => {
              this.PaginationList = result;
              this.id = '';
            })
    }
    handleSelectAction(event){
      this.i = 1;
        if (event.detail.value == 'Delete') {
          this.id = event.target.dataset.id;
          deleteform({id : this.id, searchkey : this.searchkey}).then(result => {
            for (let key in result) {
              this.count = key;
              this.PaginationList = result[key];
              this.id = '';
            }
          })
        }
        else if(event.detail.value == 'Rename'){
          this.isOpenRenameForm = true;
          this.formname = event.target.value;
          this.id = event.target.dataset.id;          
        }
    }
    rename(event){
      this.newFormName = event.target.value;
      console.log(this.newFormName);
    }
    cancleRenameForm(){
      this.newFormName = '';
      this.isOpenRenameForm = false;
    }
    renameForm(){
      renameform({id : this.id, rename : this.newFormName}).then(result => {
        for (let key in result) {
          this.count = key;
          this.PaginationList = result[key];
          this.id = '';
          this.isOpenRenameForm = false;
        }
      })
    }
    get index(){
      if(this.i > this.count){
        this.i = 1 ;
      }
      return this.i++;
    }
}