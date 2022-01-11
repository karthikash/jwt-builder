const constants = JSON.parse($('#constants').val());

const successHTML = '<div class="form-group col-md-6 col-sm-6 col-xs-6"> <label for="payload">Payload</label> <pre id="payload"></pre></div><div class="form-group col-md-6 col-sm-6 col-xs-6"> <label for="header">Header</label> <pre id="header"></pre></div>';
const errorHTML = '<div class="form-group col-md-12 col-sm-12 col-xs-12"> <label for="error">Error</label> <pre id="error"></pre></div>';
const inputHTML = '<div class="row"> <div class="col-md-5 col-sm-5 col-xs-5"> <div class="form-group"> <input type="text" id="key[]" class="form-control"/> <small><i>key</i></small> </div></div><div class="col-md-5 col-sm-5 col-xs-5"> <div class="form-group"> <input type="text" id="value[]" class="form-control"/> <small><i>value</i></small> </div></div><div class="col-md-2 col-sm-2 col-xs-2"> <a href="javascript:void(0);" class="removeInput form-control btn btn-danger">-</a> <small><i>remove</i></small> </div></div>';

const generateForm = document.querySelector('#generate-form');
generateForm.addEventListener('submit', (e) => {
    var payload = {};
    var keyArray = $("input[id^='key']");
    var valueArray = $("input[id^='value']");
    var a = keyArray.map((i, e) => { return $(e).val(); }).get();
    var b = valueArray.map((i, e) => { return $(e).val(); }).get();
    for (i = 0; i < a.length; i++) {
        payload[`${a[i]}`] = b[i];
    }
    let secretKey = generateForm.elements['secretKey'].value;
    let expiryTime = generateForm.elements['expiryTime'].value;
    let expiryUnit = generateForm.elements['expiryUnit'].value;
    let algorithm = generateForm.elements['algorithm'].value;
    let options = {
        algorithm: algorithm,
        expiresIn: `${expiryTime}${expiryUnit}`
    };
    let data = { payload: payload, secretKey: secretKey, options }
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: `http://${constants.HOST}/api/v1/jwt/sign`,
        data: data,
        success: (data) => {
            $('#tokenTextArea').html(data.token);
            document.getElementById('generate-form').reset();
        },
        error: (error) => {
            console.log('Error: ', { message: error.name, message: error.message });
        }
    });
});

const verifyForm = document.querySelector('#verify-form');
verifyForm.addEventListener('submit', (e) => {
    let token = verifyForm.elements['encodedToken'].value;
    let secretKey = verifyForm.elements['encodedSecretKey'].value;
    let data = { token: token, secretKey: secretKey }
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: `http://${constants.HOST}/api/v1/jwt/verify`,
        data: data,
        success: (data) => {
            $('#res-verify').html(successHTML);
            document.getElementById("payload").textContent = JSON.stringify(data.decoded.payload, undefined, 2);
            document.getElementById("header").textContent = JSON.stringify(data.decoded.header, undefined, 2);
            document.getElementById('verify-form').reset();
        },
        error: (error) => {
            $('#res-verify').html(errorHTML);
            document.getElementById("error").textContent = JSON.stringify(error.responseJSON, undefined, 2);
            document.getElementById('verify-form').reset();
        }
    });
});

$(document).ready(function () {
    var count = 0, max = 10;
    $('.addInput').click(function () {
        if (count < max) {
            count++;
            $('.appendInput').append(inputHTML);
        }
    });

    $('.appendInput').on('click', '.removeInput', function () {
        $(this).closest('div.row').remove();
        count--;
    });
});