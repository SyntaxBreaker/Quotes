import React, {useState, useEffect} from "react";
import axios from 'axios';

export const UserContext = React.createContext(null);

interface User {
    displayName: string;
    email: string;
}

export default function UserProvider({children}) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if(localStorage.getItem('displayName') && localStorage.getItem('email')) {
            setUser({
                displayName: localStorage.getItem('displayName'),
                email: localStorage.getItem('email')
            })
        }

        if(user) {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/refreshToken`,
                withCredentials: true,
            })
                .then(res => console.log(`Token has been refreshed`))
                .catch(err => setUser(null))
        }
    }, [user]);

    return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}