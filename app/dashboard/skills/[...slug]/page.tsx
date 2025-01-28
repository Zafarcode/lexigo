import ActionPanel from "@/components/dashboard/skills/action-panel";
import SkillCard from "@/components/dashboard/skills/skills-card";
import Tasks from "@/components/dashboard/skills/tasks";

const page = ({ params }: { params: { slug: string[] } }) => {
  const { slug } = params;
  const [category, level, task] = slug;

  console.log(category, level, task);

  return (
    <section className="w-full px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[75%,25%]  gap-4">
        <div>
          {task && (
            <h1 className="text-xl md:text-3xl font-bold mb-8">{task}</h1>
          )}
          {!task && (
            <h1 className="text-xl md:text-3xl font-bold mb-8">
              Choose your level to practise your{" "}
              {category && !level
                ? category.toUpperCase()
                : level.toUpperCase()}
            </h1>
          )}
          {(category || level) && !task ? (
            <SkillCard params={params.slug} />
          ) : (
            <Tasks params={params.slug} />
          )}
        </div>
        <ActionPanel params={params.slug} />
      </div>
    </section>
  );
};

export default page;
