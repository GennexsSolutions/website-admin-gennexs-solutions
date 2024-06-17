import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';
import axios from 'axios';

function Home() {
    let currentPage = 1;

    const [data, setData] = useState([]);
    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [formData, setFormData] = useState({
        description: "",
        image: '',
    });

    const handleImage1 = (e) => {
        const file = e.target.files[0];
        const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

        if (file && validImageTypes.includes(file.type)) {
            setFormData({
                ...formData,
                image: file,
            });
        } else {
            alert("Please select a valid image file (jpg, jpeg, png).");
        }
    };

    const handleChangeValue = (changedValues) => {
        setFormData({
            ...formData,
            ...changedValues,
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get('https://api-website-admin-gennexsolutions.onrender.com/home/getData');
            console.log("dataAll===", res.data.data);
            setData(res.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleAddItem = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (event) => {
        event.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("description", formData.description);
            formDataToSend.append("image", formData.image);

            const headers = {
                'Content-Type': 'multipart/form-data',
            };

            const response = await axios.post('https://api-website-admin-gennexsolutions.onrender.com/home/insertHome', formDataToSend, { headers });
            console.log('Response======', response.data.data);
            setIsModalVisible(false);
            getData();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const columns = [
        {
            title: 'ຂໍ້ມູນ',
            dataIndex: 'description',
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
                    src={image}
                    alt='image'
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

    const handleUpdate = (key) => {
        console.log('Update record with key:', key);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://api-website-admin-gennexsolutions.onrender.com/home/delete/${deleteItemId}`);
            console.log("Data deleted successfully!");
            setDeleteConfirmVisible(false);
            getData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

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
            <Button onClick={handleAddItem} type="primary" style={{ marginBottom: 16 }}>
                ເພີ່ມຂໍ້ມູນ
            </Button>

            <Table columns={columns} dataSource={data} onChange={onChange} pagination={{
                onChange: (page) => {
                    currentPage = page;
                },
            }} />

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
                    onValuesChange={handleChangeValue}>
                    <Form.Item label="ຊື່ຂໍ້ມູນ" name="description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="ຮູບພາບ">
                        <input type="file" accept=".jpg,.jpeg,.png" onChange={handleImage1} />
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

export default Home;
