"use client";

import {
  Book,
  BookOpen,
  GalleryVerticalEnd,
  PenTool,
  ShieldCheckIcon,
  Speech,
  User2,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { ModeToggle } from "../theme/mode-toggle";

// This is sample data.
const data = {
  user: {
    name: "Shakhbozbek Usmonov",
    email: "shakhbozbek.usmonov@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Shakhbozbek Usmonov",
      logo: GalleryVerticalEnd,
      plan: "Pro",
    },
  ],
  navMain: [
    {
      title: "Grammar",
      url: "/dashboard/grammar",
      icon: Book,
      isActive: true,
      items: [
        {
          title: "Grammar Lessons",
          url: "/dashboard/grammar",
        },
      ],
    },
    {
      title: "Vocabulary",
      url: "/dashboard/vocabulary",
      icon: BookOpen,
      items: [
        {
          title: "Vocabulary Lessons",
          url: "/dashboard/vocabulary",
        },
      ],
    },
    {
      title: "Skills",
      url: "/dashboard/skills",
      icon: PenTool,
      items: [
        {
          title: "Speaking",
          url: "/dashboard/skills/speaking",
        },
        {
          title: "Writing",
          url: "/dashboard/skills/writing",
        },
        {
          title: "Reading",
          url: "/dashboard/skills/reading",
        },
        {
          title: "Listening",
          url: "/dashboard/skills/listening",
        },
      ],
    },
    {
      title: "Sounds",
      url: "/dashboard/characters",
      icon: Speech,
      items: [
        {
          title: "Characters",
          url: "/dashboard/characters",
        },
      ],
    },
    {
      title: "Leaderboard",
      url: "/dashboard/leaderboard",
      icon: ShieldCheckIcon,
      items: [
        {
          title: "Leaderboards",
          url: "/dashboard/leaderboard",
        },
      ],
    },
    {
      title: "Profile",
      url: "/dashboard/profile",
      icon: User2,
      items: [
        {
          title: "Account Settings",
          url: "/dashboard/profile/account",
        },
        {
          title: "Notifications",
          url: "/dashboard/profile/notifications",
        },
        {
          title: "Pricing",
          url: "/dashboard/profile/pricing",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <ModeToggle />
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
