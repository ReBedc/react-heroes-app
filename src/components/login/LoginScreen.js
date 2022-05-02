import { type } from '@testing-library/user-event/dist/type';
import React, { useContext, useReducer } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/authContext';
import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

export const LoginScreen = () => {

  const navigate = useNavigate(); // permite navegar a otras pantallas
  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => {

    const action = {
      type: types.login,
      payload: {
        name: 'Fernando'
      }
    }
    dispatch(action);

    const lastPath = localStorage.getItem('lastPath') || '/marvel';

    navigate(lastPath, {
      replace: true // no regresa a la pantalla del login (reemplaza la ruta anterior en el stack)
    });
  }

  return (
    <div className="container mt-5">
        <h1>LoginScreen</h1>
        <hr />

        <button className="btn btn-primary"
          onClick={ handleLogin }>

          Login
        </button>
    </div>
  )
}