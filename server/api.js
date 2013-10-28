Meteor.methods({
  submitIssue: function(category, title, text) {
    // catch incomplete submission
    if (!category || !title || !text)
      return;
    
    // catch invalid category
    if (Categories.find({name: category}).count() == 0)
      return;
    
    // catch user not logged in
    if (!this.userId)
      return;

    // create the Issue and return its id
    user_netid = Meteor.user().profile.email.split('@')[0];
    return Issues.insert({title: title,
                          user_id: this.userId,
                          user_netid: user_netid,
                          category: category,
                          text: text,
                          timestamp: new Date()});
  },

  vote: function(issue_id, direction) {
    if (!_.isBoolean(direction) || !this.userId)
      return;
    voteDoc = Votes.findOne({user: this.userId, issue: issue_id});
    if (voteDoc)
      Votes.update(voteDoc._id, {$set: {direction: direction,
                                       timestamp: new Date()}});
    else
      Votes.insert({user: this.userId,
                    issue: issue_id,
                    direction: direction,
                    timestamp: new Date()});
  }
});
