import { Card, CardContent } from "@/components/ui/card"

export function About() {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Driven by passion for innovation and continuous learning in AI and software development
            </p>
          </div>

          <Card className="mb-8 border-0 bg-white/95 backdrop-blur-sm hover:shadow-md transition-all">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold text-foreground mb-6">Career Objective</h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      Aspiring Software Development Engineer & ML Engineer with a passion for{" "}
                      <span className="text-secondary font-semibold">AI automation</span>,
                      and solving real-world problems through innovative coding. I'm dedicated to leveraging
                      cutting-edge technology to create impactful solutions.
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-secondary/5 border border-secondary/10 rounded-xl hover:bg-secondary/10 transition-all">
                    <h4 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary rounded-full" />
                      Current Focus
                    </h4>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="text-secondary font-bold mt-0.5">→</span>
                        <span>AI Automation & Workflow Optimization</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-secondary font-bold mt-0.5">→</span>
                        <span>Graph Neural Networks Research</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-secondary font-bold mt-0.5">→</span>
                        <span>Machine Learning Applications</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-secondary font-bold mt-0.5">→</span>
                        <span>Full-Stack Development</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-6 bg-accent/5 border border-accent/10 rounded-xl hover:bg-accent/10 transition-all">
                    <h4 className="font-bold text-lg text-foreground mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent rounded-full" />
                      Competitive Programming
                    </h4>
                    <ul className="text-muted-foreground space-y-2 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold">✓</span>
                        <span>
                          <span className="font-semibold text-accent">160+</span> day streak on GeeksforGeeks
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold">✓</span>
                        <span>
                          <span className="font-semibold text-accent">50+</span> day streak on LeetCode
                        </span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-accent font-bold">✓</span>
                        <span>Top 10 in Skillrack annual leaderboard</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
