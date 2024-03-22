import { useRef, useState, useContext } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton } from '@mui/material';

import Joi from "joi";

import { loginUser, signUpUser } from '../api/users';
import { AuthContext } from '../../shared/context/auth-context';

import './Authenticate.css';

const Authenticate = (props) => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [isLoginMode, setLoginMode] = useState(true);
  const [inputError, setInputError] = useState();

  const auth = useContext(AuthContext);

  const schema = Joi.object().keys({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string()
      .min(4)
      .email({ tlds: { allow: false } })
      .required(),
    password: Joi.string().min(8).required(),
  });
  const backgroundColor = 'white';

  const switchModeHanlder = () => {
    setLoginMode((prevMode) => !prevMode);
    setInputError();
    if (nameRef.current) {
      nameRef.current.style.backgroundColor = backgroundColor;
    }
    if (emailRef.current) {
      emailRef.current.style.backgroundColor = backgroundColor;
      emailRef.current.value = "";
    }
    if (passwordRef.current) {
      passwordRef.current.style.backgroundColor = backgroundColor;
      passwordRef.current.value = "";
    }
  };

   const signUpUserMutation = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      console.log(data);
      auth.login(data.id, data.token, data.role);
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      setInputError({ signup: "Email exists" });
    },
  });

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // Will execute only once, for the last mutation,
      // regardless which mutation resolves first
      console.log(data);
      auth.login(data.id, data.token, data.role);
      navigate("/");
    },
    onError: (error) => {
      // An error happened!
      setInputError({ login: "Wrong credentials" });
      console.log(error);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (isLoginMode) {
      loginUserMutation.mutate({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    } else {
      signUpUserMutation.mutate({
        username: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

   return (
    <div className="background" >
      <Card
        style={{ padding: "20px", backgroundColor: backgroundColor, marginTop: '0'}}
        data-testid="authPage"
        className="authentication"
      >
        <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
        <form className="authentication form" onSubmit={onSubmitHandler}>
          {!isLoginMode && (
            <Input id="username" ref={nameRef} type="text" label="Username" className="inputs"/>
          )}
          <Input id="email" ref={emailRef} type="text" label="Email" className="inputs"/>
          <Input
            id="password"
            ref={passwordRef}
            type="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            className="inputs"
          />

          <Button
          type="submit"
          variant="contained"
          style={{display: "grid", margin: "auto", position:"relative", marginTop:"0.5rem"}}
          >
            {isLoginMode ? "LOGIN" : "SIGNUP"}
          </Button>
         </form>
        <Button
          variant="outlined"
          onClick={switchModeHanlder}
          style={{display: "grid", margin: "auto", position:"relative", marginTop: "0.5rem"}}
          >
          {isLoginMode ? "SignUp" : "Login"} instead?
        </Button>
        {inputError ? (
          <div style={{ color: "red" }}>{inputError.name}</div>
        ) : null}
        {inputError ? (
          <div style={{ color: "red" }}>{inputError.email}</div>
        ) : null}
        {inputError ? (
          <div style={{ color: "red" }}>{inputError.password}</div>
        ) : null}
        {inputError ? (
          <div style={{ color: "red" }}>{inputError.login}</div>
        ) : null}
        {inputError ? (
          <div style={{ color: "red" }}>{inputError.signup}</div>
        ) : null}
      </Card>
    </div>
  );
};

export default Authenticate;