public with sharing class qfhome {

    // GET THE FORMS LIST WHILE OPENING THE HOME PAGE [START]
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
        // GET THE FORMS LIST WHILE OPENING THE HOME PAGE [END]

    // TO SEARCH THE FORM [START]
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
    // TO SEARCH THE FORM [END]

    // TO CHANGE STATUS OF THE FORM [START]
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
    // TO CHANGE STATUS OF THE FORM [END]

    // TO DELETE THE FORM [START]
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
    // TO DELETE THE FORM [END]

    // TO RENAME THE FORM [START]
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
    // TO RENAME THE FORM [END]
}