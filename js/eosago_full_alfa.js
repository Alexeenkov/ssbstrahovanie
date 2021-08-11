function calc_alfa()
	{
		var tag = $('#result');
		$('html,body').animate({scrollTop: tag.offset().top-60},'slow');
		//scroll_to_anchor('#result');

		$('.wait_field_alfa').fadeIn();		
		var xhr_alfa = $.ajax({

			type: "POST",
			url: php_url+'eosago_full_alfa/calc_alfa',
			data: {data:$('#osago_form').serialize(),status_id:status_id},
			dataType: 'json',
			error: function(data){
				hide_wait();
						$('.wait_field_alfa').hide();
						$('.error_field').slideDown().html('Ошибка расчета. Обратитесь в тех. поддержку. Номер расчета '+status_id);


			},
			success: function(data){
				hide_wait();
				$('.wait_field_alfa').hide();
				if (!data.error) {
					$('.recalc_field').slideDown();						
  
					if(data.InsuranceBonus==0){
						$('.error_field').slideDown();
					}else{
						$('.koef_field').slideDown();
						$('.Tb').html(data.Coefficients.Tb)
						$('.Kt').html(data.Coefficients.Kt)
						$('.Kbm').html(data.Coefficients.Kbm)
						$('.Kvs').html(data.Coefficients.Kvs)
						$('.Ks').html(data.Coefficients.Ks)
						$('.Kp').html(data.Coefficients.Kp)
						$('.Ko').html(data.Coefficients.Ko)
						$('.Km').html(data.Coefficients.Km)
						$('.alfa_kv').html(data.kv_alfa)
						$('.nasko_kv').html(data.kv_nasko)
						$('.ingos_kv').html(data.kv_ingos)
						$('.InsuranceBonus').html(data.InsuranceBonus)
						$('.UPID').val(data.UPID)
						$('.RefCalcId').val(data.RefCalcId)
						$('.id_car').val(data.id_car)
						$('.id_insurant').val(data.id_insurant)
						$('.id_owner').val(data.id_owner)
						$('.drivers_ids').val(data.drivers_ids)
						$('.startDate').val(data.operationPeriodList.startDate)
						$('.endDate').val(data.operationPeriodList.endDate)
					}
					
				}else{
					$('.error_message_field_alfa').slideDown();
					$('.place_for_error_alfa').html(data.message);
				}
			}
		});
		//Убираем результат
	   $("body").on("click",".recalc",function(){
			xhr_alfa.abort()
			$('.error_field').hide();
		}); 
	}
$(document).ready(function(){	
	//Сохраняем
	$('.save_full_alfa').on("click",function(){
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
			url: php_url+'eosago_full_alfa/save_alfa',
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
