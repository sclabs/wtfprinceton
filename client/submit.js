Template.submit.categories = function() {
  return Categories.find({});
}

Template.submit.events({
  "click .action-submit": function() {
    category = $("#input-category").val();
    title = $("#input-title").val();
    text = $("#input-text").val();
    if (category && title && text) {
      Meteor.call("submitIssue",
                  category, title, text,
                  function(err, result) {
        Router.go('issue', {_id: result});
      });
    }
    // TODO: give feedback on the error
  }
});
