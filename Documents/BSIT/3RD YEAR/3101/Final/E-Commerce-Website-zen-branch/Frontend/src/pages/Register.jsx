import React, { useState } from 'react';
import axios from 'axios';




export default function Register() {
    const [values, setValues] = useState({
        email: '',
        name: '',
        password: '',
        role: 'customer'
    });

    const handleInput = (e) => {
        setValues(prev=>({...prev, [e.target.id]: e.target.value}))
    };



    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            console.log(values);
            const response = await axios.post('http://localhost:3000/register', values)
            console.log(response);
            if(response.status === 200) {
                console.log(response.data);
                alert('User registered successfully');
            }
        }
        catch(e) {
            if(e.response.status === 400) 
                { alert('User already exists'); }
            else{
                alert('CANNOT REGISTER!');
            }
            
        }
        
       
    };

    return(
        <div style={{ backgroundColor: '#FD7755', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="card" style={{ width: '30rem', height: '30rem', backgroundColor: '#D9D9D9'}}>
                <div className="card-body">
                <form onSubmit={handleRegister} method="post" action="">
                        <div className="form-group" style={{ margin: '10px' }}>
                            <label htmlFor="email" style={{ marginBottom: '5px' }}>Email address</label>
                            <input type="email" name="email" className="form-control" id="email" style={{ borderRadius: "15px" }} onChange={handleInput}/>
                        </div>
                        <div className="form-group" style={{ margin: '10px' }}>
                            <label htmlFor="name" style={{ marginBottom: '5px' }}>Name</label>
                            <input type="text" name="name" className="form-control" id="name" style={{ borderRadius: "15px" }} onChange={handleInput}/>
                        </div>
                        <div className="form-group" style={{ margin: '10px' }}>
                            <label htmlFor="password" style={{ marginBottom: '5px' }}>Password</label>
                            <input type="password" name="password" className="form-control" id="password" style={{ borderRadius: "15px" }} onChange={handleInput} />
                        </div>
                        <div className="form-group" style={{ margin: '10px' }}>
                            <label htmlFor="role" style={{ marginBottom: '5px' }}>Registering as</label>
                            <select className="form-control" name="role" id="role" style={{ borderRadius: "15px" }} onChange={handleInput}>
                                <option value="customer">Customer</option>
                                <option value="seller">Seller</option>
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