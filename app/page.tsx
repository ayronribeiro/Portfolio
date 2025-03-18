"use client";

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
import { useState } from "react"
import { WorkSection } from "@/components/work-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { TechStackCarousel } from "@/components/tech-stack-carousel"
import { LoadingScreen } from "@/components/loading-screen"

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

export default function Portfolio() {
  return (
    <LoadingScreen>
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
      </div>
    </LoadingScreen>
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between relative">
        <Link href="/" className="font-bold">
          <Image
            src="/logo.png"
            alt="Portfolio Logo"
            width={40}
            height={15}
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#about" className="text-sm font-medium hover:text-primary transition-colors">
            Sobre
          </Link>
          <Link href="#work" className="text-sm font-medium hover:text-primary transition-colors">
            Projetos
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary transition-colors">
            Contato
          </Link>
          <Button variant="outline" size="sm" asChild className="hidden md:flex">
            <Link href="/ayronribeiro.pdf" target="_blank" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Currículo
            </Link>
          </Button>
        </nav>
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b p-4 md:hidden">
            <nav className="flex flex-col gap-2">
              <Link
                href="#about"
                className="text-sm font-medium hover:text-primary transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre
              </Link>
              <Link
                href="#work"
                className="text-sm font-medium hover:text-primary transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Projetos
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium hover:text-primary transition-colors p-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

function HeroSection() {
  return (
    <section id="hero" className="min-h-screen flex items-center md:-mt-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative group">
            <ThreeScene />
          </div>
          
          <div className="space-y-4 max-w-[600px]">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="text-primary">Ayron Rivero</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Desenvolvedor Front-end Pleno com mais de 5 anos de experiência e pós-graduado em Cybersecurity. Apaixonado por desenvolver soluções inovadoras e seguras.
            </p>
            
            <div className="flex justify-center gap-4 pt-4">
              <Button asChild>
                <Link href="#contact">Entre em contato</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#work">Ver projetos</Link>
              </Button>
            </div>
            
            <div className="flex justify-center gap-4 pt-6">
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
            <div className="md:hidden flex justify-center pt-2 pb-20">
              <Button variant="outline" asChild>
                <Link href="/ayronribeiro.pdf" target="_blank" className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Currículo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const personalInterests = [
    { icon: <Gamepad2 className="h-5 w-5" />, label: "Games" },
    { icon: <Gamepad2 className="h-5 w-5" />, label: "Consoles Portáteis" },
    { icon: <Code className="h-5 w-5" />, label: "Tecnologia" },
    { icon: <Brain className="h-5 w-5" />, label: "IA" },
    { icon: <Music className="h-5 w-5" />, label: "Música" },
    { icon: <Film className="h-5 w-5" />, label: "Filmes e Séries" },
    { icon: <BookOpen className="h-5 w-5" />, label: "Livros" },
    { icon: <Shield className="h-5 w-5" />, label: "Cybersecurity" },
    { icon: <Dumbbell className="h-5 w-5" />, label: "Academia" },
    { icon: <Cat className="h-5 w-5" />, label: "Vídeos de Gatinhos" },
    { icon: <Palette className="h-5 w-5" />, label: "Arte e Design" },
    { icon: <Utensils className="h-5 w-5" />, label: "Cozinhar" }
  ]

  return (
    <section id="about" className="min-h-screen flex items-center bg-muted/50 py-16 md:py-20 scroll-mt-16">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6 p-2 md:p-4">
            <div>
              <h2 className="text-3xl font-bold">Ayron Rivero</h2>
              <h3 className="text-xl font-medium text-primary mt-2">Software Developer | Especialista em Cybersecurity</h3>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-2">Atualmente desenvolvendo:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-0.5">
                    Projeto
                  </Badge>
                  Um SaaS para gestão de projetos
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-0.5">
                    Freelance
                  </Badge>
                  Sites e aplicações para pequenas empresas
                </li>
                <li className="flex items-center gap-2">
                  <Badge variant="outline" className="px-2 py-0.5">
                    Estudo
                  </Badge>
                  Plugin WordPress que usa IA para gerar textos
                </li>
              </ul>
            </div>

            <div>
              <p className="text-muted-foreground">
              Com mais de 5 anos de experiência no desenvolvimento web, crio soluções digitais escaláveis e seguras, unindo tecnologia e performance. Trabalho com React, Next.js, Angular, Wordpress e Strapi, sempre focado na experiência do usuário e nas melhores práticas de desenvolvimento.
              </p>
              <p className="text-muted-foreground mt-4">
              Minha paixão pela tecnologia vai além do código. Gosto de estruturar projetos que sejam eficientes, intuitivos e, acima de tudo, seguros. Se quiser trocar ideias ou falar sobre projetos, pode entrar em <span className="text-primary font-bold cursor-pointer hover:underline" onClick={() => window.location.href = '#contact'}>contato!</span>
              </p>
            </div>

            <div className="flex gap-4 pt-2">
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

          <div>
            <Card className="h-full">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Interesses Pessoais</h3>
                <div className="grid grid-cols-2 gap-4">
                  {personalInterests.map((interest, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="text-primary">{interest.icon}</div>
                      <span>{interest.label}</span>
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
    <section className="py-20">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Tech Stack</h2>
          <p className="text-muted-foreground">Explorando as tecnologias que impulsionam minhas soluções</p>
        </div>
        <TechStackCarousel techStacks={techStack} />
      </div>
    </section>
  );
}