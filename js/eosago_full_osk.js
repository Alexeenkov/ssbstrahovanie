function calc_osk()
	{
		

		$('.wait_field_osk').fadeIn();		
		var xhr_osk = $.ajax({

			type: "POST",
			url: php_url+'eosago_full_osk/calc_osk',
			data: {data:$('#osago_form').serialize(),status_id:status_id},
			dataType: 'json',
			error: function(data){
						$('.wait_field_osk').hide();
						$('.error_field_osk').slideDown();


			},
			success: function(data){
				$('.wait_field_osk').hide();
				if (!data.error) {					
					if(data.InsuranceBonus==0){
						$('.error_field_osk').slideDown();
					}else{
						$('.error_field_osk').hide();
						$('.koef_field_osk').slideDown();						
						$('.Tb_osk').html(data.Coefficients.Tb)
						$('.Kt_osk').html(data.Coefficients.Kt)
						$('.Kbm_osk').html(data.Coefficients.Kbm)
						$('.Kvs_osk').html(data.Coefficients.Kvs)
						$('.Ks_osk').html(data.Coefficients.Ks)
						$('.Kp_osk').html(data.Coefficients.Kp)
						$('.Ko_osk').html(data.Coefficients.Ko)
						$('.Km_osk').html(data.Coefficients.Km)
						$('.kv_osk').html(data.kv_osk)
						$('.InsuranceBonus_osk').html(data.InsuranceBonus)
					}
					
				}else{
					$('.error_message_field_osk').slideDown();
					$('.place_for_error_osk').html(data.message);
				}
			}
		});
		//Убираем результат
	   $("body").on("click",".recalc",function(){
			xhr_osk.abort()
			$('.error_field_osk').hide();
			$('.error_message_field_osk').hide();
		}); 
	}
	
	
$(document).ready(function(){	
	//Сохраняем
	$('.save_full_osk').on("click",function(){
		err=false;
		$("#osago_form input:visible,#osago_form select:visible").not('.skip').each(function() {

			if($(this).val()== '0' || $(this).val()=="") {
				$(this).addClass('red');
				$(this).next('.select2-container').addClass('red');
				err=true;
			}
		});
		if(err){
			show_error_modal('Заполните обязательные поля');
			return false;
			
		}
		if($('[name="insurant[fias_level]"]').val()<7){
			$(this).addClass('red');
			show_error_modal('Укажите корректный адрес страхователя');
			return false;
		}
		if($('[name="owner[fias_level]"]').val()<7 && $('[name="insurant_is_owner"]').prop('checked')==false){
			$(this).addClass('red');
			show_error_modal('Укажите корректный адрес собственника');
			return false;
		}

		show_wait();
		$.ajax({

			type: "POST",
			url: php_url+'eosago_full_osk/save_osk',
			data: {data:$('#osago_form').serialize(),status_id:status_id},
			dataType: 'json',
			error: function(data){
				hide_wait();
				show_error_modal("Какая-то ошибка. Обратитесь к администратору");

			},
			success: function(data){
				hide_wait();
				if (!data.error) {
					location.href=data.url;
				}else{
					show_error_modal(data.message);
				}
			}
		});
	});	
});	
