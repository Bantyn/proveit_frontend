import { useRef }  from "react";
import { clsx } from "clsx";
import { Link } from "react-router-dom";
import "./index.css"
export default function GlassActions({
  text,
  type,
  url,
  icon="",
  blur = "0.6rem",
  inset = "20px",
  className,
  bounce=false,
}) {
  const btnRef = useRef(null);

  const handleMouseEnter = () => {
    btnRef.current.style.transform = "scaleX(1.08) scaleY(0.98)";
  };
  
  const handleMouseLeave = () => {
    btnRef.current.style.transform = "scaleX(.9) scaleY(1.1)";
    setTimeout(() => {
      if (!btnRef.current) return;
      btnRef.current.style.transform = "scaleX(1) scaleY(1)";
    }, 120);
  };
  const handleMouseDown = () => {
    btnRef.current.style.transform = "scale(0.96) scaleX(1.08) scaleY(0.98)";
  };


  const handleMouseUp = () => {
    btnRef.current.style.transform = "scaleX(.8) scaleY(1.1)";

    setTimeout(() => {
      if (!btnRef.current) return;
      btnRef.current.style.transform = "scaleX(1) scaleY(1)";
    }, 150);
  };

  return (
    <>
      {type === "button" ? (
        <button
          ref={ bounce ? btnRef : null }
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          
          className={clsx(
            "buttonCover flex justify-center items-center tracking-tight bg-white/2 cursor-grab active:cursor-grabbing",
            className
          )}
          style={{ "--glass-blur": `${blur}`, "--inset-strength": `${inset}` }}
        >
          {text}
        </button>
      ) : (

        <Link
          to={url}
          ref={ bounce ? btnRef : null }
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className={clsx(
            "buttonCover flex justify-center items-center tracking-tight bg-white/2 cursor-pointer",
            className
          )}
          style={{ "--glass-blur": `${blur}`, "--inset-strength": `${inset}` }}
        >
          {text}
          {icon}
        </Link>
      )}
    </>
  );
}
