"use client";
import { Card } from "@linktree/ui/card";
import { Button } from "@linktree/ui/button";
import { AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

interface ErrorCardProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorCard({ message, onRetry }: ErrorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Card className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 px-6 py-4 rounded-lg border border-red-400 bg-card">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-red-600" />
          <p className="text-red-500 dark:text-red-400 font-medium">{message}</p>
        </div>
        {/* Retry Button */}
        {onRetry && (
          <Button
            variant="destructive"
            size="sm"
            onClick={onRetry}
            className="mt-2 md:mt-0"
          >
            Retry
          </Button>
        )}
      </Card>
    </motion.div>
  );
}
