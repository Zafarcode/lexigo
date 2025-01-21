"use client";

import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { skills, skillT } from "@/app/dashboard/skills/page";
import { useEffect, useState } from "react";

const SkillCard = ({ params }: { params: string[] }) => {
  const [selectedSkill, setSelectedSkill] = useState<skillT | null>(null);

  useEffect(() => {
    const foundSkill = skills.find((skill) => skill.slug === params[0]);
    if (foundSkill) {
      setSelectedSkill(foundSkill);
    }
  }, [params]);

  return (
    <Card className="overflow-hidden border-none ">
      <CardContent className="flex flex-col gap-y-4 gap-4 p-0">
        {selectedSkill?.level.map((skill, i) => (
          <div
            className="grid md:grid-cols-2 bg-gradient-to-b from-muted/50 to-muted"
            key={skill[i]}
          >
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/0 z-10" />
            </div>

            {/* Content container */}
            <div className="flex flex-col gap-4 p-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">{skill}</h2>
                <p className="text-muted-foreground">
                  Reading practice to help you understand simple information,
                  words and sentences about known topics. Texts include posters,
                  messages, forms and timetables.
                </p>
              </div>

              <div className="flex flex-col gap-2 lg:flex-row sm:items-center">
                <Button className="group">
                  Start Learning
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillCard;
