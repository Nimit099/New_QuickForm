public without sharing class customMetadata {
    Public static String formid{get;set;}
    Public static String test_form_id;
    public string urlvalue{get;set;}
    public customMetadata() {
        urlvalue=Apexpages.currentPage().getParameters().get('formid');
    }
    @AuraEnabled(cacheable=true)
    public static List<Progress_Indicator__mdt> getProgressindicator(){
        return Progress_Indicator__mdt.getAll().values();
       
    }
    @AuraEnabled(cacheable=true)
    public static List<	Captcha_Type__mdt> getCaptchatype(){
        return Captcha_Type__mdt.getAll().values();
       
    }
    @AuraEnabled(cacheable=true)
    public static List<Progress_Indicator__mdt> f_Get_Types(){
        try {
            List<Progress_Indicator__mdt> l_Types = new List<Progress_Indicator__mdt>();
             
            l_Types = [SELECT DeveloperName,Label,sr__c FROM Progress_Indicator__mdt ORDER BY sr__c ASC]; // Can include multiple fields, 
            System.debug(l_Types);
            
            // You can also use any standard or custom object
            // You can get values from custom setting also.
             
            return l_Types;
        } catch (Exception e) {
            // error_handler.insert_errordata(e ,'customMetadata','f_get_Type');
            // System.debug(e.getMessage());
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }
    @AuraEnabled(cacheable=true)

    public static List<Captcha_Type__mdt> Get_Captcha_Types(){
        try {
            List<Captcha_Type__mdt> Captcha_Types = new List<Captcha_Type__mdt>();
             
            Captcha_Types = [SELECT DeveloperName,Label,sr__c FROM Captcha_Type__mdt ORDER BY sr__c ASC]; // Can include multiple fields, 
            System.debug(Captcha_Types);
            
            // You can also use any standard or custom object
            // You can get values from custom setting also.
             
            return Captcha_Types;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'customMetadata','Get_Captcha_Types');
            // System.debug(e.getMessage());
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }
    // @AuraEnabled
    // public static void getformid(String currentformid){
    //     System.debug('u r in get form id');
    //     System.debug('Exception form url in get form id: '+ currentformid);
    //     formid = currentformid;

    // }
    @AuraEnabled
    public static String siteUrl(String Formid){
        String publishedURL = '';
        try {
            System.debug('Method Name : customMetadata.siteUrl');
            System.debug('Form ID: '+ Formid);
            List<Form__c> formRecord = new List<Form__c>([SELECT Id, Name, Form_Published_URL__c FROM Form__c WHERE Id = :Formid]);
            if(formRecord.size() > 0 && !String.isBlank(formRecord[0].Form_Published_URL__c)) {
                publishedURL = formRecord[0].Form_Published_URL__c;
            } else {
                //Getting Site details
                Site mySite = [select Id from Site where Status = 'Active'];
                SiteDetail mySiteDetail = [select SecureURL from SiteDetail where DurableId = :mySite.Id];
                String modifiedSecureURL = mySiteDetail.SecureURL;
                System.debug('modifiedSecureURL --> '+modifiedSecureURL);
                // if (modifiedSecureURL.endsWith('/')) {
                //     modifiedSecureURL = modifiedSecureURL.substring(0, modifiedSecureURL.length() - 1);
                // }
                // Form Id Encryption 
                String encryptedData = EncryptDecryptController.processEncryption(Formid);
                publishedURL = modifiedSecureURL+'PreViewForm?access_key='+encryptedData;
                System.debug(publishedURL);
                Form__c formRec = new Form__c(Id = Formid);
                formRec.Form_Published_URL__c = publishedURL;
                update formRec;
            }
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'customMetadata','siteUrl');
            // System.debug(e.getMessage());
            System.debug('An exception occurred: ' + e.getMessage());
            return null;
        }
        return publishedURL;
    }
}