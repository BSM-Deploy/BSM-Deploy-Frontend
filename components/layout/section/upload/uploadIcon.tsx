import Image from 'next/image' 

export default function UploadIcon() {
  return (
    <>
      <span className="absolute w-1/2 h-1/2 top-1/2 translate-y-[-60%]">
        <Image src="/images/uploadfolder.svg" alt="upload" fill={true} />
      </span>
      <span className="dark:text-black flex items-center justify-center bg-blue rounded-4xl duration-200 text-white absolute w-[80%] h-[7rem] top-[70%]">
        드래그해서 파일/폴더 업로드
      </span>
    </>
  );
}
