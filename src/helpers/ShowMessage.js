export default class ShowMessage {

   static show(message,type) {
       window.Materialize.toast(message, 3000 , type);
   } 
  
}