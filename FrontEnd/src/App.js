import React from "react";
import Service from "./screens/Service";
import SignUp from "./screens/SignUp";
import LogIn from "./screens/LogIn";
import Home from "./screens/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CenterProvider } from "./context/Center";
import { ListProvider } from "./context/List";
import { TypeProvider } from "./context/Type";
import { RatingProvider } from "./context/Rating";
import { SearchProvider } from "./context/SearchPlace";
import { useAuthContext } from "./hooks/useAuthContext";

const App = () => {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <CenterProvider>
          <ListProvider>
            <TypeProvider>
              <RatingProvider>
                <SearchProvider>
                  <Routes>
                    <Route
                      exact
                      path="/"
                      element={!user ? <SignUp /> : <Navigate to="/home" />}
                    />
                    <Route
                      exact
                      path="/login"
                      element={!user ? <LogIn /> : <Navigate to="/home" />}
                    />
                    <Route
                      exact
                      path="/home"
                      element={user ? <Home /> : <Navigate to="/login" />}
                    />
                    <Route
                      exact
                      path="/service"
                      element={user ? <Service /> : <Navigate to="/login" />}
                    />
                  </Routes>
                </SearchProvider>
              </RatingProvider>
            </TypeProvider>
          </ListProvider>
        </CenterProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
