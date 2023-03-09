public without sharing class previewFormcmp {

    @AuraEnabled
    public static Form__c formdetails(Id id){
        try{
        Form__c nform = [SELECT Id,Name,Progress_Indicator__c,Captcha_Type__c,Button_CSS__c,Button_Position__c,
        Page_CSS__c,Form_Styling__c, All_Field_Hover__c, All_Field_Focus__c,All_Field_Styling__c,Label_CSS__c,FormBgID__c,PageBgID__c  FROM Form__c WHERE Id =: id];
        return nform;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'previewFormcmp','formdetails');
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static String bgimages(Id id, String data){
        try{
            String result = '';
            ContentVersion cv = [SELECT Id,VersionData FROM ContentVersion WHERE Id =: id];
            result += 'url("data:image/png;base64,'+ EncodingUtil.base64Encode(cv.VersionData);
            String str = data.split('background-image:')[0];
            str += 'background-image:'+result+'");'; 
            System.debug('base64 data image --> '+ str);

            return str;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'previewFormcmp','formdetails');
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Form_Fields__c> formfielddetails(Id id){
        try{
        List<Form_Fields__c> fieldList=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c,Field_Validations__c FROM Form_Fields__c WHERE Form__c =: id ORDER BY Field_Order__c ASC];
        return fieldList;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'previewFormcmp','formfielddetails');
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Form_Page__c> formpagedetails(String id){
        try {
            List<Form_Page__c> pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:id ORDER BY Page_Number__c ASC];
            return pageList;
        } catch (Exception e) {
            // error_handler.insert_errordata(e,'previewFormcmp','formpagedetails');
            throw new AuraHandledException(e.getMessage());
        }
    }
}