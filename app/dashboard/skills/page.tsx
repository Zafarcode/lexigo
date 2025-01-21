"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Book, MessageSquare, Mic, Pencil } from "lucide-react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export type skillT = {
  name: string;
  slug: string;
  level: string[];
  icon: LucideIcon;
  color: string;
  hoverColor: string;
};

export const skills: skillT[] = [
  {
    name: "Reading",
    slug: "reading",
    level: ["A1-reading", "A2-reading", "B1-reading", "B2-reading"],
    icon: Book,
    color: "bg-red-500",
    hoverColor: "hover:text-red-700",
  },
  {
    name: "Listening",
    slug: "listening",
    level: ["A1-listening", "A2-listening", "B1-listening", "B2-listening"],
    icon: Mic,
    color: "bg-green-500",
    hoverColor: "hover:text-green-700",
  },
  {
    name: "Writing",
    slug: "writing",
    level: ["A1-writing", "A2-writing", "B1-writing", "B2-writing"],
    icon: Pencil,
    color: "bg-blue-500",
    hoverColor: "hover:text-blue-700",
  },
  {
    name: "Speaking",
    slug: "speaking",
    level: ["A1-speaking", "A2-speaking", "B1-speaking", "B2-speaking"],
    icon: MessageSquare,
    color: "bg-yellow-500",
    hoverColor: "hover:text-yellow-700",
  },
];

const infodata = [
  {
    id: 1,
    title: "How to improve your English proficiency",
    description:
      "Expand your vocabulary and enhance communication skills with WordWonders. Our interactive lessons and engaging activities make learning English enjoyable and effective.",
  },
  {
    id: 2,
    title: "Choose the skill you want to practise",
    description:
      "With WordWonders, you can focus on the skills that matter most to you—reading, listening, writing, or speaking. Tailored exercises help you master each skill step by step.",
  },
];

const Skills = () => {
  return (
    <section className="h-auto">
      <div className="px-4  py-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
            Master English with Our Comprehensive Learning Wordwonders Platform
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            Improve your listening, reading, writing, and speaking skills with
            our interactive lessons and exercises.
          </p>
        </div>
      </div>

      <div className="w-full  gap-x-6 px-4  md:py-8 mb-8">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 md:gap-y-0 ">
          {infodata.map(({ id, title, description }, index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
              }}
            >
              <Card className="bg-white dark:bg-gray-900 rounded-lg p-4">
                <h3 className="text-2xl font-bold mb-4">{title}</h3>
                <p className="text-gray-500">{description}</p>
              </Card>
            </motion.div>
          ))}
        </ul>
      </div>

      <div className="pt-8 md:pt-0">
        <h2 className="text-3xl font-bold text-center mb-10">
          Improve your English skills
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 px-4 gap-x-6 gap-y-6 md:gap-y-0">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ x: index % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
              }}
            >
              <Card className="flex flex-col items-center mb-8 py-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className={`${skill.color} p-4 rounded-full mb-4`}>
                  <skill.icon className="w-12 h-12 text-white" />
                </CardHeader>
                <CardContent className="text-center">
                  <Link
                    href={`/dashboard/skills/${skill.slug}`}
                    className={`${
                      skills.find(
                        (skillItem) =>
                          skillItem.name.toLowerCase() ===
                          skill.name.toLowerCase()
                      )?.hoverColor || "bg-gray-500"
                    } relative group`}
                  >
                    <h3 className="text-2xl font-bold mb-4 relative z-10 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-current after:transition-all after:duration-300 after:ease-in-out group-hover:after:w-full pb-2">
                      {skill.name}
                    </h3>
                  </Link>
                  <p className="text-center text-gray-600 px-8">
                    Improve your {skill.name.toLowerCase()} skills with our
                    interactive lessons and exercises.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
