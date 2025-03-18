import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, ExternalLink } from "lucide-react"

export function WorkSection() {
  const projects = [
    {
      title: "Mydieselclaim",
      description: "Plataforma da Pogust Goodhead contra fraude em emissões de diesel. Criação de landing pages, otimização para alta demanda e bot automatizado.",
      image: "/projects/diesel.mp4",
      tags: ["Wordpress", "HTML", "CSS", "JavaScript", "PHP", "Landbot"],
      demoUrl: "https://mydieselclaim.com/",
      featured: true,
    },
    {
      title: "Somos",
      description: "Desenvolvi juntamente com outros desenvolvedores o site institucional da Somos, uma legal tech que oferece serviços de tecnologia, marketing, design e diveros outros serviços para escritórios de advocacia.",
      image: "/projects/somos.mp4",
      tags: ["Angular", "TypeScript", "SASS", "Strapi API", "Angular Material", "Ngx-translate"],
      demoUrl: "https://somos.us",
      featured: true,
    },
    {
      title: "Vrauu Energy Drink",
      description: "Site de e-commerce para a empresa Vrauu Energy Drink, com carrinho de compras, checkout, login, cadastro, rastreio de pedidos, Mercado Pago, integração com ERP pra controle de estoque etc.",
      image: "/projects/vrauu.mp4",
      tags: ["Wordpress", "Woocommerce", "CSS", "JavaScript", "PHP", "Mercado Pago", "Bling"],
      demoUrl: "https://loja.vrauu.com",
      featured: true,
    },
    {
      title: "Banco Digital",
      description: "Plataforma de banco digital, transferências, investimentos, histórico de transações, cartões, etc.",
      image: "/projects/bancodigital.mp4",
      tags: ["React", "Next.js", "shadcn/ui", "Tailwind CSS", "TypeScript"],
      demoUrl: "https://ayronrivero-banco-digital.vercel.app/",
      githubUrl: "https://github.com/ayronribeiro/banco-digital/",
      featured: true,
    },
    {
      title: "Pagina de Login e Cadastro",
      description: "Página de login e cadastro moderna e responsiva.",
      image: "/projects/login.mp4",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn/ui"],
      demoUrl: "https://ayronrivero-login-page.vercel.app/",
      githubUrl: "https://github.com/ayronribeiro/login-page",
      featured: true,
    },
    {
      title: "Site Institucional Pogust Goodhead",
      description: "Site institucional para a empresa Pogust Goodhead, com informações sobre a empresa, serviços, contato, localização e muito mais.",
      image: "/projects/pogust.mp4",
      tags: ["Wordpress", "CSS", "PHP", "JavaScript", "JetEngine", "JetSmartFilter"],
      demoUrl: "https://pogustgoodhead.com",
      featured: true,
    },
  ]

  return (
    <section id="work" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-4">Meus Projetos</h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Aqui estão alguns dos projetos que eu trabalhei.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-9xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden group border-2 hover:border-primary/20 transition-all duration-300 h-full w-full"
            >
              <div className="relative aspect-video overflow-hidden">
                {project.image?.endsWith('.mp4') ? (
                  <video
                    src={project.image}
                    className="absolute inset-0 w-full h-full object-cover scale-103 transition-transform duration-500 group-hover:scale-110"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    poster="/placeholder.svg"
                  />
                ) : (
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    quality={100}
                  />
                )}
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
                        Visitar Site
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

