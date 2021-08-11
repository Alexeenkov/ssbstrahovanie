function recount_dr() {
    var count_dr = 1;
    $(".driver_num").each(function() {
        $(this).html(count_dr);
        count_dr++;
    });

}
$(document).ready(function() {
    php_url = $('#php_url').val();
    var edit = $('#edit').val();
    if (edit != '') {
        //Получаем марку


        $('.b_field').show();

        var Mark_full = $('[name="Transport[mark_id]"]').data('mark');
        $('[name="Transport[mark_id]"]').val(Mark_full); //.change();

        $.post("/eosago_full/get_models", { id: Mark_full },

            function(data) {
                $('[name="Transport[model_id]"]').html(data.option);
                var Model_full = $('[name="Transport[model_id]"]').data('model');
                $('[name="Transport[model_id]"]').val(Model_full); //.trigger( "change" );
            }, "json");
        hide_wait();
        recount_dr();
    }



    $('[name="Transport[mark_id]"]').on("change", function() {
        $('.mark_model_field_nasko').slideUp();
        show_wait();
        id = this.value;

        $.post("/eosago_full/get_models", { id: id },
            function(data) {
                $('[name="Transport[model_id]"]').html(data.option);

                hide_wait();
            }, "json");
    });

    $('[name="Transport[model_id]"]').on("change", function() {
        $('.mark_model_field_nasko').slideUp();
        $('[name="Category_Nasko"]').val(0);
        $('[name="Mark_Nasko"]').html('<option value="0">Выберите категорию</option>');
        $('[name="Model_Nasko"]').html('<option value="0">Выберите марку</option>');
    });


    //Копируем водилу в страхователя
    $("body").on("click change", ".copy_driver", function() {
        var f = $('.copy_driver_f:first').val();
        var i = $('.copy_driver_i:first').val();
        var o = $('.copy_driver_o:first').val();
        var bd = $('.copy_driver_bd:first').val();
        $('[name="insurant[Surname]"]').val(f);
        $('[name="insurant[Name]"]').val(i);
        $('[name="insurant[Patronymic]"]').val(o);
        $('[name="insurant[BirthDate]"]').val(bd);
    });
    //Убираем ошибку
    $("body").on("click change", ".red", function() {
        $(this).removeClass('red');
        $(this).next('.select2-container').removeClass('red');
    });
    //Убираем результат
    $("body").on("keyup paste change", "#osago_form input, #osago_form select", function() {
        $('.error_field').hide();
        $('.recalc_field').hide();
        $('.koef_field').slideUp();
        $('.koef_field_nasko').slideUp();
        $('.koef_field_ingos').slideUp();
        $('.koef_field_maks').slideUp();
        $('.koef_field_osk').slideUp();
        $('.koef_field_sds').slideUp();
        $('.koef_field_renis').slideUp();

        $('.wait_field_alfa').slideUp();
        $('.wait_field_nasko').slideUp();
        $('.wait_field_ingos').slideUp();
        $('.wait_field_maks').slideUp();
        $('.wait_field_osk').slideUp();
        $('.wait_field_sds').slideUp();
        $('.wait_field_renis').slideUp();

        $('.error_message_field_alfa').slideUp();
        $('.error_message_field_nasko').slideUp();
        $('.error_message_field_ingos').slideUp();
        $('.error_message_field_maks').slideUp();
        $('.error_message_field_osk').slideUp();
        $('.error_message_field_sds').slideUp();
        $('.error_message_field_renis').slideUp();
    });
    //Убираем результат
    $("body").on("click", ".recalc, .close_driver, .add_driver", function() {


        $('.recalc_field').hide();
        $('.koef_field').slideUp();
        $('.koef_field_nasko').slideUp();
        $('.koef_field_ingos').slideUp();
        $('.koef_field_maks').slideUp();
        $('.koef_field_osk').slideUp();
        $('.koef_field_sds').slideUp();
        $('.koef_field_renis').slideUp();

        $('.wait_field_alfa').slideUp();
        $('.wait_field_nasko').slideUp();
        $('.wait_field_ingos').slideUp();
        $('.wait_field_maks').slideUp();
        $('.wait_field_osk').slideUp();
        $('.wait_field_sds').slideUp();
        $('.wait_field_renis').slideUp();

        $('.error_message_field_alfa').slideUp();
        $('.error_message_field_nasko').slideUp();
        $('.error_message_field_ingos').slideUp();
        $('.error_message_field_maks').slideUp();
        $('.error_message_field_osk').slideUp();
        $('.error_message_field_sds').slideUp();
        $('.error_message_field_renis').slideUp();
        $('.form_overlay').removeClass('active');




    });
    //Показываем ДК
    var year = $('[name="Transport[YearIssue]"]').val();
    if (year > 2015) {
        $('.dk_field').hide();
    } else {
        $('.dk_field').show();
    }
    $("body").on("change", '[name="Transport[YearIssue]"]', function() {
        var year = $(this).val();
        if (year > 2015) {
            $('.dk_field').hide();
        } else {
            $('.dk_field').show();
        }
    });
    //Меняем все по нажатию на чекбокс (если надо скрыть)
    $("body").on("click", ".change_checkbox_eosago", function() {
        var opt = $(this).data('sh');
        var checked = $(this).prop('checked');
        if (!checked) {
            $('.s_' + opt).fadeIn(400);
        } else {
            $('.s_' + opt).hide();
        }

    });
    $(".change_checkbox_eosago").each(function() {
        var opt = $(this).data('sh');
        var checked = $(this).prop('checked');
        if (!checked) {
            $('.s_' + opt).fadeIn(400);
        } else {
            $('.s_' + opt).hide();
        }
    });
    //Меняем все по нажатию на чекбокс (если надо Открыть)
    $("body").on("click", ".change_checkbox_eosago_open", function() {

        var opt = $(this).data('sh');
        var checked = $(this).prop('checked');
        if (checked) {
            $('.s_' + opt).fadeIn(400);
        } else {
            $('.s_' + opt).hide();
        }

    });
    $(".change_checkbox_eosago_open").each(function() {
        var opt = $(this).data('sh');
        var checked = $(this).prop('checked');
        if (checked) {
            $('.s_' + opt).fadeIn(400);
        } else {
            $('.s_' + opt).hide();
        }
    });

    $("body").on("change", '.no_dk', function() {
        var no_dk = $('.no_dk').prop('checked');
        if (no_dk) {
            $('.no_dk_field').val('Диагностическая карта отсутствует');
            $('.dk_hide_fields').hide();
        } else {
            $('.no_dk_field').val('');
            $('.dk_hide_fields').show();
        };
    });


    $("body").on("change", '.no_gn', function() {
        //Гос номер отсутствует
        var no_gn = $('.no_gn').prop('checked');
        if (no_gn) {
            $('.no_gn_field').val('Гос.номер отсутствует');
        } else {
            $('.no_gn_field').val('');
        }
        $('[name="Transport[LicensePlate]"]').val('');
    });
    $('.toggle_panel').on("click", function(e) {
        $(this).find('.fa_toggled').toggleClass('active');
        $(this).parents('.panel').find('tbody.toggled').slideToggle();
    });
    //Меняем все по нажатию на радио
    $(".change_radio_eosago").on("click", function() {
        var opt = $(this).data('sh');
        $('.s_' + opt).fadeIn(400);
        $('.h_' + opt).hide();
    });
    $(".change_radio_eosago:checked").each(function() {
        var opt = $(this).data('sh');
        $('.s_' + opt).fadeIn(400);
        $('.h_' + opt).hide();
    });
    //Тип ТС
    $("body").on("click", ".ident_type", function() {
        var opt = $(this).val();
        $('.vins').hide().find('input').val('');
        $('.field_' + opt).show();

    });
    $(".ident_type").each(function() {
        var opt = $('.ident_type:checked').val();
        $('.vins').hide();
        $('.field_' + opt).show();
    });
    //Добавляем водилу
    $(".add_driver").on('click', function() {
        count = $(".close_driver").length;
        if (count == 4) {
            show_error_modal('Максимум 4 водителя');
            return false;
        }
        show_wait();
        $.ajax({
            type: "POST",
            url: "/main/get_tpl",
            data: { tpl: 'eosago2_driver' },
            dataType: 'json',
            error: function(data) {
                hide_wait();
                show_error_modal("Какая-то ошибка. Обратитесь к администратору");

            },
            success: function(data) {
                $('.place_for_drivers').append(data.html);
                recount_dr();
                $(".bd").mask("99-99-9999");
                hide_wait();
            }
        });
    });
    //Удаляем водилу
    $("body").on('click', '.close_driver', function() {
        var count = $(".close_driver").length;
        if (count == 1) {
            show_error_modal('Нельзя удалить последнего водителя');
        } else {
            $(this).parents('.fieldset_small').slideUp(300, function() {
                $(this).remove();
                recount_dr()
            });

        }
    });
    $(".address_owner").on("keyup paste", function() {
        $('[name="owner[fias_level]"]').val('0')
    });
    $(".address_owner").on("change", function() {
        if ($('[name="owner[fias_level]"]').val() == 0) {
            $(this).addClass('red');
        }
    });
    $(".address_insurant").on("keyup paste", function() {
        $('[name="insurant[fias_level]"]').val('0')
    });
    $(".address_owner").suggestions({
        token: "474ae659512ff339e0fb56075d96bf3ef5dbbf7c",
        type: "ADDRESS",
        count: 5,
        /* Вызывается, когда пользователь выбирает одну из подсказок */
        onSelect: function(suggestion) {
            console.log(suggestion);
            $('[name="owner[Zip]"]').val(suggestion.data.postal_code)
            $('[name="owner[State]"]').val(suggestion.data.region_with_type)
            $('[name="owner[Region]"]').val(suggestion.data.area_with_type)
            var city = suggestion.data.city != null ? suggestion.data.city : suggestion.data.settlement_with_type;
            /* var city = suggestion.data.settlement == null ? suggestion.data.city : suggestion.data.settlement_with_type;
            var city_kladr_id = suggestion.data.settlement == null ? suggestion.data.city_kladr_id : suggestion.data.settlement_kladr_id; */
            var city_kladr_id = suggestion.data.city_kladr_id != null ? suggestion.data.city_kladr_id : suggestion.data.settlement_kladr_id;
            $('[name="owner[City]"]').val(city)
            $('[name="owner[Settlement]"]').val(suggestion.data.settlement_with_type)
            $('[name="owner[Street]"]').val(suggestion.data.street_with_type)
            $('[name="owner[House]"]').val(suggestion.data.house)
            $('[name="owner[Building]"]').val(suggestion.data.block)
            $('[name="owner[Apartment]"]').val(suggestion.data.flat)
            $('[name="owner[fias_level]"]').val(suggestion.data.fias_level)
            $('[name="owner[city_kladr_id]"]').val(city_kladr_id)
            $('[name="owner[city_okato_id]"]').val(suggestion.data.okato)
            $('[name="owner[street_kladr_id]"]').val(suggestion.data.street_kladr_id)
            $('[name="owner[kladr_id]"]').val(suggestion.data.kladr_id)
            $('[name="owner[city_short]"]').val(suggestion.data.street)
        }
    });
    $(".address_insurant").suggestions({
        token: "474ae659512ff339e0fb56075d96bf3ef5dbbf7c",
        type: "ADDRESS",
        count: 5,
        /* Вызывается, когда пользователь выбирает одну из подсказок */
        onSelect: function(suggestion) {
            console.log(suggestion);
            $('[name="insurant[Zip]"]').val(suggestion.data.postal_code)
            $('[name="insurant[State]"]').val(suggestion.data.region_with_type)
            $('[name="insurant[Region]"]').val(suggestion.data.area_with_type)
            var city = suggestion.data.city != null ? suggestion.data.city : suggestion.data.settlement_with_type;
            /* var city = suggestion.data.settlement == null ? suggestion.data.city : suggestion.data.settlement_with_type;
            var city_kladr_id = suggestion.data.settlement == null ? suggestion.data.city_kladr_id : suggestion.data.settlement_kladr_id; */
            var city_kladr_id = suggestion.data.city_kladr_id != null ? suggestion.data.city_kladr_id : suggestion.data.settlement_kladr_id;
            $('[name="insurant[City]"]').val(city)
            $('[name="insurant[Settlement]"]').val(suggestion.data.settlement_with_type)
            $('[name="insurant[Street]"]').val(suggestion.data.street_with_type)
            $('[name="insurant[House]"]').val(suggestion.data.house)
            $('[name="insurant[Building]"]').val(suggestion.data.block)
            $('[name="insurant[Apartment]"]').val(suggestion.data.flat)
            $('[name="insurant[Apartment]"]').val(suggestion.data.flat)
            $('[name="insurant[fias_level]"]').val(suggestion.data.fias_level)
            $('[name="insurant[city_kladr_id]"]').val(city_kladr_id)
            $('[name="insurant[city_okato_id]"]').val(suggestion.data.okato)
            $('[name="insurant[street_kladr_id]"]').val(suggestion.data.street_kladr_id)
            $('[name="insurant[kladr_id]"]').val(suggestion.data.kladr_id)
            $('[name="insurant[city_short]"]').val(suggestion.data.street)
        }
    });

    //Считаем
    $('.calc_full').on("click", function() {
        //show_wait('Сохраняем данные');
        err = false;
        $("#osago_form input:visible,#osago_form select:visible").not('.skip').each(function() {

            if ($(this).val() == '0' || $(this).val() == "" || $(this).val() == "00-00-0000") {
                $(this).addClass('red');
                $(this).next('.select2-container').addClass('red');
                err = true;
            }
        });
        if (err) {
            show_error_modal('Заполните обязательные поля');
            return false;

        }
        if ($('[name="insurant[fias_level]"]').val() < 7) {
            $(this).addClass('red');
            show_error_modal('Укажите корректный адрес страхователя');
            return false;
        }
        if ($('[name="owner[fias_level]"]').val() < 7 && $('[name="insurant_is_owner"]').prop('checked') == false) {
            $(this).addClass('red');
            show_error_modal('Укажите корректный адрес собственника');
            return false;
        }
        //scroll_to_anchor('#result');


        //status_id=0;

        $('.form_overlay').addClass('active');
        /*
        		$.ajax({
        			type: "GET",
        			async:false,
        			url:  php_url+'status_full/insert_first_status', 
        			dataType: 'json', 
        			success: function(data){  status_id=data.id;}
        		});
        		
        		*/
        console.log('Status: ' + status_id);
        //Сначала сохраняем проект

        $.ajax({

            type: "POST",
            url: '/eosago_full/save_first',
            data: { data: $('#osago_form').serialize(), status_id: status_id },
            dataType: 'json',
            error: function(data) {
                hide_wait();
                show_error_modal("Какая-то ошибка. Обратитесь к администратору");
                $('.form_overlay').removeClass('active');

            },
            success: function(data) {
                hide_wait();
                if (!data.error) {
                    $('.mid').val(data.mid);
                    //Считаем
                    $('.recalc_field').fadeIn();
                    $('.info_field').fadeOut();

                    //hide_wait();
                    access_alfa = $('#access_alfa').val();
                    access_nasko = $('#access_nasko').val();
                    access_ingos = $('#access_ingos').val();
                    access_osk = $('#access_osk').val();
                    access_maks = $('#access_maks').val();
                    access_sds = $('#access_sds').val();
                    access_renis = $('#access_renis').val();
                    //Если краткосрочный, то только в альфе
                    var period = $('[name="period"]').val();
                    if (period != 12) {
                        if (access_alfa == "1") calc_alfa();
                    } else {
                        if (access_alfa == "1") calc_alfa();
                        if (access_nasko == "1") calc_nasko();
                        if (access_ingos == "1") calc_ingos();
                        if (access_osk == "1") calc_osk();
                        if (access_maks == "1") calc_maks();
                        if (access_sds == "1") calc_sds();
                        if (access_renis == "1") calc_renis();
                    }
                } else {
                    show_error_modal(data.errorMessage);
                }
            }
        });




    });
    //Считаем наско заново

    $('[name="Category_Nasko"]').on("change", function() {
        show_wait();
        id = this.value;
        if (id == 0) {
            $('[name="Mark_Nasko"]').html('<option value="0">Выберите категорию</option>');
            $('[name="Model_Nasko"]').html('<option value="0">Выберите марку</option>');
            hide_wait();
        } else {
            $.post("/eosago_full/get_marks_nasko", { id: id },
                function(data) {
                    $('[name="Mark_Nasko"]').html(data.option);
                    $('[name="Model_Nasko"]').html('<option value="0">Выберите марку</option>');
                    hide_wait();
                }, "json");
        }
        $('.koef_field_nasko').slideUp();
        $('.wait_field_nasko').slideUp();
        $('.error_message_field_nasko').slideUp();
    });

    $('[name="Mark_Nasko"]').on("change", function() {

        show_wait();
        id = this.value;

        $.post("/eosago_full/get_models_nasko", { id: id },
            function(data) {
                $('[name="Model_Nasko"]').html(data.option);

                hide_wait();
            }, "json");
        $('.koef_field_nasko').slideUp();
        $('.wait_field_nasko').slideUp();
        $('.error_message_field_nasko').slideUp();

    });
    $('[name="Model_Nasko"]').on("change", function() {
        $('.koef_field_nasko').slideUp();
        $('.wait_field_nasko').slideUp();
        $('.error_message_field_nasko').slideUp();

    });
    $('.recalc_nasko').on("click", function() {

        //show_wait('Сохраняем данные');
        err = false;
        $("#osago_form input:visible,#osago_form select:visible,#mark_model_modal_nasko select:visible").not('.skip').each(function() {

            if ($(this).val() == '0' || $(this).val() == "" || $(this).val() == "00-00-0000") {
                $(this).addClass('red');
                $(this).next('.select2-container').addClass('red');
                err = true;
            }
        });
        if (err) {
            show_error_modal('Заполните обязательные поля');
            return false;

        }
        if ($('[name="insurant[fias_level]"]').val() < 7) {
            $(this).addClass('red');
            show_error_modal('Укажите корректный адрес страхователя');
            return false;
        }
        if ($('[name="owner[fias_level]"]').val() < 7 && $('[name="insurant_is_owner"]').prop('checked') == false) {
            $(this).addClass('red');
            show_error_modal('Укажите корректный адрес собственника');
            return false;
        }
        $('.modal').modal('hide');
        calc_nasko();


    });
    //Проверяем Кбм
    $('.check_full_kbm').on("click", function() {
        err = false;
        $(".req_kbm").each(function() {

            if ($(this).val() == '0' || $(this).val() == "" || $(this).val() == "00-00-0000") {
                $(this).addClass('red');
                $(this).next('.select2-container').addClass('red');
                err = true;
            }
        });
        if (err) {
            show_error_modal('Заполните обязательные поля');
            return false;

        }

        show_wait();
        $.ajax({

            type: "POST",
            url: '/eosago_full/check_kbm',
            data: { data: $('#osago_form').serialize() },
            dataType: 'json',
            error: function(data) {
                hide_wait();
                show_error_modal("Какая-то ошибка. Обратитесь к администратору");

            },
            success: function(data) {
                hide_wait();
                if (!data.error) {
                    var myArray = data.kbms;
                    console.log(myArray.length)
                    if ($.isArray(myArray)) {
                        var i;
                        for (i = 0; i < myArray.length; i++) {
                            console.log(myArray[i]);
                            $('.place_for_kbm').eq(i).html('Кбм = ' + myArray[i])
                        }

                    } else {
                        console.log(myArray.KMBValue)
                        $('.place_for_kbm').eq(0).html('Кбм = ' + myArray.KMBValue)
                    }
                    console.log(myArray)
                } else {
                    show_error_modal(data.message);
                }
            }
        });
    });
    //Проверяем Кбм
    $('.check_nasko_kbm').on("click", function() {
        err = false;
        $(".req_kbm").each(function() {

            if ($(this).val() == '0' || $(this).val() == "" || $(this).val() == "00-00-0000") {
                $(this).addClass('red');
                $(this).next('.select2-container').addClass('red');
                err = true;
            }
        });
        if (err) {
            show_error_modal('Заполните обязательные поля');
            return false;

        }

        show_wait();
        $.ajax({

            type: "POST",
            url: '/eosago_nasko/check_kbm',
            data: { data: $('#osago_form').serialize() },
            dataType: 'json',
            error: function(data) {
                hide_wait();
                show_error_modal("Какая-то ошибка. Обратитесь к администратору");

            },
            success: function(data) {
                hide_wait();
                if (!data.error) {
                    var myArray = data.kbms;
                    console.log(myArray.length)
                    if ($.isArray(myArray)) {
                        var i;
                        for (i = 0; i < myArray.length; i++) {
                            console.log(myArray[i]);
                            $('.place_for_kbm').eq(i).html('Кбм = ' + myArray[i])
                        }

                    } else {
                        console.log(myArray.KMBValue)
                        $('.place_for_kbm').eq(0).html('Кбм = ' + myArray.KMBValue)
                    }
                    console.log(myArray)
                } else {
                    show_error_modal(data.errorMessage);
                }
            }
        });
    });
});