import Image from "next/image";
import { useRouter } from "next/router";
import CancelButton from "../../button/cancelButton";
import SubmitButton from "../../button/submitButton";

export default function UploadForm() {

    const router = useRouter()

    return(
        <div className="main-container flex-col">
            <form>
                <input type="file" id="upload" className="absolute w-0 h-0 p-0 overflow-hidden border-0" />
                <label htmlFor="upload" className="dark:border-white relative flex flex-col items-center w-[60rem] h-[60rem] rounded-4xl border-dotted border-2 border-black">
                    <span className="absolute w-1/2 h-1/2 top-1/2 translate-y-[-60%]">
                        <Image src="/images/uploadfolder.svg" alt="upload" fill={true} />
                    </span>
                    <span className="blue-button absolute w-[80%] h-[7rem] top-[70%]" >드래그해서 파일/폴더 업로드</span>
                </label>
            </form>
            <div className="flex items-center mt-[5rem]">
                <CancelButton router={router} />
                <SubmitButton />
            </div>
        </div>
    )
};
