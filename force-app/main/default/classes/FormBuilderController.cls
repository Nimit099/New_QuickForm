public with sharing class FormBuilderController {
   
    
        @AuraEnabled
        public static List<BaseField_mdt__mdt> GetFieldsMetaData(){
         try {
             List<BaseField_mdt__mdt> basefield = BaseField_mdt__mdt.getAll().values();
             return basefield;
         } catch (Exception e) {
             throw new AuraHandledException(e.getMessage());
         }
        }

        @AuraEnabled
        public static string UploadFormImage(String id, String body, String FName, String Type){
            try {
                Attachment a = new Attachment();
                Blob b = EncodingUtil.base64Decode(body);
                System.debug('body??'+body);                

                ContentVersion cv = new ContentVersion();
                cv.Title = FName;
                cv.PathOnClient = FName;
                System.debug('FName:- '+FName);
                System.debug(Type);
                cv.VersionData = b;
                cv.IsMajorVersion = true;
                Insert cv;

                Form__c nform = [SELECT id,Form_Styling__c FROM Form__c where Id = : id];

                System.debug(nform.Form_Styling__c);
                if (nform.Form_Styling__c == null) {
                    nform.Form_Styling__c = 'background-image:'+'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                }else {
                    List<String> lst = nform.Form_Styling__c.split(';');
                    Integer count = 0;
                    for (Integer i = 0; i < lst.size(); i++){
                        List<String> lst2 = lst[i].split(':');
                        if (lst2[0] == 'background-image') {
                            String fullFileURL = 'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                            lst2[1] = fullFileURL;
                            System.debug(lst[i]);
                            lst[i] = String.join(lst2, ':');
                            System.debug(lst[i]);
                            count++;
                            break;
                        }
                    }
                    if (count == 0) {
                        nform.Form_Styling__c += 'background-image:'+'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                    }else {
                        String fvalue = String.join(lst, ';');
                        nform.Form_Styling__c = fvalue;
                    }
                }
                    if ((nform.Form_Styling__c).substring(nform.Form_Styling__c.length()-1,nform.Form_Styling__c.length() ) != ';') {
                        nform.Form_Styling__c += ';';
                    }
                    update nform;
                return nform.Form_Styling__c;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }

        @AuraEnabled
        public static string UploadPageImage(String id, String body, String FName, String Type){
            try {
                Attachment a = new Attachment();
                Blob b = EncodingUtil.base64Decode(body);
                System.debug('body??'+body);                

                ContentVersion cv = new ContentVersion();
                cv.Title = FName;
                cv.PathOnClient = FName;
                System.debug('FName:- '+FName);
                System.debug(Type);
                cv.VersionData = b;
                cv.IsMajorVersion = true;
                Insert cv;

                Form__c nform = [SELECT id,Page_CSS__c FROM Form__c where Id = : id];
                String st = nform.Page_CSS__c;
                if (nform.Page_CSS__c == null) {
                    nform.Page_CSS__c = 'background-image:'+'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                }else {
                    List<String> lst = nform.Page_CSS__c.split(';');
                    Integer count = 0;
                    for (Integer i = 0; i < lst.size(); i++){
                        List<String> lst2 = lst[i].split(':');
                        if (lst2[0] == 'background-image') {
                            String fullFileURL = 'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                            lst2[1] = fullFileURL;
                            System.debug(lst[i]);
                            lst[i] = String.join(lst2, ':');
                            System.debug(lst[i]);
                            count++;
                            break;
                        }
                    }
                    if (count == 0) {
                        nform.Page_CSS__c += 'background-image:'+'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                    }else {
                        String fvalue = String.join(lst, ';');
                        nform.Page_CSS__c = fvalue;
                    }
                }
                    if ((nform.Page_CSS__c).substring(nform.Page_CSS__c.length()-1,nform.Page_CSS__c.length() ) != ';') {
                        nform.Page_CSS__c += ';';
                    }
                    update nform;
                return nform.Page_CSS__c;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
        

        @AuraEnabled
        // public static StylesWrapper GetStyles(String id){
        public static StylesWrapper GetStyles(String id){
            try {
                StylesWrapper sw = new StylesWrapper();
                sw.AlignmentProp = Alignment__mdt.getAll().values();
                sw.BgPositionProp = Background_position__mdt.getAll().values();
                sw.BgRepeatProp = Background_repeat__mdt.getAll().values();
                sw.BgsizeProp = Background_size__mdt.getAll().values();
                sw.BorderStylesProp=Border_styles__mdt.getAll().values();
                sw.FixPosProp = Fix_position__mdt.getAll().values();
                sw.FontProp = Font__mdt.getAll().values();
                sw.FontLineHeightProp = Font_Line_Height__mdt.getAll().values();
                sw.FontStyleProp = Font_Style__mdt.getAll().values();
                sw.FontWeightProp = Font_Weight__mdt.getAll().values();
                sw.FormDirectionProp = Form_Direction__mdt.getAll().values();
                return sw;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }

        @AuraEnabled
        public static string StoreLabelStyles(String Value, String id){
            String result = '';
            try {
                Form__c nform = [SELECT Id, Label_CSS__c FROM Form__c WHERE Id =: id];
                System.debug(nform.Label_CSS__c);
                System.debug('value>>'+Value);
                List<String> test = Value.split(';');
                List<String> prop = test[0].split(':');
                if (nform.Label_CSS__c == null) {
                    nform.Label_CSS__c = Value;
                }else {
                    List<String> lst = nform.Label_CSS__c.split(';');
                    Integer count = 0;
                    for (Integer i = 0; i < lst.size(); i++){
                        List<String> lst2 = lst[i].split(':');
                        if (lst2[0] == prop[0]) {
                            lst2[1] = prop[1];
                            System.debug(lst[i]);
                            lst[i] = String.join(lst2, ':');
                            System.debug(lst[i]);
                            count++;
                            break;
                        }
                    }
                    if (count == 0) {
                        nform.Label_CSS__c += Value;
                    }else {
                        String fvalue = String.join(lst, ';');
                        nform.Label_CSS__c = fvalue;
                    }
                }
                    if ((nform.Label_CSS__c).substring(nform.Label_CSS__c.length()-1,nform.Label_CSS__c.length() ) != ';') {
                        nform.Label_CSS__c += ';';
                    }
                    update nform;
                    // nform.All_Field_Styling__c = Value;
                    result = nform.Label_CSS__c;
                } catch (Exception e) {
                    result = e.getMessage();
                }
            return result;
        }

        @AuraEnabled
        public static string StoreFormStyles(String Value, String id){
            String result = '';
            try {
                Form__c nform = [SELECT Id, Form_Styling__c FROM Form__c WHERE Id =: id];
                String st = nform.Form_Styling__c;
                List<String> test = Value.split(';');
                List<String> prop = test[0].split(':');
                if (nform.Form_Styling__c == null) {
                    nform.Form_Styling__c = Value;
                }else {
                    List<String> lst = nform.Form_Styling__c.split(';');
                    Integer count = 0;
                    for (Integer i = 0; i < lst.size(); i++){
                        List<String> lst2 = lst[i].split(':');
                        if (lst2[0] == prop[0]) {
                            lst2[1] = prop[1];
                            System.debug(lst[i]);
                            lst[i] = String.join(lst2, ':');
                            System.debug(lst[i]);
                            count++;
                            break;
                        }
                    }
                    if (count == 0) {
                        nform.Form_Styling__c += Value;
                    }else {
                        String fvalue = String.join(lst, ';');
                        nform.Form_Styling__c = fvalue;
                    }
                }
                    if ((nform.Form_Styling__c).substring(nform.Form_Styling__c.length()-1,nform.Form_Styling__c.length() ) != ';') {
                        nform.Form_Styling__c += ';';
                    }
                    update nform;
                    result = nform.Form_Styling__c;
                } catch (Exception e) {
                    result = e.getMessage();
                }
            return result;
        }

        @AuraEnabled
        public static string StorePageStyles(String Value, String id){
            String result = '';
            try {
                Form__c nform = [SELECT Id, Page_CSS__c FROM Form__c WHERE Id =: id];
                String st = nform.Page_CSS__c;
                List<String> test = Value.split(';');
                List<String> prop = test[0].split(':');
                if (nform.Page_CSS__c == null) {
                    nform.Page_CSS__c = Value;
                }else {
                    List<String> lst = nform.Page_CSS__c.split(';');
                    Integer count = 0;
                    for (Integer i = 0; i < lst.size(); i++){
                        List<String> lst2 = lst[i].split(':');
                        if (lst2[0] == prop[0]) {
                            lst2[1] = prop[1];
                            System.debug(lst[i]);
                            lst[i] = String.join(lst2, ':');
                            System.debug(lst[i]);
                            count++;
                            break;
                        }
                    }
                    if (count == 0) {
                        nform.Page_CSS__c += Value;
                    }else {
                        String fvalue = String.join(lst, ';');
                        nform.Page_CSS__c = fvalue;
                    }
                }
                    if ((nform.Page_CSS__c).substring(nform.Page_CSS__c.length()-1,nform.Page_CSS__c.length() ) != ';') {
                        nform.Page_CSS__c += ';';
                    }
                    update nform;
                    // nform.Page_CSS__c = Value;
                    result = nform.Page_CSS__c;
                } catch (Exception e) {
                    result = e.getMessage();
                }
            return result;
        }

        @AuraEnabled
        public static String StoreStyles(String Value, String id){
            String result = '';
            try {
                Form__c nform = [SELECT Id, All_Field_Styling__c FROM Form__c WHERE Id =: id];
                System.debug(nform.All_Field_Styling__c);
                System.debug('value>>'+Value);
                List<String> test = Value.split(';');
                List<String> prop = test[0].split(':');
                if (nform.All_Field_Styling__c == null) {
                    nform.All_Field_Styling__c = Value;
                }else {
                    List<String> lst = nform.All_Field_Styling__c.split(';');
                    Integer count = 0;
                    for (Integer i = 0; i < lst.size(); i++){
                        List<String> lst2 = lst[i].split(':');
                        if (lst2[0] == prop[0]) {
                            lst2[1] = prop[1];
                            System.debug(lst[i]);
                            lst[i] = String.join(lst2, ':');
                            System.debug(lst[i]);
                            count++;
                            break;
                        }
                    }
                    if (count == 0) {
                        nform.All_Field_Styling__c += Value;
                    }else {
                        String fvalue = String.join(lst, ';');
                        nform.All_Field_Styling__c = fvalue;
                    }
                }
                    if ((nform.All_Field_Styling__c).substring(nform.All_Field_Styling__c.length()-1,nform.All_Field_Styling__c.length() ) != ';') {
                        nform.All_Field_Styling__c += ';';
                    }
                    update nform;
                    // nform.All_Field_Styling__c = Value;
                    result = nform.All_Field_Styling__c;
                } catch (Exception e) {
                    result = e.getMessage();
                }
            return result;
        }

        @AuraEnabled
        public static String StoreHoverStyles(String Value, String id){
            String result = '';
            try {
                Form__c nform = [SELECT Id, All_Field_Hover__c FROM Form__c WHERE Id =: id];
                System.debug(nform.All_Field_Hover__c);
                System.debug('value>>'+Value);
                List<String> test = Value.split(';');
                List<String> prop = test[0].split(':');
                if (nform.All_Field_Hover__c == null) {
                    nform.All_Field_Hover__c = Value;
                }else {
                    List<String> lst = nform.All_Field_Hover__c.split(';');
                    Integer count = 0;
                    for (Integer i = 0; i < lst.size(); i++){
                        List<String> lst2 = lst[i].split(':');
                        if (lst2[0] == prop[0]) {
                            lst2[1] = prop[1];
                            System.debug(lst[i]);
                            lst[i] = String.join(lst2, ':');
                            System.debug(lst[i]);
                            count++;
                            break;
                        }
                    }
                    if (count == 0) {
                        nform.All_Field_Hover__c += Value;
                    }else {
                        String fvalue = String.join(lst, ';');
                        nform.All_Field_Hover__c = fvalue;
                    }
                }
                    if ((nform.All_Field_Hover__c).substring(nform.All_Field_Hover__c.length()-1,nform.All_Field_Hover__c.length() ) != ';') {
                        nform.All_Field_Hover__c += ';';
                    }
                    update nform;
                    // nform.All_Field_Styling__c = Value;
                    result = nform.All_Field_Hover__c;
                } catch (Exception e) {
                    result = e.getMessage();
                }
            return result;
        }

 
        @AuraEnabled
        public static string getFormCSS(String id){
            Form__c nform = [SELECT Id, Form_Styling__c FROM Form__c WHERE Id =: id];
            System.debug(nform);
            System.debug('CSS->>>'+nform.Form_Styling__c);
            return nform.Form_Styling__c;
        }

        @AuraEnabled
        public static string getPageCSS(String id){
            Form__c nform = [SELECT Id, Page_CSS__c FROM Form__c WHERE Id =: id];
            System.debug(nform);
            System.debug('CSS->>>'+nform.Page_CSS__c);
            return nform.Page_CSS__c;
        }

        @AuraEnabled
        public static string getFieldCSS(String id){
            Form__c nform = [SELECT Id, All_Field_Styling__c FROM Form__c WHERE Id =: id];
            System.debug(nform);
            System.debug('CSS->>>'+nform.All_Field_Styling__c);
            return nform.All_Field_Styling__c;
        }

        @AuraEnabled
        public static string getLabelCSS(String id){
            Form__c nform = [SELECT Id, Label_CSS__c FROM Form__c WHERE Id =: id];
            System.debug(nform);
            System.debug('CSS->>>'+nform.Label_CSS__c);
            return nform.Label_CSS__c;
        }

        @AuraEnabled
        public static string getprogressbar(String id){
            try {
                Form__c nform = [SELECT Id,Progress_Indicator__c FROM Form__c WHERE Id =: id];
                return nform.Progress_Indicator__c;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
        @AuraEnabled
        public static string getcaptcha(String id){
            try {
                Form__c nform = [SELECT Id, Captcha_Type__c FROM Form__c WHERE Id =: id];
                return nform.Captcha_Type__c;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }

        //Method to get Field's Data
        @Auraenabled
        public static List<List<String>> getFields(String id){
            List<String> types= new List<String>();
            Form__c FormDetail = [SELECT Id, Mapped_Objects__c FROM Form__c WHERE Id=:id LIMIT 1];
            types = (FormDetail.Mapped_Objects__c).split(',');
            System.debug(types);
            List<List<String>> allFields = new List<List<String>>();
            for (String type : types) {
                Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
		        Schema.SObjectType leadSchema = schemaMap.get(type);
		        Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
		        List<String> Fields = new List<String>();
		        for (String fieldName: fieldMap.keySet()) {
                    if (fieldMap.get(fieldName).getDescribe().isUpdateable()){
                        System.debug('##Field API Name='+fieldName);// list of all field API name
                        Fields.add(fieldMap.get(fieldName).getDescribe().getLabel()+'./.'+ fieldMap.get(fieldName).getDescribe().getType());//It provides to get the object fields label.
                        //It provides to get the object fields label.
                    }
                }
                allFields.add(Fields);
            }
            System.debug(allFields);
            return allFields;
        }


        @AuraEnabled
        public static List<Form_Page__c> GetFormPage(String Form_Id){
         try {
             List<Form_Page__c> pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:Form_Id ORDER BY Page_Number__c ASC];
             return pageList;
         } catch (Exception e) {
             throw new AuraHandledException(e.getMessage());
         }
        }
        public class StylesWrapper{
            @AuraEnabled
            public list<Alignment__mdt> AlignmentProp{get; set;}
            @AuraEnabled
            public list<Background_position__mdt> BgPositionProp{get; set;}
            @AuraEnabled
            public list<Background_repeat__mdt> BgRepeatProp{get;set;}
            @AuraEnabled
            public list<Background_size__mdt> BgsizeProp{get;set;}
            @AuraEnabled
            public list<Border_styles__mdt> BorderStylesProp{get;set;}
            @AuraEnabled
            public list<Fix_position__mdt> FixPosProp{get;set;}
            @AuraEnabled
            public list<Font__mdt> FontProp{get;set;}
            @AuraEnabled
            public list<Font_Line_Height__mdt> FontLineHeightProp{get;set;}
            @AuraEnabled
            public list<Font_Style__mdt> FontStyleProp{get;set;}
            @AuraEnabled
            public list<Font_Weight__mdt> FontWeightProp{get;set;}
            @AuraEnabled
            public list<Form_Direction__mdt> FormDirectionProp{get;set;}
    
        }

        @AuraEnabled
        public static List<Form_Fields__c> CreateFieldRecord(String Form_Id,String Name,String Form_Page_Id,Integer Position,boolean isold){
            try {
                boolean nimit=true;
                if(nimit==true){
                 
                Form_Fields__c field = new Form_Fields__c();
                List<Form_Fields__c> updateList= new List<Form_Fields__c>();
                
                List<Form_Fields__c> fieldList=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];
                for(Form_Fields__c it: fieldList){
                    if(it.Field_Order__c > Position){
                        if(isold){
                          if(it.Id == Name)  {
                            it.Field_Order__c = Position+1;
                          }
                          else{
                            it.Field_Order__c = it.Field_Order__c+1;
                          }
                        }
                        else{
                            it.Field_Order__c = it.Field_Order__c+1;
                        }
                     
                       updateList.add(it);
                    }
                }
                if(!updateList.isEmpty()){
                    update updateList;
                }
                if(!isold){
                field.Name= Name;
                field.Form__c =  Form_Id;
                field.Form_Page__c = Form_Page_Id;
                field.Field_Order__c = Position+1;
                insert field;}
            nimit=false;
               fieldList=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];
            return fieldList;
          
        }
        else return null;
                
                //System.debug('5');
//                      Form_Fields__c field = new Form_Fields__c(Name= 'Account2',Form__c =  'a0B1y00000013pXEAQ',Form_Page__c = 'a091y000004uuFeAAI');
//                 // field.Name= 'Account2';
//                 // field.Form__c =  'a0B1y00000013pXEAQ';
//                 // field.Form_Page__c = 'a091y000004uuFeAAI';
//                // field.Field_Order__c = 2;
// insert field1;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }
        @AuraEnabled
        public static List<Form_Fields__c> getFieldsRecords(){
            try {
                List<Form_Fields__c> fieldList=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c];
                return fieldList;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }

        
     }