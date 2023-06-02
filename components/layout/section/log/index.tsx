import { getContainerLog } from "@/utils/api/container";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function LogSection() {

  const router = useRouter()

  const { isLoading: containerIsLoading, data: containerData } = useQuery<
    string,
    Error
  >("container", () => getContainerLog(String(router.query?.projectId)), {
    enabled:
      router.isReady,
    refetchInterval: 3000,
  });

  console.log(containerData)

  return(
    <div className="main-container bg-black">
      <div className="terminal-font text-[15px] text-textLightGray p-8 w-full h-full overflow-auto whitespace-pre">
        {containerData}
      </div>
    </div>
  )
};
