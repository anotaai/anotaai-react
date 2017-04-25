export default class ShowMessage {

   static show(message,time,type) {
       window.Materialize.toast(message, time , type);
   } 
  
}