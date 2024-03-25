import React, { useState, useEffect } from 'react';
import { Button, Table, Input, Space, Form } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Column } = Table;
const { Search } = Input;

const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/system/list-users')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleEdit = (user: any) => { // Updated handleEdit function
    setEditingUser(user);
    // Open modal for editing user
  };

  const handleDelete = (id: string) => {
    axios.delete(`http://localhost:8080/system/delete-user?id=${id}`)
      .then(res => {
        setUsers(users.filter((user: { id: string }) => user.id !== id));
      })
      .catch(err => console.log(err));
  };

  const handleFormSubmit = (newUserInfo: any) => {
    axios.put('http://localhost:8080/system/update-user', newUserInfo)
      .then(res => {
        // Update user list
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <Search placeholder="输入用户名搜索" onSearch={handleSearch} style={{ width: 200, marginBottom: 20 }} />
      <Table dataSource={users.filter((user: { username: string }) => user.username.includes(searchText))}>
        <Column title="用户名" dataIndex="username" key="username" />
        <Column title="密码" dataIndex="password" key="password" />
        <Column title="邮箱" dataIndex="email" key="email" />
        <Column title="角色" dataIndex="role" key="role" />
        <Column
          title="操作"
          key="action"
          render={(text: string, record: any) => (
            <Space size="middle">
              <Button type="primary" onClick={() => handleEdit(record)}>编辑</Button> {/* Updated onClick event */}
              <Button type="link" onClick={() => handleDelete(record.id)}>删除</Button> {/* Updated onClick event */}
            </Space>
          )}
        />
      </Table>
      {editingUser && (
        <Form initialValues={editingUser} onFinish={handleFormSubmit}>
          {/* Form fields */}
        </Form>
      )}
    </div>
  );
};

export default UserManage;
