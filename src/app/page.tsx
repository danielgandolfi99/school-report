'use client';

import DashboardLayout from 'layout/DashboardLayout';
import AuthGuard from 'utils/route-guard/AuthGuard';
// project import
import Home from 'views/home/home';

export default function HomePage() {
  return (
    <AuthGuard>
      <DashboardLayout>
        <Home />
      </DashboardLayout>
    </AuthGuard>
  );
}
