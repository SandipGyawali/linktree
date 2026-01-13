"use client"
import { IconUserCircle, IconUserCog } from "@tabler/icons-react";
import React from "react";
import { SidebarNav } from "../../../components/settings/sidebar-nav";


const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/settings/profile',
    icon: <IconUserCog size={18} />,
  },
  {
    title: 'Account',
    href: '/settings/account',
    icon: <IconUserCircle size={18} />,
  },
]


function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <div className='space-y-0.5 p-4'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Settings
          </h1>
          <p className='text-muted-foreground'>
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <div className='p-4 flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <aside className='top-0 lg:sticky lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex w-full overflow-y-hidden p-1'>
            {children}
          </div>
        </div>
    </>
  )
}

export default SettingsLayout