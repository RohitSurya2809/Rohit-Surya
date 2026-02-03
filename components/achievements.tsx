import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Target, FileText } from "lucide-react"

export function Achievements() {
  const achievementCategories = [
    {
      title: "Hackathons & Competitions",
      icon: Trophy,
      achievements: [
        "Winner - TN Police Hackathon",
        "Winner - Blaze-A-Trial 2.0",
        "Finalist - HackIndia",
        "Finalist - Smartathon",
        "Winner - Multiple National Symposiums",
      ],
    },
    {
      title: "Academic Excellence",
      icon: Award,
      achievements: [
        "Top 3 in Department Leaderboard",
        "Current CGPA: 8.4",
        "Top 10 in Skillrack Annual Leaderboard",
        "Consistent Academic Performance",
      ],
    },
    {
      title: "Competitive Programming",
      icon: Target,
      achievements: [
        "160+ Day Streak on GeeksforGeeks",
        "50+ Day Streak on LeetCode",
        "Active on Multiple Coding Platforms",
        "Regular Problem Solving Practice",
      ],
    },
    {
      title: "Publications & Research",
      icon: FileText,
      achievements: [
        "Paper on OPS-AGENT – Failure-Aware Agentic Automation System (In Progress)",
        "Co-researcher for UZHAVAR - Crop Recommendation (In Progress)",
        "Research Focus on Graph Neural Networks",
        "AI Automation Research",
      ],
    },
  ]

  return (
    <section id="achievements" className="py-24 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Achievements & Recognition</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recognition for innovation, excellence, and continuous contribution to the tech community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {achievementCategories.map((category, index) => (
              <Card
                key={index}
                className="h-full border-0 bg-white/95 backdrop-blur-sm hover:shadow-md transition-all hover:scale-[1.02] group"
              >
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg group-hover:from-secondary/30 group-hover:to-accent/30 transition-all">
                      <category.icon className="w-6 h-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start gap-3">
                        <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground text-sm font-medium">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="inline-block border-0 bg-gradient-to-r from-secondary/10 to-accent/10 backdrop-blur-sm hover:shadow-lg transition-all">
              <CardContent className="p-8">
                <h3 className="font-bold text-xl text-foreground mb-4">Research Publications</h3>
                <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                  Currently working on advancing research in Graph Neural Networks and Crop Recommendation applications
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Badge className="bg-secondary text-white hover:bg-secondary/90 px-4 py-2 text-sm font-medium">
                    OPS Agent Paper - In Progress
                  </Badge>
                  <Badge className="bg-accent text-foreground hover:bg-accent/90 px-4 py-2 text-sm font-medium">
                    UZHAVAR Paper - In Progress
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
