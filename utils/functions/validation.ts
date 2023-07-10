export const checkFolder = (item: FileSystemDirectoryEntry, root: string) => {
  const path = item.fullPath.split('/')
  if (path.includes('.next') && !path.includes('cache')) {
    return true
  }
  if (path.includes(root) && path.includes('public')) {
    return true
  }
  return false
}

export const checkFile = (item: FileSystemFileEntry, root: string) => {
  const path = item.fullPath.split('/')
  if (path.includes('.next')) {
    return true
  }
  if (path.includes('public')) {
    return true
  }
  if (path.includes(root)) {
    if (path.includes('package.json')) {
      return true
    }
    else if (path.includes('package-lock.json')) {
      return true
    }
    else if (path.includes('next.config.js')) {
      return true
    }
  }
  return false
}

export const checkNextProject = (path: string, root: string) => {
  if (path.includes('.next')) {
    if(!path.includes('cache')){
      return true
    }
  }
  if (path.includes(root)) {
    if (path.includes('package.json')) {
      return true
    }
    else if (path.includes('package-lock.json')) {
      return true
    }
    else if (path.includes('next.config.js')) {
      return true
    }
    else if (path.includes('public')) {
      return true
    }
  }
  return false
}