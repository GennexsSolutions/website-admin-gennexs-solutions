import React, { useState, useEffect } from 'react'
import { Table, Button, Modal, Input, Form } from 'antd';
import axios from 'axios';


function Contact() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setdata, setData] = useState([]);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    tell: '',
    email: '',
    village: "",
    district: "",
    province: ""
  });

  const handleValue = (changedValues) => {
    setFormData({
      ...formData,
      ...changedValues

    })
  }

  //get Data
  const getData = async()=>{
    axios.get('https://api-website-admin-gennexsolutions.onrender.com/contact/getData')
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
  
  }, []);

  const handleUpdate = (key) => {
    console.log('Update record with key:', key);
  };

  const handleDelete = async () => {
    try {
        // Send a DELETE request with Axios using the deleteItemId
        await axios.delete(
            `https://api-website-admin-gennexsolutions.onrender.com/contact/delete/${deleteItemId}`
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

  const handleShowdialog = () => {
    setIsModalVisible(true);
  };



  const handleCancel = () => {
    setIsModalVisible(false);
  };



  const handleSubmit = async (event) => {
    console.log('Form Data:', formData);
    event.preventDefault();
    try {
      const formDataTosend = new FormData();
      formDataTosend.append("description", formData.description);
      formDataTosend.append("tell", formData.tell);
      formDataTosend.append("email", formData.email);
      formDataTosend.append("village", formData.village);
      formDataTosend.append("district", formData.district);
      formDataTosend.append("province", formData.province);
      const response = await axios.post('https://api-website-admin-gennexsolutions.onrender.com/contact/contact', formData,);
      console.log('Response:', response.data.data);
      getData();
      setIsModalVisible(false);
      
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  const columns = [
    {
      title: 'ລາຍລະອຽດ',
      dataIndex: 'description',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'ເບີໂທ',
      dataIndex: 'tell',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'ອີເມວ',
      dataIndex: 'email',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'ບ້ານ',
      dataIndex: 'village',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'ເມືອງ',
      dataIndex: 'district',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'ແຂວງ',
      dataIndex: 'province',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
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


  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };


  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
  };

  const showDeleteConfirm = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteConfirmVisible(true);
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
        onOk={handleSubmit}
        onCancel={handleCancel}
      >
        <Form layout="vertical"
          name="wrap"
          labelAlign="left"
          labelWrap
          colon={false}
          onValuesChange={handleValue} >
          <Form.Item label="ລາຍລະອຽດ" name="description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ເບີໂທ" name="tell" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ອີເມວ" name="email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ບ້ານ" name="village" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ເມືອງ" name="district" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ແຂວງ" name="province" rules={[{ required: true }]}>
            <Input />
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

export default Contact