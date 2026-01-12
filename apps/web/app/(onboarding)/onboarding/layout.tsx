"use client";
import { Button } from "@linktree/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const steps = [
  { path: "/onboarding/username", label: "Username", step: 1 },
  { path: "/onboarding/intent", label: "Intent", step: 1 },
  { path: "/onboarding/links", label: "Links", step: 1 },
  { path: "/onboarding/preivew", label: "Prevew & Theme", step: 1 }
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  // useEffect(() => {
  //   router.replace("/onboarding/username")
  //   return;
  // }, [])

  const handleSkip = async () => {
    router.push("/dashboard") 
  }

  return (
     <div className="flex min-h-screen flex-col">
       <div className="">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="OneURL"
              width={128}
              height={128}
              className="h-12 w-12"
            />
            <h1 className="text-sm font-medium font-mono">OneURL</h1>
          </Link>
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
          {/* <AlertDialog open={skipDialogOpen} onOpenChange={setSkipDialogOpen}>
            <AlertDialogPopup>
              <AlertDialogHeader>
                <AlertDialogTitle>Leave onboarding?</AlertDialogTitle>
                <AlertDialogDescription>
                  You have unsaved progress. Your username and any links you&apos;ve added will be lost if you leave now. Are you sure you want to continue?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogClose>
                  <Button variant="outline">Cancel</Button>
                </AlertDialogClose>
                <Button variant="destructive" onClick={handleConfirmSkip}>
                  Leave anyway
                </Button>
              </AlertDialogFooter>
            </AlertDialogPopup>
          </AlertDialog> */}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center font-mono text-sm">{children}</div>
    </div>
  );
}
