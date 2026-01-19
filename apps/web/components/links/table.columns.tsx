"use client";
import { useMemo } from "react";
import {
  ColumnDef,
} from "@tanstack/react-table";

export type LinkType = {
  id: string;
  title: string;
  slug: string;
  originalUrl: string;
};

export function linkTableColumns() {
  // Columns definition
  return useMemo<ColumnDef<LinkType>[]>(
    () => [],
    []
  );
}
