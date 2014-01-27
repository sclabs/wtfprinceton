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
    newIssueId = Issues.insert({title: title,
                                user_id: this.userId,
                                user_netid: user_netid,
                                category: category,
                                text: text,
                                timestamp: new Date()});
    
    // add this issue to the index
    Issues.index.add(Issues.findOne(newIssueId));

    // return the new issue id
    return newIssueId;
  },

  submitComment: function(text, issue_id) {
    if (!text || !this.userId || !issue_id)
      return;
    user_netid = Meteor.user().profile.email.split('@')[0];
    Comments.insert({user_id: this.userId,
                     user_netid: user_netid,
                     issue: issue_id,
                     text: text,
                     timestamp: new Date()});
  },

  vote: function(issue_id, direction) {
    if (!_.isBoolean(direction) || !this.userId || !issue_id)
      return;
    voteDoc = Votes.findOne({user_id: this.userId, issue: issue_id});
    if (voteDoc)
      Votes.update(voteDoc._id, {$set: {direction: direction,
                                        timestamp: new Date()}});
    else {
      user_netid = Meteor.user().profile.email.split('@')[0];
      Votes.insert({user_id: this.userId,
                    user_netid: user_netid,
                    issue: issue_id,
                    direction: direction,
                    timestamp: new Date()});
    }
  },

  commentVote: function(comment_id, direction) {
    if (!_.isBoolean(direction) || !this.userId || !comment_id)
      return;
    voteDoc = CommentVotes.findOne({user_id: this.userId,
                                    comment: comment_id});
    if (voteDoc)
      CommentVotes.update(voteDoc._id, {$set: {direction: direction,
                                               timestamp: new Date()}});
    else
      CommentVotes.insert({user_id: this.userId,
                           comment: comment_id,
                           direction: direction,
                           timestamp: new Date()});
  },

  editIssue: function(id, title, category, text) {
    if (!id || !title || !category || !text || !this.userId)
      return;
    issueDoc = Issues.findOne(id);
    if (issueDoc && issueDoc.user_id == this.userId) {
      Issues.update(id, {$push: {edits: {title: issueDoc.title,
                                         category: issueDoc.category,
                                         text: issueDoc.text,
                                         timestamp: issueDoc.timestamp}}});
      Issues.update(id, {$set: {title: title,
                                category: category,
                                text: text,
                                timestamp: new Date()}});
    }
  },

  deleteIssue: function(id) {
    issueDoc = Issues.findOne(id);
    if (issueDoc && issueDoc.user_id == this.userId) {
      Issues.remove(id);
      Votes.remove({issue: id});
      commentDocs = Comments.find({issue:id}).fetch();
      for (var i = 0; i < commentDocs.length; i++)
        deleteComment(commentDocs[i]);
    }
  },

  deleteComment: function(id) {
    commentDoc = Comments.findOne(id);
    if (commentDoc && commentDoc.user_id == this.userId)
     deleteComment(commentDoc);
  },

  searchIssues: function(query) {
    check(query, String);
    return Issues.index.search(query);
  }
});

deleteComment = function(commentDoc) {
  commentVoteDocs = CommentVotes.find({comment: commentDoc._id}).fetch();
  for (var i = 0; i < commentVoteDocs.length; i++)
    CommentVotes.remove(commentVoteDocs[i]._id);
  Comments.remove(commentDoc._id);
};
