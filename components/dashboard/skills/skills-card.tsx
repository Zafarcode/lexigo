"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { levelDataT, skillT } from "@/types";
import { levelTask, skills } from "@/constants/skills";
import Link from "next/link";

const SkillCard = ({ params }: { params: string[] }) => {
  const [category, level] = params;

  const [selectedSkill, setSelectedSkill] = useState<skillT | null>(null);
  const [task, setTask] = useState<levelDataT[] | null>(null);

  useEffect(() => {
    const foundSkill = skills.find((skill) => skill.slug === category);
    if (foundSkill) {
      setSelectedSkill(foundSkill);
    }
    const foundTask = levelTask.find((skill) => skill.slug === level);
    if (foundTask) {
      setTask(foundTask.data);
    }
  }, [category, level]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {category &&
        !level &&
        selectedSkill?.level.map((skill, i) => (
          <Card
            key={skill}
            className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <CardContent className="p-6 pb-24">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Level {i + 1}
                  </Badge>
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {skill}
                </h2>
                <p className="text-muted-foreground leading-relaxed flex-grow ">
                  {skill} practice to help you understand simple information,
                  words and sentences about known topics.
                </p>
                <Link
                  href={`/dashboard/skills/${category}/${skill.toLowerCase()}`}
                  className="mt-4 block absolute bottom-4 left-4 right-4"
                >
                  <Button className="w-full group">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}

      {level &&
        task?.map((task, i) => (
          <Card
            key={task.title}
            className="group relative transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <CardContent className="p-6 pb-24">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                    Task {i + 1}
                  </Badge>
                  <BookOpen className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  {task.title}
                </h2>
                <p className="text-muted-foreground leading-relaxed flex-grow">
                  {task.description}
                </p>
                <Link
                  href={`/dashboard/skills/${category}/${level}/${task.slug}`}
                  className="mt-4 block absolute bottom-4 left-4 right-4"
                >
                  <Button className="w-full group ">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default SkillCard;
