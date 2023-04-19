export const getAccessToken = () => {
  return (
    localStorage.accessToken && {
      headers: {
        "BSM-DEPLOY-TOKEN": localStorage.accessToken,
      },
    }
  );
};

export const getRefreshToken = () => {
  return (
    localStorage.refreshToken && {
      headers: {
        "BSM-DEPLOY-REFRESH-TOKEN": localStorage.refreshToken,
      },
    }
  );
};
