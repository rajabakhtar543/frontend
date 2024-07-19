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
      <form className="d-flex justify-content-center" role="search" onSubmit={handleSubmit}>
  <input className="form-control me-2" style={{width:'300px'}} type="search" placeholder="Search Products" aria-label="Search" value={value.keyword} onChange={(e) => setValue({ ...value, keyword: e.target.value })}
 />
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>

    </>
  )
}

export default SearchForm
