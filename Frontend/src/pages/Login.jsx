import React, { useState } from 'react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        // Handle the login logic here
        console.log('Login Attempt:', { email, password });
        // You can add your login logic here, such as making an API call to authenticate the user
    };

    return (
        <div style={{ backgroundColor: '#FD7755', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ width: '30rem', height: '25rem', backgroundColor: '#D9D9D9'}}>
                <div className="card-body">
                    <form onSubmit={handleLogin}>
                        <div className="form-group" style={{margin: '15px'}}>
                            <label htmlFor="email"style={{margin: '10px'}}>Email address</label>
                            <input type="email" className="form-control" id="email" style={{borderRadius: "15px"}}/>
                        </div>
                        <div className="form-group"style={{margin: '15px'}}>
                            <label htmlFor="password"style={{margin: '10px'}}>Password</label>
                            <input type="password" className="form-control" id="password" style={{borderRadius: "15px"}}/>
                        </div>
                        <div className="d-flex justify-content-center"style={{marginTop: '50px'}}>
                        <button type="submit" className="btn btn-primary" style={{backgroundColor: 'white', color: 'black', fontWeight: 'bold'}}>Login</button>
                        </div>
                        <div  className="d-flex justify-content-center">
                        <p style={{marginTop: '20px'}}>Don't have an account? <a href="/register" style={{textDecoration: 'none', color: 'black', fontStyle: 'italic' }}>Sign up</a></p>
                        </div>
                        
                    </form>
                </div>
            </div>
      </div>
    )
}