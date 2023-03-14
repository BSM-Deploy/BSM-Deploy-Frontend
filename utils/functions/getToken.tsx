export const getAccessToken = () => {
  return (
    localStorage.accessToken && {
      headers: {
        "BSM-DEPLOY-TOKEN": localStorage.accessToken,
      },
    }
  );
};
