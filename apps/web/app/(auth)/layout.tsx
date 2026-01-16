import { GalleryVerticalEnd } from "lucide-react"
import React from "react"

// import { LoginForm } from "@/components/login-"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="col-span-2 bg-muted relative hidden lg:block">
        <img
          src="/landscape.jpeg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover grayscale"
          loading="eager"
          decoding="async"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div>
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            LinkTree
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            {/* <LoginForm /> */}
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
