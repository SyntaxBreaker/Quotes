import React, {useState, useEffect} from "react";
import axios from "axios";

const Register: React.FC = () => {
    const [info, setInfo] = useState<string | null>(null);

    const handleSubmit = event => {
        event.preventDefault();
        
        const {email, nickname, password} = event.target;

        axios({
            method: 'post',
            url: `${process.env.REACT_APP_API_URL}/register`,
            data: {
                email: email.value,
                displayName: nickname.value,
                password: password.value
            }
        })
            .then(res => setInfo('Account created successfully'))
            .catch(err => setInfo('We cannot create an account'))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {info && <p>{info}</p>}
                <label>Email</label>
                <input type="email" name="email" required />
                <label>Nickname</label>
                <input type="text" name="nickname" required />
                <label>Password</label>
                <input type="password" name="password" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register;