import { LevelT, skillT } from "@/types";
import {
  Book,
  MessageSquare,
  Mic,
  Pencil,
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

export const levelTask:LevelT[] = [
  // Listening Levels
  {
    id: 1,
    slug: "a1-listening",
    data: [
      {
        title: "A poster at work",
        slug: "a-poster-at-work",
        description:
          "Put the tasks in order of priority. You can drag and drop the tasks to change their order.",
      },
      {
        title: "A poster for exam candidates",
        slug: "a-poster-for-exam-candidates",
        description:
          "Put the tasks in order of priority. You can drag and drop the tasks to change their order.",
      },
      {
        title: "A restaurant menu",
        slug: "a-restaurant-menu",
        description:
          "Put the tasks in order of priority. You can drag and drop the tasks to change their order.",
      },
    ],
  },
  {
    id: 2,
    slug: "a2-listening",
    data: [
      {
        title: "A news bulletin",
        slug: "a-news-bulletin",
        description:
          "Listen to a news bulletin and identify the main events discussed.",
      },
      {
        title: "A weather forecast",
        slug: "a-weather-forecast",
        description:
          "Listen to the forecast and match it to the corresponding region.",
      },
      {
        title: "A travel announcement",
        slug: "a-travel-announcement",
        description:
          "Listen to the announcement and answer the related questions.",
      },
    ],
  },
  {
    id: 3,
    slug: "a3-listening",
    data: [
      {
        title: "An interview at work",
        slug: "an-interview-at-work",
        description:
          "Listen to the interview and identify key details about the speaker.",
      },
      {
        title: "A podcast episode",
        slug: "a-podcast-episode",
        description:
          "Listen to the podcast and summarize the main points discussed.",
      },
      {
        title: "A lecture summary",
        slug: "a-lecture-summary",
        description:
          "Listen to the lecture and take notes on the key arguments made.",
      },
    ],
  },

  // Reading Levels
  {
    id: 4,
    slug: "a1-reading",
    data: [
      {
        title: "A simple recipe",
        slug: "a-simple-recipe",
        description: "Read the recipe and follow the steps in the correct order.",
      },
      {
        title: "A school timetable",
        slug: "a-school-timetable",
        description:
          "Read the timetable and answer questions about class schedules.",
      },
      {
        title: "A shopping list",
        slug: "a-shopping-list",
        description:
          "Read the list and determine the items needed for a specific task.",
      },
    ],
  },
  {
    id: 5,
    slug: "a2-reading",
    data: [
      {
        title: "A magazine article",
        slug: "a-magazine-article",
        description:
          "Read the article and answer comprehension questions about the main points.",
      },
      {
        title: "An advertisement",
        slug: "an-advertisement",
        description:
          "Read the advertisement and identify the product details and benefits.",
      },
      {
        title: "A travel guide",
        slug: "a-travel-guide",
        description:
          "Read the guide and match it to the corresponding tourist locations.",
      },
    ],
  },

  // Speaking Levels
  {
    id: 6,
    slug: "a1-speaking",
    data: [
      {
        title: "Introducing yourself",
        slug: "introducing-yourself",
        description: "Practice introducing yourself in different scenarios.",
      },
      {
        title: "Describing daily activities",
        slug: "describing-daily-activities",
        description: "Talk about your daily routine in a structured manner.",
      },
      {
        title: "Talking about hobbies",
        slug: "talking-about-hobbies",
        description: "Share information about your hobbies and interests.",
      },
    ],
  },
  {
    id: 7,
    slug: "a2-speaking",
    data: [
      {
        title: "Discussing plans",
        slug: "discussing-plans",
        description: "Practice talking about future plans and goals.",
      },
      {
        title: "Making requests",
        slug: "making-requests",
        description:
          "Practice how to make polite requests in different situations.",
      },
      {
        title: "Explaining preferences",
        slug: "explaining-preferences",
        description: "Discuss your preferences and justify your choices.",
      },
    ],
  },

  // Writing Levels
  {
    id: 8,
    slug: "a1-writing",
    data: [
      {
        title: "Writing a postcard",
        slug: "writing-a-postcard",
        description: "Write a short postcard to a friend about your vacation.",
      },
      {
        title: "Filling out a form",
        slug: "filling-out-a-form",
        description: "Complete a simple form with personal information.",
      },
      {
        title: "Writing a shopping list",
        slug: "writing-a-shopping-list",
        description: "Write a list of items needed for a specific task.",
      },
    ],
  },
  {
    id: 9,
    slug: "a2-writing",
    data: [
      {
        title: "Writing an email",
        slug: "writing-an-email",
        description:
          "Write a polite email to request information or clarify details.",
      },
      {
        title: "Writing a short story",
        slug: "writing-a-short-story",
        description: "Compose a short story based on a given prompt.",
      },
      {
        title: "Writing instructions",
        slug: "writing-instructions",
        description: "Write clear and concise instructions for a task.",
      },
    ],
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