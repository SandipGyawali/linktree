"use client"
import { CreateLinkForm } from "../../../../../components/links/CreateLinkForm"
import { BackButton } from "../../../../../components/BackButton"
import { motion } from "motion/react"

export default function Page() {  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="mx-4 space-y-4"
    > 
      <BackButton />
      <CreateLinkForm />
    </motion.div>
  )
}
