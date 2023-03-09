public without sharing class objectSelection {
    public objectSelection() {
    }

    @AuraEnabled
    public static List<String> fetchParentObject(){         
        Map<String, Schema.SObjectType> gd = Schema.getGlobalDescribe(); 
        Set<String> QFObjects = new Set<String>();
        List<QFObjects__mdt> metadataRecords = [SELECT Label FROM QFObjects__mdt];
        for (QFObjects__mdt record : metadataRecords) {
            QFObjects.add(record.Label);
        }

        Set<String> Objects = new Set<String>();
        for(Schema.SObjectType d : gd.values()){
            Schema.DescribeSObjectResult ds = d.getDescribe();
            if(!ds.isCreateable())
                continue;
            if(ds.isCustom() == false && ds.getRecordTypeInfos().size() > 0 && !(QFObjects.contains(ds.getName())))
                Objects.add(ds.getName());
            else if(ds.isCustom() && !(QFObjects.contains(ds.getName())))
                Objects.add(ds.getName());
        }
        List<String> ParentObjs = new List<String>(Objects);
        ParentObjs.sort();
        return ParentObjs;
    }

    @AuraEnabled
    public static List<String> fetchChildObject(String parent){  
        Set<string> SObjectList = new Set<string>();
        Schema.SObjectType convertType = Schema.getGlobalDescribe().get(parent);
        Schema.DescribeSObjectResult R = convertType.getDescribe();
        for (Schema.ChildRelationship cr: R.getChildRelationships())
        {
            String temp = String.valueOf(cr.getChildSObject());
            SObjectList.add(temp);
        }
        List<String> ChildObject = new List<String>(SObjectList);
        return ChildObject;
    }

    @AuraEnabled
    public static Map<String,List<String>> fetchChildObject1(List<String> parentList){
        Map<String,List<String>> SObjectMap = new Map<String,List<String>>();
        for (String Par : parentList){    
            List<String> Sobject2 = new List<String>();     
            Schema.SObjectType convertType = Schema.getGlobalDescribe().get(Par);
            Schema.DescribeSObjectResult R = convertType.getDescribe();
            for (Schema.ChildRelationship cr: R.getChildRelationships())
            {
                if (parentList.contains(String.valueOf(cr.getChildSObject()))){
                    if(!SObjectMap.containsKey(Par)){
                        SObjectMap.put(Par,new List<String>());
                    }
                    SObjectMap.get(par).add(String.valueOf(cr.getChildSObject()));
                }
            }
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



    @AuraEnabled
    public static String saveMapped_object(String Mapped_Objects, String FormTitle, String FormDesc,String ProgressIndicator,String CaptchaType){
        try {
            String Styles = 'width:100%;padding-top:0%;padding-bottom:0%;padding-left:0%;padding-right:0%;background-color:#FFFFFF;background-size:auto;background-position:top center;background-repeat:Repeat;background-attachment:Fixed;';
            String PageStyle = 'padding-top:0%;padding-bottom:0%;background-color:#FFFFFF;background-size:auto;background-position:top center;background-repeat:Repeat;background-attachment:Fixed;border-color:#000000;border-style:Solid;border-width:1px;border-radius:0px;';
            String FieldStyle = 'background-color:#FFFFFF;border-color:#000000;border-style:Solid;border-width:1px;border-radius:5px;font-family:Arial;font-weight:Normal;color:#242424;font-size:12px;font-style:Normal;padding-left:5%px;padding-right:0px;padding-top:0px;padding-bottom:0px;line-height:1.5;';
            String HoverStyle = 'background-color:#FFFFFF;border-color:#000000;border-style:Solid;border-width:1px;border-radius:5px;font-family:Arial;font-weight:Normal;color:#000000;font-size:12px;font-style:Normal;padding-left:5%px;padding-right:0px;padding-top:0px;padding-bottom:0px;line-height:1.5;';
            String FocusStyle = 'background-color:#FFFFFF;border-color:#000000;border-style:Solid;border-width:1px;border-radius:5px;font-family:Arial;font-weight:Normal;color:#000000;font-size:12px;font-style:Normal;padding-left:5%px;padding-right:0px;padding-top:0px;padding-bottom:0px;line-height:1.5;';
            String LabelStyle = 'justify-content:Left;font-family:Arial;font-weight:Normal;font-style:Normal;font-size:12px;line-height:1;color:#000000;margin-top:0px;margin-bottom:0px;';
            String ButtonStyle = ' background-color: #6699CC;border-color:#FFFFFF; height: 35px; width: 120px; font-size: 16px; border-width:0px; border-style:Solid; border-radius: 28px; font-family:Arial;font-weight:Normal;color:#FFFFFF;font-style:Normal;padding-left:5%px;padding-right:0px;padding-top:0px;padding-bottom:0px;';
            Form__c form = new Form__c(Name = FormTitle, Mapped_Objects__c = Mapped_Objects, Captcha_Type__c = CaptchaType, Form_Description__c = FormDesc, Progress_Indicator__c = ProgressIndicator, Form_Styling__c = Styles, All_Field_Styling__c = FieldStyle, Page_CSS__c = PageStyle, Label_CSS__c = LabelStyle, All_Field_Focus__c = FocusStyle, All_Field_Hover__c = HoverStyle, Button_CSS__c = ButtonStyle, Button_Position__c = 'justify-content:Center;gap:0px;');
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

            Thankyou_Page__c thankyoupage = new Thankyou_Page__c(
                Name = form.Name,
                Form__c = form.Id,
                Thankyou_Page_Type__c = 'None'
            );
            insert thankyoupage;
            return form.Id;
        } catch (Exception e) {
            error_handler.insert_errordata(e,'objectSelection','saveMapped_object');
            System.debug(e.getMessage());
            throw new AuraHandledException(e.getMessage());
        }
    }


}