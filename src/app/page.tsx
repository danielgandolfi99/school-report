'use client';

import useUser from 'hooks/useUser';
import DashboardLayout from 'layout/DashboardLayout';
import StudentLayout from 'layout/StudentLayout';
// import AuthGuard from 'utils/route-guard/AuthGuard';
// project import
import Home from 'views/home/home';
import HomeStudents from 'views/students/home';

export default function HomePage() {
  const user = useUser();

  return (
    //<AuthGuard>
    <>
      {user && user.user.role === 'adm' ? (
        <DashboardLayout>
          <Home />
        </DashboardLayout>
      ) : (
        <StudentLayout>
          <HomeStudents />
        </StudentLayout>
      )}
    </>
    //</AuthGuard>
  );
}
