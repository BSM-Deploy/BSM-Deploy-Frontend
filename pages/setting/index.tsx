import Header from "@/components/layout/Header";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function Setting() {
    return (
      <>
        <Header />
        <div className="main-container">
          <div className="w-[30%] h-[10%] mb-[50px] relative group flex items-center">
            <input
              type="text"
              id="input"
              className="setting-input hover:shadow-4xl focus:focusInteraction"
            ></input>
            <label
              htmlFor="input"
              className="absolute duration-200 left-10 group-focus-within:textStyle"
            >
              프로젝트 이름
            </label>
          </div>
          <div className="w-[30%] h-[10%] mb-[50px] relative group flex items-center">
            <input
              type="text"
              className="setting-input hover:shadow-4xl focus:focusInteraction"
              id="input2"
            ></input>
            <label
              htmlFor="input2"
              className="absolute duration-200 left-10 group-focus-within:textStyle"
            >
              도메인 접두사
            </label>
          </div>
          <div className="w-[30%] h-[10%] mb-[50px] relative flex items-center group">
            <KeyboardArrowDownIcon className="!w-[30px] !h-[30px] absolute right-10 transition-all ease-in-out duration-300 group-focus-within:arrowStyle"/>
            <select className="focus:outline-blue focus:bg-white focus:shadow-none select-style hover:shadow-4xl pl-10 pr-10 bg-lightBlock text-black -black w-full h-[80%] rounded-4xl text-4xl">
              <option>프로젝트 종류</option>
              <option>Single HTML</option>
              <option>Multiple File</option>
              <option>Build React.js</option>
              <option>Build Next.js</option>
            </select>
          </div>
          <div className="flex items-center">
            <button className="hover:bg-lighterGray duration-200 w-[10rem] h-[6rem] rounded-4xl mr-10 bg-deepGrayButton text-white">
              취소
            </button>
            <button className="hover:bg-lighterGray duration-200 blue-button w-[10rem] h-[6rem]">다음</button>
          </div>
        </div>
      </>
    );
}