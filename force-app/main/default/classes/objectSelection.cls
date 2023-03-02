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
            String Styles = 'width:100%;padding-top:0%;padding-bottom:0%;padding-left:0%;padding-right:0%;background-color:#FFFFFF;background-size:auto;background-position:top center;background-repeat:Repeat;background-attachment:Fixed;';
            String PageStyle = 'padding-top:0%;padding-bottom:0%;background-color:#FFFFFF;background-size:auto;background-position:top center;background-repeat:Repeat;background-attachment:Fixed;border-color:#000000;border-style:solid;border-width:1px;border-radius:0px;';
            String FieldStyle = 'background-color:#FFFFFF;border-color:#000000;border-style:Solid;border-width:1px;border-radius:5px;font-family:Arial;font-weight:Normal;color:#242424;font-size:12px;font-style:Normal;padding-left:5%px;padding-right:0px;padding-top:0px;padding-bottom:0px;';
            String HoverStyle = 'background-color:#FFFFFF;border-color:#000000;border-style:Solid;border-width:1px;border-radius:5px;font-family:Arial;font-weight:Normal;color:#242424;font-size:12px;font-style:Normal;padding-left:5%px;padding-right:0px;padding-top:0px;padding-bottom:0px;';
            String FocusStyle = 'background-color:#FFFFFF;border-color:#000000;border-style:Solid;border-width:1px;border-radius:5px;font-family:Arial;font-weight:Normal;color:#242424;font-size:12px;font-style:Normal;padding-left:5%px;padding-right:0px;padding-top:0px;padding-bottom:0px;';
            String LabelStyle = '';   
            String ButtonStyle = ' background-color: #6699CC;border-color:#FFFFFF; height: 35px; width: 120px; font-size: 16px; border-width:0px; border-style:Solid; border-radius: 28px; font-family:Arial;font-weight:Normal;color:#FFFFFF;font-style:Normal;padding-left:5%px;padding-right:0px;padding-top:0px;padding-bottom:0px;';         
            Form__c form = new Form__c(Name = FormTitle, Mapped_Objects__c = Mapped_Objects, Captcha_Type__c = CaptchaType, Form_Description__c = FormDesc, Progress_Indicator__c = ProgressIndicator, Form_Styling__c = Styles, All_Field_Styling__c = FieldStyle, Page_CSS__c = PageStyle, All_Field_Focus__c = FocusStyle, All_Field_Hover__c = HoverStyle, Button_CSS__c = ButtonStyle, Button_Position__c = 'justify-content:center');
            Database.insert(form);
            List<String> lst = Mapped_Objects.split(',');
            System.debug(form.Id);
            List<Form_Page__c> FormPages = new List<Form_Page__c>();
            Integer pageNum = 1;
            for (String obj : lst) {
                Form_Page__c Fpage = new Form_Page__c(Name = obj+' Page', Form__c = form.Id, Page_Number__c = pageNum);
                FormPages.add(Fpage);
                pageNum++;
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