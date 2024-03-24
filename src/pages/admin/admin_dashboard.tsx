import React, { useEffect, useState } from 'react';
import AdminHeader from '../../components/AdminHeader';

type PodInfo = {
  name: string;
  status: string;
  createTime: string;
};

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [podInfo, setPodInfo] = useState<PodInfo[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/system/sum-users')
      .then(response => response.json())
      .then(data => setUserCount(data.count))
      .catch(error => console.error('获取用户数失败', error));

    fetch('http://127.0.0.1:8080/kube/pods')
      .then(response => response.json())
      .then(data => setPodInfo(data))
      .catch(error => console.error('获取Pod信息失败', error));
  }, []);

  return (
    <div>
      <AdminHeader />
      <h2>欢迎管理员</h2>
      <p>注册用户总数: {userCount}</p>
      <p>集群Pod总数: {podInfo.length}</p>
      <table>
        <thead>
          <tr>
            <th>Pod 名称</th>
            <th>状态</th>
            <th>创建时间</th>
          </tr>
        </thead>
        <tbody>
          {podInfo.map((pod: PodInfo) => (
            <tr key={pod.name}>
              <td>{pod.name}</td>
              <td>{pod.status}</td>
              <td>{pod.createTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
