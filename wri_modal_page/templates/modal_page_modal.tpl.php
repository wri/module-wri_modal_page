<?php

/**
 * @file
 * Default theme implementation for modal.
 *
 * Available variables:
 * - $title: The title of modal.
 * - $text: The text of modal.
 * - $button: The button label of modal.
 */

// grabbing the file location of the background image
$img_file_location = variable_get('modal_page_file_location', '');

// grabbing the modal name for cookie and google analytics event action naming
$modal_name = variable_get('modal_page_modal_name', '');
$modal_name = preg_replace('@[^a-z0-9-]+@','-', strtolower($modal_name));

// grabbing the cookie expiration value
$modal_exp = variable_get('modal_page_cookie_exp', '30');
$modal_exp = intval($modal_exp);
  if ($modal_exp < 1) {
    $modal_exp = 1;
  }
  else if ($modal_exp > 30) {
    $modal_exp = 30;
  }

// grabbing module file path
$path_modal_page = drupal_get_path('module', 'modal_page');

?>

<script>

  // setting some vars to pass to the modal_page.js script below 
  var modalName = "<?php print $modal_name; ?>";
  var modalExp = <?php print $modal_exp; ?>;

</script>
<script type="text/javascript" src="/<?php print $path_modal_page; ?>/js/modal_page.js"></script>
<script>

/**
 * tally() function ensures that the nested html structure doesn't result in
 * counting onclick as multiple events (i.e. the 'button' onclick was also 
 * triggering the 'fade dismiss' onclick)
 */

  var xTally;

  function tally(tallyType) {
	  
    if (tallyType == 1) {
      ga('send','event','modal','donate','modal-<?php print $modal_name; ?>');
      console.log("tally is donate");
      xTally = true;
      console.log("xTally is " + xTally);

    }
    else if (tallyType == 2) {
      ga('send','event','modal','dismiss-x','modal-<?php print $modal_name; ?>');
      console.log("tally is dismiss x");
      xTally = true;
      console.log("xTally is " + xTally);

    }
    else if (tallyType == 3 && xTally != true)  {
      ga('send','event','modal','dismiss-fade','modal-<?php print $modal_name; ?>');
      console.log("tally is dismiss fade");
      console.log("xTally is " + xTally);
    }

  }

</script>

  <div class="modal fade" id="js-modal-page-show-modal" role="dialog" onClick="tally('3')">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" onClick="tally('2')" data-dismiss="modal">&times;</button>
          <h4 class="modal-title"><?php print $title; ?></h4>
        </div>
        <div class="modal-body">
	  <p><?php // print $text; ?>
            <a href="/donate-now" onClick="tally('1')"><img id="givingImage" src="<?php print $img_file_location; ?>"></a>
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" onClick="tally('1')" data-dismiss="modal"><?php print $button; ?></button>
        </div>
      </div>
    </div>
  </div>
