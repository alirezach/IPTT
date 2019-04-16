/**
 *  a function to calculate object
 * @param PriceString
 * @param Unit
 * @param options
 * @returns {*}
 * @constructor
 */
var LifeTimeCalculator = function (PriceString, Unit, options) {
    console.log(PriceString);
    if (PriceString.indexOf(',') < 0) {
        return PriceString;
    }
    var price = toEnglishDigits(PriceString.replace(/[, ]/g, ''));

    //Affect Rial Calculator
    if (Unit === "Rial") {
        price /= 10;
    }
    var hour = Math.floor(price / options.hourly_wages);
    var minute = (price / options.hourly_wages) - hour;
    if (options.daily === 1) {
        var CalculatedDays = Math.round((price / options.hourly_wages) / options.daily_hours * 100) / 100;
        if (CalculatedDays > 30) {
            return toPersianDigits(Math.floor(CalculatedDays / 30)) + " ماه و " + toPersianDigits(Math.round(CalculatedDays % 30)) + "روز";
        }
        return toPersianDigits(CalculatedDays) + " روز ";
    }
    return toPersianDigits(hour) + ":" + toPersianDigits(Math.round(minute * 60)) + "ساعت کار";
};

var CalculateLifeTimeAction = function () {
    //Check for storage
    if (chrome === undefined || chrome.storage === undefined) {
        return;
    }
    chrome.storage.sync.get(['hourly_wages', 'daily_hours', 'is_active', 'daily', 'show_popup'], function (result) {
        if (result.is_active !== undefined && result.is_active === 0) {
            return;
        }
        if (result.hourly_wages === undefined) {
            return;
        }

        /**
         * DigiKala Actions
         */

        if (window.location.href.indexOf('www.digikala.com') > -1) {

            //Ware pages
            $('.js-price-value,del').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).text(), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).text(), "Toman", result));
                }
            });

            //Sub Slider
            $('.c-price__value:not(.js-variant-price)').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).text(), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).text(), "Toman", result));
                }
            });

            //Main Slider
            $('.c-discount__price--original,.c-discount__price--now').each(function () {
                if (!result.show_popup) {
                    $(this).find('span').remove();
                }
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).text(), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).text(), "Toman", result));
                }
            });

            //Special Slider
            $('.c-promo-single__price,.c-promo-single__discount').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).text(), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).text(), "text", result));
                }
            });
            if (!result.show_popup) {
                //Clear Toman
                $('.c-price__currency').each(function () {
                    $(this).remove()
                });
            }
            return;
        }

        /**
         * Bamilo Actions
         */

        if (window.location.href.indexOf('www.bamilo.com') > -1) {
            NumberRegex = /^(([۰-۹]{1,3})[,]){1,3}/gm;
            //Replace all and remove Rial
            $('span').each(function () {
                if (!result.show_popup && $(this).html() === 'ریال') {
                    $(this).remove()
                }
                if (NumberRegex.exec($(this).html()) !== null) {
                    if (result.show_popup) {
                        if ($(this).data('iptt') === undefined) {
                            $(this).data('iptt', LifeTimeCalculator($(this).html(), "Rial", result));
                        }
                    } else {
                        $(this).html(LifeTimeCalculator($(this).html(), "Rial", result));
                    }
                }
            });
            return;
        }

        /**
         * SnaapFood
         */

        if (window.location.href.indexOf('snappfood.ir') > -1) {
            if (!result.show_popup) {
                //Remove Toman
                $('.kk-price-unit,.price-unit').each(function () {
                    $(this).html('');
                });
            }

            //Resturant Menu
            $('.kk-price,.price-value').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html().replace(/[,،]/g, ','), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html().replace(/[,،]/g, ','), "Toman", result));
                }
            });
            return;
        }

        /**
         * www.reyhoon.com
         */

        if (window.location.href.indexOf('www.reyhoon.com') > -1) {
            if (!result.show_popup) {
                //Remove Toman
                $('span[itemprop=priceCurrency]').each(function () {
                    $(this).html('');
                });
            }

            //Resturant Menu
            $('p[itemprop=price]').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html(), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html(), "Toman", result));
                }
            });
            return;
        }

        /**
         * Emalls.ir
         */

        if (window.location.href.indexOf('emalls.ir') > -1) {

            $('.price,.shop-price,[itemscope=itemscope]>span').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html(), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html(), "Toman", result));
                }
            });
            if (!result.show_popup) {
                $('[itemscope=itemscope]').each(function () {
                    $(this).html($(this).html().replace('تومان', ''));
                });
                //Remove Toman
                $('span').each(function () {
                    if ($(this).html().indexOf('تومان') > -1) {
                        $(this).html('');
                    }
                });
            }
            return;
        }

        /**
         * digistyle.com
         */

        if (window.location.href.indexOf('digistyle.com') > -1) {
            //All Products
            $('.old-price span,.sb-old-price,.amount,.sb-osm-discount,.normal-price').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html().replace('تومان', ''), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html().replace('تومان', ''), "Toman", result));
                }
            });
            if (!result.show_popup) {
                //Remove Toman
                $('.currency').each(function () {
                    if ($(this).html().indexOf('تومان') > -1) {
                        $(this).html('');
                    }
                });
            }
            return;
        }

        /**
         * Bama.ir
         */

        if (window.location.href.indexOf('bama.ir') > -1) {
            //All Ads page
            $('span[itemprop=price]').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html().replace('تومان', ''), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html().replace('تومان', ''), "Toman", result));
                }
            });
            if (!result.show_popup) {
                $('span[itemprop=priceCurrency]').each(function () {
                    $(this).html('');
                });
            }
            return;
        }

        /**
         * Divar.ir
         */

        if (window.location.href.indexOf('divar.ir') > -1) {
            PriceItems = $(".item div.value");
            //Single Ad page
            if (PriceItems.length > 0) {
                PriceItems.each(function () {
                    if ($(this).html().indexOf('تومان') > -1) {
                        if (result.show_popup) {
                            if ($(this).data('iptt') === undefined) {
                                $(this).data('iptt', LifeTimeCalculator($(this).html().replace(/[٫]/g, ',').replace('تومان', ''), "Toman", result));
                            }
                        } else {
                            $(this).html(LifeTimeCalculator($(this).html().replace(/[٫]/g, ',').replace('تومان', ''), "Toman", result));
                        }
                    }
                });
            }


            //All Ads page
            $('.price>span>label').each(function () {
                if ($(this).html().indexOf('تومان') > -1) {
                    Slice = $(this).html().split(':');

                    if (result.show_popup) {
                        if ($(this).data('iptt') === undefined) {
                            $(this).data('iptt', Slice[0] + LifeTimeCalculator(Slice[1].replace(/[٫]/g, ',').replace('تومان', ''), "Toman", result));
                        }
                    } else {
                        $(this).html(Slice[0] + LifeTimeCalculator(Slice[1].replace(/[٫]/g, ',').replace('تومان', ''), "Toman", result));
                    }
                }
            });
            return;
        }

        /**
         * Banimode.com
         */

        if (window.location.href.indexOf('www.banimode.com') > -1) {
            //All Products
            $('span.price.persian,span.price.old.persian').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html().replace('تومان', ''), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html().replace('تومان', ''), "Toman", result));
                }
            });
            return;
        }

        /**
         * Shixon.com
         */

        if (window.location.href.indexOf('www.shixon.com') > -1) {
            //Main page
            $('.price2,.price1').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html().replace('تومان', ''), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html().replace('تومان', ''), "Toman", result));
                }
            });
            $('.ProductPrice2').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html().replace('تومان', ''), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html().replace('تومان', ''), "Toman", result));
                }
            });
            $('.ProductPrice').each(function () {

                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        ExplodeDashes = $(this).html().split('-');
                        Out = [];
                        for (i = ExplodeDashes.length - 1; i >= 0; i--) {
                            Out.push(LifeTimeCalculator(ExplodeDashes[i].replace('تومان', ''), "Toman", result));
                        }
                        $(this).data('iptt', Out.join('-'));
                    }
                } else {
                    ExplodeDashes = $(this).html().split('-');
                    Out = [];
                    for (i = ExplodeDashes.length - 1; i >= 0; i--) {
                        Out.push(LifeTimeCalculator(ExplodeDashes[i].replace('تومان', ''), "Toman", result));
                    }
                    $(this).html(Out.join('-'));
                }


            });
            //Product Page
            $('span[itemprop=price],.ProductPriceSale').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html(), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html(), "Toman", result));
                }
            });
            if (!result.show_popup) {
                $('.productPriceHolder .ProdunctSmall,span.ProdunctSmall2').each(function () {
                    $(this).html('');
                });
            }
            return;
        }

        /**
         * modiseh.com
         */

        if (window.location.href.indexOf('modiseh.com') > -1) {
            //All Products
            $('.price>span,.price>p,.price>s').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html().replace(/٫/g, ',').replace('ریال', ''), "Rial", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html().replace(/٫/g, ',').replace('ریال', ''), "Rial", result));
                }
            });
            return;
        }

        /**
         * torob.com
         */

        if (window.location.href.indexOf('torob.com') > -1) {

            $('.price').each(function () {
                var InnerHtml = $(this).html().replace(/[٬]/g, ',');
                var From = "";
                if (InnerHtml.indexOf('از') > -1) {
                    From = "از ";
                    InnerHtml = InnerHtml.replace("از", '').replace('تومان', '').replace('<!-- -->', '')
                }
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', From + LifeTimeCalculator(InnerHtml, "Toman", result));
                    }
                } else {
                    $(this).html(From + LifeTimeCalculator(InnerHtml, "Toman", result));
                }
            });
            $('.price-tag span').each(function () {
                if (result.show_popup) {
                    if ($(this).data('iptt') === undefined) {
                        $(this).data('iptt', LifeTimeCalculator($(this).html().replace(/[٬]/g, ','), "Toman", result));
                    }
                } else {
                    $(this).html(LifeTimeCalculator($(this).html().replace(/[٬]/g, ','), "Toman", result));
                }
            });
        }

    });
};

$(document).ready(function () {
    var Body = $('body');

    //Digikala event listeners
    if (window.location.href.indexOf('www.digikala.com') > -1) {
        Body.delegate('[data-event=config_change]', 'click', function () {
            setTimeout(CalculateLifeTimeAction, 1200)
        });
        Body.delegate('.c-pager__item', 'click', function () {
            setTimeout(CalculateLifeTimeAction, 1200)
        });
        Body.delegate('input[type=checkbox]', 'change', function () {
            setTimeout(CalculateLifeTimeAction, 2000)
        });
        Body.delegate('[data-sort]', 'click', function () {
            setTimeout(CalculateLifeTimeAction, 2000)
        });
    }

    //Bamilo event listeners
    if (window.location.href.indexOf('www.bamilo.com') > -1) {
        Body.delegate('span,a', 'click', function () {
            setTimeout(CalculateLifeTimeAction, 1200)
        });
    }

    //Banimode event listeners
    if (window.location.href.indexOf('www.banimode.com') > -1) {
        Body.delegate('.bani-select-wrapper', 'click', function () {
            setTimeout(CalculateLifeTimeAction, 100)
        });
    }

    //Reyhoon event listeners
    if (window.location.href.indexOf('www.reyhoon.com') > -1) {
        Body.delegate('span,a', 'click', function () {
            setTimeout(CalculateLifeTimeAction, 1200)
        });
    }

    //Torob event listeners
    if (window.location.href.indexOf('torob.com') > -1) {
        Body.delegate('span,a', 'click', function () {
            setTimeout(CalculateLifeTimeAction, 1200)
        });
    }

    //Initialize
    setTimeout(CalculateLifeTimeAction, 1200);

    //Check interval for xhr|lazy load actions
    setInterval(CalculateLifeTimeAction, 7777);
});
