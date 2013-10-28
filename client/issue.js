Template.issue.score = function() {
  upvotes = Votes.find({issue: this._id, direction: true}).count();
  downvotes = Votes.find({issue: this._id, direction: false}).count();
  return upvotes - downvotes;
};

Template.issue.events({
  "click .action-upvote": function() {
    Meteor.call('vote', this._id, true);
  },

  "click .action-downvote": function() {
    Meteor.call('vote', this._id, false);
  }
});
