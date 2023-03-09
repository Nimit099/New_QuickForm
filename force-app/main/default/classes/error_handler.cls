public with sharing class error_handler {
    public Static String class_name = '';
    public Static String method_name = '';
    public static void insert_errordata(Exception e,String classname, String methodname) {
        // String className = e.getStackTraceString();
        System.debug('getStackTraceString ==>' +e.getStackTraceString());
        System.debug('getLineNumber ==> '+e.getLineNumber());
        System.debug('getMessage ==> '+e.getMessage());
        System.debug('getTypeName ==> '+e.getTypeName());
        System.debug('getCause ==> '+e.getCause());

        class_name = classname;
        method_name = methodname;

        Error_Handler__c error = new Error_Handler__C();
        
        error.Exception_Message__c = e.getMessage();
        error.Exception_Type__c = e.getTypeName();
        error.Line_Number__c = String.valueOf(e.getLineNumber());
        error.More_Details__c = e.getStackTraceString();
        error.Class_Name__c = class_name;
        error.Method_Name__c = method_name;

        insert error;
    }
}