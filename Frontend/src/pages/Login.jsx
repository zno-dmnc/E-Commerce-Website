import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Login({setUser}) {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        setValues(prev=>({...prev, [e.target.name]: e.target.value}))
    }
    const navigate = useNavigate();
    const handleLogin = async(e) => {

        e.preventDefault();
        try {
            console.log(values);
            const response = await axios.post('http://localhost:3000/login', values)
            console.log(response);
            if(response.status === 200) {
                localStorage.setItem('token', response.data.token);
                console.log(response.data);
                setUser(response.data.user);
                console.log(response.data.user);
                if(response.data.role === 'seller') {
                    navigate('/sellerhome')
                }else{
                    navigate('/customerHome')
                }
            }
        }
        catch(e) {
            console.log(e)
            console.log('CANNOT LOG IN.', e);
            alert('CANNOT LOG IN!');
        }
    };

    return (
        <div style={{ backgroundColor: '#FD7755', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ width: '30rem', height: '25rem', backgroundColor: '#D9D9D9'}}>
                <div className="card-body">
                    <form action="" method="post" onSubmit={handleLogin} >
                        <div className="form-group" style={{margin: '15px'}}>
                            <label htmlFor="email"style={{margin: '10px'}}>Email address</label>
                            <input type="email" name="email" className="form-control" id="email" style={{borderRadius: "15px"}} onChange={handleInput}/>
                        </div>
                        <div className="form-group"style={{margin: '15px'}}>
                            <label htmlFor="password"style={{margin: '10px'}}>Password</label>
                            <input type="password" name="password" className="form-control" id="password" style={{borderRadius: "15px"}} onChange={handleInput}/>
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

