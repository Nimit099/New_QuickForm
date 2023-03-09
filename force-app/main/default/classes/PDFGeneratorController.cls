public with sharing class PDFGeneratorController {
    
    public Form_Submission__c fromSubmisionData {get; set;}
    public formDataWrapper formData {get; set;}
    public boolean isFirstObject {get; set;}
    public boolean isSecondObject {get; set;}
    public boolean isThirdObject {get; set;}

    public void getPagesOfForm() {
        fromSubmisionData = new Form_Submission__c();
        formData = new formDataWrapper();
        Map<String, Object> mapofFirstObject = new Map<String, Object>();
        Map<String, String> mapofFirstObjectData = new Map<String, String>();

        Map<String, Object> mapofSecondObject = new Map<String, Object>();
        Map<String, String> mapofSecondObjectData = new Map<String, String>();

        Map<String, Object> mapofThirdObject = new Map<String, Object>();
        Map<String, String> mapofThirdObjectData = new Map<String, String>();

        try {
            String submissionId = ApexPages.currentPage().getParameters().get('Id');
            System.debug('Id from PageReference ==>' + submissionId);


            Form_Submission__c formSubmissionRecord = [SELECT Id, Name, Form__c, Form__r.Name, First_object_data__c, Second_object_data__c, Third_object_data__c, Other_fields_data__c FROM Form_Submission__c WHERE Id =: submissionId];
            fromSubmisionData = formSubmissionRecord;

            // Stroring First object fields submitted data into Map<String, String>
            mapofFirstObject = (Map<String, Object>)JSON.deserializeUntyped(formSubmissionRecord.First_object_data__c);
            for (String key : mapofFirstObject.keySet()) {
                Object value = mapofFirstObject.get(key);
                if (value != null) {
                    mapofFirstObjectData.put(key, String.valueOf(value));
                }
                isFirstObject = true;
            }
            System.debug('*** mapofFirstObjectData ==>' + mapofFirstObjectData);

            // Stroring Second object fields submitted data into Map<String, String>
            mapofSecondObject = (Map<String, Object>)JSON.deserializeUntyped(formSubmissionRecord.Second_object_data__c);
            for (String key : mapofSecondObject.keySet()) {
                Object value = mapofSecondObject.get(key);
                if (value != null) {
                    mapofSecondObjectData.put(key, String.valueOf(value));
                }
                isSecondObject = true;
            }
            System.debug('*** mapofSecondObjectData ==>' + mapofSecondObjectData);

            // Stroring Third object fields submitted data into Map<String, String>
            mapofThirdObject = (Map<String, Object>)JSON.deserializeUntyped(formSubmissionRecord.Third_object_data__c);
            for (String key : mapofThirdObject.keySet()) {
                Object value = mapofThirdObject.get(key);
                if (value != null) {
                    mapofThirdObjectData.put(key, String.valueOf(value));
                }
                isThirdObject = true;
            }
            System.debug('*** mapofThirdObjectData ==>' + mapofThirdObjectData);

            List<Form_Page__c> formpageList = new List<Form_Page__c>();
            formpageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c =: formSubmissionRecord.Form__c ORDER BY Page_Number__c ASC];

            formData.formName = formSubmissionRecord.Form__r.Name;
            formData.formPages = formpageList;
            formData.firstObjectFieldMap = mapofFirstObjectData;
            formData.secondObjectFieldMap = mapofSecondObjectData;
            formData.thirdObjectFieldMap = mapofThirdObjectData;
            
        } catch (Exception e) {
            System.debug('In the catch block of getPagesOfForm ==>');
            System.debug('--Line number ==>' + e.getLineNumber() + '-- Message ==>' + e.getMessage());
        }
    }

    // This wrapper used to show all datat in pdf 
    public class formDataWrapper {
        public String formName {get; set;} // form name of submmited data
        public List<Form_Page__c> formPages {get; set;}   //List of pages of form
        public Map<String, String> firstObjectFieldMap {get; set;} //
        public Map<String, String> secondObjectFieldMap {get; set;} //
        public Map<String, String> thirdObjectFieldMap {get; set;} //
    }

}