function calc_maks()
	{
		

		$('.wait_field_maks').fadeIn();		

		var xhr_maks = $.ajax({

			type: "POST",
			url: php_url+'eosago_full_maks/calc_maks',
			data: {data:$('#osago_form').serialize(),status_id:status_id},
			dataType: 'json',
			error: function(data){
						$('.wait_field_maks').hide();
						$('.error_field_maks').slideDown();
			},
			success: function(data){
				$('.wait_field_maks').hide();
				if (!data.error) {					
					if(data.InsuranceBonus==0){
						$('.error_field_maks').slideDown();
					}else{
						$('.error_field_maks').hide();
						$('.koef_field_maks').slideDown();						
						$('.Tb_maks').html(data.Coefficients.Tb)
						$('.Kt_maks').html(data.Coefficients.Kt)
						$('.Kbm_maks').html(data.Coefficients.Kbm)
						$('.Kvs_maks').html(data.Coefficients.Kvs)
						$('.Ks_maks').html(data.Coefficients.Ks)
						$('.Kp_maks').html(data.Coefficients.Kp)
						$('.Ko_maks').html(data.Coefficients.Ko)
						$('.Km_maks').html(data.Coefficients.Km)
						$('.kv_maks').html(data.kv_maks)
						$('.InsuranceBonus_maks').html(data.InsuranceBonus)
					}
					
				}else{
					$('.error_message_field_maks').slideDown();
					$('.place_for_error_maks').html(data.message);
				}
			}
		});
		//Убираем результат
	   $("body").on("click",".recalc",function(){
			xhr_maks.abort()
			$('.error_field_maks').hide();
			$('.error_message_field_maks').hide();
		}); 
	}
	

$(document).ready(function(){	
	//Сохраняем
	$('.save_full_maks').on("click",function(){
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
			url: php_url+'eosago_full_maks/save_maks',
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


