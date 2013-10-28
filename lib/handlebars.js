if (Meteor.isClient) {
  Handlebars.registerHelper("formatDate", function(datetime, format) {
    if (moment)
      return moment(datetime).format('MM/DD/YYYY hh:mm A');
    else
      return datetime;
  });
}
