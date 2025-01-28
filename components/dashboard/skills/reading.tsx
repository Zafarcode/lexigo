import { readingSentens } from "@/constants/skills";
import { Card, CardContent } from "../../ui/card";
import ListeningTasks from "./listening-task";

const Reading = () => {
  return (
    <div>
      <Card className="py-6">
        <CardContent className="w-full flex flex-col items-center gap-y-3">
          {readingSentens.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </CardContent>
      </Card>
      <ListeningTasks />
    </div>
  );
};

export default Reading;
