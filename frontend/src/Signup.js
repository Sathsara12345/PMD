
// import React, { useState } from 'react';
// import { Notyf } from 'notyf';
// import 'notyf/notyf.min.css';



// function Signup() {
//     const [username, setUsername] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const notyf = new Notyf();

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!username || !email || !password) {
//             notyf.error("All fields are required");
//             return;
//         }

//         try {
//             const response = await fetch("http://localhost:3001/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ username, 
//                                        email, 
//                                        password, 
//                                        role:'user' }),
//             });

//             const data = await response.text();
//             console.log(data);

//             setTimeout(() => {
//                 window.location.href = "/";
//             }, 3000);
//         } catch (error) {
//             console.error("Error:", error);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="row justify-content-center">
//                 <div className="col-md-6 rounded-0">
//                     <div className="card rounded-0 bg-dark.bg-gradient text-black">
//                         <div className="card-header text-center">Signup</div>
//                         <div className="card-body">
//                             <form onSubmit={handleSubmit}>
//                                 <div className="form-group">
//                                     <label htmlFor="form1">Username</label>
//                                     <input
//                                         type="text"
//                                         className="form-control rounded-0"
//                                         id="form1"
//                                         value={username}
//                                         onChange={(e) => setUsername(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="form2">Email</label>
//                                     <input
//                                         type="email"
//                                         className="form-control rounded-0"
//                                         id="form2"
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="form3">Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control rounded-0"
//                                         id="form3"
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className='mt-2 '>
//                                 <button type="submit" className="btn btn-success d-block mb-2 text-center rounded-0 w-100">Signup</button>
                               
//                                 </div>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;

import React, { useState } from 'react';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

// Initialize Notyf outside the component
const notyf = new Notyf();

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !email || !password) {
            notyf.error("All fields are required");
            return;
        }

        try {
            const response = await fetch("http://localhost:3001/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password, role: 'user' }),
            });

            // Handle response as JSON
            const data = await response.json();
            console.log(data);

            setTimeout(() => {
                window.alert('Registration successful!');
                window.location.href = "/";
            }, 3000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 rounded-0">
                    <div className="card rounded-0 bg-dark.bg-gradient text-black" style={{backgroundColor:'rgba(105, 104, 104, 0.8)'}}>
                        <div className="card-header text-center">Signup</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    {/* <label htmlFor="form1">Username</label> */}
                                    <input
                                        type="text"
                                        className="form-control rounded-0"
                                        id="form1"
                                        placeholder='Username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="form2">Email</label> */}
                                    <input
                                        type="email"
                                        className="form-control rounded-0"
                                        id="form2"
                                        placeholder='Email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    {/* <label htmlFor="form3">Password</label> */}
                                    <input
                                        type="password"
                                        className="form-control rounded-0"
                                        id="form3"
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className='mt-2 '>
                                    <button type="submit" className="btn btn-success d-block mb-2 text-center rounded-0 w-100">Signup</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
