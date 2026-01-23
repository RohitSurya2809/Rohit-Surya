"use client"

import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Github, Linkedin, Send } from "lucide-react"

export function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sankarirohitsurya@gmail.com",
      href: "mailto:sankarirohitsurya@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 63838 21547",
      href: "tel:+916383821547",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Chennai, India",
      href: null,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "RohitSurya2809",
      href: "https://github.com/RohitSurya2809",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "rohit-surya-385143290",
      href: "https://www.linkedin.com/in/rohit-surya-385143290",
    },
  ]

  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [submitStatus, setSubmitStatus] = React.useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    e.stopPropagation()
    
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const form = e.currentTarget
      const formData = new FormData(form)
      
      // Add Web3Forms access key
      formData.append("access_key", "24f289f6-d49a-4ddd-bc07-46c19cd61478")

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus("success")
        form.reset()
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus("idle"), 5000)
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-muted/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I'm always open to new opportunities, collaborations, and creative ideas. Let's connect!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div>
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold mb-2">Contact Information</CardTitle>
                  <p className="text-muted-foreground">
                    Feel free to reach out for collaborations, opportunities, or just to connect!
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 hover:bg-accent/5 rounded-lg transition-all duration-300 group"
                    >
                      <div className="p-3 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg group-hover:from-accent/30 group-hover:to-primary/30 transition-all duration-300 group-hover:scale-110">
                        <info.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-1">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            target={info.href.startsWith("http") ? "_blank" : undefined}
                            rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="font-bold text-foreground hover:text-accent transition-colors text-base"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-bold text-foreground text-base">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="h-full border-border/50 bg-card/50 backdrop-blur-sm hover:shadow-xl transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold mb-2">Send a Message</CardTitle>
                  <p className="text-muted-foreground">
                    {"I'd love to hear from you. Send me a message and I'll respond as soon as possible."}
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-5" onSubmit={handleSubmit} noValidate>
                    <input type="hidden" name="from_name" value="Portfolio Contact Form" />
                    <input type="checkbox" name="botcheck" className="hidden" aria-hidden="true" tabIndex={-1} />
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-bold text-foreground">
                          Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your name"
                          className="border-border/50 focus:border-accent transition-all"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-bold text-foreground">
                          Email
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your.email@example.com"
                          className="border-border/50 focus:border-accent transition-all"
                          required
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-bold text-foreground">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        name="subject"
                        placeholder="What's this about?"
                        className="border-border/50 focus:border-accent transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-bold text-foreground">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Your message here..."
                        rows={5}
                        className="border-border/50 focus:border-accent transition-all"
                        required
                        disabled={isSubmitting}
                      />
                    </div>

                    {submitStatus === "success" && (
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 text-sm">
                        ✓ Message sent successfully! I'll get back to you soon.
                      </div>
                    )}
                    {submitStatus === "error" && (
                      <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 text-sm">
                        ✗ Failed to send message. Please try again or contact me directly at sankarirohitsurya@gmail.com
                      </div>
                    )}

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base py-6 rounded-lg transition-all shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
