import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "../utils";

interface AnimationComponentProps {
  isActive: boolean;
  isHovered: boolean;
  transitionDuration?: number;
  hoverAnimationId?: string;
  activeAnimationId?: string;
  hoverClassName?: string;
  activeClassName?: string;
}

const useVercelNavAnimation = <T extends HTMLElement>() => {
  const [isListParentHovered, setIsListParentHovered] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const handleMouseEnter = () => setIsListParentHovered(true);
      const handleMouseLeave = () => setIsListParentHovered(false);

      node.addEventListener("mouseenter", handleMouseEnter);
      node.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        node.removeEventListener("mouseenter", handleMouseEnter);
        node.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [ref]);

  const AnimationComponent = ({
    isActive,
    isHovered,
    transitionDuration = 0.2,
    hoverAnimationId = "hoverEffect",
    activeAnimationId = "activeEffect",
    hoverClassName = "",
    activeClassName = "",
  }: AnimationComponentProps) => {
    return (
      <>
        {isListParentHovered && isHovered && (
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 h-full w-full bg-gray-200 rounded-lg -z-10",
              hoverClassName,
            )}
            transition={{ duration: transitionDuration }}
            aria-hidden="true"
            layoutId={hoverAnimationId}
          />
        )}
        {isActive && (
          <motion.div
            className={cn(
              "absolute bottom-0 left-0 h-full w-full bg-gray-200 rounded-lg -z-10",
              activeClassName,
            )}
            transition={{ duration: transitionDuration }}
            aria-hidden="true"
            layoutId={activeAnimationId}
          />
        )}
      </>
    );
  };

  return { listParentRef: ref, AnimationComponent };
};

export default useVercelNavAnimation;
