import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar } from "lucide-react"

export function Education() {
  return (
    <section id="education" className="py-24 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Education</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Pursuing studies in Artificial Intelligence and Data Science
            </p>
          </div>

          <Card className="border-0 bg-white/95 backdrop-blur-sm hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-3 font-bold">Bachelor of Technology</CardTitle>
                  <p className="text-lg font-bold text-secondary mb-3">
                    Artificial Intelligence and Data Science
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-muted-foreground">
                    <span className="font-bold text-foreground">St. Joseph's Institute of Technology</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Aug 2023 – Present</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 bg-secondary/5 border border-secondary/10 rounded-xl hover:bg-secondary/10 transition-all">
                  <h4 className="font-bold text-foreground mb-5 text-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-secondary rounded-full" />
                    Academic Performance
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <span className="text-muted-foreground font-medium">Current CGPA</span>
                      <Badge className="bg-secondary text-white hover:bg-secondary/90 text-lg px-4 py-1 font-bold">
                        8.4
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
                      <span className="text-muted-foreground font-medium">Department Ranking</span>
                      <Badge className="bg-accent/20 text-accent border-accent/30 font-bold">Top 3</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-accent/5 border border-accent/10 rounded-xl hover:bg-accent/10 transition-all">
                  <h4 className="font-bold text-foreground mb-5 text-lg flex items-center gap-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    Key Focus Areas
                  </h4>
                  <ul className="space-y-3">
                    <li className="text-muted-foreground flex items-start gap-3">
                      <span className="text-accent font-bold mt-0.5">›</span>
                      <span>Artificial Intelligence & Machine Learning</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-3">
                      <span className="text-accent font-bold mt-0.5">›</span>
                      <span>Data Science & Advanced Analytics</span>
                    </li>
                    <li className="text-muted-foreground flex items-start gap-3">
                      <span className="text-accent font-bold mt-0.5">›</span>
                      <span>Agentic AI and Automatiom</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
