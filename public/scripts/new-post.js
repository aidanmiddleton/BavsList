
const newPost = function(){

  let queryValues = [];

  const title = $('#title').val();
  const description = $('#description').val();
  const price = $('#price').val();
  const postUrl = $('#post-url').val();
  const behaviour = $('#behaviour').val();
  const category = $('#category').val();

  queryValues.push(title, description, price, postUrl, behaviour, category);

  const queryString = `INSERT INTO listings (title, description, price, postUrl, behaviour, category) VALUES ($1, $2, $3, $4, $5, $6);`;

  console.log(queryString, queryValues);

  alert("I'm a ready shortcut");


  return queryString, queryValues;

}


$(function(){


  // $.post('/new', function(result) {
  //   console.log(result)
  //   (result.listingData);
  // })

  $( "#new-post-submit" ).on( "click", newPost );

});
