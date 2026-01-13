"use client"
import { CreateLinkForm } from "../../../../../components/links/CreateLinkForm"
import { BackButton } from "../../../../../components/BackButton"

export default function Page() {  
  return (
    <div className="mx-4 space-y-4"> 
      <BackButton />
      <CreateLinkForm />
    </div>
  )
}
