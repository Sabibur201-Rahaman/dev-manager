
import { v4 as uuidv4 } from 'uuid'
import { ADD_CONTACT,DELETE_CONTACT,LOAD_CONTACTS,UPDATE_CONTACT } from './types'
const contactsReducer=(state,action)=>{
    // state initialstate
    // action ({type:'DELETE_CONTACT',payload:id})
    const{type,payload}=action
    switch(type){
      case LOAD_CONTACTS:
        return[...action.payload]
      case DELETE_CONTACT: const updatedContacts=state.filter(contact=> contact.id!==payload)
      return[...updatedContacts]
    
      case ADD_CONTACT:
      const newContact={
        id:uuidv4(),
        ...payload,
      }
      return[newContact,...state]
    
      case UPDATE_CONTACT:
      const{id,contact:contactToUpdate}=payload
      const contacts=state.map((contact)=>{
             
        if(contact.id===id){
         
          return{
            id,
            ...contactToUpdate
          }
        }
        else{
          return contact
        }
      })
    return[...contacts]
    default:
      return state
    }
    }
    export default contactsReducer