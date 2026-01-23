import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, ExternalLink } from "lucide-react"

export function Certifications() {
  const certifications = [
    {
      name: "AI Foundations Associate",
      issuer: "Oracle Cloud Infrastructure",
      date: "2024",
      credentialUrl: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=4E663F957D2237896B1B0F4FE2918D54763B26E4AD78ADA89E12EB2582EDEB0C",
      status: "Completed",
    },
    {
      name: "Software Engineer Job Simulation",
      issuer: "JP Morgan Chase & Co",
      date: "2024",
      credentialUrl: "https://www.linkedin.com/in/rohit-surya-385143290/details/certifications/1762441725956/single-media-viewer/?type=IMAGE&profileId=ACoAAEZ_5lUB96pBHRK0PRQNaj7O6ieajDJgi3Q",
      status: "Completed",
    },
    {
      name: "Python for Data Science",
      issuer: "NPTEL",
      date: "2024",
      credentialUrl: null,
      status: "Elite Silver",
    },
  ]

  return (
    <section id="certifications" className="py-24 bg-gradient-to-b from-muted/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Certifications
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and achievements demonstrating continuous learning and expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <Card
                key={index}
                className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:scale-105 hover:-translate-y-1 group"
              >
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300 group-hover:scale-110">
                      <Award className="w-8 h-8 text-accent" />
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-foreground text-center leading-tight">
                    {cert.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-primary">{cert.issuer}</p>
                    <p className="text-xs text-muted-foreground mt-1">{cert.date}</p>
                  </div>
                  <Badge className="bg-accent/20 text-accent border border-accent/30 font-semibold">
                    {cert.status}
                  </Badge>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-accent hover:text-accent/80 transition-colors mt-2"
                    >
                      <ExternalLink className="w-3 h-3" />
                      View Credential
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
