const checkInputValidate = (input) => {
  // eslint-disable-next-line
  const regExp = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;

  if (!regExp.test(input)) {
    return true;
  } else {
    return false;
  }
};

export default checkInputValidate;
