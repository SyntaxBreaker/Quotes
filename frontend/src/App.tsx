import React, {useContext} from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Quotes from "./components/Quotes.tsx";
import CreateQuote from "./components/CreateQuote.tsx";
import styled from "styled-components";
import {UserContext} from "./providers/UserProvider.tsx";

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0055B0;
  height: 2rem;
  
  @media only screen and (max-width: 600px) {
    height: 6rem;
    justify-content: space-around;
    flex-direction: column;
  }
`;

const StyledLink = styled(Link)`
  color: #E2E9F1;
  text-decoration: none;
  margin: 0.5rem;
`

const StyledContent = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 90%;
    margin: 0 auto;
  }
  
  @media (min-width: 992px) {
    width: 75%;
    margin: 0 auto;
  }
`

function App() {
    const [user, setUser] = useContext(UserContext);

  return (
    <MainContainer>
        <BrowserRouter>
            <StyledNav>
                <div>
                    <StyledLink to=''>Homepage</StyledLink>
                </div>
                <div>
                    {user ? (
                        <>
                            <StyledLink to='create'>Create a quote</StyledLink>
                        </>
                    ) : (
                        <>
                            <StyledLink to='login'>Login</StyledLink>
                            <StyledLink to='register'>Register</StyledLink>
                        </>
                    )}
                </div>
            </StyledNav>
            <StyledContent>
                <Routes>
                    <Route path='' element={<Quotes />} />
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='create' element={user? <CreateQuote /> : <Navigate to="/login" />} />
                </Routes>
            </StyledContent>
        </BrowserRouter>
    </MainContainer>
  );
}

export default App;
