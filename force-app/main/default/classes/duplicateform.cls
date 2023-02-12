public with sharing class duplicateform {

    @AuraEnabled
    public static void duplicate(Id formId){
        try {
           List<Form__c> forms =  [SELECT Id,Name,(SELECT Id, Name FROM Form_Fields__r ) FROM Form__c WHERE Id =: formId];
           System.debug(forms);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}