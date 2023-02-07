public with sharing class customMetadata {
    public customMetadata() {

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
             
            l_Types = [SELECT DeveloperName,Label,sr__c FROM Progress_Indicator__mdt]; // Can include multiple fields, 
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
             
            Captcha_Types = [SELECT DeveloperName,Label,sr__c FROM Captcha_Type__mdt]; // Can include multiple fields, 
            System.debug(Captcha_Types);
            
            // You can also use any standard or custom object
            // You can get values from custom setting also.
             
            return Captcha_Types;
        } catch (Exception e) {
            System.debug('Exception: '+e.getMessage());
            return null;
        }
    }
   
    

    
}