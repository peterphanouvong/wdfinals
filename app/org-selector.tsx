"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { ChevronDown } from "lucide-react";

export function OrgSelector(props: {
  orgs: { code: string; name: string }[];
  curretOrgName: string;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {props.curretOrgName} <ChevronDown className="ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {props.orgs.map((org) => (
          <DropdownMenuItem className="p-0" key={org.code}>
            <RegisterLink
              className="w-full h-full px-2 py-1.5"
              orgCode={org.code}
            >
              {org.name}
            </RegisterLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
