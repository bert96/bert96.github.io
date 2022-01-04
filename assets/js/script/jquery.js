$(document).ready(function() {

	const current_year_element = document.getElementById("current-year");
	const current_year = new Date().getFullYear();

	current_year_element.innerText = current_year;

	$('.main-menu .menu').click(function(){
	  var getStatus =$('.main-menu .menu ul').css('display');
	  if (getStatus == 'flex') { 
	    $('.main-menu .menu ul').addClass('hide-object');
	  } else {
	    $('.main-menu .menu ul').removeClass('hide-object');
	  }
	})
	$('.text-container.form form').submit(function(){
		if($('input.hp').val().length != 0){
			return false;
		}
	});
});