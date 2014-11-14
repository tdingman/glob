

<link rel="stylesheet" href="https://ssl.gstatic.com/docs/script/css/add-ons.css">
<!-- The CSS package above applies Google styling to buttons and other elements. -->

<style>
.branding-below {
  bottom: 54px;
  top: 0;
}

.branding-text {
  left: 7px;
  position: relative;
  top: 3px;
}

.logo {
  vertical-align: middle;
}

.width-100 {
  width: 100%;
  box-sizing: border-box;
  -webkit-box-sizing : border-box;‌
  -moz-box-sizing : border-box;
}

label {
  font-weight: bold;
}

#creator-options,
#respondent-options {
  background-color: #eee;
  border-color: #eee;
  border-width: 5px;
  border-style: solid;
  display: none;
}

#creator-email,
#respondent-email,
#button-bar {
  margin-bottom: 10px;
}

#response-step {
  display: inline;
}

</style>

<div class="sidebar branding-below">
  <form>
    <h3>Send Doc as Letter</h3>
    <div class="block form-group" id="creator-options">
        <h3>Lob Settings</h3>
            <label for="api-key">
                API Key
            </label>
            <input class="width-100" id="api-key">
         </div>
            

    <div class="block form-group" id="creator-options">
      <h3>From</h3>
      <label for="sender-name">
        Name
      </label>
      <input class="width-100" id="sender-name">
      <label for="sender-address">
        Address
      </label>
      <input class="width-100" id="sender-address">
      <label for="sender-city">
        City
      </label>
      <input class="width-100" id="sender-city">
      <label for="sender-state">
        State
      </label>
      <input class="width-100" id="sender-state">
      <label for="sender-zip">
        Zip
      </label>
      <input class="width-100" id="sender-zip">
    </div>

    <div class="block form-group" id="creator-options">
      <h3>To</h3>
      <label for="recipient-name">
        Name
      </label>
      <input class="width-100" id="sender-name">
      <label for="recipient-address">
        Address
      </label>
      <input class="width-100" id="sender-address">
      <label for="recipient-city">
        City
      </label>
      <input class="width-100" id="recipient-city">
      <label for="recipient-state">
        State
      </label>
      <input class="width-100" id="recipient-state">
      <label for="recipient-zip">
        Zip
      </label>
      <input class="width-100" id="recipient-zip">
    </div>

    <div class="block" id="button-bar">
      <button class="action" id="send-letter">Send</button>
    </div>
  </form>
</div>

<div class="sidebar bottom">
  <img alt="Add-on logo" class="logo" width="25"
      src="https://googledrive.com/host/0B0G1UdyJGrY6XzdjQWF4a1JYY1k/form-notifications-logo-small.png">
  <span class="gray branding-text">Form Notifications by Google</span>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js">
<script src="https://raw.githubusercontent.com/mikesteele/lob-google-doc/master/lob-browserify.min.js">
</script>
<script>
  /**
   * On document load, assign required handlers to each element,
   * and attempt to load any saved settings.
   */
  $(function() {
    $('#send-letter').click(saveSettingsToServer);
  });



  /**
   * Collects the options specified in the add-on sidebar and sends them to
   * be saved as Properties on the server.
   */
  function saveSettingsToServer() {
      this.disabled = true;
      $('#status').remove();
      if (Lob) {
          var from = {};
          from.name = $("#sender-name").val();
          from.address = $("#sender-address").val();
          from.city = $("#sender-city").val();
          from.state = $("#sender-state").val();
          from.zip = $("#sender-zip").val();
          var to = {};
          to.name = $("#sender-name").val();
          to.address = $("#sender-address").val();
          to.city = $("#sender-city").val();
          to.state = $("#sender-state").val();
          to.zip = $("#sender-zip").val();
          if (!to.name || !to.address || !to.city || !to.state || !to.zip ||
              !sender.name || !sender.address || !sender.city || !sender.state ||
              !sender.zip) {
              showStatus('All fields must be filled!', $('#button-bar'));
              this.disabled = false;
              return;
          }
          var object = {};
          var this_id = DocumentApp.getActiveDocument().getId();
          object.file = DocsList.getFileById(this_id).getAs(
              'application/pdf');
          var setting_id = 100;
      } else {
          var api_key = $("#sender-name").val();
          if (api_key) {
              Lob = new lobFactory(api_key);
          } else {
              showStatus('All fields must be filled!', $('#button-bar'));
              return;
          }
      }
  }
  /**
   * Inserts a div that contains an status message after a given element.
   *
   * @param {String} msg The status message to display.
   * @param {Object} element The element after which to display the Status.
   */
  function showStatus(msg, element) {
     var div = $('<div>')
         .attr('id', 'status')
         .attr('class','error')
         .text(msg);
    $(element).after(div);
  }
</script>


