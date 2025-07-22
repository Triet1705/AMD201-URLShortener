export const validateUrlFormat = (url) => {
  try {
    new URL(url);
    return { isValid: true, message: "" };
  } catch (_) {
    return { isValid: false, message: "Định dạng URL không hợp lệ." };
  }
};

export const validatePasswordLength = (password, minLength = 6) => {
  if (!password || password.length < minLength) {
    return {
      isValid: false,
      message: `Mật khẩu phải có ít nhất ${minLength} ký tự.`,
    };
  }
  return { isValid: true, message: "" };
};
