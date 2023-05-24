
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignupPage.scss';
import { LockOutlined, UserOutlined, MailOutlined, HomeOutlined, PhoneOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';

const Signup = () => {
  
  const { REACT_APP_SERVER_URL } = process.env;
  //State for error message
  const [error, setError] = useState('');

  const navigate = useNavigate();

  //axios post request to Sign up new user.
  const handleSubmit = (formData) => {
    axios
      .post(`${REACT_APP_SERVER_URL}/user/register`, {
          email: formData.email,
          password:formData.password,
          customer_name: formData.customer_name,
          phone: formData.phone,
          address: formData.address,
      })
      .then(() => {
        //Ant Design success message. Lasts for 3 seconds
        message.success('Sign Up in successful', 3);
        //Once Signup successful navigate user to login page.
        navigate('/login');
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  }

  return (
        <div className='signup'>
        {/* Ant Design form with form validation */}
        <Form
      name='normal_login'
      className="signup__form"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
        <Form.Item
        name='customer_name'
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<UserOutlined className='site-form-item-icon' />}
          placeholder='Name'
          className='signup__input'
          autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<MailOutlined  className="site-form-item-icon" />} 
        placeholder='email' 
        className='signup__input'
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
          className='signup__input'
          autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item
        name='address'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<HomeOutlined className="site-form-item-icon" />} 
        placeholder='Address' 
        className='signup__input'
        autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item
        name='phone'
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<PhoneOutlined className="site-form-item-icon" />} 
        placeholder='Phone Number' 
        className='signup__input'
        autoComplete="current-password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name='remember' valuePropName='checked' noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        {/* Error message from axios post request if there's an issue with Signup. */}
        <p className='signup__error'>{error}</p>
      </Form.Item>
    
      <Form.Item>
        <Button type='primary' htmlType='submit' className="signup__button">
        Sign Up!
        </Button>
        <div><a href='/login' className='login__register'>Or Sign In!</a></div>
      </Form.Item>
    </Form>
    </div>
  );
};

export default Signup;