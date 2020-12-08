const auth = require('basic-auth');
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.authenticateUser = async (req, res, next) => {
  let message;
  console.log('hit auth handler');
  const credentials = auth(req);

  if (credentials) {
    const user = await User.findOne(
      {
        where: {
          emailAddress: credentials.name,
        },
      },
    );
    if (user) {
      const authenticated = bcrypt
        .compareSync(credentials.pass, user.password);
      if (authenticated) {
        console.log(`Authentication successful for username: ${user.firstName} ${user.lastName}`);

        // Store the user on the Request object.
        req.currentUser = user;
      } else {
        message = `Authentication failure for username: ${user.emailAddress}`;
      }
    } else {
      message = `User not found for username: ${credentials.name}`;
    }
  } else {
    message = 'Auth header not found';
  }

  if (message) {
    console.warn(message);
    res.status(401).json({ message: 'Access Denied' });
  } else {
    next();
  }
};
