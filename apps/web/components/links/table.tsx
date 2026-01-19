"use client";
import { Button } from "@linktree/ui/button";
import { Card, CardContent } from "@linktree/ui/card";
import { QrCode, Copy, Pencil } from "lucide-react";
import { useFetchLinks } from "../../app/apis/short/links.api";
import { linkTableColumns, LinkType } from "./table.columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Loader } from "../loader";
import { motion } from "motion/react";
import { ErrorCard } from "../error.card";
import { QRCodeSVG } from "qrcode.react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger
} from "@linktree/ui/dialog";
import { IconClipboard } from "@tabler/icons-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { LinkForm } from "./link.form";
import React from "react";


function clipboardText(info: string) {
  navigator.clipboard.writeText(info);
  toast("Copied to clipboard")
}

export function LinksTable() {
  const linkQuery = useFetchLinks("", 1, 20);
  const columns = linkTableColumns();
  
  const table = useReactTable({
    data: linkQuery.data?.links || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if(linkQuery.isLoading) return <Loader />
  if(linkQuery.isError) 
    return <ErrorCard message={linkQuery.error.message} />

  return (
    <div className="flex flex-col gap-4">
      {table.getRowModel().rows.map((row) => (
        <LinkCard key={row.original.id} link={row.original} />
      ))}
    </div>
  );
}



function LinkCard({ link }: { link: LinkType }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <Card className="flex flex-col md:flex-row justify-between px-4 py-4 rounded-lg hover:bg-muted/50 transition">
          {/* Left Section */}
          <div className="flex items-start gap-3">
            <div>
              <p className="font-medium leading-none">{link.title}</p>
              <p className="text-sm font-semibold">{link.slug}</p>
              <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                <span>{link.originalUrl}</span>
              </div>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <DialogQr link={link} />
            <Button variant="ghost" onClick={() => clipboardText(link.originalUrl)} size="icon">
              <Copy className="h-4 w-4" />
            </Button>
            <EditLinkDialog link={link} />
          </div>
        </Card>
      </motion.div>
    </>
  );
}

function DialogQr({ link }: { link: LinkType }) {
  const qrRef = React.useRef<SVGSVGElement>(null);

  const downloadQr = React.useCallback(() => {
    if (!qrRef.current) return;

    const svg = qrRef.current;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    const size = 300;

    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);

    const svgBlob = new Blob([svgStr], {
      type: "image/svg+xml;charset=utf-8",
    });

    const urlBlob = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      URL.revokeObjectURL(urlBlob);

      const pngUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = pngUrl;
      a.download = "qr-code.png";
      a.click();
    };

    img.src = urlBlob;
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <QrCode className="h-5 w-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="w-fit h-fit">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            QR Code
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <Card className="m-5 md:m-10">
            <CardContent>
              <QRCodeSVG
                ref={qrRef}
                value={link.originalUrl}
                size={250}
              />
            </CardContent>
          </Card>

          <div className="flex justify-center mb-3 gap-2 w-full">
            <Button
              variant="outline"
              onClick={() => clipboardText(link.originalUrl)}
            >
              <IconClipboard />
              Copy
            </Button>

            <Button onClick={downloadQr}>
              Download
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}


function EditLinkDialog({ link }: { link: LinkType }) {
  const updateMn = useMutation({});

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Link: <span className="text-muted-foreground">{link.slug}</span> </DialogTitle>
        </DialogHeader>

        <LinkForm
          // defaultValues={{
          //   title: link.title,
          //   originalUrl: link.originalUrl,
          //   description: link.description,
          //   image: link.image,
          //   isPreviewEnabled: link.isPreviewEnabled,
          //   expiresAt: link.expiresAt ?? "",
          // }}
          submitLabel="Update Link"
          isSubmitting={updateMn.isPending}
          onSubmit={(values) => {
            // updateMn.mutate(
            //   { id: link.id, ...values },
            //   {
            //     onSuccess: () => {
            //       toast("Link updated successfully");
            //     },
            //   }
            // );
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
