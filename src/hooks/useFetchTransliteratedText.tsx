import { useMutation } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { fetchTransliteratedText, type paramType } from "../api/apiCall";
import type { HeadersType, ResponseType } from "./useDebounceMutate";

type resultSetter = React.Dispatch<React.SetStateAction<string>>;

function useFetchTransliteratedTextandSet(setToText: resultSetter) {
  return useMutation({
    mutationKey: ["fetchTransliteratedText"],
    mutationFn: (data: paramType) => fetchTransliteratedText(data),
    onSuccess: (response: AxiosResponse<ResponseType, HeadersType>) => {
      setToText(response.data.output[0].target.join(" "));
    },
  });
}

export default useFetchTransliteratedTextandSet;
