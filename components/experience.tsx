import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Briefcase } from "lucide-react"

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-background to-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Experience</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional internship and hands-on experience in AI automation and workflow development
            </p>
          </div>

          <Card className="relative border-0 bg-white/95 backdrop-blur-sm hover:shadow-lg transition-all">
            <div className="absolute left-8 top-16 bottom-8 w-0.5 bg-gradient-to-b from-secondary to-accent hidden md:block" />

            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-4 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-xl relative z-10">
                  <Briefcase className="w-6 h-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-3 font-bold">AI Automation Intern</CardTitle>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-muted-foreground mb-2">
                    <span className="font-bold text-secondary text-lg">ZUNTRA DIGITAL</span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>June 2025 – August 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="ml-16 md:ml-20 space-y-6">
              <div>
                <h4 className="font-bold text-foreground mb-4 text-lg">Key Achievements</h4>
                <ul className="space-y-3">
                  <li className="text-muted-foreground flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2.5 flex-shrink-0" />
                    <span>
                      Built <span className="font-bold text-secondary">50+</span> automated workflows using n8n and Make
                      platforms
                    </span>
                  </li>
                  <li className="text-muted-foreground flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2.5 flex-shrink-0" />
                    <span>Created sophisticated workflows for email parsing and processing with real-time automation</span>
                  </li>
                  <li className="text-muted-foreground flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2.5 flex-shrink-0" />
                    <span>Developed API integrations for seamless data flow across multiple platforms</span>
                  </li>
                  <li className="text-muted-foreground flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2.5 flex-shrink-0" />
                    <span>Implemented automated file operations and sophisticated data management systems</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-foreground mb-4 text-lg">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-secondary/20 text-secondary hover:bg-secondary/30 border-secondary/30 font-medium">
                    n8n
                  </Badge>
                  <Badge className="bg-secondary/20 text-secondary hover:bg-secondary/30 border-secondary/30 font-medium">
                    Make
                  </Badge>
                  <Badge className="bg-accent/20 text-accent hover:bg-accent/30 border-accent/30 font-medium">
                    API Integration
                  </Badge>
                  <Badge className="bg-accent/20 text-accent hover:bg-accent/30 border-accent/30 font-medium">
                    Workflow Automation
                  </Badge>
                  <Badge className="bg-accent/20 text-accent hover:bg-accent/30 border-accent/30 font-medium">
                    Email Processing
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
