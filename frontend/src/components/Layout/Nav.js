// NavBar.js

import React from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  HomeOutlined,
  AppstoreOutlined,
  HeartOutlined,
  UserOutlined,
  LoginOutlined,
  UserAddOutlined,
} from '@ant-design/icons';

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/authContext';
import { signUserOut } from '../../firebase/auth';
 


const { Header } = Layout;

const NavBar = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
  return (
    <Header>
        <Menu theme="dark" mode="horizontal" style={{ flexGrow: 1 }}>

        <div className="logo">WonderWorks</div>


      
        <Menu.Item key="home" icon={<HomeOutlined />}>
            <Link to="">
                Home
            </Link>
        </Menu.Item>

        <Menu.Item key="explore" icon={<AppstoreOutlined />}>
            Explore
        </Menu.Item>
        <Menu.Item key="features" icon={<HeartOutlined />}>
            Features
        </Menu.Item>

        {
            userLoggedIn
            ?
            <Menu.Item >
                <Button onClick={() => {signUserOut().then(() => {navigate("/")})}}>Sign Out</Button>
            </Menu.Item>
            :
            <>

                <Menu.Item >
                    <Link to="Login">
                        <Button type="primary" icon={<LoginOutlined />}>
                            Login
                        </Button>
                    </Link>
                </Menu.Item>

                <Menu.Item>
                    <Link to="Signup">
                        <Button type="primary" icon={<LoginOutlined />}>
                            Sign Up
                        </Button>
                    </Link>
                </Menu.Item>
            
            </>

        }

        </Menu>
    </Header>
  );
};

export default NavBar;
