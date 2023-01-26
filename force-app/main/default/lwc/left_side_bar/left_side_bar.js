import { LightningElement} from 'lwc';
import home from '@salesforce/resourceUrl/leftbar_home';
import field from '@salesforce/resourceUrl/leftbar_fieldmapping';
import design from '@salesforce/resourceUrl/leftbar_design';
import notification from '@salesforce/resourceUrl/leftbar_notification';
import thankyou from '@salesforce/resourceUrl/leftbar_thankyou';
import object from '@salesforce/resourceUrl/leftbar_objectmapping';
import preview from '@salesforce/resourceUrl/leftbar_preview';
import publish from '@salesforce/resourceUrl/leftbar_publish';

export default class Left_side_bar extends LightningElement {
  home = home;
  field = field;
  design = design;
  notification = notification;
  thankyou = thankyou;
  object = object;
  preview = preview;
  publish = publish;  
  preselected;
}