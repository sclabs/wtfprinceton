// restrict user creation to princeton.edu domain
Accounts.validateNewUser(function (user) {
    if(user.services.google.email.match(/princeton\.edu$/)) {
        return true;
    }
    throw new Meteor.Error(403, "You must sign in using a princeton.edu account");
});

// fill out user profile
Accounts.onCreateUser(function(options, user) {
  user.profile = _.pick(user.services.google,
    "id",
    "email",
    "verified_email",
    "name",
    "given_name",
    "family_name",
    "picture",
    "locale",
    "gender"
  );
  return user;
});