const checkLogin = () => {
  const cookie = document.cookie
  if (cookie.includes('user')) {
    return true;
  }
  return false;
};

export default checkLogin;