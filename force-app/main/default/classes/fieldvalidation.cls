public with sharing class fieldvalidation {
    public fieldvalidation() {

    }

    @AuraEnabled
    public static void deletefield(Id fieldId){
        try {

            delete [SELECT Id FROM Form_Fields__c WHERE Id =: fieldId];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}