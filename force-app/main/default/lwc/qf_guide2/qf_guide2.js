import { LightningElement, track } from 'lwc';

export default class Qf_guide2 extends LightningElement {

  @track isModalOpen = false;
  @track issiteModelopen = false;

    renderedCallback(){
        this.template.querySelectorAll("a").forEach(element => {
            element.addEventListener("click", evt=>{
                let target = evt.currentTarget.dataset.tabId;

                this.template.querySelectorAll("a").forEach(tabel =>{
                    if(tabel === element){
                        tabel.classList.add("active-tab");
                    }
                    else{
                        tabel.classList.remove("active-tab");
                    }
                });
                this.template.querySelectorAll(".tab").forEach(tabdata=>{
                    tabdata.classList.remove("active-tab-content");
                });
                this.template.querySelector('[data-id="'+target+'"]').classList.add("active-tab-content");
            });
        });
    }
 

  closesiteModel() {
    this.isModalOpen = false;

    const target = "tab1";
    this.template.querySelectorAll("a").forEach(tabel => {
      tabel.classList.remove("active-tab");
    });
    this.template.querySelectorAll(".tab").forEach(tabdata => {
      tabdata.classList.remove("active-tab-content");
    });
    this.template.querySelector('[data-tab-id="' + target + '"]').classList.add("active-tab");
    this.template.querySelector('[data-id="' + target + '"]').classList.add("active-tab-content");
  }

  openModel() {
    this.isModalOpen = true;
  }

  openCreateEditModel() {
    this.issiteModelopen = true;
  }

  closeModel() {
    this.issiteModelopen = false;

    const target = "tab1";
    this.template.querySelectorAll("a").forEach(tabel => {
      tabel.classList.remove("active-tab");
    });
    this.template.querySelectorAll(".tab").forEach(tabdata => {
      tabdata.classList.remove("active-tab-content");
    });
    this.template.querySelector('[data-tab-id="' + target + '"]').classList.add("active-tab");
    this.template.querySelector('[data-id="' + target + '"]').classList.add("active-tab-content");
  }

  opensite() {
    try {
      const baseUrl = window.location.origin + '/lightning/setup/CustomDomain/home';
      window.open(baseUrl, '_blank');
    } catch (error) {
      console.error(error);
    }
  }
  tabing(){
    const target = "tab1";
    this.template.querySelectorAll("a").forEach(tabel => {
      tabel.classList.remove("active-tab");
    });
    this.template.querySelectorAll(".tab").forEach(tabdata => {
      tabdata.classList.remove("active-tab-content");
    });
    this.template.querySelector('[data-tab-id="' + target + '"]').classList.add("active-tab");
    this.template.querySelector('[data-id="' + target + '"]').classList.add("active-tab-content");
  }
}