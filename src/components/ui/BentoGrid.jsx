import { ArrowRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "./ShadcnButton";
import GlassElement from "./glass-ui/GlassElement";
import GlassActions from "./glass-ui/GlassActions";

const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}) => (
  <>
  
  <GlassElement
                  as="div"
                  // bounce
                   className={cn(
      "group col-span-3 flex flex-col  justify-between items-start overflow-hidden rounded-4xl",
      "bg-white border border-border/5 shadow-sm",
      "transform-gpu dark:bg-black border-black/10 dark:border-white/10 dark:shadow-[0_-20px_80px_-20px_#ffffff1f_inset]",
      className,
    )}
    
    key={name}
                >
  
 
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-text-secondary transition-all duration-300 ease-in-out group-hover:scale-75 group-hover:text-secondary" />
      <h3 className="text-xl font-semibold text-text-main group-hover:text-secondary transition-colors duration-300">
        {name}
      </h3>
      <p className="max-w-lg text-text-secondary">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute z-100 bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >

      <GlassActions 
        className="pointer-events-auto text-text-main hover:text-black  p-4 rounded-full"
        type="link"
        inset = "10px"
        bounce
        url={href}
        text={cta}
        icon={<ArrowRight className="ml-2 h-4 w-4" />}
      >
      </GlassActions>


      {/* <Button
        variant="ghost"
        asChild
        size="sm"
        className="pointer-events-auto text-text-main hover:text-black group-hover:bg-gradient-angled group-hover:text-white"
      >
        <a href={href}>
          {cta}
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button> */}


    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </GlassElement>

  </>

);

export { BentoCard, BentoGrid };
