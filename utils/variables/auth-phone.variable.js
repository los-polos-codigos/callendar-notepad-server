export let variable = [];
let user_fail = [];
//TODO zjebałem userfail powinienem zapisywać użytkownika który dostaje faila a nie samego faila

export const fail = {
  view: (user) => {
    if (user_fail.some((e) => e.phone === user.phone && e.deviceId === user.deviceId)) {
      for (let i = 0; i < user_fail.length; i++) {
        if (user_fail[i].phone === user.phone && user_fail[i].deviceId === user.deviceId) {
          return user_fail[i].fail;
        }
      }
    } else {
      user_fail.push({ ...user, fail: 0 });
      return 0;
    }
  },
  increment: (user) => {
    user_fail.forEach((e, index) => {
      if (e.phone === user.phone && e.deviceId === user.deviceId) {
        user_fail[index].fail += 1;
      }
    });
  },
  clear: (user) => {
    user_fail.forEach((e, index) => {
      if (e.phone === user.phone && e.deviceId === user.deviceId) {
        user_fail.splice(index, 1);
      }
    });
  },
};
