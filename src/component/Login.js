import React from 'react'

const Login = () => {
  return (
   <>
 
  <div className="container downloadcentercontainer mt-74">
  <form>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="htmlForm-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" />
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
  </div>
   </>
  )
}

export default Login
