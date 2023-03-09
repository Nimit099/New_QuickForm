public class qf_guide2_Controller {

    @AuraEnabled
    public static List<Site> getSites() {
        return [SELECT Id, Name, MasterLabel, Subdomain, SiteType, Status FROM Site WHERE Status='Active' ];
    }

    @AuraEnabled
    public static void saveSecureUrl(Id selectedSiteid) {
        System.debug('siteID : '+selectedSiteid);
        SiteDetail siteDetail = [SELECT Id, SecureUrl FROM SiteDetail WHERE DurableId = :selectedSiteid];
        System.debug('SecureUrl : '+siteDetail);
        QuickForm_Administration__c customSetting = QuickForm_Administration__c.getInstance();
        customSetting.SecureUrl__c = siteDetail.SecureUrl;
        customSetting.SiteId__c = selectedSiteid;
        upsert customSetting;
    }

    @AuraEnabled
    public static String getSettingData() {
        QuickForm_Administration__c customSetting = QuickForm_Administration__c.getInstance();
        return customSetting.SiteId__c;
    }

    // get site from org 
    @AuraEnabled
    public static List<String> getSitePrefixes() {
        List<String> sitePrefixes = new List<String>();
        for(Site site : [SELECT Id, Name, Subdomain, SiteType, Status FROM Site WHERE Status='Active']) {
            if(site.SiteType == 'Site') {
                sitePrefixes.add(site.Subdomain);
            }
        }
        return sitePrefixes;
    }
}