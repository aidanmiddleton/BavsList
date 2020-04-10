
const deletePost = function(e){
  // e.preventDefault();

  let queryValues = [];

  const title = ('test');
  console.log(title);

  queryValues.push(title);

  const queryString = `DELETE FROM listings WHERE title = $1`;

  console.log(queryString, queryValues);

  $.post('/new', { queryString, queryValues }, (err, params) => {
    console.log(params);
    location.reload();

  })

}

$(function(){

  $(document).on("click", "#delete-post", deletePost );


});
