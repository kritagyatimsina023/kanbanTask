"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useTaskFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: "search" | "filter", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("page");

    if (value.trim()) {
      params.set(key, value.trim());
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };
  const updateSearch = (search: string) => {
    updateParam("search", search);
  };

  const updateFilter = (filter: string) => {
    updateParam("filter", filter);
  };
  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page > 1) {
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  };
  return {
    updateSearch,
    updateFilter,
    updatePage,
  };
}
