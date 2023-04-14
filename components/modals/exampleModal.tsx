import { exampleModalState } from "@/store/atoms/modals/exampleModal";
import { Modal } from "@mui/material";
import { useRecoilState } from "recoil";
import ExampleIcon from "../icons/exampleIcon";
import ExampleData from "../../utils/data/example.json";
import { useEffect, useState } from "react";

interface ExampleDataType {
  id: number;
  type: string;
  depth: number;
  name: string;
}

export default function ExampleModal({ type }: { type: string; }) {
  console.log(type);
  const [exampleModal, setExampleModal] = useRecoilState(exampleModalState);
  const [example, setExample] = useState<ExampleDataType[]>([]);

  const closeModal = () => {
    setExampleModal(false);
  };

  useEffect(() => {
    switch (type){
      case "SINGLE_HTML": setExample(ExampleData.SINGLE_HTML); break;
      case "MULTIPLE_FILE": setExample(ExampleData.MULTIPLE_FILE); break;
      case "BUILT_REACT_JS": setExample(ExampleData.BUILT_REACT_JS); break;
      case "BUILT_NEXT_JS": setExample(ExampleData.BUILT_NEXT_JS); break;
    }
  }, [type])

  return (
    <Modal open={exampleModal} onClose={() => closeModal()}>
      <div className="justify-center min-w-[40rem] flex p-10 rounded-3xl flex-col bg-lightBackground dark:bg-modalBackground top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 absolute focus-visible:outline-none">
        <p className="text-4xl mb-10 font-bold text-center">{type}</p>
        <p className="text-3xl mb-10">예시 구조</p>
        {example.map((value: ExampleDataType) => {
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
    </Modal>
  );
}
