public with sharing class qfthankyou {

    public Id recordid;

    @AuraEnabled
    public static Thankyou_Page__c getthankyoupage(Id currentformid){
        try {
            if(currentformid != null){
            Thankyou_Page__c record = [SELECT Id, Name, Form__c,Thank_you_URL__c, Thankyou_Page_Type__c	, Thankyou_Text__c	FROM Thankyou_Page__c WHERE Form__c =: currentformid limit 1];
            return record;
            }
            return null;
        } catch (Exception e) {
            
            return null;            
        }
    }

   @AuraEnabled
   public static string insertrecord(String picklist, String classtext, String formId, String url, Id currentthankyouid){
    try {
        
        if(String.isNotBlank(classtext)){
        Thankyou_Page__c insertrecord = new Thankyou_Page__c( Form__c = formId, Thank_you_URL__c = url, Thankyou_Text__c = classtext, Thankyou_Page_Type__c = picklist, Name = 'Thank you', Id = currentthankyouid ); 
        Database.upsert(insertrecord);
        }
        // else if(String.isNotBlank(classtext)){
        // Thankyou_Page__c insertrecord = new Thankyou_Page__c( Form__c = formId, Thank_you_URL__c = url, Thankyou_Text__c = classtext, Thankyou_Page_Type__c = picklist, Name = 'Thank you', Id = currentthankyouid );
        // Database.upsert(insertrecord);
        // }
        else{
            Thankyou_Page__c insertrecord = new Thankyou_Page__c( Form__c = formId, Thank_you_URL__c = url, Thankyou_Page_Type__c = picklist, Name = 'Thank you', Id = currentthankyouid );
            Database.upsert(insertrecord); 
        }
        return null;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}