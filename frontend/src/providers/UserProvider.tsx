import React, {useState, useEffect} from "react";
import axios from 'axios';

export const UserContext = React.createContext(null);

interface User {
    displayName: string;
    email: string;
    refreshToken: string;
    token: string;
}

export default function UserProvider({children}) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if(user) {
            axios({
                method: 'post',
                url: 'http://localhost:3000/refreshToken',
                data: {
                    token: user['refreshToken']
                }
            })
                .then(res => setUser(prevState => ({
                    ...prevState,
                    token: res['token']
                })))
                .catch(err => setUser(null))
        }
    }, []);

    return <UserContext.Provider value={[user, setUser]}>{children}</UserContext.Provider>;
}