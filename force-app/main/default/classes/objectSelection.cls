public with sharing class objectSelection {
    public objectSelection() {
        
    }

    @AuraEnabled
    public static List<String> fetchParentObject(){         
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe(); 
        Set<String> Objects = new Set<String>();
        for(Schema.SObjectType d : gd.values()){
            Schema.DescribeSObjectResult ds = d.getDescribe();
            if(!ds.isCreateable())
                continue;
            if(ds.isCustom() == false && ds.getRecordTypeInfos().size() > 0)
                Objects.add(ds.getName());
            else if(ds.isCustom())
                Objects.add(ds.getName());
        }
        List<String> ParentObjs = new List<String>(Objects);
        ParentObjs.sort();
        for(String name : ParentObjs)
            System.debug('Parent object: ' + name);

        System.debug('Total Objects : '+ (ParentObjs.size()));
        return ParentObjs;

    }

    @AuraEnabled
    public static List<String> fetchChildObject(String parent){  
        List<string> SObjectList = new List<string>();
        Schema.SObjectType convertType = Schema.getGlobalDescribe().get(parent);
        Schema.DescribeSObjectResult R = convertType.getDescribe();
        for (Schema.ChildRelationship cr: R.getChildRelationships())
        {
            String temp = String.valueOf(cr.getChildSObject());
            SObjectList.add(temp);
        }
        return SObjectList;
    }

    @AuraEnabled
    public static Map<String,List<String>> fetchChildObject1(List<String> parentList){
        // Set<String> parent = new Set<String>();
        // parent.addAll(parentList);
        Map<String,List<String>> SObjectMap = new Map<String,List<String>>();
        for (String Par : parentList){    
            List<String> Sobject2 = new List<String>();     
            Schema.SObjectType convertType = Schema.getGlobalDescribe().get(Par);
            Schema.DescribeSObjectResult R = convertType.getDescribe();
            for (Schema.ChildRelationship cr: R.getChildRelationships())
            {
                // String temp = String.valueOf(cr.getChildSObject());
                // if (parent.contains(temp)){
                //    Sobject2.add(temp);
                // }
                // if (parentList.contains(String.valueOf(cr.getChildSObject()))){
                //    Sobject2.add(String.valueOf(cr.getChildSObject()));
                // }
                if (parentList.contains(String.valueOf(cr.getChildSObject()))){
                
                    if(!SObjectMap.containsKey(Par)){
                        SObjectMap.put(Par,new List<String>());
                    }
                    SObjectMap.get(par).add(String.valueOf(cr.getChildSObject()));
                }
            }
            // SObjectMap.put(Par,Sobject2);
        
        }
        System.debug('SObjectMap>>'+SObjectMap);
        return SObjectMap;

    }   

    @AuraEnabled
    public static List<String> temp2(List<String> Parent)
    {
        List<String> Temp2 = new List<String>();
        List<String> Test = new List<String>();
        // Test = Parent;
        Map<String,List<String>> ParentObjects = new Map<String,List<String>>();
        ParentObjects = fetchChildObject1(Parent);
        for (String lst : ParentObjects.keySet()){
            if((ParentObjects.get(lst)).size() >= 1){
                Temp2.add(lst);
            }
        }  
        return Temp2; 
    }

    @AuraEnabled
    public static List<String> temp3(List<String> Parent)
    {
        List<String> Temp3 = new List<String>();
        List<String> Test = new List<String>();
        // Test = fetchParentObject();
        Test = Parent;
        Map<String,List<String>> ParentObjects = new Map<String,List<String>>();
        ParentObjects = fetchChildObject1(Test);
        for (String lst : ParentObjects.keySet()){
            if((ParentObjects.get(lst)).size() >= 2){
                Temp3.add(lst);
            }
        }
        return Temp3;
    }

// Set<String> Test = new Set<String>();
// Test = fetchParentObject();
// System.debug(Test);
// Map<String,List<String>> ParentObjects = new Map<String,List<String>>();
// ParentObjects = fetchChildObject1(Test);
// System.debug(ParentObjects);
// List<String> Temp2 = new List<String>();
// List<String> Temp3 = new List<String>();
// for (String lst : ParentObjects.keySet()){
//     if((ParentObjects.get(lst)).size() >= 1){
//         Temp2.add(lst);
//     }
//     if((ParentObjects.get(lst)).size() >= 2){
//         Temp3.add(lst);
//     }
// }
// System.debug(Temp2);
// System.debug(Temp2.size());
// System.debug(Temp3);
// System.debug(Temp3.size());












    @AuraEnabled
    public static String saveMapped_object(String Mapped_Objects, String FormTitle, String FormDesc,String ProgressIndicator,String CaptchaType){
        try {
            Form__c form = new Form__c(Name = FormTitle, Mapped_Objects__c = Mapped_Objects, Captcha_Type__c = CaptchaType, Form_Description__c = FormDesc, Progress_Indicator__c = ProgressIndicator);
            Database.insert(form);
            List<String> lst = Mapped_Objects.split(',');
            System.debug(form.Id);
            List<Form_Page__c> FormPages = new List<Form_Page__c>();
            for (String obj : lst) {
                Form_Page__c Fpage = new Form_Page__c(Name = obj+'Page', Form__c = form.Id, Page_Number__c = 1);
                FormPages.add(Fpage);
            }
            Database.insert(FormPages);
            return form.Id;
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