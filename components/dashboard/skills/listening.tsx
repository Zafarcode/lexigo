"use client";

import React, { useState } from "react";
import ListeningTasks from "./listening-task";
import { Card, CardContent } from "@/components/ui/card";

const Listening = () => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (audioRef.current?.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current?.pause();
      setIsPlaying(false);
    }
  };

  return (
    <>
      <Card className="w-full mb-8 p-3">
        <CardContent className="p-0">
          <audio
            ref={audioRef}
            onClick={togglePlay}
            preload="auto"
            controls
            className="w-full bg-green-900 rounded-lg"
            src="/sounds/lose.mp3"
          ></audio>
        </CardContent>
      </Card>
      <ListeningTasks />
    </>
  );
};

export default Listening;
