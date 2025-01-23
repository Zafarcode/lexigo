import { skillT } from "@/types";
import {
  Book,
  MessageSquare,
  Mic,
  Pencil,
  PartyPopper,
  Brain,
} from "lucide-react";

export const skills: skillT[] = [
  {
    name: "Reading",
    slug: "reading",
    level: ["A1-reading", "A2-reading", "B1-reading", "B2-reading"],
    icon: Book,
    color: "bg-red-500/90",
    hoverColor: "hover:text-red-700",
    bgPattern:
      "radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)",
  },
  {
    name: "Listening",
    slug: "listening",
    level: ["A1-listening", "A2-listening", "B1-listening", "B2-listening"],
    icon: Mic,
    color: "bg-green-500/90",
    hoverColor: "hover:text-green-700",
    bgPattern:
      "radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)",
  },
  {
    name: "Writing",
    slug: "writing",
    level: ["A1-writing", "A2-writing", "B1-writing", "B2-writing"],
    icon: Pencil,
    color: "bg-blue-500/90",
    hoverColor: "hover:text-blue-700",
    bgPattern:
      "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
  },
  {
    name: "Speaking",
    slug: "speaking",
    level: ["A1-speaking", "A2-speaking", "B1-speaking", "B2-speaking"],
    icon: MessageSquare,
    color: "bg-yellow-500/90",
    hoverColor: "hover:text-yellow-700",
    bgPattern:
      "radial-gradient(circle at 50% 50%, rgba(234, 179, 8, 0.1) 0%, transparent 50%)",
  },
];

export const infodata = [
  {
    id: 1,
    title: "Interactive Learning",
    description:
      "Engage with dynamic lessons that adapt to your learning style and pace. Practice with real-world scenarios and get instant feedback.",
    icon: Brain,
    gradient: "from-blue-500/20 to-cyan-400/20",
  },
  {
    id: 2,
    title: "Speaking Practice",
    description:
      "Improve your pronunciation and fluency with AI-powered speech recognition and real-time feedback.",
    icon: Mic,
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Writing Skills",
    description:
      "Develop your writing abilities through guided exercises, from basic sentences to complex essays.",
    icon: Pencil,
    gradient: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 4,
    title: "Conversation Skills",
    description:
      "Practice natural conversations with AI chat partners and join community discussions.",
    icon: MessageSquare,
    gradient: "from-green-500/20 to-emerald-500/20",
  },
];

export const dialogue = [
  {
    speaker: "Susanne",
    text: "Hi, Mario. Can you help me prepare some things for the next month?",
  },
  { speaker: "Mario", text: "OK, sure. What can I help you with?" },
  {
    speaker: "Susanne",
    text: "I need to visit the customer in Germany. It's important.",
  },
  { speaker: "Mario", text: "What can I do to help?" },
  {
    speaker: "Susanne",
    text: "Can you send an email to the customer? Ask them when I can visit them next week. Please do this first. It's a priority and very urgent.",
  },
  { speaker: "Mario", text: "Right. I'll do it today." },
];

export const levelTask = [
  {
    id: 1,
    slug: "a1-listening",
    data: [
      {
        title: "A poster at work",
        description:
          "Put the tasks in order of priority. You can drag and drop the tasks to change their order.",
      },
      {
        title: "A poster for exam candidates",
        description:
          "Put the tasks in order of priority. You can drag and drop the tasks to change their order.",
      },
      {
        title: "A restaurant menu",
        description:
          "Put the tasks in order of priority. You can drag and drop the tasks to change their order.",
      },
    ],
  },
];

export const ListeningTask = {
  title: "Listening A1: A request from your boss - 2",
  instruction: "Put the tasks in order of priority based on the conversation.",
  initialTasks:[
    { id: "1", content: "Send an email to the customer" },
    { id: "2", content: "Reserve a meeting room" },
    { id: "3", content: "Invite people to the meeting" },
    { id: "4", content: "Visit the customer" },
  ],
}