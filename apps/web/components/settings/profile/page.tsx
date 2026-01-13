'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@linktree/ui/avatar'
import { Button } from '@linktree/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@linktree/ui/card'
import { Input } from '@linktree/ui/input'
import { Label } from '@linktree/ui/label'
import { Textarea } from '@linktree/ui/textarea'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@linktree/ui/input-group"
import { DangerZone } from '../danger-zone'

export function Profile() {
  return (
    <div className="w-full max-w-3xl space-y-6">
      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Profile Picture</Label>
            <p className="text-muted-foreground">
              Upload an image file (max 4MB). This will be displayed on your profile page.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Avatar className="h-28 w-28 border">
              <AvatarImage src="/avatar.png" alt="Profile picture" />
              <AvatarFallback>SG</AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <Button variant="default">Change Avatar</Button>
              <p className="text-xs text-muted-foreground">
                Image (4MB max)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Information  */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <p className="text-muted-foreground">
              Your display name that will be shown on your profile
            </p>
            <Input defaultValue="Sandip Gyawali" />
          </div>

          {/* Username */}
          <div className="space-y-2">
            <Label>Username</Label>
            <p className="text-muted-foreground">
              Your unique profile URL will be: oneurl.live/sdy
            </p>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput placeholder="example.com" className="!pl-0.5" />
              <InputGroupAddon align="inline-end">
                <InputGroupText>.com</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label>Bio</Label>
            <p className="text-muted-foreground">
              A short description about yourself (optional)
            </p>
            <Textarea rows={4} />
          </div>

          {/* Cal.com */}
          <div className="space-y-2">
            <Label>Cal.com Link</Label>
            <p className="text-muted-foreground">
              Add your Cal.com username or full URL to enable booking on your profile (optional)
            </p>
            <Input placeholder="username or https://cal.com/username" />
          </div>

          {/* Actions */}
          <div className="flex justify-start pt-2">
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      <DangerZone />
    </div>
  )
}
