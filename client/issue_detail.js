Template.vote_history.votes = function() {
  return Votes.find({issue: this._id});
}

Template.comment_list.comments = function() {
  return Comments.find({issue: this._id});
}

Template.comment_form.events({
  "click .action-submit": function() {
    text = $("#input-text").val();
    if (text) {
      console.log('calling the function');
      Meteor.call("submitComment", text, this._id);
    }
  }
});

Template.comment.score = function() {
  upvotes = CommentVotes.find({comment: this._id,
                               direction: true}).count();
  downvotes = CommentVotes.find({comment: this._id,
                                 direction: false}).count();
  return upvotes - downvotes;
};

Template.comment.events({
  "click .action-upvote": function() {
    Meteor.call('commentVote', this._id, true);
  },

  "click .action-downvote": function() {
    Meteor.call('commentVote', this._id, false);
  }
});

