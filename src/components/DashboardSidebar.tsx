import { LayoutDashboard, MessageSquare, CalendarDays, HelpCircle, Bot, Settings, CreditCard, Store, LogOut } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useNavigate } from 'react-router-dom';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/i18n/context';

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const navigate = useNavigate();
  const { t } = useTranslation();

  const mainItems = [
    { title: t('sidebar.overview'), url: '/dashboard', icon: LayoutDashboard },
    { title: t('sidebar.conversations'), url: '/dashboard/conversations', icon: MessageSquare },
    { title: t('sidebar.bookings'), url: '/dashboard/bookings', icon: CalendarDays },
    { title: t('sidebar.faqs'), url: '/dashboard/faqs', icon: HelpCircle },
  ];

  const settingsItems = [
    { title: t('sidebar.chatbot'), url: '/dashboard/chatbot', icon: Bot },
    { title: t('sidebar.business'), url: '/dashboard/business', icon: Store },
    { title: t('sidebar.billing'), url: '/dashboard/billing', icon: CreditCard },
    { title: t('sidebar.settings'), url: '/dashboard/settings', icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarContent>
        <div className="p-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-bold text-foreground">LocalBot AI</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>{t('sidebar.main')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === '/dashboard'} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t('sidebar.config')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map(item => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className="hover:bg-sidebar-accent/50" activeClassName="bg-sidebar-accent text-sidebar-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-3">
        <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground hover:text-foreground" onClick={() => navigate('/')}>
          <LogOut className="w-4 h-4 mr-2" /> {!collapsed && t('sidebar.logout')}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
