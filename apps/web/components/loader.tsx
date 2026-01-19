import { cn } from "@linktree/ui/cn"
import { IconLoader2 } from "@tabler/icons-react";

export function Loader({
  className = ""
}: {
  className?: string
}) {
  return(
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <IconLoader2 size={30} className="text-primary animate-spin" />
    </div>
  );
}