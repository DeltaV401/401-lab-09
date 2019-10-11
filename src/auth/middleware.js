module.exports = () => 
  async (req, res, next) => {
    try {
      let [authType, authString] = (req.headers.authorization || '').split(/\s+/);

      switch(authType.toLowerCase()) {
        case 'basic':
          return await _authBasic(authString);
        default:
          return await _authError();
      }
    }
    catch(err) {
      return await _authError();
    }

    async function _authBasic(authString) {
      let decoded = Buffer.from(authString, 'base64').toString();
      let [username, password] = decoded.split(':');

      let user = await User.authenticateBasic({ username, password });
      _authenticate(user);
    }

    async function _authenticate(user) {
      if(user) {
        req.user = user;
        next();
      } else {
        await _authError();
      }
    }

    async function _authError() {
      next({ status: 401, message: 'unauthorized' });
    }
  };