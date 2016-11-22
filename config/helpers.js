module.exports = function() {

  var helpinghand = handlebars.registerHelper('equal', function(lvalue, rvalue, options){
    if(arguments.length < 3) {
      throw new Error("Handlebars needs to parameters");

    }
    if(lvalue!=rvalue){
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
  });

};
