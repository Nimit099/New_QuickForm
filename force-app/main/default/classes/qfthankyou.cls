//  ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 18/01/2023
// # Description: Used for Edit, Delete, Read or Create New Form
// # Change Version History
// # Version No.     Author          Date            Change Description            Jira Ticket
// #    1.           Nimit         18/01/2023           Home Page UI 		     QUIC-18, QUIC-27
// =================================== 
public with sharing class qfthankyou {

    // <!-- ===================================
    // # MV Clouds Private Limited
    // # Author: Nimit Shah
    // # Create Date: 18/01/2023
    // # Description: Used to Check and get already created thank you page for the selected form
    // =================================== -->
        @AuraEnabled
        public static Thankyou_Page__c getthankyoupage(Id currentformid){
            try {
                if(currentformid != null){
            Thankyou_Page__c record = [SELECT Id, Name, Form__c,Thank_you_URL__c, Thankyou_Page_Type__c	, Thankyou_Text__c, ThankYou_Label__c	FROM Thankyou_Page__c WHERE Form__c =: currentformid limit 1];
            return record;
                }
                return null;
            } catch (Exception e) {
                
                return null;            
            }
        }
    
    
    // <!-- ===================================
    // # MV Clouds Private Limited
    // # Author: Nimit Shah
    // # Create Date: 18/01/2023
    // # Description: Used to Update or insert thank you page 
    // =================================== -->
       @AuraEnabled
   public static string insertrecord(String picklist, String label, String classtext, String formId, String url, Id currentthankyouid){
        try {
            
            if(String.isNotBlank(classtext)){
            Thankyou_Page__c insertrecord = new Thankyou_Page__c( Form__c = formId, ThankYou_Label__c = label, Thank_you_URL__c = url, Thankyou_Text__c = classtext, Thankyou_Page_Type__c = picklist, Name = 'Thank you', Id = currentthankyouid ); 
            Database.upsert(insertrecord);
            }
            else{
            Thankyou_Page__c insertrecord = new Thankyou_Page__c( Form__c = formId, ThankYou_Label__c = label, Thank_you_URL__c = url, Thankyou_Page_Type__c = picklist, Name = 'Thank you', Id = currentthankyouid );
            Database.upsert(insertrecord); 
            }
            return null;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
       }
    }