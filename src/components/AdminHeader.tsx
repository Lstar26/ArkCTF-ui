import React from 'react';
import Link from 'next/link';
// import styles from './AdminHeader.module.css';

const AdminHeader = () => {
  return (
    <header >
      <img src="/logo.png" alt="系统LOGO"  />
      <nav>
        <ul >
          <li >
            <Link href="/admin/admin_dashboard">
              首页
            </Link>
          </li>
          <li >
            <Link href="/admin/user_manage">
              用户管理
            </Link>
          </li>
          <li >
            <Link href="/admin/game_manage">
              赛事管理
            </Link>
          </li>
          <li >
            <Link href="/admin/image_manage">
              镜像管理
            </Link>
          </li>
          <li >
            <Link href="/admin/sys_config">
              系统设置
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;