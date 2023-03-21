export interface SettingType{
    name: string;
    domainPrefix: string;
    projectType: "SINGLE_HTML" | "MULTIPLE_FILE" | "BUILD_REACT_JS" | "BUILD_NEXT_JS" | "프로젝트 종류";
}

export interface PostSettingValueType{
    name: string;
    domainPrefix: string;
    projectType: "SINGLE_HTML" | "MULTIPLE_FILE" | "BUILD_REACT_JS" | "BUILD_NEXT_JS";
}