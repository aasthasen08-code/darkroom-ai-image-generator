import ThemeToggle from "@/components/ThemeToggle";

export default function Header()
{
  return (
    <header className="flex w-full items-center justify-between py-6">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-xl font-medium tracking-tight">
          Darkroom
        </span>
        <span className="hidden font-mono text-xs text-muted sm:inline">
          / AI image generator
        </span>
      </div>
      <ThemeToggle />
    </header>
  );
}