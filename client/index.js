
// Server side queries
var getRecipe = function(category) {
  Meteor.call('getYummlyRecipe', category, function(err, result) {
    console.log(result);
    Session.set('recipe', result);
  });
};

Meteor.Router.add({
  '/': 'splash_page',
  '/recipe': 'recipe_page',
  '/photos': 'photos_page'
});

/*************
*** PHOTOS ***
*************/

Template.photos_page.photos = function() {
  if(Session.get('photos'))
    return Session.get('photos').images;
  else
    return;
};

/*************
*** RECIPE ***
*************/

Template.recipe_page.title = function() {
  if(Session.get('category')){
    return Session.get('category').toUpperCase();
  } else
    return "No Category";
};

Template.recipe_page.recipe = function() {
  return Session.get('recipe');
};

Template.recipe_info.printIngredients = function(ingredients){
  return _.map(ingredients, function(ingredient, index) {
    return {value: ingredient};
  });
};

/*************
*** SPLASH ***
*************/

Template.splash_page.events({
  'click input.btn': function(e) {
    var category = e.target.id;
    console.log('Category picked: ' + category);
    if(category) {
      getRecipe(category);
      Session.set('category', category);
      Meteor.Router.to('/recipe');
    }
  },

  'click #getInstagramPhotos': function() {
    console.log('get Instagram Photos');
    Meteor.call('getInstagramFoodPics', 'chickenTeriyaki', function(err, results) {
      console.log(results);
      Session.set('photos', results);
    });
  }
});

