public with sharing class qf_home {

    @AuraEnabled
    public static List<Form__c> forms(){
        try {
            List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c];
            return forms;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
    @AuraEnabled
    public static Integer count(String value){
        try {
            if(value == null){
            Integer formscount = [SELECT Count() FROM Form__c];
            return formscount;
        }else {
            String searchkeyword = '%'+value+'%';
            System.debug(searchKeyword);
            Integer formscount = [SELECT Count() FROM Form__c WHERE Name LIKE:searchkeyword];
            return formscount;
        }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Form__c> status(Id id, String value){
        try {

            Form__c form = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Id =: id];

            if (form.Status__c == true) {
                form.Status__c = false;
            }
            else {
                form.Status__c = true;
            }
            update form;
            System.debug(value);
            if(value == null || value == '' || value == 'undefined'){
            List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c];
            return forms;
            }
            else{
            String searchkeyword = '%'+value+'%';
            List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Name LIKE:searchkeyword];
            return forms;
            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Form__c> search(String value){
        try {
            String searchkeyword = '%'+value+'%';
            List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Name LIKE:searchkeyword];
            return forms;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Form__c> deleteform(Id id, String value){
        try {
            Form__c form = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Id =: id];
            delete form;
            
            if(value == null || value == '' || value == 'undefined'){
                List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c];
                return forms;
                }
                else{
                String searchkeyword = '%'+value+'%';
                List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Name LIKE:searchkeyword];
                return forms;
                }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}