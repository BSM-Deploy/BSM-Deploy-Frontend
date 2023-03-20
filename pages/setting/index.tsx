import Header from "@/components/layout/header/Header";
import Sidebar from "@/components/layout/sidebar/Sidebar";
import useGetSettingForm from "@/hooks/useGetSettingForm";
import { SettingType } from "@/types/Setting";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useForm } from "react-hook-form";

export default function Setting() {

  const method = useForm<SettingType>({
    defaultValues: {
      name: "",
      domainPrefix: "",
      projectType: "프로젝트 종류",
    },
  })

  const { name, domainPrefix, projectType } = useGetSettingForm({control: method.control})

  const onBlurHandler = ({value, onChange}: {value: string, onChange: (value: string) => void}) => {
    const regex = /^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*$/
    if(!regex.test(value)){
      onChange("");
    }
  }

  const onChangeHandler = ({value, onChange}: {value: string, onChange: (value: string) => void})=> {
    onChange(value)
  }

    return (
      <>
        <Header />
        <Sidebar />
        <div className="main-container flex-col">
          <div className="w-[30%] h-[10%] mb-[50px] relative flex items-center">
            <input
              type="text"
              id="input"
              required={true}
              value={name.value}
              maxLength={16}
              onChange={(e) =>
                onChangeHandler({
                  value: e.target.value,
                  onChange: name.onChange,
                })
              }
              autoComplete={"off"}
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
              type="text"
              className="setting-input peer"
              id="input2"
              required={true}
              pattern={"^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*$"}
              autoComplete={"off"}
              value={domainPrefix.value}
              maxLength={16}
              onChange={(e) =>
                onChangeHandler({
                  value: e.target.value,
                  onChange: domainPrefix.onChange,
                })
              }
              onBlur={(e) =>
                onBlurHandler({
                  value: e.target.value,
                  onChange: domainPrefix.onChange,
                })
              }
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
              value={projectType.value}
              onChange={(e) =>
                onChangeHandler({
                  value: e.target.value,
                  onChange: projectType.onChange,
                })
              }
              className={
                projectType.value !== "프로젝트 종류"
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
            <KeyboardArrowDownIcon className="!w-[30px] !h-[30px] absolute right-10 transition-all ease-in-out duration-300 group-focus-within:arrowStyle" />
            <label
              htmlFor="select"
              className={`absolute duration-200 dark:bg-lightGray bg-lightBlock z-10 left-10 pr-10 peer-focus:textStyle ${
                projectType.value !== "프로젝트 종류" &&
                "dark:!bg-darkGray bg-white"
              }`}
            >
              {projectType.value}
            </label>
          </div>
          <div className="flex items-center">
            <button className="hover:bg-lighterGray dark:hover:bg-darkHover duration-200 w-[10rem] h-[6rem] rounded-4xl mr-10 bg-deepGrayButton text-white">
              취소
            </button>
            <button className="blue-button w-[10rem] h-[6rem]">다음</button>
          </div>
        </div>
      </>
    );
}