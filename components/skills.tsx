import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Code, Database, Wrench, Trophy, Lightbulb, Server } from "lucide-react"

export function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Code,
      skills: ["Java", "Python", "JavaScript", "SQL"],
    },
    {
      title: "Backend & Frameworks",
      icon: Server,
      skills: ["Spring Boot", "JPA/Hibernate", "REST APIs", "Flask"],
    },
    {
      title: "Database",
      icon: Database,
      skills: ["MySQL", "PostgreSQL", "SQL"],
    },
    {
      title: "Tools & Platforms",
      icon: Wrench,
      skills: ["Git", "GitHub", "Docker", "n8n", "Make.com"],
    },
    {
      title: "Core Concepts",
      icon: Lightbulb,
      skills: ["OOP", "DSA", "SDLC", "Automation", "Microservices"],
    },
    {
      title: "Soft Skills",
      icon: Trophy,
      skills: ["Leadership", "Creative Thinking", "Multitasking", "Team Accountability"],
    },
  ]

  return (
    <section id="skills" className="py-24 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Technical Skills
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Proficiency across programming languages, modern frameworks, and specialized domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category, index) => (
              <Card
                key={index}
                className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:scale-105 hover:-translate-y-1 group"
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300 group-hover:scale-110">
                      <category.icon className="w-8 h-8 text-accent group-hover:text-accent transition-colors" />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {category.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs bg-accent/10 text-accent hover:bg-accent/20 border border-accent/20 hover:border-accent/40 font-medium transition-all duration-300 hover:scale-105"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
