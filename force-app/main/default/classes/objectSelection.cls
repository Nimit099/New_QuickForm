public with sharing class objectSelection {
    public objectSelection() {

    }

    @AuraEnabled
    public static List<String> fetchParentObject(){   
        System.debug('1');      
        List<string> SObjectList = new List<string>();
        for(Schema.SObjectType sObj : schema.getGlobalDescribe().values()){
            if(sObj.getDescribe().isUpdateable() && sObj.getDescribe().isAccessible()){
                sObjectList.add(sObj.getDescribe().getName());
            }
        }
        // System.debug('Obj = '+SObjectList);
        System.debug(SObjectList);
        return SObjectList;
    }

    @AuraEnabled
    public static List<String> fetchChildObject1(String parent){  
        System.debug(parent);
        List<string> SObjectList = new List<string>();
        System.debug('Parent = '+parent);      
        Schema.SObjectType convertType = Schema.getGlobalDescribe().get(parent);
        Schema.DescribeSObjectResult R = convertType.getDescribe();
        for (Schema.ChildRelationship cr: R.getChildRelationships())
        {
            String temp = String.valueOf(cr.getChildSObject());
            SObjectList.add(temp);
            System.debug('====child object==='+cr.getChildSObject());
        }
        return SObjectList;
    }

    @AuraEnabled
    public static void saveMapped_object(String Mapped_Objects, Id Id){
        try {
            Form__c form = new Form__c(Id = Id, Name = 'Account Form', Mapped_Objects__c = Mapped_Objects);
            Database.upsert(form);
            System.debug(form.Id);
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    // fetchobjectField();
    // public void childObject(){
    //     Schema.DescribeSObjectResult R = Account.SObjectType.getDescribe();
    //     for (Schema.ChildRelationship cr: R.getChildRelationships()) {
    //         System.debug('====child object=='+cr.getChildSObject());
    //     }
    // }
}