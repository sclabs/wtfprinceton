Meteor.startup(function () {
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
});
