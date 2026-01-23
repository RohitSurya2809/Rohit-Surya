"use client"

import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, MapPin, Phone, Code2 } from "lucide-react"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float animation-delay-300" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-float animation-delay-500" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome badge */}
          <div className="inline-block px-5 py-2 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full border border-accent/20 text-sm text-accent font-medium mb-4 animate-fade-in-up backdrop-blur-sm">
            Welcome to my portfolio
          </div>

          {/* Name */}
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 text-foreground leading-tight tracking-tight animate-fade-in-up animation-delay-100">
            Rohit Surya A T
          </h1>

          {/* Title */}
          <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-6 animate-fade-in-up animation-delay-200">
            Software Development Engineer & ML Engineer
          </p>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-300">
            Passionate about AI automation, Graph Neural Networks, and solving real-world problems through innovative
            coding solutions. Currently pursuing B.Tech in AI & Data Science.
          </p>

          {/* Contact info */}
          <div className="flex flex-wrap justify-center gap-6 mb-10 animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-all duration-300 group">
              <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-all">
                <MapPin className="w-4 h-4 text-accent" />
              </div>
              <span className="font-medium text-sm">Chennai, India</span>
            </div>
            <div className="hidden sm:flex items-center h-6 w-px bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-all duration-300 group">
              <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-all">
                <Mail className="w-4 h-4 text-accent" />
              </div>
              <a href="mailto:sankarirohitsurya@gmail.com" className="font-medium hover:underline text-sm">
                sankarirohitsurya@gmail.com
              </a>
            </div>
            <div className="hidden sm:flex items-center h-6 w-px bg-border" />
            <div className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-all duration-300 group">
              <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-all">
                <Phone className="w-4 h-4 text-accent" />
              </div>
              <a href="tel:+916383821547" className="font-medium hover:underline text-sm">
                +91 63838 21547
              </a>
            </div>
          </div>

          {/* Social buttons */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-fade-in-up animation-delay-500">
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent/10 hover:border-accent hover:text-accent transition-all bg-transparent group"
              asChild
            >
              <a href="https://github.com/RohitSurya2809" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent/10 hover:border-accent hover:text-accent transition-all bg-transparent group"
              asChild
            >
              <a href="https://www.linkedin.com/in/rohit-surya-385143290" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent/10 hover:border-accent hover:text-accent transition-all bg-transparent group"
              asChild
            >
              <a href="https://leetcode.com/u/Rohit_Surya2809" target="_blank" rel="noopener noreferrer">
                <Code2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                LeetCode
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent/10 hover:border-accent hover:text-accent transition-all bg-transparent group"
              asChild
            >
              <a href="https://www.hackerrank.com/profile/3143_RohitSurya" target="_blank" rel="noopener noreferrer">
                <Code2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                HackerRank
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent/10 hover:border-accent hover:text-accent transition-all bg-transparent group"
              asChild
            >
              <a href="https://codeforces.com/profile/Rohit_Surya" target="_blank" rel="noopener noreferrer">
                <Code2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Codeforces
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-accent/10 hover:border-accent hover:text-accent transition-all bg-transparent group"
              asChild
            >
              <a href="https://atcoder.jp/users/Rohit2809" target="_blank" rel="noopener noreferrer">
                <Code2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                AtCoder
              </a>
            </Button>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-500">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold px-8 shadow-lg shadow-accent/30 hover:shadow-xl hover:shadow-accent/40 transition-all hover:scale-105"
              onClick={() => {
                const element = document.querySelector("#contact")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              Get In Touch
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-semibold px-8 hover:bg-primary/5 border-primary/20 hover:border-primary bg-transparent transition-all hover:scale-105"
              onClick={() => {
                const element = document.querySelector("#projects")
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" })
                }
              }}
            >
              View My Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
