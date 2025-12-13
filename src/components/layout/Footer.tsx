import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Browse", href: "/browse" },
    { label: "Vaults", href: "/collections" },
    { label: "Learning", href: "/learning" },
    { label: "AI Tools", href: "/ai-tools" },
    { label: "My Workspace", href: "/workspace" },
  ],
  categories: [
    { label: "Marketing & Advertising", href: "/browse?category=marketing-advertising" },
    { label: "Business Strategy", href: "/browse?category=business-strategy" },
    { label: "Coding & Engineering", href: "/browse?category=coding-engineering" },
    { label: "Creative Writing", href: "/browse?category=creative-writing" },
  ],
  resources: [
    { label: "Getting Started", href: "/learning/getting-started" },
    { label: "Prompt Guide", href: "/learning/prompt-guide" },
    { label: "API Documentation", href: "/docs" },
    { label: "Community", href: "/community" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/30 py-16">
      <div className="container px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg">
                P
              </div>
              <span className="font-semibold text-lg">
                Prompt<span className="text-primary">Vault</span>
              </span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-6">
              Your ultimate AI prompt library. Unlock the power of AI with 20,000+ 
              expertly crafted prompts across 4 curated Vaults.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:hello@promptvault.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@promptvault.com
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PromptVault. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
