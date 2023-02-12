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

    //Method to get Field's Data
    @Auraenabled
    public static List<List<String>> getFields(String id){
        List<String> types= new List<String>();
        Form__c FormDetail = [SELECT Id, Mapped_Objects__c FROM Form__c WHERE Id=:id LIMIT 1];
        //List<Form_Page__c> pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:Form_Id ORDER BY Page_Number__c ASC];
        types = (FormDetail.Mapped_Objects__c).split(',');
        System.debug(types);
        List<List<String>> allFields = new List<List<String>>();
        List<List<String>> allReqiredFields= new List<List<String>>();
        List<Form_Fields__c> FieldList = new List<Form_Fields__c>();

        for (String type : types) {
            Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
            Schema.SObjectType leadSchema = schemaMap.get(type);
            Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
            List<String> Fields = new List<String>();
            Set<String> compoundFields = new Set<String>(); 
            Integer Position = 0;
            for (String fieldName: fieldMap.keySet()) {
                if (fieldMap.get(fieldName).getDescribe().isUpdateable() && fieldMap.get(fieldName).getDescribe().isNillable()==true){
                    // list of all field API name
                    System.debug(fieldMap.get(fieldName).getDescribe().getCompoundFieldName()+'===> getfields');
                    if(fieldMap.get(fieldName).getDescribe().getCompoundFieldName()==null)
                    {Fields.add(fieldMap.get(fieldName).getDescribe().getLabel()+'./.'+ fieldMap.get(fieldName).getDescribe().getType());}//It provides to get the object fields label.
                    //It provides to get the object fields label.
                    else{
                          String temp = fieldMap.get(fieldName).getDescribe().getCompoundFieldName();
                          String type1='';
                           boolean hasAddress = temp.Contains('Address');
                           if(hasAddress){
                            type1 = 'QFADDRESS';
                           }
                        compoundFields.add(temp+'./.'+type1);
                    }
                }
                
            }
            Fields.addAll(compoundFields);
            allFields.add(Fields);
        }
        // if(!FieldList.isEmpty()){
        //     insert FieldList;
        // }
        System.debug(allFields);

        return allFields;
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

                Form__c nform = [SELECT id,Form_Styling__c, FormBgID__c FROM Form__c where Id = : id];

                System.debug(nform.Form_Styling__c);
                String fullFileURL;
                String URL ='/sfc/servlet.shepherd/version/download/'+cv.id;
                if (nform.Form_Styling__c == null) {
                    nform.Form_Styling__c = 'background-image:'+'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                }else {
                    List<String> lst = nform.Form_Styling__c.split(';');
                    Integer count = 0;
                    for (Integer i = 0; i < lst.size(); i++){
                        List<String> lst2 = lst[i].split(':');
                        if (lst2[0] == 'background-image') {
                            fullFileURL = 'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                            lst2[1] = fullFileURL;
                            System.debug(lst[i]);
                            lst[i] = String.join(lst2, ':');
                            System.debug(lst[i]);
                            count++;
                            break;
                        }
                    }
                    if (count == 0) {
                        fullFileURL = 'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                        nform.Form_Styling__c += 'background-image:'+fullFileURL;
                    }else {
                        String fvalue = String.join(lst, ';');
                        nform.Form_Styling__c = fvalue;
                    }
                }
                    if ((nform.Form_Styling__c).substring(nform.Form_Styling__c.length()-1,nform.Form_Styling__c.length() ) != ';') {
                        nform.Form_Styling__c += ';';
                    }
                    nform.FormBgID__c = cv.id;
                    update nform;
                return nform.Form_Styling__c+','+URL;
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

                Form__c nform = [SELECT id,Page_CSS__c, PageBgID__c FROM Form__c where Id = : id];
                System.debug(nform.Page_CSS__c);
                String fullFileURL;
                String URL ='/sfc/servlet.shepherd/version/download/'+cv.id;
                if (nform.Page_CSS__c == null) {
                    nform.Page_CSS__c = 'background-image:'+'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                }else {
                    List<String> lst = nform.Page_CSS__c.split(';');
                    Integer count = 0;
                    for (Integer i = 0; i < lst.size(); i++){
                        List<String> lst2 = lst[i].split(':');
                        if (lst2[0] == 'background-image') {
                            fullFileURL = 'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                            lst2[1] = fullFileURL;
                            System.debug(lst[i]);
                            lst[i] = String.join(lst2, ':');
                            System.debug(lst[i]);
                            count++;
                            break;
                        }
                    }
                    if (count == 0) {
                        fullFileURL = 'url("/sfc/servlet.shepherd/version/download/'+cv.id+'")';
                        nform.Page_CSS__c += 'background-image:'+fullFileURL;
                    }else {
                        String fvalue = String.join(lst, ';');
                        nform.Page_CSS__c = fvalue;
                    }
                }
                    if ((nform.Page_CSS__c).substring(nform.Page_CSS__c.length()-1,nform.Page_CSS__c.length() ) != ';') {
                        nform.Page_CSS__c += ';';
                    }
                    nform.PageBgID__c = cv.id;
                    update nform;
                return nform.Page_CSS__c+','+URL;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }

        @AuraEnabled
        public static string RemoveFormImage(String id){
            try {
                Form__c nform = [SELECT id,Form_Styling__c, FormBgID__c FROM Form__c where Id = : id];
                ContentVersion cv = [SELECT Id,ContentDocumentId FROM ContentVersion WHERE Id = :nform.FormBgID__c];
                ContentDocument cd = [SELECT Id FROM ContentDocument WHERE Id =:cv.ContentDocumentId];
                delete cd;
                nform.FormBgID__c = null;
                String str = nform.Form_Styling__c;
                List<String> Arr = str.split(';background-image:');
                List<string> Arr2 = Arr[1].split(';');
                Arr2.remove(0);
                Arr[1] = String.join(Arr2, ';');

                str = String.join(Arr, ';');
                nform.Form_Styling__c = str;
                nform.FormBgID__c = null;
                update nform;
                return nform.Form_Styling__c;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }

        @AuraEnabled
        public static string RemovePageImage(String id){
            try {
                Form__c nform = [SELECT id, Page_CSS__c, PageBgID__c FROM Form__c where Id = : id];
                ContentVersion cv = [SELECT Id,ContentDocumentId FROM ContentVersion WHERE Id = :nform.PageBgID__c];
                ContentDocument cd = [SELECT Id FROM ContentDocument WHERE Id =:cv.ContentDocumentId];
                delete cd;
                nform.FormBgID__c = null;
                String str = nform.Page_CSS__c;
                List<String> Arr = str.split(';background-image:');
                List<string> Arr2 = Arr[1].split(';');
                Arr2.remove(0);
                Arr[1] = String.join(Arr2, ';');

                str = String.join(Arr, ';');
                nform.Page_CSS__c = str;
                nform.PageBgID__c = null;
                update nform;
                return nform.Page_CSS__c;
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
                String st = nform.All_Field_Styling__c;
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
                    result = nform.All_Field_Styling__c;
                } catch (Exception e) {
                    result = e.getMessage();
                }
            return result;
        }

        @AuraEnabled
        public static string getBGImages(String id){
            try {
                Form__c nform = [SELECT Id, FormBgID__c, PageBgID__c FROM Form__c WHERE Id =: id];
                String str = '/sfc/servlet.shepherd/version/download/'+nform.FormBgID__c+','+'/sfc/servlet.shepherd/version/download/'+nform.PageBgID__c;
                return str;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
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
        public static String StoreFocusStyles(String Value, String id){
            String result = '';
            try {
                Form__c nform = [SELECT Id, All_Field_Focus__c FROM Form__c WHERE Id =: id];
                System.debug(nform.All_Field_Focus__c);
                System.debug('value>>'+Value);
                List<String> test = Value.split(';');
                List<String> prop = test[0].split(':');
                if (nform.All_Field_Focus__c == null) {
                    nform.All_Field_Focus__c = Value;
                }else {
                    List<String> lst = nform.All_Field_Focus__c.split(';');
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
                        nform.All_Field_Focus__c += Value;
                    }else {
                        String fvalue = String.join(lst, ';');
                        nform.All_Field_Focus__c = fvalue;
                    }
                }
                    if ((nform.All_Field_Focus__c).substring(nform.All_Field_Focus__c.length()-1,nform.All_Field_Focus__c.length() ) != ';') {
                        nform.All_Field_Focus__c += ';';
                    }
                    update nform;
                    // nform.All_Field_Styling__c = Value;
                    result = nform.All_Field_Focus__c;
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
            try {
                Form__c nform = [SELECT Id, All_Field_Styling__c FROM Form__c WHERE Id =: id];
                System.debug(nform);
                System.debug('CSS->>>'+nform.All_Field_Styling__c);
                return nform.All_Field_Styling__c;
            } catch (Exception e) {
                throw new AuraHandledException(e.getMessage());
            }
        }

        @AuraEnabled
        public static string getHoverCSS(String id){
            Form__c nform = [SELECT Id, All_Field_Hover__c FROM Form__c WHERE Id =: id];
            System.debug(nform);
            System.debug('CSS->>>'+nform.All_Field_Hover__c);
            return nform.All_Field_Hover__c;
        }

        @AuraEnabled
        public static string getFocusCSS(String id){
            Form__c nform = [SELECT Id, All_Field_Focus__c FROM Form__c WHERE Id =: id];
            System.debug(nform);
            System.debug('CSS->>>'+nform.All_Field_Focus__c);
            return nform.All_Field_Focus__c;
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
    public static List<Scale_Rating__mdt> getScaleRating(){
        try {
            return Scale_Rating__mdt.getAll().values();
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Form_Fields__c> CreateFieldRecord(String Form_Id,String Name,String Form_Page_Id,Decimal Position,boolean isold,String Field_Page_Id){
        try {
            boolean nimit=true;
            if(nimit==true){
              
             System.debug('old page id-->'+Form_Page_Id);
            Form_Fields__c field = new Form_Fields__c();
            List<Form_Fields__c> updateList= new List<Form_Fields__c>();
            
            List<Form_Fields__c> fieldList=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Form_Page__c=:Form_Page_Id ORDER BY Field_Order__c ASC ];
             if(Field_Page_Id!=''){
                Form_Fields__c field_which_page_changed = [SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Id=:Name ORDER BY Field_Order__c ASC ];
                field_which_page_changed.Form_Page__c = Form_Page_Id;
                update field_which_page_changed;
             }
            for(Form_Fields__c it: fieldList){
                if(it.Field_Order__c > Position){
                    if(isold){
                        System.debug(it.Id);
                        System.debug(Name);
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
            string form = [SELECT Mapped_Objects__c from Form__c WHERE Id=:Form_Id].Mapped_Objects__c;
            List<String> Objects = form.split(',');
            List<String> label  = Name.split(',');
            String firstLabel = label[0];
            System.debug(firstLabel);
            for (String type : Objects) {
                Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
                Schema.SObjectType leadSchema = schemaMap.get(type);
                Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
                List<String> Fields = new List<String>();
                for (String fieldName: fieldMap.keySet()) {
                    if (fieldMap.get(fieldName).getDescribe().isUpdateable()){
                     
                       if(fieldMap.get(fieldName).getDescribe().getLabel()==firstLabel){
                        System.debug('##Field API Name='+fieldName);// list of all field API na
                        System.debug('type:=>'+type);
                        field.Mapped_Obj__c = type;
                        field.Field_Mapping__c = fieldName;
                       }
                  
                         
                    }
                }
            }
            if(Position==0){
              Form_Fields__c maxPostion =   [SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c DESC LIMIT 1 ];
              if(maxPostion !=null){
                Position = maxPostion.Field_Order__c;
              }  
            }
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
   public static pageWrapper addPageBreak(Id FormId,String Name,String Form_Page_Id,Integer Position,String TargetedFeild){
    try {
        List<Form_Page__c> allPages= [SELECT id from Form_Page__c];
        Integer total_pages = allPages.size()+1;
        Form_Page__c newFormPage= new Form_Page__c();
        System.debug(FormId);
        System.debug('debugsss-->>');
        System.debug(Name);
        newFormPage.Form__c = FormId;
        newFormPage.Name = 'New Form';
        newFormPage.Page_Number__c = total_pages;
        insert newFormPage;

        String newId =  [SELECT Id From Form_Page__c where Page_Number__c=: total_pages].Id;
        if(Position!=0){
            List<Form_Fields__c> updateList= new List<Form_Fields__c>();
        List<Form_Fields__c> formFields = [SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c WHERE Form_Page__c=:Form_Page_Id ORDER BY Field_Order__c ASC ];
        for(Form_Fields__c it: formFields){
         if(it.Field_Order__c>Position){
            it.Form_Page__c = newId;
            updateList.add(it);
         }
        }
        update updateList;
        formFields=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];
        pageWrapper pw = new pageWrapper();
        pw.fieldList = formFields;
        pw.pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:FormId ORDER BY Page_Number__c ASC];
        return pw;
        
    }
        return null;
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
   }
   public class pageWrapper{
    @AuraEnabled
    public list<Form_Fields__c> fieldList{get; set;}
    @AuraEnabled
    public list<Form_Page__c> pageList{get; set;}}

    @AuraEnabled
    public static String ObjName(String id){
        try {
            Form__c nform = [SELECT Id, Mapped_Objects__c FROM Form__c WHERE Id = :id];
            return nform.Mapped_Objects__c;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


    @AuraEnabled
    public static List<Form_Fields__c> getFieldsRecords(Id id){
        try {
            //string form = [SELECT Mapped_Objects__c from Form__c WHERE Id=:id].Mapped_Objects__c;
           // List<String> Objects = form.split(',');
          
            Form__c FormDetail = [SELECT Id, Mapped_Objects__c FROM Form__c WHERE Id=:id LIMIT 1];
            //List<Form_Page__c> pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:Form_Id ORDER BY Page_Number__c ASC];
            List<String> types = (FormDetail.Mapped_Objects__c).split(',');
            Decimal Position =0;
            List<Form_Page__c> AllFormPages = [SELECT ID From Form_Page__c where Form__c =: FormDetail.Id ORDER BY Page_Number__c] ;
            boolean hasRequiredField = false;
            List<Form_Fields__c> fieldContainsRequireCheck = [SELECT Name From Form_Fields__c where Form_Page__c=:AllFormPages.get(0).Id];
            for(Form_Fields__c it: fieldContainsRequireCheck){
               List<String> temp=  it.Name.split(',');
               if(temp.size()==3){
                 if(temp.get(2) == 'isrequired'){
                    hasRequiredField = true;
                 }
               }
            }
            if(hasRequiredField == false){
            Integer iteration=0;
            List<Form_Fields__c> Fields = new List<Form_Fields__c>();
            for (String type : types) {
                Position = 0;
                Form_Page__c page_Id = AllFormPages.get(iteration);
                Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
                Schema.SObjectType leadSchema = schemaMap.get(type);
                Map<String, Schema.SObjectField> fieldMap = leadSchema.getDescribe().fields.getMap();
                for (String fieldName: fieldMap.keySet()) {
                    if (fieldMap.get(fieldName).getDescribe().isUpdateable()){
                        
                        
                        if( fieldMap.get(fieldName).getDescribe().isNillable()==false){
                            Position=Position+1;
                            System.debug('##Field API Name='+fieldName);
                            Form_Fields__c field = new Form_Fields__c();
                            //requiredFieldList.add(fieldMap.get(fieldName).getDescribe().getLabel()+'./.'+ fieldMap.get(fieldName).getDescribe().getType());
                            field.Mapped_Obj__c = type;
                            field.Field_Mapping__c = fieldName;
                            field.Name= fieldMap.get(fieldName).getDescribe().getLabel()+','+fieldMap.get(fieldName).getDescribe().getType()+',isrequired';
                            field.Form__c =  FormDetail.Id;
                            field.Form_Page__c = page_Id.Id;
                            field.Field_Order__c = Position+1;
                            Fields.add(field);
                        }
                         
                    }
                }
                iteration=iteration+1;
            }
        
            for(Form_Fields__c it: Fields ){
                System.debug(it.Name+'--->>>');
                System.debug(it.Form_Page__c+'---->>>>');
            }
           insert Fields;
        }
           List<Form_Fields__c> fieldList=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c];

           return fieldList;
          
        
       
        
        }
         
        catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static pageWrapper createPage(Integer totalPages,Id formId){
        try {
            Form_Page__c newFormPage= new Form_Page__c();
            newFormPage.Form__c = formId;
            newFormPage.Page_Number__c = totalPages +1;
            newFormPage.Name= 'New Form Page';
            insert newFormPage;
           List<Form_Fields__c> formFields=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];
            pageWrapper pw = new pageWrapper();
            pw.fieldList = formFields;
            pw.pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:FormId ORDER BY Page_Number__c ASC];
            return pw;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static pageWrapper renameform(Id id, String rename,Id FormId){
        try {
            Form_Page__c form = [SELECT Name FROM Form_Page__c WHERE Id =: id];
            form.Name = rename;
            update form;     
            List<Form_Fields__c> formFields=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];
            pageWrapper pw = new pageWrapper();
            pw.fieldList = formFields;
            pw.pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:FormId ORDER BY Page_Number__c ASC];
            return pw;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static string renameMainform(String rename,Id FormId){
        try {
            Form__c renameform = [SELECT Name from Form__c WHERE Id=:FormId];
            renameform.Name = rename;
            update renameform;
            return rename;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static pageWrapper deletePage(Id FormId, Id PageId){
        try {
            Form_Page__c deletePage= [SELECT Id from Form_Page__c where Id=:PageId];
            boolean hasRequiredField = false;
            List<Form_Fields__c> fieldContainsRequireCheck = [SELECT Name From Form_Fields__c where Form_Page__c=:PageId];
            for(Form_Fields__c it: fieldContainsRequireCheck){
               List<String> temp=  it.Name.split(',');
               if(temp.size()==3){
                 if(temp.get(2) == 'isrequired'){
                    hasRequiredField = true;
                 }
               }
            }
            if(hasRequiredField==false){
            delete deletePage;}
            List<Form_Fields__c> formFields=[SELECT Id,Name,Form__c,Form_Page__c,Field_Order__c FROM Form_Fields__c ORDER BY Field_Order__c ASC];

            pageWrapper pw = new pageWrapper();
            pw.fieldList = formFields;
            pw.pageList = [SELECT Id, Name, Page_Number__c FROM Form_Page__c WHERE Form__c=:FormId ORDER BY Page_Number__c ASC];
            return pw;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}