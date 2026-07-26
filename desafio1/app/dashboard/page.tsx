'use client';

import { Provider } from 'react-redux';
import store from '@/redux/store';
import Dashboard from '@/components/Dashboard';
import NavigationBarSS from '@/components/BarraNavegacion';

export default function DashboardPage() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-50 px-4 py-8 pb-24">
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <Dashboard />
          <NavigationBarSS />
        </main>
      </div>
    </Provider>
  );
}
