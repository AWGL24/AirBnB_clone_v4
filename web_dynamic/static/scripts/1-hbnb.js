$(function () {
	$('.amenities UL LI INPUT').css('margin-right', '10px');
	let id_dictionary = {};
	$(':checkbox').change(function () {
		if (this.checked) {
			id_dictionary[$(this).data('id')] = $(this).data('name');
		} else if (this.not.checked) {
			delete id_dictionary[$(this).data('id')];
		}
		let list = [];
		for (let k in id_dictionary) {
			list.push(id_dictionary[k]);
		}
		$('.amenities h4').text(list.join(', '));
	});
});