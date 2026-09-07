import { isValidTaskFilter } from "@/constants/taskFilters.constants";

interface TaskSearchparams {
  page?: string;
  search?: string;
  filter?: string;
}

export function parseTaskSearchParam(params: TaskSearchparams) {
  const page = Math.max(1, Number(params.page) || 1);
  const search = params.search || undefined;
  const filter = isValidTaskFilter(params.filter) ? params.filter : undefined;

  return {
    page,
    search,
    filter,
  };
}
