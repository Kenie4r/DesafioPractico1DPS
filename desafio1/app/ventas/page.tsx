'use client';

import { Provider } from 'react-redux';
import store from '@/redux/store';
import ComprasTable from '@/components/comprasTable';
import NavigationBarSS from '@/components/BarraNavegacion';
import ModalCompra from '@/components/modalCompra';
import { useState } from 'react';

export default function Home() {
  const [seleccionCompra, setSeleccionCompra] = useState(null);

  return (
    <Provider store={store}>
      <div className="min-h-screen bg-slate-50 px-4 py-8 pb-24">
        <main className="mx-auto flex w-full max-w-7xl flex-col gap-6">
          <ComprasTable onSelectCompra={(compra) => setSeleccionCompra(compra)} />
          <ModalCompra compra={seleccionCompra} cerrarSeleccion={() => setSeleccionCompra(null)} />
          <NavigationBarSS />
        </main>
      </div>
    </Provider>
  );
}
