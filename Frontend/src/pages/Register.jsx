import React, { useState } from 'react';

export default function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Customer');

    const handleRegister = (event) => {
        event.preventDefault();
        // Handle the registration logic here
        console.log('Register Attempt:', { email, name, password, role });
        // You can add your registration logic here, such as making an API call to register the user
    };

    return(
        <div style={{ backgroundColor: '#FD7755', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ width: '30rem', height: '30rem', backgroundColor: '#D9D9D9'}}>
                <div className="card-body">
                <form onSubmit={handleRegister}>
                        <div className="form-group" style={{ margin: '10px' }}>
                            <label htmlFor="email" style={{ marginBottom: '5px' }}>Email address</label>
                            <input type="email" className="form-control" id="email" style={{ borderRadius: "15px" }} />
                        </div>
                        <div className="form-group" style={{ margin: '10px' }}>
                            <label htmlFor="name" style={{ marginBottom: '5px' }}>Name</label>
                            <input type="text" className="form-control" id="name" style={{ borderRadius: "15px" }} />
                        </div>
                        <div className="form-group" style={{ margin: '10px' }}>
                            <label htmlFor="password" style={{ marginBottom: '5px' }}>Password</label>
                            <input type="password" className="form-control" id="password" style={{ borderRadius: "15px" }} />
                        </div>
                        <div className="form-group" style={{ margin: '10px' }}>
                            <label htmlFor="role" style={{ marginBottom: '5px' }}>Registering as</label>
                            <select className="form-control" id="role" style={{ borderRadius: "15px" }}>
                                <option value="Customer">Customer</option>
                                <option value="Seller">Seller</option>
                            </select>
                        </div>
                        <div className="d-flex justify-content-center" style={{ marginTop: '50px' }}>
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold' }}>Register</button>
                        </div>
                        <div  className="d-flex justify-content-center">
                        <p style={{marginTop: '20px'}}>Already have an account? <a href="/" style={{textDecoration: 'none', color: 'black', fontStyle: 'italic' }}>Login</a></p>
                        </div>
                    </form>
                </div>
            </div>
      </div>
    )
}