import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

export function WorkSection() {
  const projects = [
    {
      title: "Plataforma SaaS",
      description: "Uma plataforma completa para gestão de projetos e equipes com recursos avançados de colaboração.",
      image: "/projects/saas-demo.gif",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
      demoUrl: "https://example.com/project1",
      githubUrl: "https://github.com/username/project1",
      featured: true,
    },
    {
      title: "E-commerce App",
      description: "Aplicação de e-commerce com carrinho de compras, pagamentos e painel administrativo.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      demoUrl: "https://example.com/project2",
      githubUrl: "https://github.com/username/project2",
      featured: true,
    },
    {
      title: "Pagina de Login e Cadastro",
      description: "Página de login e cadastro moderna e responsiva.",
      image: "/placeholder.svg?height=400&width=600",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn/ui"],
      demoUrl: "https://ayronrivero-login-page.vercel.app/",
      githubUrl: "https://github.com/ayronribeiro/login-page",
      featured: true,
    },
  ]

  return (
    <section id="work" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Meus Projetos</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Aqui estão alguns dos meus projetos mais recentes. Cada projeto é uma oportunidade de aprendizado e
          crescimento.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden group border-2 hover:border-primary/20 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="secondary" className="rounded-full">
                          <Github className="h-4 w-4 mr-2" />
                          GitHub
                        </Button>
                      </Link>
                    )}
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="secondary" className="rounded-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Demo
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="font-normal">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex justify-end">
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

