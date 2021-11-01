(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();
ismobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(webOS)/i);
if(ismobile){
	$('.datepicker').removeClass('datepicker');
}
function show_wait(text){ 
		$('#wait, #overlay').fadeIn(300);
		$('#wait_text').html(text);
}
function scroll_to_anchor(anchor)
	{
		var tag = $(anchor);
		$('html,body').animate({scrollTop: tag.offset().top-60},'slow');
	}

 function show_wait_eosago(text){ 
		$('#wait_eosago, #overlay').fadeIn(300);
		$('#wait_eosago_text').text(text);
		$('#wait_eosago_fa').html('<i class="fa fa-desktop fa-5x"></i>');
		$('#wait_eosago .progress-bar').css('width', "0%");
}
function hide_wait(){ 
		$('#wait_eosago .progress-bar').css('width', "100%");
		$('#wait, #wait_eosago, #overlay').fadeOut(300);	
}


function align_height(){ 
	var h1 = $(".main_block_1").css('height');
	var h2 = $(".main_block_2").css('height');
	var h3 = $(".main_block_4").css('height');
	var h4 = $(".main_block_3").css('height');
	if(parseFloat(h1)>parseFloat(h2)){
		$(".main_block_2").css('min-height',h1);
	}else{
		$(".main_block_1").css('min-height',h2);
	}
	if(parseFloat(h3)>parseFloat(h4)){
		$(".main_block_4").css('min-height',h3);
	}else{
		$(".main_block_3").css('min-height',h4);
	}
}
function check_req()
	{
		err=false;
		$(".req:visible").each(function() {

			if($(this).val()!=null &&($(this).val().length == 0 || $(this).val() == 0 || $(this).val() == "__-__-____" || $(this).val() == "______" || $(this).val() == "____")) {
				$(this).parents('.form-group').addClass('has-warning');
				err=true;
			}
		});
		
		$(".req_radio:visible").each(function() {
			checked=$(this).find('input:checked').length
			if(checked == 0) {
				$(this).closest('label').addClass('label_error');
				err=true;
			}
		});
		
		if(err){
			
				show_error_modal("Заполните обязательные поля");
		}

	}
	
	
	 
function show_error_modal(text)
	{
		hide_wait()
		$('.error_top_message').html(text);
		$('.error_top_text').fadeIn(300).addClass('badge_shake');
		$('#overlay_error').fadeIn(300);
		setTimeout(function(){
			$('.error_top_text').removeClass('badge_shake');
		},800);
		$("#overlay_error").on("click",function(){
			$('.error_top_text').fadeOut(300);
			$('#overlay_error').fadeOut(300);
		});
	}
	
function show_success_modal(text)
	{
		hide_wait()
		$('.modal').modal('hide');
		$('#success_text').html(text);
		$('#success').modal('show').on('shown.bs.modal', function ()
			{
				$('body').on("click", function(){
				$('.modal').modal('hide');
				show_wait();
				window.location = '/';
			});
		});
	}
//Очищаем любую форму
function clear_form_by_id(form)
{
	$(form).find('input').val('');
	$('#resultKBM, .result_kbm').slideUp(300);
}
function save_form_by_id(form,url)
{
	show_wait();
	check_req();

	if(err){
			hide_wait();
	}else{
		$('.modal').modal('hide');
		$.ajax({
			type: "POST",
			url: url,
			data: {data:$(form).serialize()},
			dataType: 'json',
			error: function(data){
				show_error_modal("Ошибка запроса");

			},
			success: function(data){
				hide_wait();
				
				if(data.error){
					show_error_modal(data.message);
				}else{
					
					//Если ДКП
					if(data.dkp){
						$('.print_dkp_field').fadeIn(300);
						$('.print_dkp').attr('href', '/print/dkp.php?id='+data.id);
					}else if(data.is_vozvrat){
						$('.form_field').hide();
						$('.vozvrat_pay_field').fadeIn(300);
						$('.vozvrat_text').html(data.info);
					}else if(data.is_vozvrat_no_km){
						$('.form_field_no_km').hide();
						$('.vozvrat_pay_field_no_km').fadeIn(300);
						$('.vozvrat_text_no_km').html(data.info);
					}else{
						show_success_modal(data.message);						
					}

				}

			}
		});

		}
}
/* function scroll_to_anchor(anchor)
	{

		$('html,body').animate({scrollTop: anchor.offset().top-20},'slow');
	} */
$(document).ready(function(){
	align_height();
	$('.sravni-dl').hide();


	$(window).resize(function () {
	align_height();
	});	

	
	//Только число
	$("body").on("keyup",".price_new",function() {
		this.value = this.value.replace(",", "."); // меняем запятую на точку
		ch = this.value.replace(/[^\d.]/g, ''); //разрешаем вводить только числа и запятую
		pos = ch.indexOf('.'); // проверяем, есть ли в строке запятая
		if(pos != -1){ // если запятая есть
			if((ch.length-pos)>3){ // проверяем, сколько знаков после запятой, если больше 1го то
				strlenght=this.value.length;
				ch = ch.slice(0, -1); // удаляем лишнее
				ch = Math.floor(ch * 100) / 100; // удаляем лишнее
				//ch = parseFloat(ch).toFixed(2); // удаляем лишнее
				console.log(ch+" "+pos)
			}
		this.value = this.value.substr(0, 3);
		}
		this.value = ch; // приписываем в инпут новое значение
	});
	$(".req").on("focus",function(){
		$(this).parents('.form-group').removeClass('has-warning');
	});
	//Сохраняем любую форму по айди.
	$('body').on('click', '.save_form_by_id', function(){
		form = $(this).data('form');
		url = $(this).data('phpurl');
		save_form_by_id(form,url)
	});
	//Очищаем любую форму
	$('body').on('click', '.clear_form_by_id', function(){
		form = $(this).data('form');
		clear_form_by_id(form)
	});
  if(!ismobile){
	$('.popover_new').webuiPopover({
		width:'auto',
		height: 'auto',
		animation:'pop',
		placement:'auto-top',
		cache:false
	});
  }
  

}); 