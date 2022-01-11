const constants = JSON.parse($('#constants').val());

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
    let options = { expiresIn: `${expiryTime}${expiryUnit}` };
    let data = { payload: payload, secretKey: secretKey, options }
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: `http://${constants.HOST}/api/v1/jwt/sign`,
        data: data,
        success: (data) => {
            $('#tokenTextArea').html(data.token);
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
        url: `http://${constants.HOST}:${constants.PORT}/api/v1/jwt/verify`,
        data: data,
        success: (data) => {
            document.getElementById("payload").textContent = JSON.stringify(data.decoded, undefined, 2);
        },
        error: (error) => {
            console.log('Error: ', { message: error.name, message: error.message });
        }
    });
});

$(document).ready(function () {
    var count = 0, max = 10;
    $('.addInput').click(function () {
        if (count < max) {
            count++;
            var HTML = '<div class="row"><div class="col-md-5"><div class="form-group"><input type="text" id="key[]" class="form-control"/></div></div><div class="col-md-5"><div class="form-group"><input type="text" id="value[]" class="form-control"/></div></div><div class="col-md-2"><a href="javascript:void(0);" class="removeInput form-control btn btn-danger">-</a></div></div>';
            $('.appendInput').append(HTML);
        }
    });

    $('.appendInput').on('click', '.removeInput', function () {
        $(this).closest('div.row').remove();
        count--;
    });
});