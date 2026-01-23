import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink, Lock, Sprout } from "lucide-react"

export function Projects() {
  const projects = [
    {
      title: "VAULTEDGE – Banking Microservice",
      description:
        "Built a secure banking microservice featuring JWT authentication, customer onboarding, account handling, and transaction workflows (deposit/withdraw/transfer). Implemented idempotency keys, ACID-safe operations, Flyway migrations, global exception handling, and Dockerized deployment for production readiness.",
      icon: Lock,
      technologies: ["Spring Boot", "Java", "MySQL", "Docker", "JWT", "REST APIs", "JPA/Hibernate"],
      features: [
        "JWT authentication & secure customer onboarding",
        "Account handling with transaction workflows",
        "Idempotency keys for reliable operations",
        "ACID-safe transactions with Flyway migrations",
        "Global exception handling",
        "Dockerized deployment for production",
      ],
      status: "Production Ready",
      githubUrl: "https://github.com/RohitSurya2809/vaultedge",
      demoUrl: null,
    },
    {
      title: "UZHAVAR – ML based Crop Recommendation Mobile App",
      description:
        "Built a mobile application for crop recommendation using ML-based classification based on soil and environmental factors, optimized for on-device inference. The app helps farmers make data-driven decisions about crop selection.",
      icon: Sprout,
      technologies: ["Python", "TensorFlow Lite", "Android", "Machine Learning", "Mobile Development"],
      features: [
        "ML-based crop classification algorithm",
        "Soil and environmental factor analysis",
        "On-device inference optimization",
        "Mobile-first design for accessibility",
        "Data-driven crop recommendations",
      ],
      status: "Production Ready",
      githubUrl: "https://github.com/RohitSurya2809/rankfarm_ai",
      demoUrl: null,
    },
  ]

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Innovative projects showcasing expertise in Backend Development, Machine Learning, and Mobile Applications
            </p>
          </div>

          <div className="grid lg:grid-cols-1 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border-border/50 bg-card/50 backdrop-blur-sm hover:-translate-y-1 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="p-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300">
                      <project.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <CardTitle className="text-2xl font-bold text-foreground">{project.title}</CardTitle>
                        <Badge className="w-fit bg-accent/20 text-accent hover:bg-accent/30 border border-accent/30 font-semibold">
                          {project.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-base">{project.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-foreground mb-4 text-lg">Key Features</h4>
                        <ul className="space-y-3">
                          {project.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-muted-foreground flex items-start gap-3">
                              <span className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-bold text-foreground mb-4 text-lg">Technologies</h4>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="secondary"
                              className="text-xs bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 hover:border-primary/40 font-medium transition-all"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-3 pt-2">
                        {project.githubUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-accent/10 hover:border-accent hover:text-accent bg-transparent transition-all group/btn"
                            asChild
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                              GitHub
                            </a>
                          </Button>
                        )}
                        {project.demoUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:bg-accent/10 hover:border-accent hover:text-accent bg-transparent transition-all group/btn"
                            asChild
                          >
                            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                              Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
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
