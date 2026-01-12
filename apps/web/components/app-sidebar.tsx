"use client"
import * as React from "react"
import {
  Cog,
  Frame,
  Link2,
  ListCheck,
  MailOpen,
  PieChart,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@linktree/ui/sidebar"
import { NavSections } from "./nav-sections"
import Image from "next/image"
import Link from "next/link"
import { NavUser } from "./nav-user"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  sections: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Frame,
    },
    {
      name: "Links",
      url: "#",
      icon: Link2
    },
    {
      name: "Analytics",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Settings",
      url: "/settings",
      icon: Cog,
    },
  ],
  others: [
    {
      name: "Shelf",
      url: "/shelf",
      icon: ListCheck
    },
    {
      name: "Feedbacks",
      url: "/feedback",
      icon: MailOpen
    }
  ]
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar 
      collapsible="icon"  variant="floating" {...props}
    >
      <SidebarHeader>
        <Link href="/dashboard">
          <Image 
            src={"/logo.webp"} 
            width={50} 
            height={50} 
            alt="logo"
            className="rounded-lg"
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavSections
          title="Platform"
          sections={data.sections} 
        />
        <NavSections
          title="Others"
          sections={data.others} 
        />
      </SidebarContent>
        <SidebarFooter>          
          <NavUser user={data.user} />
        </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
