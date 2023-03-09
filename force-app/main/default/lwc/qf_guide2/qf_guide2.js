import {
  LightningElement,
  track,
  wire,
  api
} from 'lwc';
import getSites from '@salesforce/apex/qf_guide2_Controller.getSites';
import getSettingData from '@salesforce/apex/qf_guide2_Controller.getSettingData';
import saveSecureUrl from '@salesforce/apex/qf_guide2_Controller.saveSecureUrl';

export default class Qf_guide2 extends LightningElement {

  @track isModalOpen = false;
  @track issiteModelopen = false;
  @track sites = [];
  @track selectedSite;
  @track selectedSiteName;
  @track spinnerdatatable = false;
  error_toast = true;
  // @api siteId;

  connectedCallback() {
    this.spinnerdatatable = true;
    this.getSiteDetails();
  }

  getSiteDetails() {
    getSites()
      .then(result => {
        console.log("result : " + JSON.stringify(result));
        var tempSite = [];
        result.forEach(siteval => {
          tempSite.push({
            label: siteval.MasterLabel,
            value: siteval.Id
          });
        });
        this.sites = tempSite;
        console.log('this.sites ==> ', JSON.stringify(this.sites));
        getSettingData()
          .then(result => {
            this.selectedSite = result;
            this.spinnerdatatable = false;
          })
          .catch(error => {
            console.log(error);
            this.spinnerdatatable = false;
          });
      })
      .catch(error => {
        console.error(error);
        this.spinnerdatatable = false;
      });
  }

  // Handle the button click event
  handleSave() {
    this.spinnerdatatable = true;
    console.log('enter');
    console.log(this.selectedSite);
    if (this.selectedSite) {
      console.log('inside if : ' + this.selectedSite);
      saveSecureUrl({
          selectedSiteid: this.selectedSite
        })
        .then(result => {
          console.log("result : " + JSON.stringify(result));
          this.spinnerdatatable = false;
          this.error_toast = true;
          this.template.querySelector('c-toast-component').showToast('success', 'Successfully Inserted', 3000);
        })
        .catch(error => {
          console.error(error);
          this.spinnerdatatable = false;
          this.error_toast = true;
          this.template.querySelector('c-toast-component').showToast('success', 'Uh oh, something went wrong', 3000);
        });
    }
  }

  handleSiteChange(event) {
    this.selectedSite = event.detail.value;
    console.log(this.selectedSite);
    // var selectedName = '';
    // console.log('site --->',JSON.stringify(this.sites));
    // this.sites.forEach(data => {
    //   if(data.value == this.selectedSite) {
    //     selectedName = data.label;
    //   }
    // });
    // this.selectedSiteName = selectedName;
    // console.log('selectedSiteName -===> ',this.selectedSiteName);
  }

  renderedCallback() {
    this.template.querySelectorAll("a").forEach(element => {
      element.addEventListener("click", evt => {
        let target = evt.currentTarget.dataset.tabId;

        this.template.querySelectorAll("a").forEach(tabel => {
          if (tabel === element) {
            tabel.classList.add("active-tab");
          } else {
            tabel.classList.remove("active-tab");
          }
        });
        this.template.querySelectorAll(".tab").forEach(tabdata => {
          tabdata.classList.remove("active-tab-content");
        });
        this.template.querySelector('[data-id="' + target + '"]').classList.add("active-tab-content");
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
  tabing() {
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