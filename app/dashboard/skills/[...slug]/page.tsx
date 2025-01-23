
import ActionPanel from "@/components/dashboard/action-panel";
import SkillCard from "@/components/dashboard/skills-card";
import TaskPrioritization from "@/components/dashboard/task";

const page = ({ params }: { params: { slug: string[] } }) => {
  return (
    <section className="w-full px-4">
      <div className="grid grid-cols-1 lg:grid-cols-[75%,25%]  gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-8">
            Choose your level to practise your{" "}
            {params.slug.length === 1
              ? params.slug[0]
              : params.slug[1].toUpperCase()}
          </h1>
          {params.slug.length !== 3 ? (
            <SkillCard params={params.slug} />
          ) : (
            <TaskPrioritization  />
          )}
        </div>
        <ActionPanel params={params.slug} />
      </div>
    </section>
  );
};


export default page
