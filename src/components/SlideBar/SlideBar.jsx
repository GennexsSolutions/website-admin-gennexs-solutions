import React, { useState } from 'react'
import { Button, Layout, Menu, theme, Divider } from 'antd';
import logo from '../../assets/images/logo.jpeg'
import { useNavigate } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    ContactsOutlined,
    CustomerServiceOutlined,
    ProjectOutlined,
    TeamOutlined

} from '@ant-design/icons';
import AppRoute from '../Route/Route';

const { Header, Sider, Content } = Layout;

function SlideBar() {
    const navigat = useNavigate()
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (


        <Layout className='h-screen'>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <div className="flex items-center justify-center pt-10">
                <img className=" w-20 p-2  rounded-full" src={logo} alt="Image" />

                    <h1 className="text-white font-bold">Gennex Solutions</h1>
                </div>
                <Divider className='bg-white'/>

                <Menu
                    theme="dark"
                    mode="inline"
                    onClick={(item) => navigat(item.key)}
                    items={[
                        {
                            key: '/',
                            icon: <HomeOutlined />,
                            label: 'Home',
                        },
                        {
                            key: '/about',
                            icon: <InfoCircleOutlined />,
                            label: 'About Us',
                        },
                        {
                            key: '/contact',
                            icon: <ContactsOutlined />,
                            label: 'Contact Us',
                        },
                        {
                            key: '/service',
                            icon: <CustomerServiceOutlined />,
                            label: 'Services',
                        },
                        {
                            key: '/project',
                            icon: <ProjectOutlined />,
                            label: 'Project',
                        },
                        {
                            key: '/teams',
                            icon: <TeamOutlined />,
                            label: 'Teams',
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
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <AppRoute />
                </Content>
            </Layout>
        </Layout>
    )
}

export default SlideBar