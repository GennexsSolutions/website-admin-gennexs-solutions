import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Input, Form } from 'antd';

import axios from 'axios';


function Home() {
    let currenPage = 1;

    const [data, setData] = useState([]);

    const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [formData, setFormData] = useState({
        description: "",
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



    //get Data From API
    useEffect(() => {
        getData()

    }, []);


    const getData = async () => {
        axios.get('https://api-website-admin-gennexsolutions.onrender.com/home/getData')
            .then((res) => {
                console.log(res.data.data);
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }






    const [isModalVisible, setIsModalVisible] = useState(false);


    const handleAddItem = () => {
        setIsModalVisible(true);
    };

    const handleOk = async (event) => {
        event.preventDefault();
        try {
            const formDataTosend = new FormData();
            formDataTosend.append("description", formData.description);
            formDataTosend.append("image", formData.image);
            const headers = {
                'Content-Type': 'multipart/form-data',
            };
            const response = await axios.post('https://api-website-admin-gennexsolutions.onrender.com/home/insertHome', formData, { headers });
            console.log('Response:', response.data.data);
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
                    src={`https://api-website-admin-gennexsolutions.onrender.com/${image}`}
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
        // Logic to open a modal or navigate to a page for updating the record with the given key
        console.log('Update record with key:', key);
    };


    const handleDelete = async () => {
        try {
            // Send a DELETE request with Axios using the deleteItemId
            await axios.delete(
                `https://api-website-admin-gennexsolutions.onrender.com/home/delete/${deleteItemId}`
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

    const handleCancelDelete = () => {
        setDeleteConfirmVisible(false);
    };

    const showDeleteConfirm = (itemId) => {
        setDeleteItemId(itemId);
        setDeleteConfirmVisible(true);
    };




    return (
        <div>
            <Button onClick={handleAddItem} type="primary" style={{ marginBottom: 16, backgroundColor: '' }}>
                ເພີ່ມຂໍ້ມູນ
            </Button>

            <Table columns={columns} dataSource={data} onChange={onChange} pagination={{
                onChange: (page) => {
                    currenPage = page;
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
                    onValuesChange={handleChangeValue} >
                    <Form.Item label="ຊື່ຂໍ້ມູນ" name="description" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item label="ຮູບພາບ">
                        <input type="file" name="logo_en" onChange={handleImage1} />
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
