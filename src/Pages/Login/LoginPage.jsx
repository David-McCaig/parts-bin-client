import React from 'react';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.scss';
import AuthContext from '../../Contexts/AuthContext';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';

const Login = () => {

  const { REACT_APP_SERVER_URL } = process.env;
  //sending data and setting state using useContext hook.
  const { setUser, success, setSuccess } = useContext(AuthContext)
  //state for error message.
  const [error, setError] = useState('');

  const handleSubmit = (formData) => {
    axios
      .post(`${REACT_APP_SERVER_URL}/user/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        //authToken stored in session storage if login successfull
        sessionStorage.setItem('authToken', res.data.token);
        //set Success to true. Navigates to Upload page. See line 81.
        setSuccess(true);
        //Updates user info
        setUser(res.data);
        //Ant design success message
        message.success('Log in successful', 2);
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
    <div className='login'>
    

      {/* Ant design login form with validation */}
      <Form
        name='normal_login'
        className="login__form"
        initialValues={{ remember: true }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name='email'
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder='email'
            className='login__input'
            autoComplete="current-password"
          />
        </Form.Item>
        
        <Form.Item
          name='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className='site-form-item-icon' />}
            type='password'
            placeholder='Password'
            className='login__input'
            autoComplete="current-password"
          />
        </Form.Item>
        
        <Form.Item>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' className="login__button">
            Log in
          </Button>
          <div>or <a href='/signup' className='login__register'>Register now!</a> to post an add</div>
          {/* If invalide name or password error message will show up. */}
          {error && <div className="login__message">{error}</div>}
          {/* If successful login. Navigates to upload page */}
          {success && <Navigate to='/upload' />}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

