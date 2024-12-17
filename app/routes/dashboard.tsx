import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { json, Link,  Outlet, useNavigate } from '@remix-run/react';
import { LoaderFunction } from '@remix-run/node';
import { requireUserSession } from '~/session.server';

const { Header, Sider, Content } = Layout;
export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserSession(request);
    return json({ message: `Welcome user ${userId}` });
};
const Dashboard: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const navigate = useNavigate();
    const  handleLogout = async()=> {
        console.log('====================================');
        console.log('running');
        console.log('====================================');
        try {
            const response = await fetch('/logout', {
                method: 'POST',
            });
            if (response.ok) {
                navigate('/login');
            } else {
                console.error('Failed to log out');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }
    return (
        <div className="w-[100vw] h-[100vh] bg-orange-400">
            <Layout>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[
                            {
                                key: '1',
                                icon: <UserOutlined />,
                                label: <Link to='/dashboard/products'>Product</Link>,
                            },
                            {
                                key: '2',
                                icon: <VideoCameraOutlined />,
                                label: <Link to='/dashboard/productcontrol'>product Control</Link>,
                            },
                            {
                                key: '3',
                                icon: <VideoCameraOutlined />,
                                label: <button onClick={handleLogout}>Log Out</button>,
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />

                    </Header>
                    <Content
                        style={{
                            margin: '10px',
                            height: "700px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet />

                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default Dashboard;