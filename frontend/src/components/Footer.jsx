import { Dumbbell } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-primary" />
          <span className="font-display font-bold text-foreground">
            Vita<span className="text-primary">Train</span> AI
          </span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Vita-Train-AI. Powered by AI for your fitness journey.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
