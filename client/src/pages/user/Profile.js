import React,{useState, useEffect} from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import axios from 'axios'
import "./Profile.css";

const Profile = () => {
  //context
  const [auth, setAuth] = useAuth()

  //state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    //get user data
   useEffect(() => {
  if (auth?.user) {
    setName(auth.user.name || "");
    setEmail(auth.user.email || "");
    setPhone(auth.user.phone || "");
    setAddress(auth.user.address || "");
  }
}, [auth]);



    // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put('/api/v1/auth/profile', {
        name,
        email,
        password,
        phone,
        address,

      });
      if(data?.error){
        toast.error(data?.error)
      }else{
        setAuth({ ...auth, user: data.updatedUser });

       let ls = JSON.parse(localStorage.getItem("auth"));
       ls.user = data.updatedUser;
       localStorage.setItem("auth", JSON.stringify(ls));
       toast.success('Profile updated successfully')

      }
    
    } catch (error) {
      console.error('Register error:', error);
      // Show backend-provided message when available, otherwise a helpful network message
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else if (error.request && !error.response) {
        toast.error('Cannot connect to backend. Start the server at http://localhost:8080');
      } else {
        toast.error(error.message || 'Something went wrong');
      }
    }
    
  };

  return (
    <div className='profile-page-body'>
    <Layout title={"Your Profile"}> 
    
        <div className='container-fluid p-3 m-3'>
        <div className='row'>
            <div className='col-md-3 profile-menu-col'>
                <UserMenu/>
            </div>
            <div className='col-md-9 profile-form-col'>
               <div className="profile-page">

        <h1 className="text-center mb-4">USER PROFILE</h1>

        <form onSubmit={handleSubmit} className="col-12 col-sm-10 col-md-6 mx-auto">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
    
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

              disabled
            />
          </div>




        <div className="mb-3 password-wrapper">
         <input
          type={showPassword ? "text" : "password"}
          className="form-control"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />

      <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? "🙈" : "👁️"}
       </span>
      </div>

        
          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder="Enter Your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          

          <button type="submit" className="btn btn-primary w-100">
            UPDATE
          </button>
        </form>
      </div>
            </div>
        
      </div>
      </div>
      
    </Layout>
    </div>
  )
}

export default Profile
