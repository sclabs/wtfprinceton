// list of collections
Issues = new Meteor.Collection("issues");
Votes = new Meteor.Collection("votes");
Comments = new Meteor.Collection("comments");
Categories = new Meteor.Collection("categories");

// pub
if (Meteor.isServer) {
  Meteor.publish("issues", function() {
    return Issues.find({});
  });
  
  Meteor.publish("votes", function() {
    return Votes.find({});
  });
  
  Meteor.publish("comments", function() {
    return Comments.find({});
  });
  
  Meteor.publish("categories", function() {
    return Categories.find({});
  });
}

// sub
if (Meteor.isClient) {
  Deps.autorun(function() {
    Meteor.subscribe("issues");
    Meteor.subscribe("votes");
    Meteor.subscribe("comments");
    Meteor.subscribe("categories");
  });
}