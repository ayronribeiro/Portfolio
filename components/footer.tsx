export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-6 border-t">
      <div className="container px-4 md:px-6 text-center">
        <p className="text-sm text-muted-foreground">© {currentYear} Ayron Rivero. All rights reserved.</p>
      </div>
    </footer>
  )
}

