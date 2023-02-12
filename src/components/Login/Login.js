import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type == 'UPDATE_ENTERED_EMAIL') {
    return { value: action.value, isValid: action.value.includes('@') };
  }

  if (action == 'VALIDATE_EMAIL') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'UPDATE_ENTERED_PASSWORD') {
    return { value: action.value, isValid: action.value.trim().length > 6 };
  }
  if (action === 'VALIDATE_PASSWORD') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmailState] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });
  const [passwordState, dispatchPasswordState] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  });

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const timeoutHandler = setTimeout(() => {
      console.log('checking validation...');
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 5000);

    // clean up function
    return () => {
      // clear timeout
      clearTimeout(timeoutHandler);
      console.log('clean up function');
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (e) => {
    // dispatch an action
    dispatchEmailState({
      type: 'UPDATE_ENTERED_EMAIL',
      value: e.target.value,
    });
  };

  const passwordChangeHandler = (e) => {
    dispatchPasswordState({
      type: 'UPDATE_ENTERED_PASSWORD',
      value: e.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmailState('VALIDATE_EMAIL');
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState('VALIDATE_PASSWORD');
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            id='email'
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type='submit' className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
