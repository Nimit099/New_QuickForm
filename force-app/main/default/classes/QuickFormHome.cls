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
}