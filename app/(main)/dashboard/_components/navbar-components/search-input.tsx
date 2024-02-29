"use client";

import qs from "query-string";

import { useDebounce } from "@/hooks/use-debounce";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const SearchInput = () => {
  const { resolvedTheme } = useTheme();

  const router = useRouter();
  const [value, setValue] = useState("");
  const debounceValue = useDebounce(value, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const url = qs.stringifyUrl(
      {
        url: "/dashboard",
        query: {
          search: debounceValue,
        },
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    );

    router.push(url);
  }, [debounceValue, router]);

  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
      <Input
        onChange={handleChange}
        placeholder="Search boards..."
        className={cn(
          "w-full max-w-[516px] pl-9",
          resolvedTheme === "dark" ? "border-[#e5e7eb2f]" : "border-[#32323237]"
        )}
        value={value}
      />
    </div>
  );
};
