class handleToken  {
  static async getToken () {
    let token = await localStorage.getItem('token');
    return token;
  }

  static async removeToken () {
    await localStorage.removeItem('token');
    return true;
  }
}

module.exports = handleToken;