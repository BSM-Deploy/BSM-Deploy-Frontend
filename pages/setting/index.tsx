import Header from "@/components/layout/Header";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Setting() {
    return (
      <>
        <Header />
        <div className="main-container">
          <input
            type="text"
            placeholder="프로젝트 이름"
            className="setting-input"
          ></input>
          <input
            type="text"
            placeholder="도메인 접두사"
            className="setting-input"
          ></input>
          <div className="w-[30%] h-[8%] mb-[50px] relative">
            <KeyboardArrowDownIcon className="!w-[40px] !h-[40px] absolute top-[50%] right-10 translate-y-[-50%]" />
            <select className="select-style pl-10 pr-10 bg-lightBlock text-black placeholder-black w-full h-full rounded-4xl text-4xl">
              <option>프로젝트 종류</option>
              <option>Single HTML</option>
              <option>Multiple File</option>
              <option>Build React.js</option>
              <option>Build Next.js</option>
            </select>
          </div>
          <div className="flex items-center">
            <button className="w-[10rem] h-[6rem] rounded-4xl mr-10 bg-deepGrayButton text-white">
              취소
            </button>
            <button className="blue-button w-[10rem] h-[6rem]">다음</button>
          </div>
        </div>
      </>
    );
}