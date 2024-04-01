const errorHandle = (error) => {
  if (error.response?.status === 401) {
    setTimeout(() => {
      window.location.href = window.location.origin + "/login";
    }, 200);
  }
};

export default errorHandle;
