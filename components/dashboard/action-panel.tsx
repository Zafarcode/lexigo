"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { skills, skillT } from "@/app/dashboard/skills/page";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ActionPanelProps {
  params: string[];
}

export default function ActionPanel({ params }: ActionPanelProps) {
  const [selectedSkill, setSelectedSkill] = React.useState<skillT | null>(null);

  React.useEffect(() => {
    const foundSkill = skills.find((skill) => skill.slug === params[0]);
    if (foundSkill) {
      setSelectedSkill(foundSkill);
    }
  }, [params]);

  return (
    <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm hidden  lg:block">
      <ScrollArea className="h-auto">
        <nav className="p-2">
          {skills.map((skill) => (
            <Collapsible
              key={skill.slug}
              open={selectedSkill?.slug === skill.slug}
              onOpenChange={() => setSelectedSkill(skill)}
            >
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "relative w-full justify-start gap-2 p-4 text-left text-base font-medium hover:bg-muted/50",
                    selectedSkill?.slug === skill.slug && "bg-muted text-[blue]"
                  )}
                >
                  <skill.icon className={`h-5 w-5 shrink-0`} />
                  <Link href={`/dashboard/skills/${skill.slug}`}>
                    {skill.name}
                  </Link>
                  {selectedSkill?.slug === skill.slug && (
                    <ChevronDown className="ml-auto h-4 w-4 shrink-0 transition-transform duration-200" />
                  )}
                </Button>
              </CollapsibleTrigger>
              {selectedSkill?.slug === skill.slug && (
                <CollapsibleContent className="space-y-1">
                  {skill.level.map((level) => (
                    <Link
                      key={level}
                      href={`/dashboard/skills/${params[0]}/${level
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      <Button
                        variant="ghost"
                        className={`w-full justify-start pl-11 font-normal}`}
                      >
                        {level}
                      </Button>
                    </Link>
                  ))}
                </CollapsibleContent>
              )}
            </Collapsible>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
}
