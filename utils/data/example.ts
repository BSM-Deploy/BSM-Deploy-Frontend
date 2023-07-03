export const exampleData = {
  MULTIPLE_FILE: [
    {
      id: 1,
      type: "folder",
      depth: 0,
      name: "MULTIPLE_FILE"
    },
    {
      id: 5,
      type: "folder",
      depth: 1,
      name: "page1"
    },
    {
      id: 6,
      type: "file",
      depth: 2,
      name: "page1.html"
    },
    {
      id: 2,
      type: "file",
      depth: 1,
      name: "favicon.ico"
    },
    {
      id: 3,
      type: "file",
      depth: 1,
      name: "index.html"
    },
    {
      id: 4,
      type: "file",
      depth: 1,
      name: "img1.jpg"
    }
  ],
  SINGLE_HTML: [
    {
      id: 7,
      type: "file",
      depth: 0,
      name: "single_html.html",
    }
  ],
  BUILT_REACT_JS: [
    {
      id: 8,
      type: "folder",
      depth: 0,
      name: "build"
    },
    {
      id: 9,
      type: "file",
      depth: 1,
      name: "asset-manifest.json"
    },
    {
      id: 10,
      type: "file",
      depth: 1,
      name: "favicon.ico"
    },
    {
      id: 11,
      type: "file",
      depth: 1,
      name: "index.html"
    },
    {
      id: 12,
      type: "file",
      depth: 1,
      name: "logo192.png"
    },
    {
      id: 13,
      type: "file",
      depth: 1,
      name: "logo512.png"
    },
    {
      id: 14,
      type: "file",
      depth: 1,
      name: "manifest.json"
    },
    {
      id: 15,
      type: "file",
      depth: 1,
      name: "robots.txt"
    },
    {
      id: 16,
      type: "folder",
      depth: 1,
      name: "static"
    }
  ],
  BUILT_NEXT_JS: [
    {
      id: 17,
      type: "folder",
      depth: 0,
      name: "BUILT_NEXT_JS"
    },
    {
      id: 18,
      type: "file",
      depth: 1,
      name: "package.json"
    },
    {
      id: 19,
      type: "file",
      depth: 1,
      name: "next.config.js"
    },
    {
      id: 20,
      type: "file",
      depth: 1,
      name: "package-lock.json"
    },
    {
      id: 21,
      type: "folder",
      depth: 1,
      name: "public"
    },
    {
      id: 22,
      type: "folder",
      depth: 1,
      name: ".next"
    }
  ],
  BUILT_SPRING_JAR: [
    {
      id: 23,
      type: "file",
      depth: 0,
      name: "built_spring_boot.jar",
    }
  ],
  BUILT_NODE_JS: [
    {
      id: 24,
      type: "folder",
      depth: 0,
      name: "BUILT_NODE_JS"
    },
    {
      id: 25,
      type: "file",
      depth: 1,
      name: "package-lock.json"
    },
    {
      id: 26,
      type: "file",
      depth: 1,
      name: "main.js"
    },
    {
      id: 27,
      type: "file",
      depth: 1,
      name: "package.json"
    },
    {
      id: 28,
      type: "folder",
      depth: 1,
      name: "node_modules"
    },
    {
      id: 29,
      type: "folder",
      depth: 1,
      name: "global"
    },
    {
      id: 30,
      type: "folder",
      depth: 1,
      name: "infrastructure"
    },
    {
      id: 31,
      type: "folder",
      depth: 1,
      name: "swagger"
    },
    {
      id: 32,
      type: "folder",
      depth: 1,
      name: "domain"
    },
  ]
}

export const exampleDescription = {
  "SINGLE_HTML": {
    description: "확장자가 html인 파일을 그대로 업로드"
  },
  "MULTIPLE_FILE": {
    description: "html, css, javascript 등등의 파일들이 있는 폴더를 업로드"
  },
  "BUILT_REACT_JS": {
    description: "React.js 프로젝트를 빌드한 후 프로젝트 폴더 업로드"
  },
  "BUILT_NEXT_JS": {
    description: "Next.js 프로젝트를 빌드한 후 프로젝트 폴더 업로드"
  },
  "BUILT_SPRING_JAR": {
    description: "Spring boot 프로젝트를 빌드한 후 jar 파일 업로드"
  },
  "BUILT_NODE_JS": {
    description: "프로젝트 내에서 TypeScript 혹은 Next.js를 사용하고 있다면 빌드한 후 프로젝트 폴더 업로드 아니라면 그냥 프로젝트 폴더 업로드"
  },
}