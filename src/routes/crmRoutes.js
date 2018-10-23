import {addNewContact,
  getContact,
  getContactWithId,
  updateContact,
  deleteContact } from './../controllers/crmController';

import { register, login, loginRequired} from './../controllers/userControllers'


const routes = (app) =>{
  app.route('/contact')
  .get((req,res,next)=>{

    //middleware
      console.log(`request get from ${req.originalUrl}`);
      console.log(`req method is ${req.method}`);
      next();
    }, loginRequired, getContact)

  .post(addNewContact);

  app.route('/contact/:contactId')

  //get with spesific id/
  .get(loginRequired, getContactWithId)

  //update with spesific id/
  .put(loginRequired, updateContact)

  //delete with spesific id/
  .delete(loginRequired, deleteContact);

  app.route('/auth/register')
    .post(register);

  app.route('/auth/login')
    .post(login);
}




export default routes;
