import React, { useState } from 'react'
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

function Teams() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    image: '',
  });

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
      title: 'ຊື່',
      dataIndex: 'name',
    },
    {
      title: 'ຕ່ຳແໜ່ງ',
      dataIndex: 'position',
    },
    {
      title: 'ຮູບພາບ',
      dataIndex: 'image',
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
      name: "Hiiiiiii",
      position: "Hiiiiiii",
      image: "",

    },
    {
      key: '2',
      name: "Hiiiiiii",
      position: "Hiiiiiii",
      image: "mission",
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
        <h1>ຊື່</h1>
        <Input
          placeholder="ຊື່"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className='pb-4'>
        <h1>ຕ່ຳແໜ່ງ</h1>
        <Input
          placeholder="ຕ່ຳແໜ່ງ"
          name="position"
          value={formData.position}
          onChange={handleInputChange}
        />
      </div>
      <div className='pb-4'>
        <h1>ຮູບພາບ</h1>
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
      </div>

    </Modal>
  </div>
  )
}

export default Teams