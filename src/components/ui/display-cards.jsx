import { cn } from "@/lib/utils";

function DisplayCard({
  className,
  icon,
  title = "Featured",
  description = "Discover amazing content",
  stepNumber,
  titleClassName = "text-black",
}) {
  return (
    <div
      className={cn(
        // base card shape + skew
        "relative flex h-36 w-[40rem] -skew-y-[8deg] select-none flex-col justify-between",
        "rounded-xl border-2 border-white/10 bg-white/5 backdrop-blur-sm px-4 py-3",
        "transition-all duration-700",


        // right-side fade-out gradient
        "after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[12rem]",
        "after:bg-gradient-to-l after:from-background after:to-transparent after:content-[''] after:z-10",
        "[&>*]:flex [&>*]:items-center [&>*]:gap-2",
        className
      )}
    >
      {/* greyscale overlay — fades on hover via group-hover sibling, controlled by className */}
      <div className="card-overlay absolute inset-0 rounded-xl bg-black/10 z-20 transition-opacity duration-700" />

      {/* Top row: icon + title */}
      <div className="relative z-30">
        <span className="inline-flex items-center justify-center rounded-full bg-primary/15 p-1">
          {icon}
        </span>
        <p className={cn("text-base font-semibold font-heading", titleClassName)}>
          {title}
        </p>
      </div>

      {/* Description */}
      <p className="relative z-30 text-sm text-black whitespace-pre-wrap">
        {description}
      </p>

      {/* Step badge */}
      <p className="relative z-30 text-xs font-medium uppercase tracking-widest text-text-secondary/50">
        Step {stepNumber}
      </p>
    </div>
  );
}

export default function DisplayCards({ cards = [] }) {
  const stackClassNames = [
    // back card — greyed out, lifts on hover
    "[grid-area:stack] transition-all duration-500 hover:-translate-y-20 cursor-pointer",
    // middle card
    "[grid-area:stack] translate-x-12 translate-y-10 transition-all duration-500 hover:-translate-y-10 cursor-pointer",
    // front card — fully visible, slight push down on hover
    "[grid-area:stack] translate-x-24 translate-y-20 transition-all duration-500 hover:translate-y-5 cursor-pointer [&_.card-overlay]:opacity-0",
  ];

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center">
      {cards.map((cardProps, index) => (
        <DisplayCard
          key={index}
          {...cardProps}
          className={cn(stackClassNames[index], cardProps.className)}
        />
      ))}
    </div>
  );
}
