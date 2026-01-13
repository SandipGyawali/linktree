"use client"

import { useRouter } from "next/navigation"
import { Button } from "@linktree/ui/button"
import { IconArrowBack } from "@tabler/icons-react"
import { cn } from "@linktree/ui/cn"

type BackButtonProps = {
  label?: string
  className?: string
  fallbackHref?: string
}

export function BackButton({
  label = "Back",
  className,
  fallbackHref,
}: BackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== undefined && window.history.length > 1) {
      router.back()
    } else if (fallbackHref) {
      router.push(fallbackHref)
    }
  }

  return (
    <Button
      variant="outline"
      className={cn("w-fit flex items-center gap-2", className)}
      onClick={handleBack}
    >
      <IconArrowBack size={16} />
      {label}
    </Button>
  )
}
