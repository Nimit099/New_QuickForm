public with sharing class fieldvalidation {
    public fieldvalidation() {

    }
    @AuraEnabled
    public static String getfieldvalidation(Id fieldId){
        try {
            Form_Fields__c fieldvalidation = [SELECT Id,Field_Validations__c FROM Form_Fields__c WHERE Id =: fieldId ];
            System.debug(fieldvalidation);
            return fieldvalidation.Field_Validations__c;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void deletefield(Id fieldId){
        try {

            delete [SELECT Id FROM Form_Fields__c WHERE Id =: fieldId];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void savevalidation(Id fieldId, String fieldValidation){
        try {
            System.debug(fieldValidation);
            fieldValidation = fieldValidation.replaceAll('"', '');
            Form_Fields__c field = [SELECT Id,Field_Validations__c	FROM Form_Fields__c WHERE Id =: fieldId];
            field.Field_Validations__c = fieldValidation;
            update field;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void copyfield(Id fieldId){
        try {
            Form_Fields__c field = [SELECT Id,Field_Validations__c,Field_Mapping__c,Field_Order__c,Field_Properties__c,Field_Styling__c,Form__c,Form_Page__c,Name,Mapped_Obj__c FROM Form_Fields__c WHERE Id =: fieldId];
            insert(new Form_Fields__c(Field_Validations__c = field.Field_Validations__c ,Field_Mapping__c = field.Field_Mapping__c ,Field_Order__c =field.Field_Order__c,
            Field_Properties__c =field.Field_Properties__c ,Field_Styling__c = field.Field_Styling__c , Form__c = field.Form__c ,Form_Page__c = field.Form_Page__c,Name = field.Name,Mapped_Obj__c =field.Mapped_Obj__c));
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}