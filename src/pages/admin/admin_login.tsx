import React, { useState } from 'react';
import { useRouter } from 'next/router'; // 从next/router中引入useRouter

const AdminLogin = () => {
  const router = useRouter(); // 使用useRouter钩子
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); // 阻止表单默认提交行为

    try {
      const response = await fetch('http://localhost:8080/admin/admin-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
      });

      if (response.ok) {
        const { sessionId } = await response.json(); // 解析JSON获取sessionId
        sessionStorage.setItem('admin_session_id', sessionId); // 存储sessionId
        router.push('/admin/admin_dashboard'); // 使用router.push进行路由跳转
      } else {
        alert('登录失败');
        alert(await response.text());
      }
    } catch (error) {
      console.error('登录请求失败', error);
      alert('登录请求失败');
    }
  };

  return (
    <div>
      <h2>管理员登录</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">用户名:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">密码:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  );
};

export default AdminLogin;