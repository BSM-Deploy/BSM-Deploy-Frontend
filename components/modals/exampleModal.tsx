import { exampleModalState } from "@/store/atoms/modals/exampleModal";
import { useRecoilState } from "recoil";
import ExampleIcon from "../icons/exampleIcon";
import { exampleData, exampleDescription } from "../../utils/data/example";
import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal/Modal";

interface ExampleDataType {
  id: number;
  type: string;
  depth: number;
  name: string;
}

export default function ExampleModal({ type }: { type: string }) {
  const [exampleModal, setExampleModal] = useRecoilState(exampleModalState);
  const [example, setExample] = useState<ExampleDataType[]>([]);
  const [description, setDescription] = useState({ description: "" });

  const closeModal = () => {
    setExampleModal(false);
  };

  const types = {
    SINGLE_HTML: "SINGLE_HTML",
    MULTIPLE_FILE: "MULTIPLE_FILE",
    BUILT_REACT_JS: "React.js",
    BUILT_NEXT_JS: "Next.js",
    BUILT_SPRING_JAR: "Spring boot",
    BUILT_NODE_JS: "Node.js",
  };

  useEffect(() => {
    setExample(exampleData[type as keyof typeof exampleData]);
    setDescription(exampleDescription[type as keyof typeof exampleDescription]);
  }, [type]);

  return (
    <Modal open={exampleModal} onClose={() => closeModal()}>
      <div className="justify-center w-[500px] mobile:w-[300px] mobile:max-h-[500px] flex p-10 rounded-3xl flex-col bg-lightBackground dark:bg-modalBackground top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute focus-visible:outline-none">
        <p className="text-[22.5px] mb-10 font-bold text-center">
          {types[type as keyof typeof types]}
        </p>
        <p className="text-[18.75px] mb-5 font-bold">프로젝트 업로드 방법</p>
        <p className="text-[17px] mb-5">
          {description !== undefined && description.description}
        </p>
        <p className="text-[18.75px] mb-5 font-bold">예시 구조</p>
        <div className="mobile:overflow-y-scroll">
          {example?.map((value: ExampleDataType) => {
            return (
              <ExampleIcon
                key={value.id}
                type={value.type}
                name={value.name}
                depth={value.depth}
              />
            );
          })}
        </div>
      </div>
    </Modal>
  );
}
