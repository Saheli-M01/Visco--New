import { Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-muted/30 to-background border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

        {/* Left Side: Brand & Description */}
        <div className="max-w-md">
          <div className="flex items-center space-x-2 mb-4">
            <span className="font-display font-bold text-xl">Visco</span>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Making algorithm learning accessible through interactive
            visualizations. Master data structures and algorithms with
            confidence.
          </p>
        </div>

        {/* Right Side: Email */}
        <div className="flex flex-col items-start md:items-end">
          <p className="text-sm text-muted-foreground mb-2">
            Reach out to us:
          </p>
          <a
            href="mailto:hello@visco.com"
            aria-label="Email"
            className="flex items-center space-x-2 p-3 bg-card border border-border/50 rounded-lg text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-200"
          >
            <Mail className="h-4 w-4" />
            <span>hello@visco.com</span>
          </a>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50 text-sm text-muted-foreground text-center py-4 mt-8">
        © {currentYear} Visco. Made for algorithm learners.
      </div>
    </footer>
  );
};
