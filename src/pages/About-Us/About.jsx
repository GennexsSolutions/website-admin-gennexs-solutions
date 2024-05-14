import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';
import axios from 'axios';

function About() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [setdata, setData] = useState([]);

  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [formData, setFormData] = useState({
    description: '',
    vision: '',
    mission: '',

  });

  const handleValue = (changedValues) => {
    setFormData({
      ...formData,
      ...changedValues

    })
  }
  const handleSubmit = async (event) => {
    console.log('Form Data:', formData);
    event.preventDefault();
    try {
      const formDataTosend = new FormData();
      formDataTosend.append("description", formData.description);
      formDataTosend.append("vision", formData.vision);
      formDataTosend.append("mission", formData.mission);
      const response = await axios.post('https://api-website-admin-gennexsolutions.onrender.com/about/addAbout', formData,);
      console.log('Response:', response.data.data);
      getData()
      setIsModalVisible(false);

    } catch (error) {
      console.error('Error:', error);
    }
  };
  const getData = async () => {
    axios.get('https://api-website-admin-gennexsolutions.onrender.com/about/getData')
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  //get Data
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
            `https://api-website-admin-gennexsolutions.onrender.com/about/delete/${deleteItemId}`
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


  //delete

  const handleCancelDelete = () => {
    setDeleteConfirmVisible(false);
  };

  const showDeleteConfirm = (itemId) => {
    setDeleteItemId(itemId);
    setDeleteConfirmVisible(true);
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
      title: 'Vision',
      dataIndex: 'vision',
      render: (text) => (
        <div>
          <a>{text}</a>
        </div>
      ),
    },
    {
      title: 'Mission',
      dataIndex: 'mission',
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
          onValuesChange={handleValue}>
          <Form.Item label="ລາຍລະອຽດ" name="description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="vision" name="vision" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="mission" name="mission" rules={[{ required: true }]}>
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
  );
}

export default About;
