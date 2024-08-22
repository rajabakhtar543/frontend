import React from 'react'
import { useSearch } from '../../Context/search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const SearchForm = () => {
  const[value,setValue] = useSearch();
  const navigate = useNavigate();
 const handleSubmit = async (e)=>{
 e.preventDefault();
  try {
    const {data} = await axios.get(`/api/v1/product/search/${value.keyword}`)
    setValue({...value, result:data})
    navigate('/search') 
  } catch (error) {
    console.log(error)
  }
 }

  return (
    <>
     <form className="d-flex justify-content-center my-3" role="search" onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto' }}>
  <input
    className="form-control m-0 me-2"
    type="search"
    placeholder="Search Products"
    aria-label="Search"
    value={value.keyword}
    onChange={(e) => setValue({ ...value, keyword: e.target.value })}
    style={{
      width: '100%',
      padding: '0.5rem 1rem',
      borderRadius: '4px',
      border: '1px solid #ced4da',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      height:"50px",
    
    }}
  />
  <button
    className="btn"
    type="submit"
    style={{
     
      borderRadius: '4px',
      marginLeft: '8px',
      border: '1px solid #28a745',
      backgroundColor: '#28a745',
      color: '#fff',
      transition: 'background-color 0.3s',
    }}
  >
    Search
  </button>
</form>


    </>
  )
}

export default SearchForm
