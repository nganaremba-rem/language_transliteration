import { useCallback, useRef } from "react";

export type ResponseType = {
  taskType: string;
  output: [
    {
      source: string;
      target: string[];
    }
  ];
  config: null;
};

export type HeadersType = {
  "Access-Control-Allow-Origin"?: string;
  "Content-Length"?: string;
  "Content-Type"?: string;
  Date?: string;
  Server?: string;
  Vary?: string;
};

// type cbType = UseMutateFunction<
//   AxiosResponse<ResponseType, HeadersType>,
//   Error,
//   paramType,
//   unknown
// >;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function useDebounceMutate(cb: any, delay = 1000) {
  const timerId = useRef<NodeJS.Timeout | null>(null);

  const debounceMutateFn = useCallback(
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    (params: any) => {
      if (timerId.current) clearTimeout(timerId.current);

      timerId.current = setTimeout(() => {
        cb(params);
      }, delay);
    },
    [cb, delay]
  );

  return debounceMutateFn;
}

export default useDebounceMutate;
