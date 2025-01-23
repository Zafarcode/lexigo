"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { infodata, skills } from "@/constants/skills";

const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          initial={{
            x: Math.random() * 1400,
            y: Math.random() * 1800,
          }}
          animate={{
            x: Math.random() * 1400,
            y: Math.random() * 1800,
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const Skills = () => {
  const { scrollY } = useScroll();
  const titleRef = useRef(null);

  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  return (
    <section className="min-h-screen relative bg-gradient-to-b from-background via-background/50 to-background">
      <FloatingParticles />

      <div className="px-4 py-12 relative">
        <motion.div
          ref={titleRef}
          style={{ y: titleY, opacity: titleOpacity }}
          className="flex flex-col items-center space-y-4 text-center"
        >
          <motion.h1
            className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary animate-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Master English with WordWonders
          </motion.h1>
          <motion.p
            className="mx-auto max-w-[700px] text-xl text-muted-foreground md:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Your journey to English mastery begins here
          </motion.p>
        </motion.div>
      </div>

      <div className="w-full gap-x-6 px-4 md:py-8 mb-12">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {infodata.map((info, index) => (
            <motion.div
              key={info.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: "spring",
              }}
            >
              <Card className="h-full overflow-hidden relative group perspective">
                <motion.div className="relative h-full transform-gpu transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(10deg)]">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${info.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                  />
                  <div className="absolute inset-0 backdrop-blur-[2px] group-hover:backdrop-blur-[1px] transition-all duration-500" />
                  <div className="p-6 relative">
                    <div className="flex items-center gap-4 mb-4">
                      <info.icon />
                      <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
                        {info.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      {info.description}
                    </p>
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent via-primary/5 to-primary/10 rounded-tl-full transform translate-x-16 translate-y-16 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500" />
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </ul>
      </div>

      <div className="pt-8 md:pt-0 px-4 pb-12">
        <motion.h2
          className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Choose Your Learning Path
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                type: "spring",
              }}
            >
              <Link href={`/dashboard/skills/${skill.slug}`}>
                <Card className="group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 perspective dark:hover:bg-transparent hover:bg-gray-200">
                  <motion.div className="relative transform-gpu transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(10deg)]">
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: skill.bgPattern }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent" />
                    <CardHeader className="relative z-10">
                      <motion.div
                        className={`${skill.color} p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4 mx-auto group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow duration-500`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <skill.icon className={`w-8 h-8 text-[${skill.color}]`} />
                      </motion.div>
                      <motion.div
                        initial={false}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <h3 className="text-2xl font-bold text-center mb-4 relative">
                          <span
                            className={`relative z-10 bg-clip-text  bg-gradient-to-r from-primary to-primary/80`}
                          >
                            {skill.name}
                          </span>
                        </h3>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <p className="text-center text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        Master {skill.name.toLowerCase()} through interactive
                        lessons and real-world practice.
                      </p>
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent via-primary/5 to-primary/10 rounded-tl-full transform translate-x-16 translate-y-16 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500" />
                    </CardContent>
                  </motion.div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
