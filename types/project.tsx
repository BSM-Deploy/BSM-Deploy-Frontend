export interface ProjectsType {
  list: ProjectType[];
  size: number;
}

export interface ProjectType {
  id: number;
  name: string;
  domainPrefix: string;
  isDeploy: boolean;
  projectType:
    | "SINGLE_HTML"
    | "MULTIPLE_FILE"
    | "BUILT_REACT_JS"
    | "BUILT_NEXT_JS"
    | "BUILT_SPRING_JAR"
    | "BUILT_NODE_JS";
  dataSize: number;
  envVar: string;
}

export interface ProjectControlModalType {
  id: number;
  modalType: "CANCEL_DEPLOY" | "DELETE_PROJECT" | "DEPLOY_PROJECT";
  isOpen: boolean;
}
