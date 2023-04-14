import { errorMessageState } from "@/store/atoms/layout/error";
import { openSnackbarState } from "@/store/atoms/snackbar/openSnackbar";
import { SettingType } from "@/types/setting";
import { makeProject } from "@/utils/api/project";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/router";
import { useForm, useWatch } from "react-hook-form";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import CancelButton from "../../button/cancelButton";
import SubmitButton from "../../button/submitButton";

export default function SettingForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useRecoilState(errorMessageState);
  const [openSnackbar, setOpenSnackbar] = useRecoilState(openSnackbarState);
  const { mutate } = useMutation(makeProject, {
    onSuccess: (data) => {
      router.push(`/upload/${data}`);
    },
    onError: (error: any) => {
      const message = error.response?.data.fields.domainPrefix;
      setErrorMessage(message);
      setOpenSnackbar({ ...openSnackbar, open: true });
      setValue("domainPrefix", "");
    },
  });

  const onSubmit = (data: SettingType) => {
    mutate(data);
  };

  const onError = (error: any) => {
    const { type, message } = error[Object.keys(error)[0]];
    if (type === "pattern") {
      setValue("domainPrefix", "");
    }
    setErrorMessage(message);
    setOpenSnackbar({ ...openSnackbar, open: true });
  };

  const { handleSubmit, register, setValue, control } = useForm<SettingType>({
    defaultValues: {
      name: "",
      domainPrefix: "",
      projectType: "",
    },
  });

  const projectTypeWatcher = useWatch({
    control,
    name: "projectType",
  });

  const nameWatcher = useWatch({
    control,
    name: "name",
  });

  const domainPrefixWatcher = useWatch({
    control,
    name: "domainPrefix",
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="main-container flex-col"
      >
        <div className="w-[30%] h-[10%] mb-[50px] relative flex items-center">
          <input
            type="text"
            id="input"
            autoComplete={"off"}
            className={`setting-input peer focus:hover:shadow-none ${
              nameWatcher !== "" ? "setting-input-valid" : ""
            }`}
            {...register("name", {
              required: "프로젝트 이름이 비었습니다.",
              maxLength: {
                value: 16,
                message: "프로젝트 이름은 16자 이하여야합니다.",
              },
            })}
          ></input>
          <label
            htmlFor="input"
            className={`absolute duration-200 cursor-text left-10 peer-focus:textStyle peer-valid:peer-focus:textStyle ${
              nameWatcher !== "" ? "validTextStyle" : ""
            }`}
          >
            프로젝트 이름
          </label>
        </div>
        <div className="w-[30%] h-[10%] mb-[50px] relative flex items-center">
          <input
            type="text"
            className={`setting-input peer focus:hover:shadow-none ${
              domainPrefixWatcher !== "" ? "setting-input-valid" : ""
            }`}
            id="input2"
            autoComplete={"off"}
            {...register("domainPrefix", {
              required: "도메인 접두사가 비었습니다.",
              maxLength: {
                value: 16,
                message: "도메인 접두사는 16자 이하여야합니다.",
              },
              pattern: {
                value: /^[a-zA-Z0-9]+([-.][a-zA-Z0-9]+)*$/,
                message: "도메인 접두사는 영어, 숫자로만 이루어져야 합니다.",
              },
            })}
          ></input>
          <label
            htmlFor="input2"
            className={`absolute duration-200 cursor-text left-10 peer-focus:textStyle peer-valid:peer-focus:textStyle ${
              domainPrefixWatcher !== "" ? "validTextStyle " : ""
            }`}
          >
            도메인 접두사
          </label>
        </div>
        <div className="w-[30%] h-[10%] mb-[50px] relative flex items-center">
          <select
            id="select"
            {...register("projectType", {
              required: "프로젝트 종류가 선택되지 않았습니다.",
            })}
            className={
              projectTypeWatcher !== ""
                ? "focus:!outline-blue outline-black dark:outline-white dark:!bg-darkGray bg-lightBack hover:!shadow-none select-style peer"
                : "select-style peer"
            }
          >
            <option value={"SINGLE_HTML"}>Single HTML</option>
            <option value={"MULTIPLE_FILE"}>Multiple File</option>
            <option value={"BUILT_REACT_JS"}>Built React.js</option>
            <option value={"BUILT_NEXT_JS"}>Built Next.js</option>
          </select>
          <KeyboardArrowDownIcon className="!w-[30px] !h-[30px] absolute right-10 transition-all ease-in-out duration-300 peer-focus:arrowStyle" />
          <label
            htmlFor="select"
            className={`absolute duration-200 dark:bg-lightGray bg-lightBlock z-10 left-10 peer-focus:peer-valid:textStyle peer-focus:textStyle ${
              projectTypeWatcher !== "" &&
              "validTextStyle dark:!bg-darkGray bg-white"
            }`}
          >
            프로젝트 종류
          </label>
        </div>
        <div className="flex items-center">
          <CancelButton router={router} />
          <SubmitButton />
        </div>
      </form>
    </>
  );
}
