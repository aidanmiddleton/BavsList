
const newPost = function(e){
  e.preventDefault();

  let queryValues = [];

  const title = $('#title').val();
  const description = $('#description').val();
  const price = $('#price').val();
  const postUrl = $('#post-url').val();
  const behaviour = $('#behaviour').val();
  const category = $('#category').val();

  queryValues.push(title, description, price, postUrl, behaviour, category);

  const queryString = `INSERT INTO listings (user_id, title, description, price, image, behaviour, category) VALUES (1, $1, $2, $3, $4, $5, $6);`;

  console.log(queryString, queryValues);

  $.post('/new', { queryString, queryValues }, (err, params) => {
    console.log(params);

  })

}


$(function(){

  $( "#new-post-submit" ).on( "click", newPost );

});
