
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


