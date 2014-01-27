Template.edit_history.edits = function() {
  edits = this.edits;
  // augment the edits object with some additional useful data
  if (edits) {
    next_timestamp = this.timestamp;
    for (i = edits.length - 1; i >= 0; i--) {
      edits[i].next_timestamp = next_timestamp;
      next_timestamp = edits[i].timestamp;
      edits[i].issue_id = this._id;
    }
  }
  return edits;
}

Template.edit_history.latest_score = function() {
  upvotes = Votes.find({issue: this._id, direction: true, timestamp: {$gte: this.timestamp}}).count();
  downvotes = Votes.find({issue: this._id, direction: false, timestamp: {$gte: this.timestamp}}).count();
  return upvotes - downvotes;
}

Template.edit.score = function() {
  upvotes = Votes.find({issue: this.issue_id, direction: true, timestamp: {$gte: this.timestamp, $lt: this.next_timestamp}}).count();
  downvotes = Votes.find({issue: this.issue_id, direction: false, timestamp: {$gte: this.timestamp, $lt: this.next_timestamp}}).count();
  return upvotes - downvotes;
}

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
      Meteor.call("submitComment", text, this._id);
    }
    $("#input-text").val('');
  }
});

Template.comment.score = function() {
  upvotes = CommentVotes.find({comment: this._id,
                               direction: true}).count();
  downvotes = CommentVotes.find({comment: this._id,
                                 direction: false}).count();
  return upvotes - downvotes;
};

Template.comment.owned = function() {
  return this.user_id == Meteor.userId();
};

Template.comment.events({
  "click .action-upvote": function() {
    Meteor.call('commentVote', this._id, true);
  },

  "click .action-downvote": function() {
    Meteor.call('commentVote', this._id, false);
  },

  "click .action-confirm-comment-delete": function() {
    $("#modal-delete-comment-" + this._id).modal('hide');
    Meteor.call('deleteComment', this._id);
  }
});

