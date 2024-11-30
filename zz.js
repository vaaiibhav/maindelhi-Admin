var express = require('express');
var router = express.Router();
const knex = require('../knex');

// Get home page router
var final_day = [];
var final_night = [];
var final_morning = [];
var final_kalyan = [];
var convert_num_arr = [];
var convert_num_day = [];
var convert_num_morning = [];
var convert_num_night = [];
var convert_num_kalyan = [];
var convert_num_main = [];
var convert_num_chakri = [];

router.get('/', function (req, res, next) {
  knex('delhi_day').select('*').then(details => {
    knex('delhi_night').select('*').then(night => {
      knex('delhi_morning').select('*').then(morning => {
        knex('kalyan').select('*').then(kalyan => {
          knex('main_bajar').select('*').then(main => {
            knex('chakri_bajar').select('*').then(chakri => {
              // knex('image').select('*').then(result_img => {
              //for latest entry in DB By using orderBy
              knex('image').select('*').orderBy('id', 'desc').limit('1').then(result_img => {

                for (let i = 0; i < details.length; i++) {
                  if (details[i].lt1_25 == '' || details[i].lt1_25 == null) {
                    var temppp_l = "***"
                    // var digits_l = temppp_l.toString().split('');
                    realDigits_l = temppp_l;
                  } else {
                    var temppp_l = details[i].lt1_25;
                    var digits_l = temppp_l.toString().split('');
                    realDigits_l = digits_l.map(Number);
                  }
                  if (details[i].rt3_00 == '' || details[i].rt3_00 == null) {
                    var temppp_r = '***';
                    var realDigits_r = temppp_r;
                  } else {
                    var temppp_r = details[i].rt3_00;
                    var digits_r = temppp_r.toString().split('');
                    var realDigits_r = digits_r.map(Number);
                  }
                  var value1 = {
                    left: realDigits_l,
                    right: realDigits_r
                  }
                  final_day.push(value1);

                  var left_num = details[i].lt1_25;
                  var right_num = details[i].rt3_00;
                  var cent_l = details[i].left;
                  var cent_r = details[i].right;
                  var day_var = convert_num(left_num, right_num, cent_l, cent_r);

                  convert_num_arr.push(day_var);
                  convert_num_day.push(day_var);

                }
                for (let i = 0; i < morning.length; i++) {
                  if (morning[i].lt11_30 == '' || morning[i].lt11_30 == null) {
                    var temppp_l = "***";
                    var realDigits_l = temppp_l;
                  } else {
                    var temppp_l = morning[i].lt11_30;
                    var morning_l = temppp_l.toString().split('');
                    var realDigits_l = morning_l.map(Number);
                  }
                  if (morning[i].rt12_30 == "" || morning[i].rt12_30 == null) {
                    var temppp_r = "***";
                    var realDigits_r = temppp_r;
                  } else {
                    var temppp_r = morning[i].rt12_30;
                    var morning_r = temppp_r.toString().split('');
                    var realDigits_r = morning_r.map(Number);
                  }
                  var value1 = {
                    left: realDigits_l,
                    right: realDigits_r
                  }
                  final_morning.push(value1);

                  var left_num = morning[i].lt11_30;
                  var right_num = morning[i].rt12_30;
                  var cent_l = morning[i].left;
                  var cent_r = morning[i].right;
                  var mr_var = convert_num(left_num, right_num, cent_l, cent_r);
                  convert_num_arr.push(mr_var);
                  convert_num_morning.push(mr_var);

                }
                for (let i = 0; i < night.length; i++) {
                  if (night[i].lt8_50 == '' || night[i].lt8_50 == null) {
                    var temppp_l = "***";
                    var realDigits_l = temppp_l;
                  } else {
                    var temppp_l = night[i].lt8_50;
                    var night_l = temppp_l.toString().split('');
                    var realDigits_l = night_l.map(Number);
                  }
                    if (night[i].rt10_30 == null) {
                    var temppp_r = "***";
                    var realDigits_r = temppp_r;

                  }else{
                    var temppp_r = night[i].rt10_30;
                    var night_r = temppp_r.toString().split('');
                    var realDigits_r = night_r.map(Number);
               
                  }
               
                  var value1 = {
                    left: realDigits_l,
                    right: realDigits_r
                  }
                  console.log("RIGHT FROM NIGHT ++>",value1);
                  final_night.push(value1);

                  var left_num = night[i].lt8_50;
                  var right_num = night[i].rt10_30;
                  var cent_l = night[i].left;
                  var cent_r = night[i].right;
                  var night_var = convert_num(left_num, right_num, cent_l, cent_r);
                  convert_num_arr.push(night_var);
                  convert_num_night.push(night_var);
                }

                //for kalyan bajar
                for (let i = 0; i < kalyan.length; i++) {
                  if (kalyan[i].value1 == '' || kalyan[i].value1 == null) {
                    var temppp_l = "***";
                    var realDigits_l = temppp_l;
                  } else {
                    var temppp_l = kalyan[i].value1;
                    var kalyan_l = temppp_l.toString().split('');
                    var realDigits_l = kalyan_l.map(Number);
                  }
                  if (kalyan[i].value2 == '' || kalyan[i].value2 == null) {
                    var temppp_r = "***";
                    var realDigits_r = temppp_r;
                  }
                  else {
                    var temppp_r = kalyan[i].value2;
                    var kalyan_r = temppp_r.toString().split('');
                    var realDigits_r = kalyan_r.map(Number);
                  }
                  var kalyan_val = {
                    left: realDigits_l,
                    right: realDigits_r
                  }
                  final_kalyan.push(kalyan_val);

                  var left_num = kalyan[i].value1;
                  var right_num = kalyan[i].value2;
                  var cent_l = kalyan[i].left_no;
                  var cent_r = kalyan[i].right_no;

                  var kalyan_var = convert_num(left_num, right_num, cent_l, cent_r);
                  convert_num_kalyan.push(kalyan_var);
                }

                //for main bajar
                for (let i = 0; i < main.length; i++) {


                  var left_num = main[i].value1;
                  var right_num = main[i].value2;
                  var cent_l = main[i].left_no;
                  var cent_r = main[i].right_no;
                  var main_var = convert_num(left_num, right_num, cent_l, cent_r);
                  convert_num_main.push(main_var);
                }

                //for chakri bajar
                for (let i = 0; i < chakri.length; i++) {


                  var win_num = chakri[i].value1.toString();
                  var chakri_var = convert_chakri(win_num);
                  convert_num_chakri.push(chakri_var);
                }

                function convert_num(left_num, right_num, cent_l, cent_r) {
                  if (left_num == "" || left_num == null) {
                    left_num = "***";
                  }

                  if (right_num == "" || right_num == null) {
                    right_num = "***";
                  }
                  if (cent_l == "" || cent_l == null) {
                    cent_l = "*";
                  }
                  if (cent_r == "" || cent_r == null) {
                    cent_r = "*";
                  }


                  var bahubali = left_num + "-" + cent_l + cent_r + "-" + right_num;
                  return bahubali;
                }


                function convert_chakri(win_num) {
                  if (win_num == "") {
                    win_num = "**";
                  }
                  var bahubali = win_num;
                  return bahubali;
                }

                var bahubali = [];
                bahubali.push(convert_num_day[convert_num_day.length - 1]);
                bahubali.push(convert_num_morning[convert_num_morning.length - 1]);
                bahubali.push(convert_num_night[convert_num_night.length - 1]);
                bahubali.push(convert_num_kalyan[convert_num_kalyan.length - 1]);
                bahubali.push(convert_num_main[convert_num_main.length - 1]);
                bahubali.push(convert_num_chakri[convert_num_chakri.length - 1]);

                console.log("LOG FROM BAHUBALI ==.", bahubali);


                res.render('home_page', { details: details, value1: final_day, bahubali: bahubali, morning: morning, mornings: final_morning, night: night, nights: final_night, result_img: result_img });

              })
            })
          })
        })
      })
                  
    }).catch(error =>
      console.error("error is====>", error))
  }).catch(error =>
    console.error("error is====>", error)
  )


})


router.get('/day', function (req, res, next) {
  var final_day = [];
  knex('delhi_day').select('*').then(details => {

    for (let i = 0; i < details.length; i++) {

      var temppp_l = details[i].lt1_25;
      var digits_l = temppp_l.toString().split('');

      realDigits_l = digits_l.map(Number);
      var temppp_r = details[i].rt3_00;
      var digits_r = temppp_r.toString().split('');
      var realDigits_r = digits_r.map(Number);
      var win = details[i].left + details[i].right;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -1
        }
      } else {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -2
        }
      }

      final_day.push(value1);



    }
    console.log("valuesssssss redddddd==>", final_day);
    res.render('days_pannel', { details: details, days: final_day })
  })
})

router.get('/morning', function (req, res, next) {
  var final_morning = [];
  knex('delhi_morning').select('*').then(morning => {

    for (let i = 0; i < morning.length; i++) {
      var temppp_l = morning[i].lt11_30;
      var morning_l = temppp_l.toString().split('');
      var realDigits_l = morning_l.map(Number);
      var temppp_r = morning[i].rt12_30;
      var morning_r = temppp_r.toString().split('');
      var realDigits_r = morning_r.map(Number);
      var win = morning[i].left + morning[i].right;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -1
        }
      } else {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -2
        }
      }

      final_morning.push(value1);
      // console.log("Morninggggg=>",final_morning);

    }

    res.render('morning_pannel', { morning: morning, mornings: final_morning })
  })
})

router.get('/night', function (req, res, next) {
  var final_night = [];
  knex('delhi_night').select('*').then(night => {
    for (let i = 0; i < night.length; i++) {

      var temppp_l = night[i].lt8_50;
      var night_l = temppp_l.toString().split('');
      var realDigits_l = night_l.map(Number);
      var temppp_r = night[i].rt10_30;
      var night_r = temppp_r.toString().split('');
      var realDigits_r = night_r.map(Number);

      var win = night[i].left + night[i].right;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -1
        }
      } else {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -2
        }
      }

      final_night.push(value1);

    }

    res.render('night_pannel', { night: night, nights: final_night })
  })
})

router.get('/kalyan', function (req, res, next) {
  var kalyan_arr = [];
  knex('kalyan').select('*').then(kalyan => {

    for (let i = 0; i < kalyan.length; i++) {

      var temppp_l = kalyan[i].value1;
      var kalyan_l = temppp_l.toString().split('');
      var realDigits_l = kalyan_l.map(Number);

      var temppp_r = kalyan[i].value2;
      var kalyan_r = temppp_r.toString().split('');
      var realDigits_r = kalyan_r.map(Number);

      var win = kalyan[i].left_no + kalyan[i].right_no;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -1
        }
      } else {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -2
        }
      }

      kalyan_arr.push(value1);

    }
    res.render('kalyan_pannel', { kalyan: kalyan, abc: kalyan_arr });
  })
})


router.get('/bajar', function (req, res, next) {
  var main_arr = [];
  knex('main_bajar').select('*').then(main => {

    for (let i = 0; i < main.length; i++) {

      var temppp_l = main[i].value1;
      var main_l = temppp_l.toString().split('');
      var realDigits_l = main_l.map(Number);

      var temppp_r = main[i].value2;
      var main_r = temppp_r.toString().split('');
      var realDigits_r = main_r.map(Number);


      var win = main[i].left_no + main[i].right_no;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -1
        }
      } else {
        var value1 = {
          left: realDigits_l,
          right: realDigits_r,
          red: -2
        }
      }


      main_arr.push(value1);

      console.log("Array of main ==>", main_arr);


    }
    res.render('main_pannel', { main: main, values: main_arr, })
  })
})

router.get('/chakri', function (req, res, next) {
  var chakri_arr = [];
  knex('chakri_bajar').select('*').then(chakri => {

    for (let i = 0; i < chakri.length; i++) {

      var temppp_t = chakri[i].time;
      var temppp_d = chakri[i].date;

      var win = chakri[i].value1;
      if (win == "16" || win == "61" || win == "66" || win == "11" || win == "27" || win == "72" || win == "22" || win == "77" || win == "38" || win == "83" || win == "33" || win == "88" || win == "49" || win == "94" || win == "44" || win == "99" || win == "50" || win == "05" || win == "00" || win == "55") {
        var value1 = {
          left: temppp_t,
          right: temppp_d,
          red: -1
        }
      } else {
        var value1 = {
          left: temppp_t,
          right: temppp_d,
          red: -2
        }
      }
      chakri_arr.push(value1);


    }
    res.render('chakri_pannel', { chakri: chakri, val: chakri_arr })
  })
})


module.exports = router;
