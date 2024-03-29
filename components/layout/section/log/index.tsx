import { getContainerLog } from "@/utils/api/container";
import { useQuery } from "react-query";

export default function LogSection({ id }: { id: string }) {
  const { data: containerData } = useQuery<string, Error>(
    "container",
    () => getContainerLog(id),
    {
      refetchInterval: 3000,
    }
  );

  return (
    <div className="main-container bg-black">
      <div className="terminal-font text-[15px] text-textLightGray p-8 w-full h-full overflow-auto whitespace-pre">
        {containerData}
      </div>
    </div>
  );
}
