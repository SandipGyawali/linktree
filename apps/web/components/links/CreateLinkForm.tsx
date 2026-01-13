import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@linktree/ui/card"
import { Input } from "@linktree/ui/input"
import { Label } from "@linktree/ui/label"
import { Textarea } from "@linktree/ui/textarea"
import { Button } from "@linktree/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@linktree/ui/select"
import { Switch } from "@linktree/ui/switch"
import { Separator } from "@linktree/ui/separator"

export function CreateLinkForm() {
  return (
    <Card className="w-full max-w-6xl">
      <CardHeader>
        <CardTitle>New link</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_320px]">
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Destination URL */}
            <div className="space-y-2">
              <Label htmlFor="destination">Destination URL</Label>
              <Input
                id="destination"
                placeholder="https://example.com/page"
              />
            </div>

            {/* Short link */}
            <div className="space-y-2">
              <Label htmlFor="short-link">Short link</Label>
              <div className="flex gap-2">
                <Input
                  disabled
                  id="short-link"
                  defaultValue="www.domain.com"
                />
                <Input placeholder="slug" />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                placeholder="marketing, campaign, social"
              />
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label htmlFor="comments">Comments (optional)</Label>
              <Textarea
                id="comments"
                placeholder="Add comments"
              />
            </div>

            {/* Conversion Tracking */}
            <div className="space-y-2">
              <Label>Conversion Tracking</Label>
              <div className="rounded-md border p-4 text-sm text-muted-foreground">
                Configure conversion tracking after creating the link.
              </div>
            </div>

            <Separator />

            {/* Bottom Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline">UTM</Button>
              <Button variant="outline">Targeting</Button>
              <Button variant="outline">A/B Test</Button>
              <Button variant="outline">Password</Button>
              <Button variant="outline">Expiration</Button>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            {/* Folder */}
            <div className="space-y-2">
              <Label>Folder</Label>
              <Select defaultValue="links">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="links">Links</SelectItem>
                  <SelectItem value="campaigns">Campaigns</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* QR Code */}
            <div className="space-y-2">
              <Label>QR Code</Label>
              <div className="flex h-40 items-center justify-center rounded-md border bg-muted text-sm text-muted-foreground">
                QR preview
              </div>
            </div>

            {/* Custom Link Preview */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label>Custom Link Preview</Label>
                <Switch />
              </div>

              <div className="flex h-40 items-center justify-center rounded-md border bg-muted text-sm text-muted-foreground">
                Enter a link to generate a preview
              </div>
            </div>

            {/* Create button */}
            <Button className="w-full">Create link</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
