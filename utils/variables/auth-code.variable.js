let code_fail = 0;

const fail = {
  view: () => {
    return code_fail;
  },
  increment: () => {
    return ++code_fail;
  },
  clear: () => {
    return (code_fail = 0);
  },
};

export default fail;
