// 이메일 형식
export const emailCheck = (email) => {
  var regExp =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return regExp.test(email);
};

// 비밀번호 체크(8자-20자)
export const pwdCheck = (pwd) => {
  var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[!@#*.*a-zA-z0-9]{7,20}$/; //  8 ~ 20자 영문, 숫자, 특수문자 조합

  return regExp.test(pwd);
};
