public with sharing class notificationInsertData {
    @AuraEnabled
    public static void create(Notification__c acc){
        try {
            System.debug('yasj '+ acc);
            // Notification__c acc = new Notification__c();
            // System.debug('toAddress :- '+a_toAddress);
            // System.debug('ccAddress:-'+a_ccAddress);
            // System.debug('Subject:- '+a_Subject);
            // System.debug('Message:- '+a_Message);
            // acc.To_Recipients__c  = a_toAddress;
            // acc.CC_Recipients__c = a_ccAddress;
            // acc.Subject__c = a_Subject;
            // acc.Email_Body__c = Message;
            // System.debug(acc.To_Recipients__c);
            // System.debug(acc.CC_Recipients__c);
            // System.debug(acc.Subject__c);
            // System.debug(acc.Email_Body__c);
        //    insert acc;

        } catch (Exception e) {
            System.debug('error --> '+e);
        }
    }
}