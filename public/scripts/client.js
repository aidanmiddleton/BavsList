$(document).ready(function(){
  //createCardElement will dynamically generate listing cards, and their modals from the db
    const createCardElement = function(listing) {
    //listing unit is the combination of the card and the modal description
    //Card materialize setup
    const $listingUnit = $('<div>').addClass('listing-unit');
    const $row = $('<div>').addClass('row')
    const $card = $('<div>').addClass('col m4');
    const $cardPanel = $('<div>').addClass('card-panel hoverable');
    const $cardDiv = $('<div>').addClass('card');
    const $imgDiv = $('<div>').addClass('card-image waves-effect waves-block waves-light');
    const $img = $('<img>').addClass('activator').attr('src', listing.image);
    //front card content
    const $contentDiv = $('<div>').addClass('card-content');
    const $cardSpan = $('<span>').addClass('card-title activator grey-text text-darken-4').text(listing.title);
    const $moreIcon = $('<i>').addClass('material-icons right').text('more_vert');
    const $descriptionTrigger = $('<a>').addClass('modal-trigger').attr('href', `#modal${listing.id}`).text('Description');
    //card reveal content
    const $revealDiv = $('<div>').addClass('card-reveal');
    const $revealSpan = $('<span>').addClass('card-title grey-text text-darken-4').text(listing.title);
    const $closeIcon = $('<i>').addClass('material-icons right').text('close');
    const $species = $('<p>').text(`Species: ${listing.category}`);
    const $price = $('<p>').text(`Price: ${listing.price}`);
    const $Temperment = $('<p>').text(`Temperment: ${listing.behaviour}`);
    const $Seller = $('<p>').text(`Seller: ${listing.name}`);
    const body = ('Hi there! I\'m interested in purchasing ' + listing.title + '!');
    const email = ('https://mail.google.com/mail/u/0/?view=cm&fs=1&to=' + listing.email + '&su=' + listing.title + '&&body=' + body);
    const $emailButton = $('<a>').addClass('popupbtn waves-effect waves-light btn').attr('href', email).attr('target', '_blank').text('Email seller');
    const $deleteButton = $('<button>').addClass('popupbtn waves-effect waves-light btn').attr('id', 'delete-post').text('Delete listing');

    const $emailButton = $('<a>').addClass('waves-effect waves-light btn').text('Email seller');
    //Modal description content
    const $modalContainerDiv = $('<div>').addClass('card-modal-container');
    const $modalDiv = $('<div>').addClass('modal').attr('id', `modal${listing.id}`);
    const $modalContentDiv = $('<div>').addClass('modal-content');
    const $modalTitle = $('<h3>').text('Description');
    const $description = $('<p>').text(listing.description);
    const $modalFooter = $('<div>').addClass('modal-footer');
    const $footerCLose = $('<a>').addClass('modal-close waves-effect waves-green btn-flat').attr('href', '#!');
    //appends card and modal into single cohesive unit
    $imgDiv.append($img);
    $cardSpan.append($moreIcon)
    $contentDiv.append($cardSpan, $descriptionTrigger);
    $revealSpan.append($closeIcon);
    $revealDiv.append($revealSpan, $species, $price, $Temperment, $Seller, $emailButton, $deleteButton);
    $modalFooter.append($footerCLose);
    $modalContentDiv.append($modalTitle, $description);
    $modalDiv.append($modalContentDiv, $modalFooter);
    $modalContainerDiv.append($modalDiv);
    $cardDiv.append($imgDiv, $contentDiv, $revealDiv);
    $cardPanel.append($cardDiv);
    $card.append($cardPanel);
    $row.append($card);
    $listingUnit.append($row, $modalContainerDiv);
    return $listingUnit;
  }
  const renderCardElements = function(listings) {
    $('.listing-container').empty();
    for (let listing of listings) {
      let $currentListing = createCardElement(listing);
      $('.listing-container').append($currentListing);
    }
  }
  const loadListings = function() {
    // $('.listing-container').empty();
    $.get('/listings', function(result) {
      console.log(result)
      renderCardElements(result.listingData);
      $('.modal').modal();
    })
  };

  loadListings()
  // const loadFavourites = function() {
  //   $.get()
  // }

// --------- SEARCH POP UP STUFFS BELOW ------------- //

  const getFavourites = function() {
    $.get('/favourites', function(result) {
      renderCardElements(result.favData);
      $('.modal').modal();
    })
  }



  const loadSearch = function(searchParam) {
    $.get('/search', function(result) {
      console.log(result);
    })

  }

  console.log('some text', $("#favourites-button"));

  $("#favourites-button").click(function() {
    // alert( "Handler for .click() called." );
    getFavourites()
  });

  $(".logo").click(function() {
    // alert( "Handler for .click() called." );
    loadListings()
  });


});
const loadCategory = function() {
  $('.listing-container').empty();
   $.get('/search', function(result) {
     console.log(result)
     renderCardElements(result.searchData);
     $('.modal').modal();
   })
 };

 loadCategory()

  //---------v2 JAVASCRIPT SEARCH FUNCTION -----------
  function showCategory() {
    const selector = document.getElementById('animal-category');
    const value = selector[selector.listings].value;

    document.getElementById('modal-search').innerHTML = value;
}

document.getElementById('btn').addEventListener('click', showCategory);

/// --------- PRICE RANGE -----------///
// function priceRange() {
//   const selector = document.getElementById('lowerNum');
//   const value = selector[selector.listings].value;
//   console.log('this is value: ',value)

//   document.getElementById('modal-search').innerHTML = value;
// }

// document.getElementById('btn').addEventListener('click', priceRange);
//  });
/* <div class="row">
<div class="col m4">
  <div class="card-panel hoverable">
    <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator"
            src="http://upload.wikimedia.org/wikipedia/commons/b/bc/Koushki_2.jpg" />
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4">
            Jake
            <iclass="material-icons right">more_vert</i>
          </span>
          <a class='modal-trigger' href="#modal2">Description</a>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">
            Jake
            <i class="material-icons right">close</i>
          </span>
          <p>Species: Cheetah</p>
          <p>Price: 8000</p>
          <p>Temperment: Lazy</p>
          <p>Seller: Aurelea Enga</p>
          <a class="waves-effect waves-light btn">Email seller</a>
        </div>
    </div>
  </div>
</div>
<div class="card-modal-container">
  <div id="modal2" class="modal">
    <div class="modal-content">
      <h3>Description</h3>
      <p>'Jake is hoping to find a home all his own. He would love a home where he can have some space to curl up in a cozy bed or watch what's happening outside. Jake would prefer to be the solo feline in the home. No other cheetahs please. He is best suited for an adult home or with children over 12.'</p>
    </div>
    <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
    </div>
  */
