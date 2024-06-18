import React, { useState,useEffect } from 'react'
import { Table, Button, Modal, Input,Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';


function Teams() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setdata, setData] = useState([]);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    image: '',
  });


  const handleImage1 = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      image: file,
    });
  };
  const handleChangeValue = (changedValues) => {
    // Update the form data when any field changes
    setFormData({
      ...formData,
      ...changedValues,
    });
  };

  const getData = async()=>{
    axios.get('https://api-website-admin-gennexsolutions.onrender.com/teams/getData')
    .then((res) => {
      console.log(res.data.data);
      setData(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
   getData()
  },[]);

  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
  };

  const showDeleteConfirm = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteConfirmVisible(true);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        ເລືອກຮູບພາບ
      </div>
    </button>
  );

  const handleUpdate = (key) => {
    console.log('Update record with key:', key);
  };



  const handleShowdialog = () => {
    setIsModalVisible(true);
  };

  const handleOk =async (event) => {
    event.preventDefault();
    try {
        const formDataTosend = new FormData();
        formDataTosend.append("name", formData.name);
        formDataTosend.append("position", formData.position);
        formDataTosend.append("image", formData.image);
        const headers = {
            'Content-Type': 'multipart/form-data',
        };
        const response = await axios.post('https://api-website-admin-gennexsolutions.onrender.com/teams/insertTeams', formData, { headers });
        console.log('Response:', response.data.data);
        getData();
        setIsModalVisible(false);
    } catch (error) {
        console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const columns = [
    {
      title: 'ຊື່',
      dataIndex: 'name',
      render: (text) => (
        <div>
            <a>{text}</a>
        </div>
    ),
    },
    {
      title: 'ຕ່ຳແໜ່ງ',
      dataIndex: 'position',
      render: (text) => (
        <div>
            <a>{text}</a>
        </div>
    ),
    },
    {
      title: 'ຮູບພາບ',
      dataIndex: 'image',
      render: (image) => (
        <img
            className='rounded-full h-20 w-20'
            src={`https://api-website-admin-gennexsolutions.onrender.com/images/${image}`}
            alt='image'
            onClick={() => handlePreview(image)}
        />
    )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <span>
          <Button onClick={() => handleUpdate(record.key)} type="primary" style={{ marginRight: 8 }}>ແກ້ໄຂ</Button>
          <Button onClick={() => showDeleteConfirm(record._id)} type="default" style={{ color: '#ff0000' }}>ລົບ</Button>
        </span>
      ),
    },
  ];

  const handleDelete = async () => {
    try {
        // Send a DELETE request with Axios using the deleteItemId
        await axios.delete(
            `https://api-website-admin-gennexsolutions.onrender.com/teams/delete/${deleteItemId}`
        );

        // Handle success, e.g., show a success message or update the data
        console.log("Data deleted successfully!");

        // Close the delete confirmation modal
        setDeleteConfirmVisible(false);

        // Fetch data again or update the state to reflect the changes
        getData();
    } catch (error) {
        // Handle error, e.g., show an error message
        console.error("Error deleting data:", error);
    }
};



  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  return (
    <div>
    <Button onClick={handleShowdialog} type="primary" style={{ marginBottom: 16 }}>
      ເພີ່ມຂໍ້ມູນ
    </Button>
    <Table columns={columns} dataSource={setdata} onChange={onChange} />
    <Modal
      title="ເພີ່ມຂໍ້ມູນໃໝ່"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
       <Form layout="vertical"
          name="wrap"
          labelAlign="left"
          labelWrap
          colon={false}
          onValuesChange={handleChangeValue} >
          <Form.Item label="ຊື່" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ຕຳແໜ່ງ" name="position" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="ຮູບພາບ">
            <input type="file" name="image" onChange={handleImage1} />
          </Form.Item>
        </Form>

    </Modal>

    <Modal
        title="ແຈ້ງເຕືອນ"
        visible={deleteConfirmVisible}
        onCancel={handleCancelDelete}
        footer={[
          <Button key="cancel" onClick={handleCancelDelete}>
            ບໍ່! ຕົກລົງ
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDelete}>
            ຕົກລົງ
          </Button>,
        ]}
        destroyOnClose={true}
      >
        ທ່ານຕ້ອງການທີ່ຈະລົບຂໍ້ມູນນີ້ແທ້ ຫຼື ບໍ່?
      </Modal>
  </div>
  )
}

export default Teams