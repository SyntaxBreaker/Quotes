import React, {useContext, useState} from 'react';
import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import Login from "./components/Login.tsx";
import Register from "./components/Register.tsx";
import Quotes from "./components/Quotes.tsx";
import CreateQuote from "./components/CreateQuote.tsx";
import styled from "styled-components";
import {UserContext} from "./providers/UserProvider.tsx";
import axios from 'axios';

const MainContainer = styled.div`
  height: 100%;
  width: 100%;
`;

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-between;
  background-color: #0055B0;
  color: #E2E9F1;
  min-height: 2rem;
  padding: .5rem 0;
  
  @media (max-width: 768px) {
    justify-content: space-around;
    flex-direction: column;
  }
`;

const MainNav = styled.div`
  display: ${props => props.active};
  flex-direction: column;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`;

const Hamburger = styled.div`
  display: none;

  @media (max-width: 600px) {
    display: initial;
    align-self: flex-end;
    position: absolute;
    right: 1rem;
  }
`;

const HamburgerIcon = styled.div`
  background-color: #E2E9F1;
  height: .3rem;
  width: 2rem;
  transform: translate3d(0, 0, 0);
  margin: 0.6em 0;
  position: relative;

  &::before, &::after {
    content: "";
    background-color: #E2E9F1;
    height: .3rem;
    width: 2rem;
    position: absolute;
    margin: auto;
  }

  &::before {
    transform: translate3d(0, -8px, 0);
  }

  &::after {
    transform: translate3d(0, 8px, 0);
  }
`;

const StyledLink = styled(Link)`
  color: #E2E9F1;
  text-decoration: none;
  margin: 0.5rem;
`

const StyledAnchor = styled.a`
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
`;

function App() {
  const [user, setUser] = useContext(UserContext);
  const [isHidden, setIsHidden] = useState(false);

  const logout = event => {
    event.preventDefault();

    axios({
      method: 'delete',
      url: `${process.env.REACT_APP_API_URL}/logout`,
      withCredentials: true,
    }).then(res => {
      setUser(null);
      localStorage.clear();
    })
    .catch(err => console.log(err));
  }

  return (
    <MainContainer>
        <BrowserRouter>
            <StyledNav>
                <StyledLink to=''>Homepage</StyledLink>
                <MainNav active={isHidden ? 'flex' : 'none'}>
                    {user ? (
                        <>
                            <StyledLink to='create'>Create a quote</StyledLink>
                            <StyledAnchor href='' onClick={logout}>Logout</StyledAnchor>
                        </>
                    ) : (
                        <>
                            <StyledLink to='login'>Login</StyledLink>
                            <StyledLink to='register'>Register</StyledLink>
                        </>
                    )}
                </MainNav>
                <Hamburger onClick={() => setIsHidden(!isHidden)}>
                  <HamburgerIcon />
                </Hamburger>
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
