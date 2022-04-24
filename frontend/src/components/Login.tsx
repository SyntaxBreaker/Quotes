import React, {useState, useEffect, useContext} from "react";
import {useNavigate} from 'react-router-dom';
import {UserContext} from "../providers/UserProvider.tsx";
import axios from 'axios';
import styled from "styled-components";


const Login: React.FC = () => {
    const [user, setUser] = useContext(UserContext);
    const [info, setInfo] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault();

        const {email, password} = event.target;
        
        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/login`,
            data: {
                email: email.value,
                password: password.value
            }
        })
            .then(res => {
                setUser(res.data);
                navigate('/');
            })
            .catch(err => {
                setInfo('Enter a valid login and password');
                setUser(null);
            })
    }

    return (
            <form onSubmit={handleSubmit}>
                {info && <p>{info}</p>}
                <label>Email</label>
                <input type="text" name="email" required />
                <label>Password</label>
                <input type="password" name="password" required />
                <button type="submit">Submit</button>
            </form>
    )
}

export default Login;