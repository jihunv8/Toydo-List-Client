export const validateId = (id: string): boolean => {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,15}$/;
  return reg.test(id);
};

export const validatePassword = (password: string): boolean => {
  const reg = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,32}$/;
  return reg.test(password);
};
