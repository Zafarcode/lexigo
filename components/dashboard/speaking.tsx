import React from "react";
import { Card, CardContent } from "../ui/card";
import ListeningTasks from "./listening-task";

const Speaking = () => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Card>
        <CardContent className="p-0 overflow-hidden rounded-md">
          <iframe
            className="w-full h-[470px]"
            src="https://www.youtube.com/embed/KAZh7OE9oPA"
          ></iframe>
        </CardContent>
      </Card>
      <ListeningTasks />
    </div>
  );
};

export default Speaking;
