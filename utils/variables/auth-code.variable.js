let variable = [];

const fail = {
  view: (user) => {
    if (variable.some((e) => e.phone === user.phone && e.deviceId === user.deviceId)) {
      for (let i = 0; i < variable.length; i++) {
        if (variable[i].phone === user.phone && variable[i].deviceId === user.deviceId) {
          return variable[i].fail;
        }
      }
    } else {
      variable.push({ ...user, fail: 0 });
      return 0;
    }
  },
  increment: (user) => {
    variable.forEach((e, index) => {
      if (e.phone === user.phone && e.deviceId === user.deviceId) {
        variable[index].fail += 1;
        return;
      } else return;
    });
  },
  clear: (user) => {
    variable.forEach((e, index) => {
      if (e.phone === user.phone && e.deviceId === user.deviceId) {
        variable.splice(index, 1);
        return;
      } else return;
    });
  },
};

export default fail;
