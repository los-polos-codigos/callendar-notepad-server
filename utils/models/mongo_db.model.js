class fail {
  status;
  static comment = `Connection error ${this.status}`;
}

class pass {
  static status = 200;
  userId;
  isUserArleadyExist;
  accessToken;
  refreshToken;
}
