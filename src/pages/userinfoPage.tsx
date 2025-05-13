import { Badge, Button, message, Upload, Descriptions, Row, Col, InputNumber, Flex, Tag, Drawer, Form, Space, Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { GetProp, UploadProps } from 'antd';


import TextArea from 'antd/lib/input/TextArea';
import type { DescriptionsProps } from 'antd';
import React from 'react';
import { AliyunOutlined, LoadingOutlined, PlusOutlined, AntDesignOutlined, FireOutlined } from '@ant-design/icons';
import { _config, IsAdmin, IsDevlop } from '../Model/GlobalData';
import PayCode from '../Model/func/Base64ToImage'
import dayjs from 'dayjs';
import * as CFApi from '../Model/func/CFApi';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();


  new Promise<void>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {

      resolve();
    };
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.onerror = reject;
    reader.readAsDataURL(img);
  });
};

const beforeUpload = async (file: FileType) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg';
  if (!isJpgOrPng) {
    message.error('请上传PNG|JPG|JPGE');
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('不要上传大于2MB的图片');
    return false;
  }
  return true;
};


const UserinfoPage: React.FC = () => {

  const [loading, setLoading] = React.useState(false);
  const [imageUrl, setImageUrl] = React.useState<string>();

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
        form.setFieldsValue({ payMentIcon: url });
      });
      return;
    }
  };

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>上传</div>
    </button>
  );



  //#region EditMenu 
  const [openMenu, setMenuOpen] = React.useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      var usertemp = _config.CurrentUser;
      usertemp.payeecodeBase64 = values.payMentIcon || _config.CurrentUser.payeecodeBase64;
      usertemp.kookUsername = values.kookName;
      usertemp.descriptions = values.description;

      const result = await CFApi.PutUserAsync(usertemp, _config.CurrentUser.token);

      localStorage.setItem('CurrentUser', JSON.stringify(usertemp));
      window.location.reload();
    } catch (errorInfo) {

      console.log('Failed:', errorInfo);
    }
  };



  const showDrawer = () => {
    setMenuOpen(true);
  };
  const onClose = async () => {
    setMenuOpen(false);
  }

  function EditMenu() {
    return (
      <Drawer
        title="修改个人信息"
        width={420}
        onClose={onClose}
        open={openMenu}
        styles={{
          body: {
            paddingBottom: 80,
          },
          content: {
            backgroundColor: 'transparent'
          },
          mask: {
            backgroundColor: 'transparent',
            backdropFilter: 'blur(10px)'
          },
          wrapper: {
            backdropFilter: 'blur(30px)',
            backgroundColor: 'rgba(255,255,255,.1)',
          }
        }}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={async () => {
              handleSubmit();
              onClose();
            }} type="primary">
              提交
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="kookName"
                label="KOOK用户名"
                rules={[{ required: false, message: 'KOOK用户全名' }]}
              >
                <Input placeholder="KOOKNAME#1234" variant='filled' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="个人描述"
                rules={[{ required: false, message: '个人描述' }]}
              >
                <TextArea maxLength={30} variant='filled' style={{ height: '100px' }} placeholder='' />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={20}>
              <Form.Item
                name="payMentIcon"
                label="收款码"
                rules={[{ required: true, message: '收款码' }]}
              >
                <Space direction='horizontal'>
                  <Flex gap="middle" wrap>
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                  </Flex>

                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    )
  }


  //#endregion









  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '用户名',
      children: `${_config.CurrentUser.username}`,
    },
    {
      key: '2',
      label: 'ID',
      children: `${_config.CurrentUser.id}`,
    },
    {
      key: '3',
      label: '封禁',
      children: `${_config.CurrentUser.isEnable ? '否' : '封禁中'}`,
    },
    {
      key: '4',
      label: '注册时间',
      children: `${dayjs(_config.CurrentUser.createDate).format('DD/MM/YYYY')}`,
    },
    {
      key: '5',
      label: '邮箱',
      children: `${_config.CurrentUser.email}`,
      span: 2,
    },
    {
      key: '6',
      label: '在线状态',
      children: <Badge status="processing" text="在线" />,
      span: 3,
    },
    {
      key: '7',
      label: '总收入',
      children: (`${_config.CurrentUser.totalincome}￥`),
    },
    {
      key: '8',
      label: 'KOOK',
      children: `${_config.CurrentUser.kookUsername}`,
      span: 2,
    },
    {
      key: '9',
      label: '描述',
      children: `${_config.CurrentUser.descriptions}`,
      span: 3,
    },
    {
      key: '10',
      label: '权限组', //55acee  cd201f  3b5999
      children: (
        <>
          <Flex gap="4px 5px" wrap>
            <Tag icon={<AntDesignOutlined />} color={IsDevlop() ? '#55acee' : 'rgba(0,0,0,.1)'}>
              开发者
            </Tag>

            <Tag icon={<AliyunOutlined />} color={IsAdmin() ? '#cd201f' : 'rgba(0,0,0,.1)'}>
              管理员
            </Tag>

            <Tag icon={<FireOutlined />} color="#3b5999">
              用户
            </Tag>
          </Flex>
        </>
      )
    },
    {
      key: '11',
      label: '收款码',
      children: (
        <>
          <div>
            <PayCode base64code={_config.CurrentUser.payeecodeBase64} />
          </div>
        </>
      ),
    },
  ];



  return (
    <>
      <EditMenu />
      <div className="card">
        <div style={{ position: 'absolute' }}>
          <Button type='dashed' onClick={() => { showDrawer() }}>编辑</Button>
        </div>
        <div>
          <Descriptions title="个人信息" bordered items={items} />
        </div>
      </div>
    </>
  );
};

export default UserinfoPage;