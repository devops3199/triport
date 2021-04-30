// 이메일 형식
export const emailCheck = (email) => {
  let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-z])*.([a-zA-Z])*/;

  return _reg.test(email);
};

// 비밀번호 체크(8자-16자)
export const pwdCheck = (pwd) => {
  let _reg = /^[!@#-_.*a-zA-z0-9].{7,16}$/;

  return _reg.test(pwd);
};
