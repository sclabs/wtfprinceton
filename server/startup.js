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
});
