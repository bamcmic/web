import './navbar.css';
import React, { FC, useEffect, useState } from 'react';
import { Flex, Segmented, Avatar, Tooltip, Button, Space } from 'antd';
import { AntDesignOutlined, ContainerOutlined, FolderOutlined, GiftOutlined, HomeOutlined, InfoCircleOutlined, TeamOutlined, UserOutlined, } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import { _config } from '../Model/GlobalData';

const navMenu = [
  { title: '主页', url: '/', id: 1, icon: (<HomeOutlined />) },
];

const navMenuAdmin = [
  /* { title: '存单', url: '/tradePage', id: 3 ,icon:(<FolderOutlined />)},
   { title: '管理用户', url: '/manageusers', id: 6,icon:(<TeamOutlined />) },*/
];

const rightMenu = [
  { title: '账户', url: '/@me', id: 4, icon: (<UserOutlined />) },
  { title: '关于', url: '/@about', id: 7, icon: (<InfoCircleOutlined />) },
];

const Navbar = () => {
  const location = useLocation();
  const [selectedValue, setSelectedValue] = useState(location.pathname);
  const hasAdmin = _config.CurrentUser?.permission?.includes('Admin') || _config.CurrentUser?.permission?.includes('Devlop') || false;

  const menuList = hasAdmin ? [...navMenu, ...navMenuAdmin, ...rightMenu] : [...navMenu, ...rightMenu];


  useEffect(() => {
    const currentPath = location.pathname;
    if (menuList.some((item) => item.url === currentPath)) {
      setSelectedValue(currentPath);
    } else {
      setSelectedValue(menuList[0].url);
    }
  }, [location.pathname, menuList]);

  const ClearCashing = async () => {
    localStorage.clear();
    window.location.reload();
  };

  const segmentOptions = menuList.map((product) => ({
    label: (
      <Link to={product.url}>
        <div style={{ padding: 4 }}>
          {product.icon}
          <div>{product.title}</div>
        </div>
      </Link>
    ),
    value: product.url,
  }));

  return (
    <div className="navbar-topbox">
      <Tooltip title="注销">
        <AntDesignOutlined
          onClick={ClearCashing}
          style={{ fontSize: '40px', color: 'whitesmoke' }}
          className="BlogLogo"
        />
      </Tooltip>
      <Space direction='horizontal' style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Flex gap="small" style={{ marginRight: '6vw', borderRadius: '5px' }} align="flex-start" vertical>
          <Segmented
            options={segmentOptions}
            value={selectedValue}
            style={{
              backgroundColor: 'transparent'
            }}
          />
        </Flex>
      </Space>
    </div>
  );
};

export default Navbar;