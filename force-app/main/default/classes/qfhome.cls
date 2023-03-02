//  ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used for Edit, Delete, Read or Create New Form
// # Change Version History
// # Version No.     Author          Date            Change Description            Jira Ticket
// #    1.           Nimit         09/01/2023           Home Page UI 			 QUIC-37, QUIC-36
// =================================== 


public with sharing class qfhome {

// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Read All Forms record
// =================================== -->
    @AuraEnabled
    public static Map<Integer,List<Form__c>> records(){
        try {
            List<Form__c> forms = [SELECT Id,Name,Total_Submissions__c, Status__c FROM Form__c];
            Integer count = [SELECT Count() FROM Form__c];
            Map<Integer,List<Form__c>> data = new Map<Integer,List<Form__c>>();
            data.put(count,forms);
            return data;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Search Form
// =================================== -->
    @AuraEnabled
    public static Map<Integer,List<Form__c>> search(String searchkey){
        try {
            String searchkeyword = '%'+searchkey+'%';
            List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Name LIKE:searchkeyword];
            Integer count = [SELECT Count() FROM Form__c WHERE Name LIKE:searchkeyword];
            Map<Integer,List<Form__c>> data = new Map<Integer,List<Form__c>>();
            data.put(count,forms);
            return data;
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Change Status of form
// =================================== -->
    @AuraEnabled
    public static List<Form__c> status(Id id, String searchkey){
        try {

            Form__c form = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Id =: id];

            if (form.Status__c == true) {
                form.Status__c = false;
            }
            else {
                form.Status__c = true;
            }
            update form;

            if(searchkey == null || searchkey == '' || searchkey == 'undefined'){
            List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c];
            return forms;
            }
            else{
            String searchkeyword = '%'+searchkey+'%';
            List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Name LIKE:searchkeyword];
            return forms;
            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to delete form
// =================================== -->
    @AuraEnabled
    public static List<Form__c> deleteform(Id id, String searchkey){
        try {
            Form__c form = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Id =: id];
            delete form;
            
            if(searchkey == null || searchkey == '' || searchkey == 'undefined'){
                List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c];
                return forms;
                }
                else{
                String searchkeyword = '%'+searchkey+'%';
                List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Name LIKE:searchkeyword];
                return forms;
                }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Rename form
// =================================== -->
    @AuraEnabled
    public static List<Form__c> renameform(Id id, String rename){
        try {
            Form__c form = [SELECT Name FROM Form__c WHERE Id =: id];
            form.Name = rename;
            update form;        
            List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c];
            return forms;
                
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Void sendemail(String name, String email, String subject, String body){
        try {
            List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
            List<String> address = new List<String>{'smit11685@gmail.com'};
                
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            System.debug('mail :'+ mail);
            mail.setSubject(subject);
            mail.setplaintextbody(body+'\n\n\nFrom '+name +'\nEmail '+email);
            mail.setToAddresses(address);
            emailList.add(mail);
            System.debug('emailList :'+emailList);
            Messaging.sendEmail(emailList);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}