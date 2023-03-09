<aura:application implements="ltng:allowGuestAccess" access="GLOBAL" extends="ltng:outApp">
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    <aura:dependency resource="c:previewFormCmp"/>
</aura:application>