import { QRCodeSVG} from 'qrcode.react';

export function QRPreview({ url }: { url: string }) {
  if (!url) return <div className="text-muted-foreground">Enter a URL to generate QR</div>;

  return (
    <div className="flex justify-center">
      {/* SVG version */}
      <QRCodeSVG value={url} size={200} level="Q" />
    </div>
  );
}
