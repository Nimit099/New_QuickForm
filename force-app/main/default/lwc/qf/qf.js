import { LightningElement } from 'lwc';
import records from '@salesforce/apex/qfhome.records';
import searchicon from '@salesforce/resourceUrl/searchBoxIocn';
import allpage from '@salesforce/resourceUrl/allPageIcon';
import addicon from '@salesforce/resourceUrl/addIcon';
import previewicon from '@salesforce/resourceUrl/previewIcon';

export default class Qf extends LightningElement {
    PaginationList;
    bNoRecordsFound = true;
    NoRecordsFound = true;
    spinnerDataTable = false;
    arrowDirection = true;

    searchicon = searchicon;
    allpage = allpage;
    addicon = addicon;
    previewicon = previewicon;
    
    connectedCallback(){
        records().then(result => {
			this.PaginationList = result;
		})
    }
}