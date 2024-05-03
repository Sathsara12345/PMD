
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Login.css'

// function Login() {
//     const navigate = useNavigate();
//     const [error, setError] = useState({});
//     const [values, setValues] = useState({
//         email: '',
//         password: ''
//     });

//     const handleInput = (event) => {
//         setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         setError({}); // Reset any previous errors
    
//         // Validate email and password
//         if (!values.email || !values.password) {
//             setError({ message: 'Please enter both email and password' });
//             return;
//         }
    
//         // Send login request to the server
//         axios.post('http://localhost:3001/login', values)
//             .then(res => {
//                 console.log(res.data);
                
//                 // Check if login was successful
//                 if (res.data.success) {
//                     // Redirect to the dashboard on successful login
//                     navigate('/Dashboard');
//                 } else {
//                     // Display error message if login failed
//                     setError({ message: 'Invalid email or password' });
//                 }
//             })
//             .catch(error => {
//                 // Display error message for any other errors
//                 setError({ message: 'An error occurred. Please try again later' });
//             });
//     };
    

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6 rounded-0">
//                     <div className="card rounded-0 bg-dark.bg-gradient text-black">
//                         <div className="card-header text-center">Login</div>
//                         <div className="card-body">
//                             <form onSubmit={handleSubmit}>
//                                 <div className="form-group">
//                                     <label htmlFor="email">Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control rounded-0"
//                                         id="email"
//                                         name='email'
//                                         onChange={handleInput}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="password">Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control rounded-0"
//                                         id="password"
//                                         name='password'
//                                         onChange={handleInput}
//                                     />
//                                 </div>
//                                 {error.message && <div className='text-danger'>{error.message}</div>}
//                                 <button type="submit" className="btn btn-success d-block mb-2 text-center rounded-0 w-100">Login</button>
//                                 <Link to="/signup" className="btn btn-light d-block text-center rounded-0 w-100 text-decoration-none">Create Account</Link>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css'; // Import custom CSS file for additional styling


function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        
        setError({});

        // Validate email and password
        if (!values.email || !values.password) {
            setError({ message: 'Please enter both email and password' });
            return;
        }
        // Send login request to the server
        axios.post('http://localhost:3001/login', values)
            .then(res => {
                console.log(res.data);        
                // Check if login was successful
                if (res.data.success) {
                    window.alert('Login successful!');
                    // Redirect to the dashboard on successful login
                    navigate('/Home');
                } else {
                    // Display error message if login failed
                    setError({ message: 'Invalid email or password' });
                }
            })
            .catch(error => {
                // Display error message for any other errors
                setError({ message: 'An error occurred. Please try again later' });
            });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card" style={{backgroundColor:'rgba(105, 104, 104, 0.8)'}}>
                        <div className="card-header text-center">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    
                                    <input
                                        type="email"
                                        className="form-control rounded"
                                        id="email"
                                        name='email'
                                        placeholder='Email'
                                        onChange={handleInput}
                                    />
                                </div>
                                <div className="form-group">
                                    
                                    <input
                                        type="password"
                                        className="form-control rounded"
                                        id="password"
                                        name='password'
                                        placeholder='Password'
                                        onChange={handleInput}
                                    />
                                </div>
                                {error.message && <div className='text-danger'>{error.message}</div>}
                                <button type="submit" className="btn btn-success rounded w-100">Login</button><br></br>
                                <Link to="/signup" className="btn btn-light rounded w-100">Create Account</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     
    );
};

export default Login;
