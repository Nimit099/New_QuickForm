public with sharing class qfthankyou {
   @AuraEnabled
   public static string insertrecord(String picklist, String text,String richtext, String formId, String url){
    try {
        if(String.isNotBlank(text)){
        Thankyou_Page__c insertrecord = new Thankyou_Page__c( Form__c = formId, Thank_you_URL__c = url, Thankyou_Text__c = text, Thankyou_Page_Type__c = picklist, Name = 'Thank you' ); 
        Database.upsert(insertrecord);
        }
        else if(String.isNotBlank(richtext)){
        Thankyou_Page__c insertrecord = new Thankyou_Page__c( Form__c = formId, Thank_you_URL__c = url, Thankyou_Text__c = richtext, Thankyou_Page_Type__c = picklist, Name = 'Thank you' );
        Database.upsert(insertrecord);
        }
        else{
            Thankyou_Page__c insertrecord = new Thankyou_Page__c( Form__c = formId, Thank_you_URL__c = url, Thankyou_Page_Type__c = picklist, Name = 'Thank you' );
            Database.upsert(insertrecord); 
        }
        
        return null;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
}