
	
	function calc_ingos()
	{
		$('.wait_field_ingos').fadeIn();		
		Phone_Ingos = $('[name="Phone_Ingos"]').val()
		Email_Ingos = $('[name="Email_Ingos"]').val()
		$('.Phone_Ingos').hide();
		$('.Email_Ingos').hide();
		var xhr_ingos = $.ajax({

			type: "POST",
			url: php_url+'eosago_full_ingos/calc_ingos',
			data: {data:$('#osago_form').serialize(),status_id:status_id},
			dataType: 'json',
			error: function(data){
				hide_wait();
						$('.error_field_ingos').slideDown().html('Ошибка расчета. Обратитесь в тех. поддержку. Номер расчета '+status_id);
						$('.wait_field_ingos').hide(); 

			},
			success: function(data){
				$('.wait_field_ingos').hide();  
				if (!data.error) {	
					if(data.error_contacts){
						$('.wait_field_ingos').hide(); 
						$('.koef_field_ingos').hide(); 
						$('.ingos_contacts').fadeIn();
						$('.ingos_contacts_info').html(data.message);
						if(data.contacts_error_phone){
							$('.Phone_Ingos').fadeIn();
						}
						if(data.contacts_error_email){
							$('.Email_Ingos').fadeIn();
						}
						return false;
						
					}
					if(data.InsuranceBonus==0){
						$('.error_field_ingos').slideDown().html('Запрет на страхование');
					}else{
						$('.error_field_ingos').hide();
						$('.koef_field_ingos').slideDown();
						$('.Tb_ingos').html(data.Coefficients.Tb)
						$('.Kt_ingos').html(data.Coefficients.Kt)
						$('.Kbm_ingos').html(data.Coefficients.Kbm)
						$('.Kvs_ingos').html(data.Coefficients.Kvs)
						$('.Ko_ingos').html(data.Coefficients.Ko)
						$('.Ks_ingos').html(data.Coefficients.Ks)
						$('.Kp_ingos').html(data.Coefficients.Kp)
						$('.Km_ingos').html(data.Coefficients.Km)
						$('.kv_ingos').html(data.kv_ingos)
						$('.AgrISN').val(data.AgrISN)
						$('.InsuranceBonus_ingos').html(data.InsuranceBonus)
						$('.kv_ingos').html(data.kv_ingos)
					}
				}else{
					if(data.mark_model){
						$('.mark_model_field_ingos').slideDown();						
					}else{
						$('.error_message_field_ingos').slideDown();
						$('.place_for_error_ingos').html(data.message);						
					}

				}
			}
		});
				//Убираем результат
	   $("body").on("click",".recalc",function(){
			xhr_ingos.abort()
			$('.error_field_ingos').hide();
		}); 
	}
$(document).ready(function(){	
	$('.recalc_ingos').on("click",function(){

		//show_wait('Сохраняем данные');
		err=false;
		$("#osago_form input:visible,#osago_form select:visible,#mark_model_modal_nasko select:visible").not('.skip').each(function() {

			if($(this).val()== '0' || $(this).val()=="" || $(this).val()=="00-00-0000") {
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
		$('.modal').modal('hide');
		calc_ingos();


	});
	//Сохраняем
	$('.save_full_ingos').on("click",function(){
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
			url: php_url+'eosago_full_ingos/save_ingos',
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

