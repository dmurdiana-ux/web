/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MenuMBGData } from './types';
import { DEFAULT_MENU } from './data/defaultMenu';
import { PublicMenuView } from './components/PublicMenuView';
import { AdminMenuForm } from './components/AdminMenuForm';

const STORAGE_KEY = 'mbg_menu_palasari_cibiru_v1';

export default function App() {
  const [menuData, setMenuData] = useState<MenuMBGData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to load menu from localStorage', e);
    }
    return DEFAULT_MENU;
  });

  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  // Detect URL parameter on load (e.g. ?view=admin or ?view=public)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam === 'admin') {
      setCurrentView('admin');
    } else {
      setCurrentView('public');
    }

    // Listen to history popstate for smooth back/forward navigation
    const handlePopState = () => {
      const p = new URLSearchParams(window.location.search);
      if (p.get('view') === 'admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('public');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleSaveMenu = (newData: MenuMBGData) => {
    setMenuData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Failed to save menu to localStorage', e);
    }
  };

  const navigateTo = (view: 'public' | 'admin') => {
    setCurrentView(view);
    const url = new URL(window.location.href);
    url.searchParams.set('view', view);
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 selection:bg-blue-900 selection:text-white">
      {currentView === 'admin' ? (
        <AdminMenuForm
          data={menuData}
          onSave={handleSaveMenu}
          onViewPublic={() => navigateTo('public')}
        />
      ) : (
        <PublicMenuView
          data={menuData}
          onOpenAdmin={() => navigateTo('admin')}
          showAdminSwitch={true}
        />
      )}
    </div>
  );
}
