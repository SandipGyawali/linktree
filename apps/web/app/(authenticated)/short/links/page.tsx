"use client"
import { Button } from "@linktree/ui/button";
import { LinksTable } from "../../../../components/links/table";
import { IconPlus } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  
  return(
    <>
      <div className='space-y-0.5 p-4'>
        <div className="flex flex-row w-full items-center justify-between">
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Links
          </h1>
          <Button onClick={() => router.push("/short/links/new")}>
            <IconPlus /> Create Link
          </Button>
        </div>
        <p className='max-w-xl w-full text-muted-foreground'>
          View, edit, and manage all your saved links in one place.
        </p>
      </div>
      <div className='p-4 flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-y-0 lg:space-x-12'>
        <div className='flex w-full overflow-y-hidden p-1'>
          <div className="w-full h-full">
            <LinksTable />
          </div>
        </div>
      </div>
    </>
  );
}
