"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { levelDataT, skillT } from "@/types";
import { levelTask, skills } from "@/constants/skills";
import Image from "next/image";
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

  console.log(task);

  return (
    <div className="overflow-hidden  shadow-lg">
      <div className="flex flex-col gap-y-4 p-0">
        {category &&
          !level &&
          selectedSkill?.level.map((skill, i) => (
            <Card className="w-full p-0" key={skill}>
              <CardContent className="grid md:grid-cols-2 p-0">
                <div className="w-full flex items-center justify-center">
                  <Image
                    src={"/assets/images/hero-image.png"}
                    alt="skills card image"
                    className="w-full max-w-[50%]"
                    width={100}
                    height={100}
                  />
                </div>

                {/* Content container */}
                <div className="flex flex-col gap-6 p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <Badge className="text-sm font-medium text-gray-900 bg-blue-600">
                        Level {i + 1}
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                      {skill}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Reading practice to help you understand simple
                      information, words and sentences about known topics. Texts
                      include posters, messages, forms and timetables.
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/skills/${category}/${skill.toLowerCase()}`}
                  >
                    <Button className="w-full sm:w-auto">
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
            <Card className="w-full p-0" key={task.title}>
              <CardContent className="grid md:grid-cols-2 p-0">
                <div className="w-full flex items-center justify-center">
                  <Image
                    src={"/assets/images/hero-image.png"}
                    alt="skills card image"
                    className="w-full max-w-[50%]"
                    width={100}
                    height={100}
                  />
                </div>

                {/* Content container */}
                <div className="flex flex-col gap-6 p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <Badge className="text-sm font-medium text-gray-900 bg-blue-600">
                        Level {i + 1}
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                      {task.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {task.description}
                    </p>
                  </div>

                  <Link
                    href={`/dashboard/skills/${category}/${level}/${task.slug}`}
                  >
                    <Button className="w-full sm:w-auto">
                      Start Learning
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SkillCard;
