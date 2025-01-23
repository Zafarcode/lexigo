"use client";

import * as React from "react";
import {
  Flag,
  RotateCcw,
  CheckCircle2,
  XCircle,
  GripVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { dialogue, ListeningTask } from "@/constants/skills";
import { motion } from "framer-motion";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DraggableTaskProps, Task } from "@/types";

const ItemTypes = {
  TASK: "task",
};

const DraggableTask: React.FC<DraggableTaskProps> = ({
  task,
  index,
  moveTask,
  isSubmitted,
  isCorrect,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.TASK,
    collect(monitor: any) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveTask(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.TASK,
    item: () => {
      return { id: task.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
    canDrag: !isSubmitted,
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "flex items-center justify-between p-4 bg-card border rounded-lg transition-all",
        !isSubmitted && "hover:border-primary/50 hover:shadow-sm",
        isSubmitted &&
          isCorrect !== null &&
          (isCorrect ? "border-green-500/50" : "border-red-500/50")
      )}
      style={{ opacity }}
      data-handler-id={handlerId}
    >
      <div className="flex items-center gap-3 flex-1">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-sm font-medium">
          {index + 1}
        </span>
        <span className="text-foreground">{task.content}</span>
      </div>
      {!isSubmitted && (
        <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
      )}
    </motion.div>
  );
};

const correctOrder = ["1", "2", "3", "4"]; // Based on the dialogue

export default function TaskPrioritization() {
  const [tasks, setTasks] = React.useState<Task[]>(ListeningTask.initialTasks);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState<boolean | null>(null);

  const moveTask = React.useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setTasks((prevTasks) => {
        const newTasks = [...prevTasks];
        const [removed] = newTasks.splice(dragIndex, 1);
        newTasks.splice(hoverIndex, 0, removed);
        return newTasks;
      });
    },
    []
  );

  const handleReset = () => {
    setTasks(ListeningTask.initialTasks);
    setIsSubmitted(false);
    setIsCorrect(null);
  };

  const handleFinish = () => {
    const currentOrder = tasks.map((task) => task.id);
    const isOrderCorrect = currentOrder.every(
      (id, index) => id === correctOrder[index]
    );
    setIsCorrect(isOrderCorrect);
    setIsSubmitted(true);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="max-w-4xl mx-auto">
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-medium hover:text-primary">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  1
                </span>
                TRANSCRIPT
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="mb-8 border-none shadow-none">
                <CardContent className="space-y-4 pt-4">
                  <div className="max-w-4xl mx-auto space-y-4">
                    {dialogue.map((line, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "flex gap-4",
                          line.speaker === "Mario"
                            ? "flex-row"
                            : "flex-row-reverse"
                        )}
                      >
                        <div
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-white font-medium text-sm shrink-0",
                            line.speaker === "Mario"
                              ? "bg-blue-500"
                              : "bg-rose-500"
                          )}
                        >
                          {line.speaker[0]}
                        </div>

                        <div
                          className={cn(
                            "relative max-w-[80%] rounded-lg p-4",
                            line.speaker === "Mario"
                              ? "bg-blue-100 dark:bg-blue-950/50 text-blue-900 dark:text-blue-100"
                              : "bg-rose-100 dark:bg-rose-950/50 text-rose-900 dark:text-rose-100"
                          )}
                        >
                          <p className="text-sm">{line.text}</p>
                          <div
                            className={cn(
                              "absolute top-4 w-2 h-2 rotate-45",
                              line.speaker === "Mario"
                                ? "-left-1 bg-blue-100 dark:bg-blue-950/50"
                                : "-right-1 bg-rose-100 dark:bg-rose-950/50"
                            )}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-medium hover:text-primary">
              <span className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  2
                </span>
                TASK
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <Card className="w-full mx-auto border-none shadow-none">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-primary">
                    {ListeningTask.title}
                  </CardTitle>
                  <p className="text-muted-foreground mt-2">
                    {ListeningTask.instruction}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {tasks.map((task, index) => (
                      <DraggableTask
                        key={task.id}
                        task={task}
                        index={index}
                        moveTask={moveTask}
                        isSubmitted={isSubmitted}
                        isCorrect={isCorrect}
                      />
                    ))}
                  </div>

                  <div className="flex gap-3 mt-6">
                    {!isSubmitted ? (
                      <Button
                        onClick={handleFinish}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        <Flag className="mr-2 h-4 w-4" />
                        Check Answer
                      </Button>
                    ) : (
                      <div className="flex items-center gap-2 text-sm">
                        {isCorrect ? (
                          <div className="flex items-center gap-2 text-green-500">
                            <CheckCircle2 className="h-5 w-5" />
                            <span>Correct! Well done!</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-red-500">
                            <XCircle className="h-5 w-5" />
                            <span>Not quite right. Try again!</span>
                          </div>
                        )}
                      </div>
                    )}
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="text-muted-foreground"
                    >
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Try again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </DndProvider>
  );
}
