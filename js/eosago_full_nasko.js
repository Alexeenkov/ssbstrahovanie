
	
	function calc_nasko()
	{
		$('.wait_field_nasko').fadeIn();		

		Category_Nasko = $('[name="Category_Nasko"]').val()
		Mark_Nasko = $('[name="Mark_Nasko"]').val()
		Model_Nasko = $('[name="Model_Nasko"]').val()
		var xhr_nasko = $.ajax({

			type: "POST",
			url: php_url+'eosago_full_nasko/calc_nasko',
			data: {data:$('#osago_form').serialize(),status_id:status_id,Category_Nasko:Category_Nasko,Mark_Nasko:Mark_Nasko,Model_Nasko:Model_Nasko},
			dataType: 'json',
			error: function(data){
				hide_wait();
					$('.wait_field_nasko').hide();
					$('.error_field_nasko').slideDown().html('Ошибка расчета. Обратитесь в тех. поддержку. Номер расчета '+status_id);


			},
			success: function(data){
				$('.wait_field_nasko').hide();  
				if (!data.error) {					
					if(data.InsuranceBonus==0){
						$('.error_field_nasko').slideDown();
					}else{
						$('.error_field_nasko').hide();
						$('.koef_field_nasko').slideDown();
						$('.Tb_nasko').html(data.Coefficients.Tb)
						$('.Kt_nasko').html(data.Coefficients.Kt)
						$('.Kbm_nasko').html(data.Coefficients.Kbm)
						$('.Kvs_nasko').html(data.Coefficients.Kvs)
						$('.Ko_nasko').html(data.Coefficients.Ko)
						$('.Ks_nasko').html(data.Coefficients.Ks)
						$('.Kp_nasko').html(data.Coefficients.Kp)
						$('.Km_nasko').html(data.Coefficients.Km)
						$('.kv_nasko').html(data.kv_nasko)
						$('.AgrISN').val(data.AgrISN)
						$('.InsuranceBonus_nasko').html(data.InsuranceBonus)
					}
					    var myArray = data.dr_kbms;
						console.log(myArray.length)
						if($.isArray(myArray)){
							var i;
							for (i = 0; i < myArray.length; i++) {
							console.log(myArray[i]);
							$('.place_for_kbm').eq(i).html('Кбм = '+myArray[i])
							}

						}else{
							console.log(myArray.KMBValue)
							$('.place_for_kbm').eq(0).html('Кбм = '+myArray.KMBValue)
						}
				}else{
					if(data.mark_model){
						$('.mark_model_field_nasko').slideDown();						
					}else{
						$('.error_message_field_nasko').slideDown();
						$('.place_for_error_nasko').html(data.message);						
					}

				}
			}
		});
				//Убираем результат
	   $("body").on("click",".recalc",function(){
			xhr_nasko.abort()
			$('.error_field_nasko').hide();
		}); 
	}
$(document).ready(function(){	
	//Сохраняем
	$('.save_full_nasko').on("click",function(){
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
		Category_Nasko = $('[name="Category_Nasko"]').val()
		Mark_Nasko = $('[name="Mark_Nasko"]').val()
		Model_Nasko = $('[name="Model_Nasko"]').val()
		show_wait();
		$.ajax({

			type: "POST",
			url: php_url+'eosago_full_nasko/save_nasko',
			data: {data:$('#osago_form').serialize(),status_id:status_id,Category_Nasko:Category_Nasko,Mark_Nasko:Mark_Nasko,Model_Nasko:Model_Nasko},
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

