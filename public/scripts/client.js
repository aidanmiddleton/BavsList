
$(document).ready(function(){

  $('.modal').modal();

  //createCardElement will dynamically generate listing cards, and their modals from the db

  const createCardElement = function(listing) {
    //listing unit is the combination of the card and the modal description

    //Card materialize setup
    const $listingUnit = $('<div>').addClass('listing-unit');
    const $card = $('<div>').addClass('col m4');
    const $cardPanel = $('<div>').addClass('card-panel hoverable');
    const $cardDiv = $('<div>').addClass('card');
    const $imgDiv = $('<div>').addClass('ard-image waves-effect waves-block waves-light');
    const $img = $('<img>').addClass('activator').attr('src', "http://upload.wikimedia.org/wikipedia/commons/b/bc/Koushki_2.jpg");

    //front card content
    const $contentDiv = $('<div>').addClass('card-content');
    const $cardSpan = $('<span>').addClass('card-title activator grey-text text-darken-4').text('Jake');
    const $moreIcon = $('<i>').addClass('material-icons right').text('more_vert');
    const $descriptionTrigger = $('<a>').addClass('modal-trigger').attr('href', '#modal2').text('Description');

    //card reveal content
    const $revealDiv = $('<div>').addClass('card-reveal');
    const $revealSpan = $('<span>').addClass('card-title grey-text text-darken-4').text('Jake');
    const $closeIcon = $('<i>').addClass('material-icons right').text('close');

    const $species = $('<p>').text('Species: Cheetah');
    const $price = $('<p>').text('Price: 8000');
    const $Temperment = $('<p>').text('Temperment: Lazy');
    const $Seller = $('<p>').text('Seller: Aurelea Enga');
    const $emailButton = $('<a>').addClass('waves-effect waves-light btn').text('Email seller');

    //Modal description content
    const $modalContainerDiv = $('<div>').addClass('card-modal-container');
    const modalDiv = $('<div>').addClass('modal').attr('id', 'modal2');

  }



});



{/* <div class="row">
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
      <p>'Jake is hoping to find a home all his own. He would love a home where he can have some space to curl up in a cozy bed or watch what’s happening outside. Jake would prefer to be the solo feline in the home. No other cheetahs please. He is best suited for an adult home or with children over 12.'</p>
    </div>
  <div class="modal-footer">
      <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
</div> */}
