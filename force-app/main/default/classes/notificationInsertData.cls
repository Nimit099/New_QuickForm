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
            System.debug(acc.To_Recipients__c);
            System.debug(acc.CC_Recipients__c);
            System.debug(acc.Subject__c);
            System.debug(acc.Email_Body__c);
           insert acc;

        } catch (Exception e) {
            System.debug('error --> '+e);
        }
    }
    @AuraEnabled
    public static void updated(Notification__c updatelist){
        System.debug('list :- ' + updatelist);
        try{
            System.debug('test :- '+updatelist.Id );
            List<Notification__c> records = [SELECT Id FROM Notification__c WHERE Id =: updatelist.Id ];
            for (Notification__c record : records)
            {
                record.To_Recipients__c = updatelist.To_Recipients__c;
                System.debug('To_Recipients__c :- '+updatelist.To_Recipients__c);
                record.CC_Recipients__c = updatelist.CC_Recipients__c;
                record.Subject__c = updatelist.Subject__c;
                record.Email_Body__c = updatelist.Email_Body__c;
                record.Attachment__c = updatelist.Attachment__c;
            }
            update records;

        }
        catch (Exception e) {
            System.debug('error --> '+e);
        }
        
        // try {
        //     System.debug('yasj '+ updatelist);
        //     System.debug(acc.To_Recipients__c);
        //     System.debug(acc.CC_Recipients__c);
        //     System.debug(acc.Subject__c);
        //     System.debug(acc.Email_Body__c);
        //     update updatelist;

        // } catch (Exception e) {
        //     System.debug('error --> '+e);
        // }
    }
    @AuraEnabled(cacheable=true)
    public static List<Notification__c> getContactList(String form_id){
        System.debug('test log to get data');
        List<Notification__c> testnew = [SELECT Id,Attachment__c, CC_Recipients__c, Email_Body__c, To_Recipients__c,Subject__c FROM Notification__c WHERE Form__c =: form_id];
        System.debug(testnew);
        return testnew;
        // return[
        //     SELECT Id,Attachment__c, CC_Recipients__c, Email_Body__c, To_Recipients__c,Subject__c FROM Notification__c WHERE Form__c =: form_id
        // ];
    }
}