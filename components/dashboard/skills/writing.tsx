"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";
import { conversation, questions } from "@/constants/skills";
import WritingCheck from "./writing-test";

export function Writing() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResults(true);
      }
    }
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResults(false);
  };

  return (
    <Card className="w-full max-w-full mx-auto border-none">
      <CardContent>
        <div className="space-y-6">
          <ScrollArea className="h-[500px] pr-4 border rounded-md p-4">
            {conversation.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "person1" ? "justify-end" : "justify-start"
                } mb-4`}
              >
                <div
                  className={`flex items-end ${
                    message.sender === "person1"
                      ? "flex-row-reverse"
                      : "flex-row"
                  }`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>
                      {message.sender === "person1" ? "P1" : "P2"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`mx-2 ${
                      message.sender === "person1"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    } rounded-lg p-3 max-w-[70%]`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-50">{message.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
        <Accordion type="multiple" className="w-full">
          <AccordionItem value="writing-quiz">
            <AccordionTrigger>Writing Quiz</AccordionTrigger>
            <AccordionContent>
              {!showResults ? (
                <div className="space-y-4">
                  <Progress
                    value={(currentQuestion / questions.length) * 100}
                    className="w-full"
                  />
                  <h3 className="text-lg font-semibold">
                    {questions[currentQuestion].text}
                  </h3>
                  <RadioGroup
                    value={selectedAnswer?.toString() || ""}
                    className="space-y-2"
                  >
                    <AnimatePresence mode="wait">
                      {questions[currentQuestion].options.map(
                        (option, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div
                              className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-colors
                                ${
                                  selectedAnswer === index
                                    ? "bg-primary/5 border-primary"
                                    : "hover:bg-muted"
                                }
                              `}
                              onClick={() => handleAnswer(index)}
                            >
                              <RadioGroupItem
                                value={index.toString()}
                                id={`option-${index}`}
                              />
                              <Label
                                htmlFor={`option-${index}`}
                                className="flex-grow cursor-pointer"
                              >
                                {option}
                              </Label>
                            </div>
                          </motion.div>
                        )
                      )}
                    </AnimatePresence>
                  </RadioGroup>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-1">
                      {questions.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentQuestion
                              ? "bg-primary"
                              : index < currentQuestion
                              ? "bg-primary/30"
                              : "bg-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <Button
                      onClick={handleNext}
                      disabled={selectedAnswer === null}
                    >
                      {currentQuestion === questions.length - 1
                        ? "Finish"
                        : "Next"}
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold">Quiz Results</h3>
                  <p className="text-4xl font-bold text-primary">
                    {score} / {questions.length}
                  </p>
                  <Progress
                    value={(score / questions.length) * 100}
                    className="w-full"
                  />
                  <p className="text-muted-foreground">
                    {score === questions.length
                      ? "Perfect score! Great job!"
                      : score >= questions.length * 0.8
                      ? "Excellent work! You've understood the conversation well."
                      : score >= questions.length * 0.6
                      ? "Good job! You've grasped most of the conversation."
                      : "You might want to review the conversation again."}
                  </p>
                  <Button onClick={handleRetry} className="w-full">
                    Try Again
                  </Button>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <WritingCheck />
      </CardContent>
    </Card>
  );
}
