var timeout;
$(function () {


    //show/hide password
    $('.svgPassword--show').on('click', passwordShow);

    function passwordShow(e) {
        console.log($(e.currentTarget).parent());
        var thisInput = $(e.currentTarget).parent().find('.password--type');
        if (thisInput.attr('type') === 'password') {
            //Change the attribute to text
            thisInput.attr('type', 'text');
        } else {
            //Change the attribute back to password
            thisInput.attr('type', 'password');
        }
    }

    var navNotif = $('.nav__Notification');
    if (navNotif.text() >= 10) {
        $(navNotif).addClass('nav__NotificationBig');
    }

    $('.header__NotificationSvgContainer--click').on('click', function () {
        $(this).toggleClass('active');
        $('.header__NotificationList').toggleClass('active');
    });

    $(document).on('click', function (e) {
        if (!$(e.target).closest('.header__Notification').hasClass('header__Notification')) {
            $('.header__NotificationList, .header__NotificationSvgContainer--click').removeClass('active');
        }
        if (!$(e.target).closest('.header__UserContainer').hasClass('header__UserContainer')) {
            $('.header__User--click, .header__UserMenu').removeClass('active');
        }
    });

    $('.header__User--click').on('click', function () {
        $(this).toggleClass('active');
        $('.header__UserMenu').toggleClass('active');
    });

    $('.header__NotificationShowMore').on('click', function () {
        $(this).removeClass('active');
        $('.header__NotificationItem:hidden').show();
        $('.header__NotificationList').mCustomScrollbar({
            axis: "y"
        });
    });

    $('.presentationView__ControlsDescription--click').on('click', function () {
        $('.presentationView__Description').toggleClass('active showed');
    });

    $('.presentationView__ControlsFullScreen--click').on('click', function () {
        $('.presentationView').toggleClass('fullScreen');
        clearTimeout(timeout);
        fullScreenHideControlsAndDescription();
    });


    $('.profile__ViewAvatarFile').on('change', function () {
        readURL(this, '.profile__ViewAvatarImg', 'height100');
    });

    $('.customerRegistration__ViewAvatarFile').on('change', function () {
        readURL(this, '.customerRegistration__ViewAvatarImg', 'height100');
    });

    $('.customerRegistration__BrandAvatarFile').on('change', function () {
        readURL(this, '.customerRegistration__BrandAvatarImg', 'height100');
    });

    $('.presentationCreate__AddSlideLoadAreaFile').on('change', function () {
        readURL(this, '.presentationCreate__AddSlideLoadAreaImg', 'width100');
        $('.presentationCreate__AddSlideLoadArea').removeClass('presentationCreate__AddSlideLoadArea--lg');
        $('.presentationCreate__AddSlideLoadArea').addClass('presentationCreate__AddSlideLoadArea--height');

    });

    $('.presentationCreate__AddQuestionWrapper').mCustomScrollbar({
        axis: "y"
    });


    $('.customerRegistration__FormsAddPlace--click').on('click', function () {
        $(".customerRegistration__FormsInputWorkContainer:last").clone().insertAfter(".customerRegistration__FormsInputWorkContainer:last");
        $(".customerRegistration__FormsInputWorkContainer:last .chosen-container").remove();
        $(".customerRegistration__FormsInputWorkContainer:last .chosen-select-search-280").chosen({
            width: '280px'
        })
    });

    $('.customerRegistration__AddBrand--click').on('click', function () {
        $(".customerRegistration__BrandItem:last").clone(false).insertAfter(".customerRegistration__BrandItem:last");
        $(".customerRegistration__BrandItem:last").find('input').val('');
        $(".customerRegistration__BrandItem:last").find('input[type="checkbox"]').prop('checked', false);
    });

    $('.customerRegistration__AddManager--click').on('click', function () {
        $(".customerRegistration__ManagerItem:last").clone(false).insertAfter(".customerRegistration__ManagerItem:last");
        $(".customerRegistration__ManagerItem:last .chosen-container").remove();
        $(".customerRegistration__ManagerItem:last .chosen-select-280").chosen({
            width: '280px',
            disable_search: true
        });
        $(".customerRegistration__ManagerItem:last .chosen-select-search-280").chosen({
            width: '280px'
        });
        $(".customerRegistration__ManagerItem:last").find('input').val('');
        $(".customerRegistration__ManagerItem:last").find('input[type="checkbox"]').prop('checked', false);
    });

    $(document).delegate('.customerRegistration__BrandItemClose--click', 'click', function () {
        if ($('.customerRegistration__BrandItem').length > 1) {
            $(this).closest('.customerRegistration__BrandItem').remove();
        } else {
            $(this).closest('.customerRegistration__BrandItem').find('input').val('');
            $(this).closest('.customerRegistration__BrandItem').find('input[type="checkbox"]').prop('checked', false);
        }
    });

    $(document).delegate('.customerRegistration__FormsWorkClose--click', 'click', function () {
        if ($('.customerRegistration__FormsInputWorkContainer').length > 1) {
            $(this).closest('.customerRegistration__FormsInputWorkContainer').remove();
        } else {
            $(this).closest('.customerRegistration__FormsInputWorkContainer').find('select').val('').trigger("chosen:updated");
        }
    });

    $(document).delegate('.customerRegistration__ManagerItemClose--click', 'click', function () {
        if ($('.customerRegistration__ManagerItem').length > 1) {
            $(this).closest('.customerRegistration__ManagerItem').remove();
        } else {
            $(this).closest('.customerRegistration__ManagerItem').find('input').val('');
            $(this).closest('.customerRegistration__ManagerItem').find('select option').prop('selected', false).trigger("chosen:updated");
        }
    });

    $('.moderation__field--click').on('click', function () {
        $('.moderation__EditContainer').addClass('active');
    });

    $('.moderation__EditClose').on('click', function () {
        $('.moderation__EditContainer').removeClass('active');
    });

    $('.editAccountManager__Settings').on('click', function () {
        $(this).parent().find('.editAccountManager__SettingsPopup').toggleClass('active');
    });

    $('.presentationCreate__QuestionSettings').on('click', function () {
        $(this).parent().find('.presentationCreate__QuestionSettingsPopup').toggleClass('active');
    });

    $('.presentationCreate__QuestionAddItem').on('click', function () {
        $('.presentationCreate__AddQuestionPopupContainer').addClass('active');
    });

    $('.presentationCreate__AddQuestionClose').on('click', function () {
        $('.presentationCreate__AddQuestionPopupContainer').removeClass('active');
    });

    $('.presentationCreate__SlideAdd').on('click', function () {
        $('.presentationCreate__AddSlidePopupContainer').addClass('active');
    });

    $(document).delegate('.presentationCreate__SlideClose', 'click', function () {
        $(this).closest('.presentationCreate__Slide').remove();
    });

    $('.presentationCreate__AddSlideClose').on('click', function () {
        $('.presentationCreate__AddSlidePopupContainer').removeClass('active');
    });

    $('.stepsNext').on('click', function (e) {
        e.preventDefault();
        if ($('.presentationCreate__StepOne').hasClass('active')) {
            $('.presentationCreate__StepOne, .presentationCreateTabOne').removeClass('active');
            $('.presentationCreateTabOne').addClass('passed');
            $('.presentationCreate__StepTwo, .presentationCreateTabTwo').addClass('active');
        } else if ($('.presentationCreate__StepTwo').hasClass('active')) {
            $('.presentationCreate__StepTwo, .presentationCreateTabTwo').removeClass('active');
            $('.presentationCreateTabTwo').addClass('passed');
            $('.presentationCreate__StepThree, .presentationCreateTabThree').addClass('active');
        } else if ($('.presentationCreate__StepThree').hasClass('active')) {

        }
    });

    $('.stepsBack').on('click', function (e) {
        e.preventDefault();
        if ($('.presentationCreate__StepOne').hasClass('active')) {

        } else if ($('.presentationCreate__StepTwo').hasClass('active')) {
            $('.presentationCreate__StepOne, .presentationCreateTabOne').addClass('active');
            $('.presentationCreateTabOne').removeClass('passed');
            $('.presentationCreate__StepTwo, .presentationCreateTabTwo').removeClass('active');
        } else if ($('.presentationCreate__StepThree').hasClass('active')) {
            $('.presentationCreate__StepTwo, .presentationCreateTabTwo').addClass('active');
            $('.presentationCreateTabTwo').removeClass('passed');
            $('.presentationCreate__StepThree, .presentationCreateTabThree').removeClass('active');
        }
    });


    $('.tooltip').tooltipster({
        contentAsHTML: true,
        interactive: true
    });

    $('.profile__View, .customerRegistration__View').sticky({topSpacing: 20});

    $(window).on('mousemove', fullScreenHideControlsAndDescription);
    var chosenConfig = {
        '.chosen-select-235': {
            width: '235px',
            disable_search: true
        },
        '.chosen-select-270': {
            width: '270px'
        },
        '.chosen-select-280': {
            width: '280px',
            disable_search: true
        },
        '.chosen-select-search-280': {
            width: '280px'
        }
    };
    for (var selector in chosenConfig) {
        $(selector).chosen(chosenConfig[selector]);
    }
    jQuery.datetimepicker.setLocale('ru');
    $('.dateTimePicker').datetimepicker({
        dayOfWeekStart: 1,
        minDate: 0,
        timepickerScrollbar: false,
        format: 'd F Y H:i'
    });


    highcharts();
    showMoreNotifications();
    slidesAmount();
});

function showMoreNotifications() {
    if ($('.header__NotificationItem').length > 3) {
        $('.header__NotificationShowMore').addClass('active')
    }
    $('.header__NotificationItem').each(function (i, e) {
        if (i >= 3) {
            $(e).hide()
        } else {
            $(e).addClass('active')
        }
    })
}

function readURL(input, img, clss) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $(img).on('load', function () {
                if ($(this).height() < $(this).width()) {
                    $(this).addClass(clss);
                } else {
                    $(this).removeClass(clss);
                }
            }).attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function slidesAmount() {
    var number = Number($('.amountNumber').attr('data-number'));
    var all = Number($('.amountAll').attr('data-number'));
    var svgPercent = number / all * 100;
    TweenMax.set('.amountSvg path', {
        drawSVG: svgPercent + '%'
    });
}

function fullScreenHideControlsAndDescription(e) {
    if (!$('.presentationView').hasClass('fullScreen')) {
        return
    }
    clearTimeout(timeout);
    if ($('.presentationView__Description').hasClass('showed')) {
        $('.presentationView__Description').addClass('active')
    }
    $('.presentationView__Controls').addClass('active');
    timeout = setTimeout(function (args) {
        $('.presentationView__Description, .presentationView__Controls').removeClass('active');
    }, 2000)
}

function highcharts() {
    if ($('#highchartsOne').length) {
        Highcharts.chart('highchartsOne', {
            chart: {
                type: 'areaspline'
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'datetime',
                allowDecimals: false
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function () {
                        return this.value;
                    }
                }
            },
            tooltip: {
                pointFormat: '{point.y:,.0f} Просмотров'
            },
            plotOptions: {
                areaspline: {
                    pointStart: Date.UTC(2010, 0, 1),
                    pointInterval: 24 * 3600 * 1000, // one day
                    color: '#6789d2',
                    marker: {
                        enabled: false,
                        symbol: 'circle',
                        radius: 2,
                        states: {
                            hover: {
                                enabled: true
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Просмотры',
                data: [
                    2461, 2644, 2982, 2546,
                    2043, 4412, 5738, 6945, 6105, 3198, 3204, 3123, 2922, 2734, 2666
                ]
            }]
        });
    }
    if ($('#highchartsTwo').length) {
        Highcharts.chart('highchartsTwo', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec'
                ],
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: ''
                }
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                }
            },
            series: [{
                name: 'Всего пользователей',
                data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

            }, {
                name: 'Просмотрело презентацию',
                data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

            }, {
                name: 'Прошло тестирование',
                data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

            }]
        });
    }
    if ($('#highchartsThree').length) {
        Highcharts.chart('highchartsThree', {
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            xAxis: {
                categories: ['Region 1', 'Region 2', 'Region 3', 'Region 4', 'Region 5']
            },
            credits: {
                enabled: false
            },
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: ''
                },
                labels: {
                    step: 2,
                    formatter: function () {
                        return this.value + '%';
                    }
                }
            },
            tooltip: {
                valueSuffix: '%',
                padding: 8,
                backgroundColor: 'rgba(247,247,247,1)'
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Specialization 1',
                data: [20, 40, 20, 50, 10]
            }, {
                name: 'Specialization 2',
                data: [60, 40, 40, 40, 10]
            }, {
                name: 'Specialization 3',
                data: [20, 20, 40, 10, 80]
            }]
        });
    }
    if ($('#highchartsFour').length) {
        Highcharts.chart('highchartsFour', {
            chart: {
                type: 'column'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: ''
                }

            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0
                }
            },

            tooltip: {
                headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
            },
            series: [
                {
                    "name": "Slides",
                    "colorByPoint": true,
                    "data": [
                        {
                            "name": "1",
                            "y": 63
                        },
                        {
                            "name": "2",
                            "y": 11
                        },
                        {
                            "name": "3",
                            "y": 7
                        },
                        {
                            "name": "4",
                            "y": 5
                        },
                        {
                            "name": "5",
                            "y": 4
                        },
                        {
                            "name": "6",
                            "y": 1
                        },
                        {
                            "name": "Slide",
                            "y": 7
                        }
                    ]
                }
            ]
        });
    }
}