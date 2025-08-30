import React, { useState } from "react";
import {
  Calendar,
  LayoutDashboard,
  Settings,
  Ticket,
  Users,
  BarChart3,
  Headphones,
  Bell,
  ChevronDown,
  ChevronRight,
  Megaphone,
  FolderOpen,
  UserCog,
  LogOut,
  Plus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export interface SidebarProps {
  className?: string;
}

export interface NavItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

const AsideMenu: React.FC<SidebarProps> = ({ className = "" }) => {
  const location = useLocation();
  const activeRoute = location.pathname.split("/").pop();
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "Main Navigation",
    "Support & Management",
    "Additional Features",
    "Account Management",
  ]);

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionTitle)
        ? prev.filter((title) => title !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const navSections: NavSection[] = [
    {
      title: "Main Navigation",
      items: [
        { icon: LayoutDashboard, href: "insights", label: "Dashboard" },
        { icon: Calendar, href: "manage-events", label: "Manage Events" },
        { icon: Ticket, href: "booking-tickets", label: "Booking & Tickets" },
        { icon: Users, href: "attendee-insights", label: "Attendee Insights" },
        {
          icon: BarChart3,
          href: "analytics-reports",
          label: "Analytics & Reports",
        },
      ],
    },
    {
      title: "Support & Management",
      items: [
        { icon: Headphones, href: "", label: "Contact Support" },
        { icon: Bell, href: "", label: "Notifications" },
        { icon: Settings, href: "", label: "Settings" },
      ],
    },
    {
      title: "Additional Features",
      items: [
        { icon: Megaphone, href: "", label: "Marketing" },
        {
          icon: FolderOpen,
          href: "event-categories",
          label: "Event Categories",
        },
      ],
    },
    {
      title: "Account Management",
      items: [
        { icon: UserCog, href: "manage-users", label: "Manage Users" },
        { icon: LogOut, href: "", label: "Logout" },
      ],
    },
  ];

  const renderNavItem = (item: NavItem, index: number) => (
    <li key={index}>
      <Link
        to={`${item.href}`}
        className={`${
          activeRoute === item.href && " bg-green-600"
        }  w-full flex items-center gap-3 px-4 py-2.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-all duration-200 group`}
        aria-label={item.label}
      >
        <item.icon
          className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
          aria-hidden="true"
        />
        <span className="text-sm font-medium">{item.label}</span>
        {item.badge && (
          <span className="ml-auto bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
            {item.badge}
          </span>
        )}
      </Link>
    </li>
  );

  const renderSection = (section: NavSection, index: number) => {
    const isExpanded = expandedSections.includes(section.title);

    return (
      <div key={index} className="mb-6 ">
        <button
          onClick={() => toggleSection(section.title)}
          className="w-full flex items-center justify-between px-4 py-2 text-gray-400 hover:text-white transition-colors group"
          aria-expanded={isExpanded}
          aria-controls={`section-${index}`}
        >
          <span className="text-xs font-semibold uppercase tracking-wider">
            {section.title}
          </span>
          {isExpanded ? (
            <ChevronDown className="w-4 h-4 transition-transform" />
          ) : (
            <ChevronRight className="w-4 h-4 transition-transform" />
          )}
        </button>

        {isExpanded && (
          <nav
            id={`section-${index}`}
            className="mt-2"
            aria-label={section.title}
          >
            <ul className="space-y-1">
              {section.items.map((item, itemIndex) =>
                renderNavItem(item, itemIndex)
              )}
            </ul>
          </nav>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`min-h-screen lg:flex md:w-[25%] bg-gray-900 text-white hidden flex-col border-r border-gray-800 ${className}`}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Header */}
      <header className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">EventX</h1>
            <p className="text-xs text-gray-400">Studio</p>
          </div>
        </div>

        <Link
          to={"add"}
          className="w-full flex items-center gap-3 px-4 py-3 bg-green-600 hover:bg-green-700 rounded-lg transition-colors group"
        >
          <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
            <Plus className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <span className="block text-sm font-medium text-white">
              Add Quick Event
            </span>
            <span className="block text-xs text-green-100">Events</span>
          </div>
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto py-4 px-2">
        {navSections.map((section, index) => renderSection(section, index))}
      </div>
    </aside>
  );
};

export default AsideMenu;
