"use client"

import { usePathname, useRouter } from "next/navigation"
import { Briefcase, Home, FolderKanban, LogOut } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { signOut } from "next-auth/react"
import Link from "next/link"

const menuItems = [
    {
        label: "Dashboard",
        icon: <Home className="h-4 w-4" />,
        path: "/admin/dashboard",
    },
    {
        label: "Experience",
        icon: <Briefcase className="h-4 w-4" />,
        path: "/admin/dashboard/experience",
    },
    {
        label: "Projects",
        icon: <FolderKanban className="h-4 w-4" />,
        path: "/admin/dashboard/project",
    },
]

export default function DashboardSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const { toggleSidebar, isMobile } = useSidebar()

    const isActive = (path: string) => {
        return pathname === path
    }

    const handleNavigation = (path: string) => {
        if (isMobile) {
            toggleSidebar()
        }
        router.push(path)
    }

    return (
        <Sidebar>
            <SidebarHeader className="border-b border-border">
                <div className="flex items-center px-2 py-3">
                    <Link href="/">
                        <span className="text-lg font-semibold text-black">sanjeevnode</span>
                    </Link>
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    {menuItems.map((item) => (
                        <SidebarMenuItem key={item.path}>
                            <SidebarMenuButton
                                isActive={isActive(item.path)}
                                onClick={() => handleNavigation(item.path)}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="border-t border-border p-4">

                <button onClick={() => signOut()} className="flex items-center">
                    <LogOut className="h-4 w-4" />
                    <span className="ml-2">Logout</span>
                </button>
            </SidebarFooter>
        </Sidebar>
    )
}
