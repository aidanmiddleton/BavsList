const searchBox = function(){

  let queryParams = [];


  const search = $('#search').val();
  console.log("search: ",search);
  const price = $('#price').val();
  console.log("price: ",price);
  const behaviour = $('#behaviour').val();
  console.log("behaviour: ",behaviour);
  const category = $('#category').val();

  queryParams.push(search, price, behaviour, category);

  const queryString = `INSERT INTO listings (search, price,  behaviour, category) VALUES ($1, $2, $3, $4);`;

  console.log(queryString, queryParams);

  return db.query(queryString, queryParams).then(res => res.rows);
}