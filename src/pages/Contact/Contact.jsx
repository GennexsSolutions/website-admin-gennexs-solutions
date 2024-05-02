import React, { useState } from 'react'
import { Table, Button, Modal, Input } from 'antd';


function Contact() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    detail: '',
    tell: '',
    email: '',
    village:"",
    district:"",
    province:""
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
      title: 'ເບີໂທ',
      dataIndex: 'tell',
    },
    {
      title: 'ອີເມວ',
      dataIndex: 'email',
    },
    {
      title: 'ບ້ານ',
      dataIndex: 'village',
    },
    {
      title: 'ເມືອງ',
      dataIndex: 'district',
    },
    {
      title: 'ແຂວງ',
      dataIndex: 'province',
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
      tell: "Hiiiiiii",
      email: "mission",
      village: "village",
      district: "district",
      province: "province",
    },
    {
      key: '2',
      detail: 'Jim Green',
      tell: "Hiiiiiii",
      email: "mission",
      village: "village",
      district: "district",
      province: "province",
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
      <h1>ເບີໂທ</h1>
      <Input
        placeholder="ເບີໂທ"
        name="tell"
        value={formData.tell}
        onChange={handleInputChange}
      />
      </div>
      <div className='pb-4'>
      <h1>ອີເມວ</h1>
      <Input
        placeholder="example@gmail.com"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
      />
      </div>
      <div className='pb-4'>
      <h1>ບ້ານ</h1>
      <Input
        placeholder="ບ້ານ"
        name="village"
        value={formData.village}
        onChange={handleInputChange}
      />
      </div>
      <div className='pb-4'>
      <h1>ເມືອງ</h1>
      <Input
        placeholder="ເມືອງ"
        name="district"
        value={formData.district}
        onChange={handleInputChange}
      />
      </div>
      <div className='pb-4'>
      <h1>ແຂວງ</h1>
      <Input
        placeholder="ແຂວງ"
        name="province"
        value={formData.province}
        onChange={handleInputChange}
      />
      </div>
    </Modal>
  </div>
  )
}

export default Contact