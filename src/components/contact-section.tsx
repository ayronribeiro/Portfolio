import Link from "next/link"
import { Mail, Github, Linkedin, Twitter, Instagram } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Contato</h2>
          <p className="text-muted-foreground mb-8">
            Entre em contato comigo!
          </p>

          <div className="flex items-center justify-center mb-8">
            <Link
              href="mailto:ayronribeiro.rr@gmail.com"
              className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors"
            >
              <Mail className="h-5 w-5" />
              ayronribeiro.rr@gmail.com
            </Link>
          </div>

          <div className="flex justify-center gap-6">
            <Link
              href="https://github.com/ayronribeiro"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/ayron-ribeiro-rivero/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </Link>
            <Link
              href="https://twitter.com/ayronrr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </Link>
            <Link
              href="https://instagram.com/ayronrr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

