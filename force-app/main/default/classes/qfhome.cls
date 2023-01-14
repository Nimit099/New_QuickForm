public with sharing class qfhome {
    @AuraEnabled
    public static List<Form__c> records(){
        try {
            List<Form__c> forms = [SELECT Id,Name,Total_Submissions__c, Status__c FROM Form__c];
            return forms;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}