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
    <div className="w-full h-[400px] overflow-hidden rounded-lg border border-border/50 bg-gradient-to-br from-background via-background/95 to-background/90 backdrop-blur-sm text-card-foreground shadow-lg hidden lg:block transition-all duration-300 hover:shadow-xl hover:border-border/80">
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
                      "hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10",
                      "focus-visible:ring-2 focus-visible:ring-indigo-500/50 dark:focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2",
                      selectedSkill?.slug === skill.slug && 
                        "bg-gradient-to-r from-indigo-500/90 to-violet-500/90 dark:from-indigo-400/90 dark:to-violet-400/90 text-white font-semibold shadow-sm"
                    )}
                  >
                    <motion.div
                      initial={{ rotate: 0 }}
                      animate={{
                        rotate: selectedSkill?.slug === skill.slug ? 360 : 0,
                      }}
                      transition={{ duration: 0.4 }}
                      className={cn(
                        "p-1.5 rounded-md bg-transparent",
                        selectedSkill?.slug === skill.slug && "shadow-inner"
                      )}
                    >
                      <skill.icon className="h-5 w-5" />
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
                      <ChevronDown className={cn(
                        "h-4 w-4 shrink-0",
                        selectedSkill?.slug === skill.slug 
                          ? "opacity-100" 
                          : "opacity-50 group-hover:opacity-100"
                      )} />
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
                              "hover:bg-indigo-500/5 dark:hover:bg-indigo-400/5",
                              "hover:text-indigo-600 dark:hover:text-indigo-400",
                              "hover:translate-x-1",
                              "focus-visible:ring-1 focus-visible:ring-indigo-500/50 dark:focus-visible:ring-indigo-400/50",
                              isActive && "bg-indigo-500/10 dark:bg-indigo-400/10 text-indigo-600 dark:text-indigo-400 font-medium",
                              hoveredLevel === level && "bg-indigo-500/5 dark:bg-indigo-400/5"
                            )}
                          >
                            <motion.span
                              initial={false}
                              animate={{
                                scale: isActive || hoveredLevel === level ? 1.02 : 1,
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