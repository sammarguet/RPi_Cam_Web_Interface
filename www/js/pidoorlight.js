// mode=1 pipan, 2=servoblaster
var mode = 0;

var pan = 100;
var tilt = 100;
var cmd = "";
var pan_bak = 100;
var tilt_bak = 100;
var pan_start;
var tilt_start;
var touch = false;
var led_stat = false;
var ajax_pidoorlight;
var pipan_mouse_x;
var pipan_mouse_y;
 
document.onkeypress = pidoorlight_onkeypress;
 
if(window.XMLHttpRequest) {
  ajax_pidoorlight = new XMLHttpRequest();
}
else {
  ajax_pidoorlight = new ActiveXObject("Microsoft.XMLHTTP");
}
ajax_pidoorlight.onreadystatechange = ajax_pidoorlight_done;
 
function ajax_pidoorlight_done() {
  if(ajax_pidoorlight.readyState == 4) {
    if(touch) {
      if((pan_bak != pan) || (tilt_bak != tilt)) {
        ajax_pidoorlight_start();
      }
      else {
        setTimeout("ajax_pidoorlight_done()", 100);
      }
    }
  }
}
 
function ajax_pidoorlight_start () {
     ajax_pidoorlight.open("GET","pidoorlight.php?action=" + cmd, true);
     
  if (mode != 0)
     ajax_pidoorlight.send();
  
  pan_bak = pan;
  tilt_bak = tilt;
}
 
function led_switch () {
 
  if(!led_stat) {
    led_stat = true;
    ajax_pidoorlight.open("GET","pidoorlight.php?red=" + document.getElementById("pilight_r").value + "&green=" + document.getElementById("pilight_g").value + "&blue=" + document.getElementById("pilight_b").value, true);
    ajax_pidoorlight.send();
  }
  else {
    led_stat = false;
    ajax_pidoorlight.open("GET","pidoorlight.php?red=0&green=0&blue=0", true);
    ajax_pidoorlight.send();
  }
 
}
 
function pidoorlight_onkeypress (e) {
 
  if(e.keyCode == 97) servo_left();
  else if(e.keyCode == 119) servo_up();
  else if(e.keyCode == 100) servo_right();
  else if(e.keyCode == 115) servo_down();
  else if(e.keyCode == 102) led_switch();
 
}
 
function pipan_start () {
 
  pipan_mouse_x = null;
  pipan_mouse_y = null;
  pan_start = pan;
  tilt_start = tilt;
  document.body.addEventListener('touchmove', pipan_move, false)
  document.body.addEventListener('touchend', pipan_stop, false)
  touch = true;
  ajax_pidoorlight_start();
 
}
 
function pipan_move (e) {
 
  var ev = e || window.event;
 
  if(pipan_mouse_x == null) {
    pipan_mouse_x = e.changedTouches[0].pageX;
    pipan_mouse_y = e.changedTouches[0].pageY;
  }
  mouse_x = e.changedTouches[0].pageX;
  mouse_y = e.changedTouches[0].pageY;
  e.preventDefault()
 
  var pan_temp = pan_start + Math.round((mouse_x-pipan_mouse_x)/5);
  var tilt_temp = tilt_start + Math.round((pipan_mouse_y-mouse_y)/5);
  if(pan_temp > 200) pan_temp = 200;
  if(pan_temp < 0) pan_temp = 0;
  if(tilt_temp > 200) tilt_temp = 200;
  if(tilt_temp < 0) tilt_temp = 0;
 
  pan = pan_temp;
  tilt = tilt_temp;
 
}
 
 
function pipan_stop () {
 
  document.body.removeEventListener('touchmove', pipan_move, false)
  document.body.removeEventListener('touchend', pipan_stop, false)
  touch = false;
  
}