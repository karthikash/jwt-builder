const constants = JSON.parse($("#constants").val());

const successHTML = `
  <div class="d-flex mb-3">
    <div class="flex-fill me-3">
      <label for="payload" class="form-label">Payload</label>
      <pre id="payload" class="bg-light p-3 border rounded"></pre>
    </div>
    <div class="flex-fill">
      <label for="header" class="form-label">Header</label>
      <pre id="header" class="bg-light p-3 border rounded"></pre>
    </div>
  </div>`;

const errorHTML = `
  <div class="col-12 mb-3">
    <label for="error" class="form-label">Error</label>
    <pre id="error" class="bg-danger text-white p-3 border rounded"></pre>
  </div>`;

const inputHTML = `
  <div class="row g-3 align-items-center pt-3">
    <div class="col-lg-5">
      <div class="form-group">
        <input type="text" id="key[]" class="form-control" placeholder="Key" />
      </div>
    </div>
    <div class="col-lg-5">
      <div class="form-group">
        <input type="text" id="value[]" class="form-control" placeholder="Value" />
      </div>
    </div>
    <div class="col-lg-2">
      <a href="javascript:void(0);" class="removeInput btn btn-danger w-100">-</a>
    </div>
  </div>`;

const generateForm = document.querySelector("#generate-form");
generateForm.addEventListener("submit", (e) => {
  var payload = {};
  var keyArray = $("input[id^='key']");
  var valueArray = $("input[id^='value']");
  var a = keyArray
    .map((i, e) => {
      return $(e).val();
    })
    .get();
  var b = valueArray
    .map((i, e) => {
      return $(e).val();
    })
    .get();
  for (i = 0; i < a.length; i++) {
    payload[`${a[i]}`] = b[i];
  }
  let secretKey = generateForm.elements["secretKey"].value;
  let expiryTime = generateForm.elements["expiryTime"].value;
  let expiryUnit = generateForm.elements["expiryUnit"].value;
  let algorithm = generateForm.elements["algorithm"].value;
  let options = {
    algorithm: algorithm,
    expiresIn: `${expiryTime}${expiryUnit}`,
  };
  let data = { payload: payload, secretKey: secretKey, options };
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: `http://${constants.HOST}/api/v1/jwt/sign`,
    data: data,
    success: (data) => {
      $("#tokenTextArea").html(data.token);
      document.getElementById("generate-form").reset();
    },
    error: (error) => {
      console.log("Error: ", { message: error.name, message: error.message });
    },
  });
});

const verifyForm = document.querySelector("#verify-form");
verifyForm.addEventListener("submit", (e) => {
  let token = verifyForm.elements["encodedToken"].value;
  let secretKey = verifyForm.elements["encodedSecretKey"].value;
  let data = { token: token, secretKey: secretKey };
  e.preventDefault();
  $.ajax({
    type: "POST",
    url: `http://${constants.HOST}/api/v1/jwt/verify`,
    data: data,
    success: (data) => {
      $("#res-verify").html(successHTML);
      document.getElementById("payload").textContent = JSON.stringify(
        data.decoded.payload,
        undefined,
        2
      );
      document.getElementById("header").textContent = JSON.stringify(
        data.decoded.header,
        undefined,
        2
      );
      document.getElementById("verify-form").reset();
    },
    error: (error) => {
      $("#res-verify").html(errorHTML);
      document.getElementById("error").textContent = JSON.stringify(
        error.responseJSON,
        undefined,
        2
      );
      document.getElementById("verify-form").reset();
    },
  });
});

$(document).ready(function () {
  var count = 0,
    max = 10;
  $(".addInput").click(function () {
    if (count < max) {
      count++;
      $(".appendInput").append(inputHTML);
    }
  });

  $(".appendInput").on("click", ".removeInput", function () {
    $(this).closest("div.row").remove();
    count--;
  });
});
