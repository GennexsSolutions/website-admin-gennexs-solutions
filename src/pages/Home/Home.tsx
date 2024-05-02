import React, { useState } from 'react';
import { Table, Button, Modal, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

function Home() {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };
    const handleChangeImages = ({ fileList: newFileList }) => setFileList(newFileList);
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
    const [data, setData] = useState([
        {
            key: '1',
            name: 'John Brown',
            image: ""
        },
        {
            key: '2',
            name: 'Jim Green',
            image: ""
        },
        {
            key: '3',
            name: 'Joe Black',
            image: ""
        },
        {
            key: '4',
            name: 'Jim Red',
            image: ""

        },
    ]);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newData, setNewData] = useState({
        name: '',
        image: '', // Adding image field
    });

    const handleAddItem = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        // Add new data to the state
        setData([...data, { key: (data.length + 1).toString(), ...newData }]);
        // Reset newData state and hide modal
        setNewData({
            name: '',
            image: '', // Reset image field
        });
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        // Reset newData state and hide modal
        setNewData({
            name: '',
            image: '', // Reset image field
        });
        setIsModalVisible(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData({ ...newData, [name]: value });
    };

    const columns = [
        {
            title: 'ຂໍ້ມູນ',
            dataIndex: 'name',
        },
        {
            title: 'ຮູບພາບ',
            dataIndex: 'image', // Display image field in table
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

    const handleUpdate = (key) => {
        // Logic to open a modal or navigate to a page for updating the record with the given key
        console.log('Update record with key:', key);
    };

    const handleDelete = (key) => {
        // Logic to delete the record with the given key
        setData(data.filter(item => item.key !== key));
        console.log('Delete record with key:', key);
    };

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <div>
            <Button onClick={handleAddItem} type="primary" style={{ marginBottom: 16, backgroundColor: '' }}>
                ເພີ່ມຂໍ້ມູນ
            </Button>

            <Table columns={columns} dataSource={data} onChange={onChange} />

            <Modal
                title="ເພີ່ມຂໍ້ມູນໃໝ່"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Input placeholder="ລາຍລະອຽດ" name="name" value={newData.name} onChange={handleChange} />
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-circle"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChangeImages}
                    className='pt-10'
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{
                            display: 'none',
                        }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </Modal>
        </div>
    );
}

export default Home;
