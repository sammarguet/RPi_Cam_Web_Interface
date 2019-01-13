<?php
   define('BASE_DIR', dirname(__FILE__));
   //
   // code for pipan
   //
   if(isset($_GET["pan"])) {
      if(is_numeric($_GET["pan"])) {
         if(is_numeric($_GET["tilt"])) {
           $pan = round($min_pan + (($max_pan - $min_pan)/200*$_GET["pan"]));
           $tilt = round($min_tilt + (($max_tilt - $min_tilt)/200*$_GET["tilt"]));
           $pipe = fopen("FIFO_doorlight","w");
           fwrite($pipe, "servo $pan $tilt ");
           fclose($pipe);
           file_put_contents("pipan_bak.txt", $_GET["pan"] . " " . $_GET["tilt"]);
         }
      }
   }
 
   if(isset($_GET["onled"]))
   {
    $pipe = fopen("FIFO_doorlight","w");
    fwrite($pipe, "onled" . " ");
    fclose($pipe);
   }
 
?>
