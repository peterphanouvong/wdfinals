"use client";

import { refreshData } from "@/actions";
import { Button } from "@/components/ui/button";

export const RefreshButton = () => {
  return (
    <Button onClick={() => refreshData()} variant={"outline"}>
      Click to refresh (after triggering the webhook)
    </Button>
  );
};
