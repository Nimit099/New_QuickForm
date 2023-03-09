public without sharing class EncryptDecryptController {

    private Blob cryptoKey = blob.valueOf('QuickForm//Application//MVClouds');

    public static String processEncryption(Id recId) {
        String encryptedData = '';
        try{
            // Blob cryptoKey = Crypto.generateAesKey(256);
            EncryptDecryptController encObj = new EncryptDecryptController();
            Blob datavalue = Blob.valueOf(recId);
            Blob encryptedBlob = Crypto.encryptWithManagedIV('AES256', encObj.cryptoKey, datavalue);
            encryptedData = EncodingUtil.base64Encode(encryptedBlob);
        }catch(Exception e) {
            System.debug('Error --> '+e);
            error_handler.insert_errordata(e,'EncryptDecryptController','processEncryption');

        }
        return encryptedData;
    }

    @AuraEnabled
    public static String processDecryption(String encryptedData) {
        String decryptedData = '';
        try{
            // Blob cryptoKey = Crypto.generateAesKey(256);
            EncryptDecryptController encObj = new EncryptDecryptController();
            Blob datavalue = EncodingUtil.base64Decode(encryptedData);
            Blob decryptedBlob = Crypto.decryptWithManagedIV('AES256', encObj.cryptoKey, datavalue);
            decryptedData = decryptedBlob.toString();
        }catch(Exception e) {
            System.debug('Error --> '+e);
            error_handler.insert_errordata(e,'EncryptDecryptController','processDecryption');

        }
        return decryptedData;
    }
}