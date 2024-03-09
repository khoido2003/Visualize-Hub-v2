"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";

interface ActionProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffser?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
}

export const Action = ({
  children,
  id,
  title,
  side,
  sideOffser,
}: ActionProps) => {};
