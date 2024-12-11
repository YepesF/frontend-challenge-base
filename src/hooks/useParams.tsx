import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

export default function useParams(): {
  getParam: (name: string) => string;
  updateParam: (name: string, value: string) => void;
  deleteParam: (name: string) => void;
} {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  // Convertimos a un objeto compatible con URLSearchParams
  const params = useMemo(() => {
    const paramObj: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      paramObj[key] = value;
    });
    return new URLSearchParams(paramObj);
  }, [searchParams]);

  const getParam = (name: string): string => {
    const param = params.get(name);
    return param || "";
  };

  const updateParam = useCallback(
    (name: string, value: string): void => {
      params.set(name, value);
      replace(`${pathname}?${params.toString()}`);
    },
    [params, pathname, replace],
  );

  const deleteParam = useCallback(
    (name: string): void => {
      params.delete(name);
      replace(`${pathname}?${params.toString()}`);
    },
    [params, pathname, replace],
  );

  return { getParam, updateParam, deleteParam };
}
