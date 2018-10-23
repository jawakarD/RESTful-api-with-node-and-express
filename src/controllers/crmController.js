import mongoose from 'mongoose';
import {ContactSchema} from './../models/crmModel';

const Contact = mongoose.model('Contact',ContactSchema);

export const addNewContact = (req,res)=>{
  let newContact = new Contact(req.body);
  newContact.save((err,contact)=>{
    if(err){
      res.send(err)
    }
    res.json(contact);
  })
}

export const getContact = (req,res)=>{
  console.log(req.method);
  Contact.find({},(err,contact)=>{
    if(err){
      res.send(err)
    }
    res.json(contact);
  })
}

export const getContactWithId = (req,res)=>{
  console.log(req.method);
  Contact.findById(req.params.contactId,(err,contact)=>{
    if(err){
      res.send(err)
    }
    res.json(contact);
  })
}

export const updateContact = (req,res)=>{
  console.log(req.method);
  Contact.findOneAndUpdate({ _id : req.params.contactId},req.body,{new:true},(err,contact)=>{
    if(err){
      res.send(err)
    }
    res.json(contact);
  })
}

export const deleteContact = (req,res)=>{
  console.log(req.method);
  Contact.remove({ _id : req.params.contactId},(err)=>{
    if(err){
      res.send(err)
    }
    res.send(`deleted successfully the user with id ${req.params.contactId}`);
  })
}
