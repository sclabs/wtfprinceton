Meteor.startup(function() {
  // populate categories
  if (Categories.find().count() === 0) {
    var categories = ["Campus Events",
                      "Dining Services",
                      "Housing and Residential Life",
                      "Health Services",
                      "Facilities",
                      "Academics",
                      "Student Groups",
                      "Technology",
                      "Athletics",
                      "Career Services",
                      "Miscellaneous"];
    for (var i = 0; i < categories.length; i++)
      Categories.insert({name: categories[i]});
  }

  // define issue index
  Issues.index = Meteor.lunr(function() {
    this.field('title', {boost: 10});
    this.field('text');
    this.ref('_id');
  });

  // populate issue index
  Issues.find({}, {fields: {title: 1, text: 1}}).forEach(function(issue) {
    Issues.index.add(issue);
  });

  // update calculated fields on Issues
  Fiber = Npm.require('fibers');

  setInterval(function() {
    Fiber(function() {
      issueDocs = Issues.find({}).fetch();
      for (i = 0; i < issueDocs.length; i++) {
        upvotes = Votes.find({issue: issueDocs[i]._id, direction: true}).count();
        downvotes = Votes.find({issue: issueDocs[i]._id, direction: false}).count();
        score  = upvotes - downvotes;
        order = Math.log(Math.max(Math.abs(score), 1))/Math.LN10;
        sign = 0;
        if (score > 0)
          sign = 1;
        if (score < 0)
          sign = -1;
        seconds = (issueDocs[i].timestamp.getTime() / 1000) - 1134028003;
        hot = order + sign * (seconds / 45000);
        Issues.update(issueDocs[i]._id, {$set: {hot: hot}});
      }
    }).run();}, 1000);
});
