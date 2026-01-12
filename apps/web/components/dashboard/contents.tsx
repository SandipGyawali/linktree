"use client";
import { OverviewStats } from "./overview-cards";


export type ViewType =
  | "all"
  | "overview"
  | "recent"
  | "shared"
  | "trash"
  | "folder";

interface FilesContentProps {
  view: ViewType;
  folderId?: string;
}

export function SectionContents({ view, folderId }: FilesContentProps) {
  const overviewCards = view === "all" || view === "overview";

  return (
    <div className="flex-1 overflow-auto w-full">
      <div className="flex flex-col xl:flex-row gap-6 p-4">
        <div className="flex-1 space-y-6 min-w-0">
          {overviewCards && <OverviewStats />}
        </div>
      </div>
    </div>
  );
}