import React from 'react'
import { useEffect } from 'react'
import Contact from './Contact'
import Loader from '../utils/Loader'
import { ContactContext } from '../context/Contact.Context'
import { Pagination } from 'react-bootstrap'

const generateArr=(num)=>{
  const arr=[]
for(let i=1;i<=num;i++){
arr.push(i)
}
return arr
}
function Contacts() {
  const {contacts,deleteContacts,loaded,pageNumber,pageCount,setpageNumber}=React.useContext(ContactContext)
  const pageCountArr=generateArr(pageCount)
  const isPageErrorOfBound = pageCount ? pageNumber > pageCount : false

  useEffect(() => {
    if (isPageErrorOfBound) {
      setPageNumber(pageNumber - 1)
    }
  }, [isPageErrorOfBound])
  const handlePageClick=(evt)=>{
    setpageNumber(+evt.target.dataset.count)
    console.log(evt.target.dataset.count)
  }
  console.log(pageCountArr)
  return (
    <>
        <h2 className='mt-5 text-center'>All Contacts</h2>
      {loaded?
      <>
      {(contacts.map((contact)=>(
      <Contact key={contact.id}contact={contact} deleteContacts={deleteContacts}/>
      )))}
      <Pagination style={{justifyContent:'center'}}>
        {pageCountArr.map((count,index)=>{
          return(
          <Pagination.Item key={index} active={count===pageNumber} data-count={count} onClick={handlePageClick}>{count}</Pagination.Item>
          
          )

        })}
      </Pagination>
      </>
      :(<Loader/>)}
    </>
  )
}

export default Contacts
