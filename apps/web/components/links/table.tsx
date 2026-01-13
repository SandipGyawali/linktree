"use client";

import { links } from "./links";
import { Button } from "@linktree/ui/button";
import { Card } from "@linktree/ui/card";
import { MoreHorizontal, QrCode, Copy, Pencil } from "lucide-react";

export function LinksTable() {
  return (
    <div className="flex flex-col gap-4">
      {links.map((link) => (
        <Card key={link.id} className="flex flex-col md:flex-row justify-between px-4 py-4 rounded-lg hover:bg-muted/50 transition">          
          {/* Left Section */}
          <div className="flex items-start gap-3">
            {/* Text */}
            <div>
              <p className="font-medium leading-none">{link.title}</p>
              <p className="text-sm text-red-500">{link.shortUrl}</p>

              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>{link.clickDate}</span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <QrCode className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon">
              <Copy className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
