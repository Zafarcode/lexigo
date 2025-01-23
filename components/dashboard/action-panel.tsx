"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { skillT } from "@/types";
import { skills } from "@/constants/skills";
import { motion, AnimatePresence } from "framer-motion";

interface ActionPanelProps {
  params: string[];
}

export default function ActionPanel({ params }: ActionPanelProps) {
  const [selectedSkill, setSelectedSkill] = React.useState<skillT | null>(null);
  const [hoveredLevel, setHoveredLevel] = React.useState<string | null>(null);

  React.useEffect(() => {
    const foundSkill = skills.find((skill) => skill.slug === params[0]);
    if (foundSkill) {
      setSelectedSkill(foundSkill);
    }
  }, [params]);

  return (
    <div className="w-full h-96 overflow-hidden rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm text-card-foreground shadow-lg hidden lg:block transition-all duration-300 hover:shadow-xl hover:border-border">
      <ScrollArea className="h-full">
        <nav className="p-2 space-y-1">
          <AnimatePresence>
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
                      "relative w-full justify-start gap-3 p-4 text-left text-base font-medium",
                      "transition-all duration-300 ease-in-out",
                      "hover:bg-muted/80 hover:text-primary",
                      "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                      selectedSkill?.slug === skill.slug &&
                        "bg-primary/10 text-primary font-semibold shadow-sm"
                    )}
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{
                        rotate: selectedSkill?.slug === skill.slug ? 360 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className={cn(
                        "p-1.5 rounded-md",
                        skill.color,
                        selectedSkill?.slug === skill.slug && "shadow-inner"
                      )}
                    >
                      <skill.icon className="h-5 w-5 shrink-0" />
                    </motion.div>
                    <Link
                      href={`/dashboard/skills/${skill.slug}`}
                      className="flex-1"
                    >
                      {skill.name}
                    </Link>
                    <motion.div
                      animate={{
                        rotate: selectedSkill?.slug === skill.slug ? 180 : 0,
                        scale: selectedSkill?.slug === skill.slug ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="ml-auto"
                    >
                      <ChevronDown className="h-4 w-4 shrink-0 opacity-50 group-hover:opacity-100" />
                    </motion.div>
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-1 px-1 py-2"
                  >
                    {skill.level.map((level) => {
                      const isActive =
                        params[1] === level.toLowerCase().replace(/\s+/g, "-");
                      return (
                        <Link
                          key={level}
                          href={`/dashboard/skills/${params[0]}/${level
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          className="block"
                          onMouseEnter={() => setHoveredLevel(level)}
                          onMouseLeave={() => setHoveredLevel(null)}
                        >
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start pl-12 font-normal",
                              "transition-all duration-200",
                              "hover:bg-muted/80 hover:text-primary hover:translate-x-1",
                              "focus-visible:ring-1 focus-visible:ring-primary",
                              isActive &&
                                "bg-primary/5 text-primary font-medium",
                              hoveredLevel === level && "bg-muted/60"
                            )}
                          >
                            <motion.span
                              initial={false}
                              animate={{
                                scale:
                                  isActive || hoveredLevel === level ? 1.02 : 1,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              {level}
                            </motion.span>
                          </Button>
                        </Link>
                      );
                    })}
                  </motion.div>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </AnimatePresence>
        </nav>
      </ScrollArea>
    </div>
  );
}
