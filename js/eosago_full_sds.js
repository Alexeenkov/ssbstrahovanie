function calc_sds()
	{
		

		$('.wait_field_sds').fadeIn();		
		var xhr_sds = $.ajax({

			type: "POST",
			url: php_url+'eosago_full_sds/calc_sds',
			data: {data:$('#osago_form').serialize(),status_id:status_id},
			dataType: 'json',
			error: function(data){
						$('.wait_field_sds').hide();
						$('.error_field_sds').slideDown();


			},
			success: function(data){
				$('.wait_field_sds').hide();
				if (!data.error) {					
					if(data.InsuranceBonus==0){
						$('.error_field_sds').slideDown();
					}else{
						$('.error_field_sds').hide();
						$('.koef_field_sds').slideDown();						
						$('.Tb_sds').html(data.Coefficients.Tb)
						$('.Kt_sds').html(data.Coefficients.Kt)
						$('.Kbm_sds').html(data.Coefficients.Kbm)
						$('.Kvs_sds').html(data.Coefficients.Kvs)
						$('.Ks_sds').html(data.Coefficients.Ks)
						$('.Kp_sds').html(data.Coefficients.Kp)
						$('.Ko_sds').html(data.Coefficients.Ko)
						$('.Km_sds').html(data.Coefficients.Km)
						$('.InsuranceBonus_sds').html(data.InsuranceBonus)
						$('.kv_sds').html(data.kv_sds)
					}
					
				}else{
					$('.error_message_field_sds').slideDown();
					$('.place_for_error_sds').html(data.message);
				}
			}
		});
		//Убираем результат
	   $("body").on("click",".recalc",function(){
			xhr_sds.abort()
			$('.error_field_sds').hide();
			$('.error_message_field_sds').hide();
		}); 
	}
	
	
$(document).ready(function(){	
	//Сохраняем
	$('.save_full_sds').on("click",function(){
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
			url: php_url+'eosago_full_sds/save_sds',
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
