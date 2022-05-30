$(function () {
  $('.amenities UL LI INPUT').css('margin-right', '10px');
  const id_dictionary = {};
  $(':checkbox').change(function () {
    if (this.checked) {
      id_dictionary[$(this).data('id')] = $(this).data('name');
    } else if (this.not.checked) {
      delete id_dictionary[$(this).data('id')];
    }
    const list = [];
    for (const k in id_dictionary) {
      list.push(id_dictionary[k]);
    }
    $('.amenities h4').text(list.join(', '));
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data) {
    if (data.status == 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').toggleClass('available');
    }
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search/',
    type: 'POST',
    dataType: 'json',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: function (data) {
      $.each(data, function (k, v) {
        $(`<article>
<div class="title">
<h2>${v.name}</h2>
<div class="price_by_night">
${v.price_by_night}
</div>
</div>
<div class="information">
<div class="max_guest">
<i class="fa fa-users fa-3x" aria-hidden="true"></i>
<br />
${v.max_guest} Guests
</div>
<div class="number_rooms">
<i class="fa fa-bed fa-3x" aria-hidden="true"></i>
<br />
${v.number_rooms} Bedrooms
</div>
<div class="number_bathrooms">
<i class="fa fa-bath fa-3x" aria-hidden="true"></i>
<br />
${v.number_bathrooms} Bathroom
</div>
</div>
<div class="user">
<strong>Owner: PLACEHOLDER</strong>
</div>
<div class="description">
${v.description}
</div>
</article>`).appendTo('.places');
      });
    }
  });
});
