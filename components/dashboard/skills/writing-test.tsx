"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PenLine, SendHorizontal, ArrowLeft } from "lucide-react";

export default function WritingCheck() {
  const [isWritingMode, setIsWritingMode] = useState(false);
  const [text, setText] = useState("");

  const handleCheck = () => {
    console.log("Checking writing:", text);

    setText("");
  };

  if (!isWritingMode) {
    return (
      <Card className="w-full mt-12 max-w-2xl mx-auto cursor-pointer hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="space-y-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <PenLine className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Check Your Writing Skills</CardTitle>
          <CardDescription className="text-base">
            Test your writing proficiency with our advanced assessment tool. Get
            instant feedback on your writing style, grammar, and more.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            className="w-full sm:w-auto"
            onClick={() => setIsWritingMode(true)}
          >
            Start Writing Assessment
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto mt-12">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsWritingMode(false)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle>Writing Assessment</CardTitle>
          <div className="w-8" /> {/* Spacer for alignment */}
        </div>
        <CardDescription>
          Write a short paragraph about your favorite hobby or interest.
          We&apos;ll analyze your writing and provide feedback.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Start writing here..."
          className="min-h-[200px] resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end">
          <Button
            onClick={handleCheck}
            disabled={!text.trim()}
            className="gap-2"
          >
            Check Writing
            <SendHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
