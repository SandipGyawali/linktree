"use client"
import { Button } from "@linktree/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@linktree/ui/card";
import { IconArrowDownRight, IconArrowUpRight, IconDeviceMobile, IconHeartRateMonitor } from "@tabler/icons-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@linktree/ui/table"
import { Badge } from "@linktree/ui/badge"

const events = [
  {
    link: "dub.sh",
    country: "Switzerland",
    device: "Mobile",
    date: "Dec 8 at 10:33 PM",
  },
  {
    link: "d.to/register",
    country: "Indonesia",
    device: "Mobile",
    date: "Dec 8 at 10:33 PM",
  },
  {
    link: "d.to",
    country: "Japan",
    device: "Desktop",
    date: "Dec 8 at 10:33 PM",
  },
  {
    link: "d.to/register",
    country: "Taiwan",
    device: "Mobile",
    date: "Dec 8 at 10:30 PM",
  },
  {
    link: "d.to/register",
    country: "United States",
    device: "Desktop",
    date: "Dec 8 at 10:30 PM",
  },
]


export default function PerLinkAnalyticsPage() {
  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            d.to/register
          </h1>
          <p className="text-sm text-muted-foreground">
            Performance over the last 7 days
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Last 7 days
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Clicks"
          value="3,633"
          trend="+12.4%"
          positive
        />
        <StatCard
          title="Leads"
          value="93"
          trend="+4.1%"
          positive
        />
        <StatCard
          title="Revenue"
          value="$54.57"
          trend="-2.3%"
          positive={false}
        />
      </div>

      {/* Chart Section */}
      <Card>
        <CardHeader>
          <CardTitle>Traffic over time</CardTitle>
          <CardDescription>
            Clicks & conversions per day
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Chart Placeholder */}
          <div className="h-[240px] w-full rounded-md border border-dashed bg-muted/30 flex items-center justify-center text-sm text-muted-foreground">
            Chart goes here (Recharts / Visx)
          </div>
        </CardContent>
      </Card>

      {/* Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent activity</CardTitle>
          <CardDescription>
            Individual link interactions
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Device</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {events.map((event, i) => (
                <TableRow key={i} className="hover:bg-muted/50 h-11">
                  <TableCell>
                    <Badge variant="secondary">Click</Badge>
                  </TableCell>

                  <TableCell className="font-medium">
                    {event.link}
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2">
                      {/* <ReactCountryFlag
                        svg
                        countryCode={event.countryCode}
                        style={{ width: "1.1em", height: "1.1em" }}
                      /> */}
                      <span>{event.country}</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      {event.device === "Mobile" ? (
                        <IconDeviceMobile className="h-4 w-4" />
                      ) : (
                        <IconHeartRateMonitor className="h-4 w-4" />
                      )}
                      {event.device}
                    </div>
                  </TableCell>

                  <TableCell className="text-right text-muted-foreground">
                    {event.date}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}



function StatCard({
  title,
  value,
  trend,
  positive,
}: {
  title: string
  value: string
  trend: string
  positive: boolean
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-baseline justify-between">
          <div className="text-3xl font-bold">{value}</div>
          <div
            className={`flex items-center gap-1 text-sm ${
              positive ? "text-green-600" : "text-red-600"
            }`}
          >
            {positive ? (
              <IconArrowUpRight className="h-4 w-4" />
            ) : (
              <IconArrowDownRight className="h-4 w-4" />
            )}
            {trend}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
