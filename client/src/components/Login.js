// important dependencies
import React,{useState,useEffect} from 'react';
import { Form, Input,message } from 'antd'
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';

// arrow function
const Login = () => {
    const navigate = useNavigate()
    const [loading,setlLoading]=useState(false)
    //form submit
    const submitHandler = async (values) => {
        try{
            setlLoading(true)
            const {data} = await axios.post('/login',values)
            setlLoading(false)
            message.success('Login Successfull')
            localStorage.setItem('user',JSON.stringify({...data.user,password:''}))  
            navigate('/');
        }catch(error){
            setlLoading(false)
            message.error("Something went wrong");
        }
    };
    //prevent for login user
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate('/');
        }
    },[navigate]);
    return (// login form
        <>

            <div className='register-page '>
            {loading && <Spinner/>}
                <Form layout='vertical' onFinish={submitHandler}>
                    <h1>Login Form</h1>
                    <Form.Item label='Email' name='email'>
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item label='password' name='password'>
                        <Input type='password' />
                    </Form.Item>

                    <div className='d-flex justify-content-between'>
                        <Link to="/reguser">  click Here to register before login </Link>
                        <button className='btn btn-primary'>Login</button>
                    </div>
                </Form>
            </div>

        </>
    )
}

export default Login;