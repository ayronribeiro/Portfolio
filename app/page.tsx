"use client";

import { Sun, ArrowRight, Mail, Moon, Laptop, Flag } from "lucide-react"
import dynamic from "next/dynamic"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader } from "@/components/ui/loader"
import {
  Gamepad2,
  Code,
  Brain,
  Music,
  Film,
  BookOpen,
  Shield,
  Dumbbell,
  Cat,
  Github,
  Linkedin,
  Menu,
  X,
  Twitter,
  Instagram,
  Download,
  Palette,
  Utensils
} from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import { WorkSection } from "@/components/work-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { TechStackCarousel } from "@/components/tech-stack-carousel"
import { LoadingScreen } from "@/components/loading-screen"
import { useTheme } from "./components/theme-provider"

const ThreeScene = dynamic(() => import("./components/ThreeScene").then(mod => mod.ThreeScene), {
  ssr: false,
  loading: () => (
    <div className="w-[400px] h-[400px] flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-lg">
      <div className="text-center">
        <Loader className="w-12 h-12 mb-4 mx-auto" />
      </div>
    </div>
  )
})

// Componentes que precisam de hidratação imediata
const ThemeButton = ({ className }: { className?: string }) => {
  const { theme, toggleTheme } = useTheme()
  const currentTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark'

  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      onClick={toggleTheme}
    >
      {(theme || currentTheme) === "dark" ? (
        <Sun className="h-5 w-5 text-foreground" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </Button>
  )
}

const MobileMenu = ({ onLinkClick }: { onLinkClick: () => void }) => {
  return (
    <nav className="flex flex-col gap-2">
      <Link href="#about" onClick={onLinkClick} className="p-2 text-foreground hover:text-primary transition-colors">About</Link>
      <Link href="#stacks" onClick={onLinkClick} className="p-2 text-foreground hover:text-primary transition-colors">Stacks</Link>
      <Link href="#contact" onClick={onLinkClick} className="p-2 text-foreground hover:text-primary transition-colors">Contact</Link>
      <Link 
        href="/ayronribeiroen.pdf" 
        target="_blank" 
        onClick={onLinkClick} 
        className="mt-2 p-2 border rounded-md flex items-center justify-center gap-2 bg-primary/10 hover:bg-primary/20 transition-colors text-foreground font-medium"
      >
        Resume
        <Download className="h-4 w-4" />
      </Link>
    </nav>
  )
}

function ThemeToggleFloat() {
  return (
    <ThemeButton className="fixed bottom-6 right-6 z-50 rounded-full md:hidden shadow-lg bg-background border-2" />
  )
}

function BrazilFlag() {
  return (
    <Image 
      src="/brazilflag.svg" 
      alt="Bandeira do Brasil" 
      width={20} 
      height={20} 
      className="inline-block ml-2 flex-shrink-0"
    />
  )
}

export default function Portfolio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <WorkSection />
        <ContactSection />
      </main>
      <Footer />
      <ThemeToggleFloat />
    </div>
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme } = useTheme()
  const currentTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') || 'dark' : 'dark'

  const handleLinkClick = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={handleLinkClick}>
          <div className="w-8 h-8">
            {(theme || currentTheme) === "dark" ? (
              <Image
                src="/logobranca.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            ) : (
              <Image
                src="/logo.png"
                alt="Logo"
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            )}
          </div>
          <div className="flex flex-col text-sm">
            <span className="font-medium text-foreground">Ayron Rivero</span>
            <span className="text-xs text-muted-foreground">Software Developer</span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#about" className="text-sm text-foreground hover:text-primary transition-colors">About</Link>
          <Link href="#stacks" className="text-sm text-foreground hover:text-primary transition-colors">Stacks</Link>
          <Link href="#contact" className="text-sm text-foreground hover:text-primary transition-colors">Contact</Link>
          <Button variant="outline" size="sm" className="text-sm">
            <Link href="/ayronribeiroen.pdf" target="_blank" className="flex items-center gap-2">
              Resume
              <Download className="h-4 w-4" />
            </Link>
          </Button>
          <ThemeButton className="rounded-full" />
        </nav>
        <div className="md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5 text-foreground" /> : <Menu className="h-5 w-5 text-foreground" />}
          </Button>
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 animate-in slide-in-from-top-5 duration-200">
              <MobileMenu onLinkClick={handleLinkClick} />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section className="min-h-screen flex items-center pt-24 sm:pt-16 md:pt-0">
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] mx-auto order-1 md:order-2">
            <div className="absolute inset-0 rounded-full bg-muted/30 backdrop-blur-sm flex items-center justify-center">
              <Image
                src="/euu.jpg"
                alt="Minha foto"
                width={400}
                height={400}
                className="rounded-full w-full h-full object-cover"
                priority
              />
            </div>
          </div>
          <div className="space-y-4 md:space-y-4 text-center md:text-left order-2 md:order-1">
            <div className="flex justify-center md:justify-start">
              <div className="inline-flex items-center">
                <Badge variant="secondary" className="rounded-md px-3 py-1.5 text-sm md:text-base whitespace-nowrap dark:bg-zinc-900 bg-zinc-100 inline-flex items-center min-w-max">
                  <span className="flex-shrink-0">Software Developer | Cybersecurity Specialist</span>
                  <BrazilFlag />
                </Badge>
              </div>
            </div>
            <h1 className="text-2xl md:text-5xl font-bold text-foreground">
            Hi, I'm Ayron! 👋
            </h1>
            <p className="text-base md:text-xl text-muted-foreground leading-relaxed max-w-[350px] mx-auto md:max-w-none">
            I'm a Software Developer with over 5 years of experience, working on real-world projects, including international ones. I have a postgraduate degree in Cybersecurity, which helps me build secure and scalable applications.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs md:text-sm text-foreground">React</Badge>
              <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs md:text-sm text-foreground">Angular</Badge>
              <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs md:text-sm text-foreground">Next.js</Badge>
              <Badge variant="outline" className="rounded-full px-2 py-0.5 text-xs md:text-sm text-foreground">WordPress</Badge>
            </div>
            <div className="flex gap-4 justify-center md:justify-start">
              <Button size="sm" className="text-xs md:text-sm">
                <Link href="#stacks" className="flex items-center gap-2">
                View Stacks
                  <ArrowRight className="h-3 w-3 md:h-4 md:w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="sm" className="text-xs md:text-sm">
                <Link href="#contact" className="flex items-center gap-2">
                Contact
                </Link>
              </Button>
            </div>
            <div className="flex gap-6 text-muted-foreground justify-center md:justify-start pb-8 md:pb-0">
              <Link href="https://github.com/ayronribeiro" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 md:h-5 md:w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="https://www.linkedin.com/in/ayron-ribeiro-rivero/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4 md:h-5 md:w-5 hover:text-primary transition-colors" />
              </Link>
              <Link href="mailto:ayronribeiro.rr@gmail.com">
                <Mail className="h-4 w-4 md:h-5 md:w-5 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const personalInterests = [
    { icon: <Gamepad2 className="h-5 w-5" />, label: "Gaming" },
    { icon: <Gamepad2 className="h-5 w-5" />, label: "Handheld Consoles" },
    { icon: <Code className="h-5 w-5" />, label: "Technology" },
    { icon: <Brain className="h-5 w-5" />, label: "AI" },
    { icon: <Music className="h-5 w-5" />, label: "Music" },
    { icon: <Film className="h-5 w-5" />, label: "Movies & TV Shows" },
    { icon: <BookOpen className="h-5 w-5" />, label: "Books" },
    { icon: <Shield className="h-5 w-5" />, label: "Cybersecurity" },
    { icon: <Dumbbell className="h-5 w-5" />, label: "Gym" },
    { icon: <Cat className="h-5 w-5" />, label: "Cat Videos" },
    { icon: <Palette className="h-5 w-5" />, label: "Art & Design" },
    { icon: <Utensils className="h-5 w-5" />, label: "Cooking" }
  ]

  const currentProjects = [
    {
      type: "Project",
      title: "Payment request platform via WhatsApp",
      icon: <Code className="h-5 w-5" />
    },
    {
      type: "Freelance",
      title: "Websites and applications for small businesses",
      icon: <Laptop className="h-5 w-5" />
    },
    {
      type: "Learning",
      title: "WordPress plugin that uses AI to generate content",
      icon: <Brain className="h-5 w-5" />
    }
  ]

  return (
    <section id="about" className="min-h-screen flex items-center bg-muted/50 py-16 md:py-20 scroll-mt-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8 md:p-4">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Ayron Rivero</h2>
              <h3 className="text-lg font-medium text-primary mt-2">Software Developer | Cybersecurity Specialist</h3>
            </div>

            <div className="md:hidden">
              <p className="text-muted-foreground">
              With over 5 years of experience in web development, I create scalable and secure digital solutions, combining technology, performance, and security. I work with React, Next.js, Angular, WordPress, and Strapi, always focused on user experience and best development practices.
              </p>
              <p className="text-muted-foreground mt-4">
              My passion for technology goes beyond coding. I love structuring projects that are efficient, intuitive, and, above all, secure. If you'd like to chat or discuss a project, feel free to <span className="text-primary font-bold cursor-pointer hover:underline" onClick={() => window.location.href = '#contact'}>reach out!</span>
              </p>
            </div>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                Currently working on
                </h4>
                <div className="space-y-4">
                  {currentProjects.map((project, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-primary mt-1">{project.icon}</div>
                      <div className="space-y-1">
                        <Badge variant="outline" className="px-2 py-0.5 bg-primary/10">
                          {project.type}
                        </Badge>
                        <p className="text-foreground">{project.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="hidden md:block">
              <p className="text-muted-foreground">
              With over 5 years of experience in web development, I create scalable and secure digital solutions, combining technology, performance, and security. I work with React, Next.js, Angular, WordPress, and Strapi, always focused on user experience and best development practices.
              </p>
              <p className="text-muted-foreground mt-4">
              My passion for technology goes beyond coding. I love structuring projects that are efficient, intuitive, and, above all, secure. If you'd like to chat or discuss a project, feel free to <span className="text-primary font-bold cursor-pointer hover:underline" onClick={() => window.location.href = '#contact'}>reach out!</span>
              </p>
            </div>

            <div className="flex flex-col">
              <div className="hidden md:flex gap-4 pt-2">
                <Link
                  href="https://github.com/ayronribeiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/ayron-ribeiro-rivero/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://twitter.com/ayronrr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://instagram.com/ayronrr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
              <div className="md:hidden flex gap-4 pt-2 justify-center">
                <Link
                  href="https://github.com/ayronribeiro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://www.linkedin.com/in/ayron-ribeiro-rivero/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://twitter.com/ayronrr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link
                  href="https://instagram.com/ayronrr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </div>
            </div>
          </div>

          <div>
            <Card className="bg-card">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6 text-foreground">Personal Interests</h3>
                <div className="grid grid-cols-2 gap-4">
                  {personalInterests.map((interest, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2.5 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0 text-primary">{interest.icon}</div>
                      <span className="text-foreground text-sm leading-tight">{interest.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

function StackSection() {
  const techStack = [
    {
      name: "React",
      icon: <Image src="/react.svg" alt="React" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Angular",
      icon: <Image src="/angular.svg" alt="Angular" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Nextjs",
      icon: <Image src="/next.svg" alt="Nextjs" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Three.js",
      icon: <svg width="103" height="104" viewBox="0 0 103 104" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="threejs">
      <g id="threejs_2">
      <path id="Vector" fillRule="evenodd" clipRule="evenodd" d="M26.7016 102L2 2.00049L101.023 30.5097L26.7016 102Z" stroke="white" strokeWidth="2.2865" strokeMiterlimit="10" strokeLinejoin="round"/>
      <path id="Vector_2" fillRule="evenodd" clipRule="evenodd" d="M51.4929 16.2579L63.8349 66.2728L14.3511 52.0136L51.4929 16.2579Z" stroke="white" strokeWidth="2.2865" strokeMiterlimit="10" strokeLinejoin="round"/>
      <path id="Vector_3" fillRule="evenodd" clipRule="evenodd" d="M39.2146 58.7971L33.0845 33.9514L57.6689 41.0087L39.2146 58.7971Z" stroke="white" strokeWidth="2.2865" strokeMiterlimit="10" strokeLinejoin="round"/>
      <path id="Vector_4" fillRule="evenodd" clipRule="evenodd" d="M26.9519 9.13611L33.082 33.9818L8.49756 26.9245L26.9519 9.13611Z" stroke="white" strokeWidth="2.2865" strokeMiterlimit="10" strokeLinejoin="round"/>
      <path id="Vector_5" fillRule="evenodd" clipRule="evenodd" d="M76.1186 23.2992L82.2487 48.1449L57.6643 41.0876L76.1186 23.2992Z" stroke="white" strokeWidth="2.2865" strokeMiterlimit="10" strokeLinejoin="round"/>
      <path id="Vector_6" fillRule="evenodd" clipRule="evenodd" d="M39.2173 58.8142L45.3474 83.6599L20.7629 76.6026L39.2173 58.8142Z" stroke="white" strokeWidth="2.2865" strokeMiterlimit="10" strokeLinejoin="round"/>
      </g>
      </g>
      </svg>      
    },
    {
      name: "Wordpress",
      icon: <Image src="/wordpress.svg" alt="Wordpress" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Strapi",
      icon: <Image src="/strapi.svg" alt="Strapi API" width={70} height={70} className="h-17 w-20"/>
    },
    {
      name: "JavaScript",
      icon: <Image src="/js.svg" alt="JavaScript" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "TypeScript",
      icon: <Image src="/ts.svg" alt="TypeScript" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "PHP",
      icon: <Image src="/php.svg" alt="PHP" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Tailwind",
      icon: <Image src="/tailwind.svg" alt="Tailwind" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Bootstrap",
      icon: <Image src="/boot.svg" alt="Bootstrap" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Node.js",
      icon: <Image src="/node.svg" alt="Nodejs" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Express.js",
      icon: <Image src="/express.svg" alt="Express.js" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "HTML5",
      icon: <Image src="/html.svg" alt="HTML" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "CSS3",
      icon: <Image src="/css.svg" alt="CSS" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Figma",
      icon: <Image src="/figma.svg" alt="Figma" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Woocommerce",
      icon: <Image src="/woo.svg" alt="Woocommerce" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Burp Suite",
      icon: <Image src="/burp.svg" alt="Burp Suite" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "PostgreSQL",
      icon: <Image src="/post.svg" alt="PostgreSQL" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "mySQL",
      icon: <Image src="/mysql.svg" alt="MySQL" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Docker",
      icon: <Image src="/docker.svg" alt="Docker" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "AWS",
      icon: <Image src="/aws2.svg" alt="AWS" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "MongoDB",
      icon: <Image src="/mongodb.svg" alt="MongoDB" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Firebase",
      icon: <Image src="/fire.svg" alt="Firebase" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Insomnia",
      icon: <Image src="/insomnia.svg" alt="Insomnia" width={100} height={100} className="h-100 w-100"/>
    },
    {
      name: "Linux",
      icon: <Image src="/linux.svg" alt="Linux" width={100} height={100} className="h-100 w-100"/>
    }
  ];

  return (
    <section id="stacks" className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Tech Stack</h2>
          <p className="text-muted-foreground">Exploring the technologies that power my solutions</p>
        </div>
        <TechStackCarousel techStacks={techStack} />
      </div>
    </section>
  );
}