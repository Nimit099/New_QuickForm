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
        try {
            System.debug('Exception form url: '+ Formid);
            String formid_test = Formid;
            System.debug('String form id: '+ formid_test);
            System.debug('u r in siteList ');
            Site siteList = [SELECT GuestUserId, Name, MasterLabel, Subdomain, UrlPathPrefix FROM Site WHERE Status = 'Active'];
            List<String> siteFullUrlList = new List<String>();
            System.debug('list of siteList :-' + siteList.Name);
            String name = siteList.Name;
            Site mySite = [select Id from Site where Name =:name];
            SiteDetail mySiteDetail = [select SecureURL from SiteDetail where DurableId = :mySite.Id];
            System.debug(mySiteDetail.SecureURL+siteList.Name);
            String modifiedSecureURL = mySiteDetail.SecureURL;
            if (modifiedSecureURL.endsWith('/')) {
                modifiedSecureURL = modifiedSecureURL.substring(0, modifiedSecureURL.length() - 1);
            }
            String testtest = modifiedSecureURL+'?formid='+formid_test;
            System.debug(testtest);
            siteFullUrlList.add(mySiteDetail.SecureURL+siteList.Name);
            return testtest;
        } catch (Exception e) {
            System.debug('An exception occurred: ' + e.getMessage());
            return null;
        }
    }
    
    

    
}