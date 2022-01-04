$(document).ready(function() {
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