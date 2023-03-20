import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useRef, useState } from "react";

interface SettingType{
  name: string;
  domainPrefix: string;
  projectType: string;
}

export default function Setting() {

  const [selected, setSelected] = useState(false)
  const [setting, setSetting] = useState<SettingType>({
    name: "",
    domainPrefix: "",
    projectType: "프로젝트 종류",
  })

  const onBlurHandler = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const { name, value } = e.target
    console.log(name, value)
    const regex = /^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*$/;

    if(!regex.test(value)){
      const newSetting = {
        ...setting,
        "domainPrefix": ""
      };
      setSetting(newSetting)
    }
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=> {
    const { name, value } = e.target

    if(name === "projectType"){
      setSelected(true)
    }

    const newSetting = {
      ...setting,
      [name]: value,
    }

    setSetting(newSetting)
  }

    return (
      <>
        <Header />
        <Sidebar/>
        <div className="main-container flex-col">
          <div className="w-[30%] h-[10%] mb-[50px] relative flex items-center">
            <input
              type="text"
              name="name"
              id="input"
              value={setting.name}
              onChange={onChangeHandler}
              autoComplete={"off"}
              required={true}
              maxLength={16}
              className="setting-input peer"
            ></input>
            <label
              htmlFor="input"
              className="absolute duration-200 cursor-text left-10 peer-focus:textStyle peer-valid:peer-focus:textStyle peer-valid:validTextStyle"
            >
              프로젝트 이름
            </label>
          </div>
          <div className="w-[30%] h-[10%] mb-[50px] relative flex items-center">
            <input
              name="domainPrefix"
              type="text"
              value={setting.domainPrefix}
              required={true}
              className="setting-input peer"
              id="input2"
              autoComplete={"off"}
              pattern={"^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*$"}
              onChange={onChangeHandler}
              onBlur={onBlurHandler}
            ></input>
            <label
              htmlFor="input2"
              className="absolute duration-200 cursor-text left-10 peer-focus:textStyle peer-valid:peer-focus:textStyle peer-valid:validTextStyle"
            >
              도메인 접두사
            </label>
          </div>
          <div className="w-[30%] h-[10%] mb-[50px] relative flex items-center">
            <select
              id="select"
              onChange={onChangeHandler}
              name="projectType"
              className={
                selected
                  ? "focus:!outline-blue outline-black dark:outline-white dark:!bg-darkGray bg-lightBack hover:!shadow-none select-style peer"
                  : "select-style peer"
              }
            >
              {/* <option value={""}>프로젝트 종류</option> */}
              <option value={"SINGLE_HTML"}>Single HTML</option>
              <option value={"MULTIPLE_FILE"}>Multiple File</option>
              <option value={"BUILD_REACT_JS"}>Build React.js</option>
              <option value={"BUILD_NEXT_JS"}>Build Next.js</option>
            </select>
            <KeyboardArrowDownIcon className="!w-[30px] !h-[30px] absolute right-10 transition-all ease-in-out duration-300 group-focus-within:arrowStyle"/>
            <label htmlFor="select" className={`absolute duration-200 dark:bg-lightGray bg-lightBlock z-10 left-10 peer-focus:textStyle ${selected && "dark:!bg-darkGray bg-white"} pr-10`}>{setting.projectType}</label>
          </div>
          <div className="flex items-center">
            <button className="hover:bg-lighterGray dark:hover:bg-darkHover duration-200 w-[10rem] h-[6rem] rounded-4xl mr-10 bg-deepGrayButton text-white">
              취소
            </button>
            <button className="blue-button w-[10rem] h-[6rem]">
              다음
            </button>
          </div>
        </div>
      </>
    );
}