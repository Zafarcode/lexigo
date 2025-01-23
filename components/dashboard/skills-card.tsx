'use client'

import { ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { levelDataT, levelTaskT, skillT } from "@/types";
import { levelTask, skills } from "@/constants/skills";
import Image from "next/image";

const SkillCard = ({ params }: { params: string[] }) => {
  const [selectedSkill, setSelectedSkill] = useState<skillT | null>(null);
  const [task, setTask] = useState<levelDataT[] | null>(null);

  useEffect(() => {
    const foundSkill = skills.find((skill) => skill.slug === params[0]);
    if (foundSkill) {
      setSelectedSkill(foundSkill);
    }
    const foundTask = levelTask.find((skill) => skill.slug === params[1]);
    if (foundTask) {
      setTask(foundTask.data);
    }
  }, [params]);

  return (
    <div className="overflow-hidden  shadow-lg">
      <div className="flex flex-col gap-y-4 p-0">
        {params.length === 1 &&
          selectedSkill?.level.map((skill, i) => (
            <Card className="w-full p-0" key={skill}>
              <CardContent className="grid md:grid-cols-2 p-0">
                <div className="w-full flex items-center justify-center">
                  <Image
                    src={"/assets/images/hero-image.png"}
                    alt="skills card image"
                    className="w-full max-w-[50%]"
                    width={100}
                    height={100}
                  />
                </div>

                {/* Content container */}
                <div className="flex flex-col gap-6 p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <Badge className="text-sm font-medium text-gray-900 bg-blue-600">
                        Level {i + 1}
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                      {skill}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      Reading practice to help you understand simple
                      information, words and sentences about known topics. Texts
                      include posters, messages, forms and timetables.
                    </p>
                  </div>

                  <Button className="w-full sm:w-auto">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

        {params.length === 2 &&
          task?.map((task, i) => (
            <Card className="w-full p-0" key={task.title}>
              <CardContent className="grid md:grid-cols-2 p-0">
                <div className="w-full flex items-center justify-center">
                  <Image
                    src={"/assets/images/hero-image.png"}
                    alt="skills card image"
                    className="w-full max-w-[50%]"
                    width={100}
                    height={100}
                  />
                </div>

                {/* Content container */}
                <div className="flex flex-col gap-6 p-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-blue-600" />
                      <Badge className="text-sm font-medium text-gray-900 bg-blue-600">
                        Level {i + 1}
                      </Badge>
                    </div>
                    <h2 className="text-3xl font-bold tracking-tight text-foreground">
                      {task.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {task.description}
                    </p>
                  </div>

                  <Button className="w-full sm:w-auto">
                    Start Learning
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { skillsData, skillT } from '@/constants/skills'
import { ArrowRight, BookOpen } from 'lucide-react'
import { useEffect, useState } from 'react'

const SkillCard = ({ params }: { params: string[] }) => {
	const [selectedSkill, setSelectedSkill] = useState<skillT | null>(null)

	useEffect(() => {
		const foundSkill = skillsData.find(skill => skill.slug === params[0])
		if (foundSkill) {
			setSelectedSkill(foundSkill)
		}
	}, [params])

	return (
		<Card className='overflow-hidden border-none '>
			<CardContent className='flex flex-col gap-y-4 gap-4 p-0'>
				{selectedSkill?.level.map((skill, i) => (
					<div
						className='grid md:grid-cols-2 bg-gradient-to-b from-muted/50 to-muted'
						key={skill[i]}
					>
						<div className='relative aspect-[4/3] md:aspect-auto overflow-hidden'>
							<div className='absolute inset-0 bg-gradient-to-r from-black/20 to-black/0 z-10' />
						</div>

						{/* Content container */}
						<div className='flex flex-col gap-4 p-6'>
							<div className='space-y-2'>
								<div className='flex items-center gap-2'>
									<BookOpen className='h-4 w-4 text-muted-foreground' />
								</div>
								<h2 className='text-2xl font-bold tracking-tight'>{skill}</h2>
								<p className='text-muted-foreground'>
									Reading practice to help you understand simple information,
									words and sentences about known topics. Texts include posters,
									messages, forms and timetables.
								</p>
							</div>

							<div className='flex flex-col gap-2 lg:flex-row sm:items-center'>
								<Button className='group'>
									Start Learning
									<ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
								</Button>
							</div>
						</div>
					</div>
				))}
			</CardContent>
		</Card>
	)
}

export default SkillCard
