Template.issue.score = function() {
  upvotes = Votes.find({issue: this._id, direction: true}).count();
  downvotes = Votes.find({issue: this._id, direction: false}).count();
  return upvotes - downvotes;
};

Template.issue.owned = function() {
  return this.user_id == Meteor.userId();
};

//Template.issue.editing = function() {
//  edit_state = Session.get('edit_state');
//  return (edit_state &&
//          edit_state.type == 'issue' &&
//          edit_state.id == this._id);
//};

//Template.issue.categories = function() {
//  return Categories.find({});
//}

Template.issue.events({
  "click .action-upvote": function() {
    Meteor.call('vote', this._id, true);
  },

  "click .action-downvote": function() {
    Meteor.call('vote', this._id, false);
  },

  //"click .action-edit": function() {
  //  Session.set('edit_state', {type: 'issue', id: this._id});
  //},

  //"click .action-cancel-edit": function() {
  //  Session.set('edit_state', null);
  //},

  //"click .action-submit-edit": function() {
  //  title = $("#edit-title").val();
  //  category = $("#edit-category").val();
  //  text = $("#edit-text").val();
  //  if (title && category && text) {
  //    Meteor.call('editIssue', this._id, title, category, text);
  //    Session.set('edit_state', null);
  //  }
  //},

  "click .action-confirm-delete": function() {
    $("#modal-delete-" + this._id).modal('hide');
    Meteor.call('deleteIssue', this._id);
  }
});

Template.issue.rendered = function() {
  edit_state = Session.get('edit_state');
  if (edit_state &&
      edit_state.type == "issue" &&
      edit_state.id == this.data._id) {
    $("#edit-title").val(this.data.title);
    $("#edit-category").val(this.data.category);
    $("#edit-text").val(this.data.text);
  }
}
