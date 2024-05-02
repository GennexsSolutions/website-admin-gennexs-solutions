import React, { useState } from 'react';
import { Table, Button, Modal, Input } from 'antd';

function About() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    detail: '',
    vision: '',
    mission: ''
  });

  const handleUpdate = (key) => {
    console.log('Update record with key:', key);
  };

  const handleDelete = (key) => {
    console.log('Delete record with key:', key);
  };

  const handleShowdialog = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    // Here you can perform any action you want with the form data, like submitting it or updating the state
    console.log('Form Data:', formData);
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'ລາຍລະອຽດ',
      dataIndex: 'detail',
    },
    {
      title: 'Vision',
      dataIndex: 'vision',
    },
    {
      title: 'Mission',
      dataIndex: 'mission',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleUpdate(record.key)} type="primary" style={{ marginRight: 8 }}>ແກ້ໄຂ</Button>
          <Button onClick={() => handleDelete(record.key)} type="default" style={{ color: '#ff0000' }}>ລົບ</Button>
        </span>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      detail: 'John Brown',
      vision: "Hiiiiiii",
      mission: "mission"
    },
    {
      key: '2',
      detail: 'Jim Green',
      vision: "Hiiiiiii",
      mission: "mission",
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <div>
      <Button onClick={handleShowdialog} type="primary" style={{ marginBottom: 16 }}>
        ເພີ່ມຂໍ້ມູນ
      </Button>
      <Table columns={columns} dataSource={data} onChange={onChange} />
      <Modal
        title="ເພີ່ມຂໍ້ມູນໃໝ່"
        visible={isModalVisible}
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <div className='pb-4'>
          <h1>ລາຍລະອຽດ</h1>
        <Input
          placeholder="ລາຍລະອຽດ"
          name="detail"
          value={formData.detail}
          onChange={handleInputChange}
        />
        </div>
        <div className='pb-4'>
        <h1>vision</h1>
        <Input
          placeholder="vision"
          name="vision"
          value={formData.vision}
          onChange={handleInputChange}
        />
        </div>
        <div className='pb-4'>
        <h1>mission</h1>
        <Input
          placeholder="mission"
          name="mission"
          value={formData.mission}
          onChange={handleInputChange}
        />
        </div>
      </Modal>
    </div>
  );
}

export default About;
