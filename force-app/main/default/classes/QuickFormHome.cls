//  ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used for Edit, Delete, Read or Create New Form
// # Change Version History
// # Version No.     Author          Date            Change Description            Jira Ticket
// #    1.           Nimit         09/01/2023           Home Page UI 			 QUIC-37, QUIC-36
// =================================== 

//   Edited as per sheet(qf_home.cls - 1)
public with sharing class QuickFormHome {

// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Read All Forms record
// =================================== -->
    @AuraEnabled
    // public static Map<Integer,List<Form__c>> getFormRecords(){
    //     try {
    //         List<Form__c> forms = [SELECT Id,Name,Total_Submissions__c, Status__c FROM Form__c];
    //         Integer count = [SELECT Count() FROM Form__c];
    //         Map<Integer,List<Form__c>> data = new Map<Integer,List<Form__c>>();
    //         data.put(count,forms);
    //         return data;
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    //   Edited as per sheet(qf_home.cls - 2 & 3)

    public static List<Form__c> getFormRecords() {
        try {
            List<Form__c> forms = [SELECT Id,Name,Total_Submissions__c, Status__c FROM Form__c];
            return forms;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Search Form
// =================================== -->
    @AuraEnabled
    // public static Map<Integer,List<Form__c>> searchForms(String searchkey){
    //     try {
    //         List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Name LIKE:'%'+searchkey+'%'];
    //         Integer count = [SELECT Count() FROM Form__c WHERE Name LIKE:'%'+searchkey+'%'];
    //         Map<Integer,List<Form__c>> data = new Map<Integer,List<Form__c>>();
    //         data.put(count,forms);
    //         return data;
            
    //     } catch (Exception e) {
    //         throw new AuraHandledException(e.getMessage());
    //     }
    // }

    //   Edited as per sheet(qf_home.cls - 2 & 3 & 4)

    public static List<Form__c> searchForms(String searchkey) {
        try {
          return [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Name LIKE:'%'+searchkey+'%'];
        } catch (Exception e) {
          throw new AuraHandledException(e.getMessage());
        }
    }
    


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Change Status of form
// =================================== -->

    //   Edited as per sheet(qf_home.cls - 2 & 3 & 5)

    @AuraEnabled
    public static List<Form__c> getFormsByStatus(Id id, String searchkey){
        try {

            Form__c form = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Id =: id];

            if (form.Status__c == true) {
                form.Status__c = false;
            }
            else {
                form.Status__c = true;
            }
            update form;
            
            // if(searchkey == null || searchkey == '' || searchkey == 'undefined'){
            // List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c];
            // return forms;
            // }
            // else{
            // List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Name LIKE:'%'+searchkey+'%'];
            // return forms;
            // }
            String searchkeyword = '%'+searchkey+'%'; 
            String query = 'SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c';
            if (searchkey != null && searchkey != '' && searchkey != 'undefined') {
                query += ' WHERE Name LIKE :searchkeyword';
            }
            List<Form__c> forms = Database.query(query);
            return forms;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to delete form
// =================================== -->

    //   Edited as per sheet(qf_home.cls - 2 & 3 & 5)

    @AuraEnabled
    public static List<Form__c> deleteFormRecord(Id id, String searchkey){
        try {
            Form__c form = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Id =: id];
            delete form;
            
            // if(searchkey == null || searchkey == '' || searchkey == 'undefined'){
            //     List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c];
            //     return forms;
            //     }
            //     else{
            //     List<Form__c> forms = [SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c WHERE Name LIKE:'%'+searchkey+'%'];
            //     return forms;
            //     }
            String searchkeyword = '%'+searchkey+'%'; 
            String query = 'SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c';
            if (searchkey != null && searchkey != '' && searchkey != 'undefined') {
                query += ' WHERE Name LIKE :searchkeyword';
            }
            List<Form__c> forms = Database.query(query);
            return forms;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }


// <!-- ===================================
// # MV Clouds Private Limited
// # Author: Nimit Shah
// # Create Date: 09/01/2023
// # Description: Used to Rename form
// =================================== -->

    //   Edited as per sheet(qf_home.cls - 2)

    @AuraEnabled
    public static List<Form__c> renameFormRecord(Id id, String rename, String searchkey){
        try {
            Form__c form = [SELECT Name FROM Form__c WHERE Id =: id];
            form.Name = rename;
            update form;        
            String searchkeyword = '%'+searchkey+'%'; 
            String query = 'SELECT Id, Name, Status__c, Total_Submissions__c FROM Form__c';
            if (searchkey != null && searchkey != '' && searchkey != 'undefined') {
                query += ' WHERE Name LIKE :searchkeyword';
            }
            List<Form__c> forms = Database.query(query);
            return forms;
                
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static List<Form__c> CopyForm(Id id){
        try {
            Integer i = 0;

            Form__c selectedform = [SELECT Id, Name, All_Field_Focus__c, All_Field_Hover__c, All_Field_Styling__c, Button_CSS__c, Button_Position__c, Captcha_Type__c, Form_Description__c,
            Form_Styling__c, FormBgID__c, Label_CSS__c, Mapped_Objects__c, Page_CSS__c, PageBgID__c, Progress_Indicator__c, Status__c FROM Form__c WHERE Id =: id Limit 1];

            List<Form_Fields__c> selectedformfield = [SELECT Id, Name, 	Field_Validations__c, Field_Mapping__c, Field_Order__c, Field_Properties__c, Field_Styling__c,
            Form__c, Form_Page__c, Mapped_Obj__c FROM Form_Fields__c WHERE Form__c =: id];

            List<Form_Page__c> selectedformpage = [SELECT Id, Name, AllField_Styling__c, Form__c, Page_Number__c, Page_Styling__c FROM Form_Page__c WHERE Form__c =: id];

            Form__c copyform = new Form__c(
                Name = selectedform.Name + ' Copy',
                All_Field_Focus__c = selectedform.All_Field_Focus__c, 
                All_Field_Hover__c = selectedform.All_Field_Hover__c,
                All_Field_Styling__c = selectedform.All_Field_Styling__c,
                Button_CSS__c = selectedform.Button_CSS__c,
                Button_Position__c = selectedform.Button_Position__c,
                Captcha_Type__c = selectedform.Captcha_Type__c,
                Form_Description__c = selectedform.Form_Description__c,
                Form_Styling__c = selectedform.Form_Styling__c,
                FormBgID__c = selectedform.FormBgID__c,
                Label_CSS__c = selectedform.Label_CSS__c,
                Mapped_Objects__c = selectedform.Mapped_Objects__c,
                Page_CSS__c = selectedform.Page_CSS__c,
                PageBgID__c = selectedform.PageBgID__c,
                Progress_Indicator__c = selectedform.Progress_Indicator__c,
                Status__c = selectedform.Status__c 
            );
            insert copyform;

            
            if([SELECT Count() FROM Thankyou_Page__c WHERE Form__c =: id ] > 0){
                Thankyou_Page__c selectedformthankyou = [SELECT Id, Name, Email_Address__c, Form__c, See_Response__c, Thank_you_URL__c, Thankyou_Page_Type__c,
                Thankyou_Text__c, ThankYou_Label__c FROM Thankyou_Page__c WHERE Form__c =: id Limit 1];

                Thankyou_Page__c copythankyoupage = new Thankyou_Page__c(
                    Name = selectedformthankyou.Name + ' Copy',
                    Email_Address__c = selectedformthankyou.Email_Address__c,
                    Form__c = copyform.Id,
                    See_Response__c = selectedformthankyou.See_Response__c,
                    Thank_you_URL__c = selectedformthankyou.Thank_you_URL__c,
                    Thankyou_Page_Type__c = selectedformthankyou.Thankyou_Page_Type__c,
                    Thankyou_Text__c = selectedformthankyou.Thankyou_Text__c,
                    ThankYou_Label__c = selectedformthankyou.ThankYou_Label__c
                );
                insert copythankyoupage;
            }

            List<Form_Page__c> copypagelist = new List<Form_Page__c>();
            for(Form_Page__c page : selectedformpage){
                Form_Page__c copypage = new Form_Page__c(
                    Name = page.Name + ' Copy',
                    AllField_Styling__c = page.AllField_Styling__c,
                    Form__c = copyform.Id,
                    Page_Number__c = page.Page_Number__c,
                    Page_Styling__c = page.Page_Styling__c
                );
                copypagelist.add(copypage);
            }
            insert copypagelist;

            List<Form_Fields__c> copyfieldlist = new List<Form_Fields__c>();
            Form_Fields__c copyfield = new Form_Fields__c();
            for(Form_Page__c pages : selectedformpage){
                for(Form_Fields__c field : selectedformfield){

                    if(pages.Id == field.Form_Page__c){

                        copyfield.Name = field.Name + ' Copy';
                        copyfield.Field_Validations__c = field.Field_Validations__c;
                        copyfield.Field_Mapping__c = field.Field_Mapping__c;
                        copyfield.Field_Order__c = field.Field_Order__c;
                        copyfield.Field_Properties__c = field.Field_Properties__c;
                        copyfield.Field_Styling__c = field.Field_Styling__c;
                        copyfield.Form__c = copyform.Id;
                        copyfield.Form_Page__c = copypagelist[i].Id;
                        copyfield.Mapped_Obj__c = field.Mapped_Obj__c;
                    }
                    i++;
                    copyfieldlist.add(copyfield);
                }
            }
            insert copyfieldlist;

            
            return  [SELECT Id,Name,Total_Submissions__c, Status__c FROM Form__c];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}