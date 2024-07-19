import React from 'react'
import'./Home.css'

 function Home() {
  return (
    <>
    <div className='px-3' m-5>
   
   
        <div className="row g-3 my-2 col-md-12 w-100">
            <div className="col-md-3">
                <div className="p-3 bg mt-5 text-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                    <h3 className='fs-2'>230</h3>
                    <p className='fs-5'>Products</p>
                    </div>
                    <i className='bi bi-cart-plus p-3 h1'> </i>
                </div>
            </div>
            <div className="col-md-3">
                <div className="p-3 bg mt-5 text-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                    <h3 className='fs-2 text-white'>2425</h3>
                    <p className='fs-5'>Total Revenu</p>
                    </div>
                    <i className='bi bi-cash p-3 h1'> </i>
                </div>
            </div>
            <div className="col-md-3">
                <div className="p-3 bg mt-5 text-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                    <h3 className='fs-2'>80</h3>
                    <p className='fs-5'>Orders</p>
                    </div>
                    <i className='bi bi-box p-3 h1'> </i>
                </div>
            </div>
            <div className="col-md-3">
                <div className="p-3 bg mt-5 text-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                    <h3 className='fs-2'>15%</h3>
                    <p className='fs-5'>Sales rate this month</p>
                    </div>
                    <i className='bi bi-arrow-up p-3 h1'> </i>
                </div>
            </div>
          
        </div>
      
    </div>
    <div className='mt-5 text-white'>
      <h1>Latest Orders</h1>
    </div>
    <table class="table mt-5">
   
    <thead>
      <tr className='text-white'>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
    </thead>
    <tbody>
      <tr className='text-white'>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr className='text-white'>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr className='text-white'>
        <th scope="row">3</th>
        <td colspan="2">Larry the Bird</td>
        
        <td>@twitter</td>
      </tr>
    </tbody>
  </table>
  </>

  )
}
export default Home;
