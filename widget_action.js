function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
            url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function toJSON() {
    var s = $("input, textarea");
    var ss = [];
    var obj = {};
    for (let i = 0; i < s.length; i++) {
        let class_list = s[i].classList;
        for (let j = 0; j < class_list.length; j++) {
            if (class_list[j].match(/i_.*_.*/i) !== null) {
                obj[class_list[j]] = {
                    'value': document.getElementsByClassName(class_list[j])[0].value,
                    'name': document.getElementsByClassName(class_list[j])[0].name
                }
            }
        }
    }
    console.log(obj);
    let filename = prompt("File name");
    if (filename)
        download(JSON.stringify(obj), filename, "text/plain");
}

function fromJSON(oobj) {
    var obj = oobj;
    //if (typeof (oobj) === String) 
    obj = JSON.parse(oobj);
    //else if (typeof (oobj) !== Object) return;
    var keys = Object.keys(obj);
    //console.log(obj);
    for (let i = 0; i < keys.length; i++) {
        try {
            console.log("Filling element '" + keys[i] + "'");
            let aa = document.getElementsByClassName(keys[i])[0];
            if (aa) aa.value = obj[keys[i]]['value'];
        } catch{
            console.log("Failed at '" + keys[i] + "'");
        }
    }
    $('#challan_value').trigger("change");
    $('.st_gstin_val').trigger("change");
    $('.bt_gstin_val').trigger("change");
}
var openFile = function (event) {
    var input = event.target;

    var reader = new FileReader();
    reader.onload = function () {
        var text = reader.result;
        //var node = document.getElementById('output');
        //node.innerText = text;
        fromJSON(text.replace(/(?:\\[rn])+/g, ''));
        //console.log(text);
    };
    reader.readAsText(input.files[0]);
};

function ntow(num) {
    if (typeof num !== 'number') throw 'not a number';
    n = parseInt(num);
    m = (num - n).toFixed(2) * 100; // now m will be exactly 2 number wide
    keys = []; // this variables will contanins words like twenty one , fourty four etc.
    res = ''; // resulting string 
    // defining some words
    var a = [
        '', 'one', 'two', 'three', 'four', 'five', 'six',
        'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen',
        'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'ninteen'
    ];
    var b = [
        '', 'twenty', 'thirty', 'fourty', 'fiftey',
        'sixtey', 'seventy', 'eighty', 'ninety'
    ];
    var c = [
        'thousands', 'lakhs', 'crores'
    ]

    function getTwoDigitsString(nn) {
        let d = parseInt(nn % 100);
        if (a[d] === undefined)
            return (b[(d - d % 10) / 10 - 1] + ' ' + a[d % 10]);
        else return (a[d]);
    }

    /**
     * first convert to paisa 
     */
    keys.push("paisa only");
    keys.push(getTwoDigitsString(m) === '' ? 'zero' : getTwoDigitsString(m));
    keys.push('and');

    /**
     * now intreprete last 3 digits
     */

    keys.push(getTwoDigitsString(n));
    if ((n = parseInt(n / 100), n) !== 0) {
        let s = getTwoDigitsString(n % 10);
        if (s !== '') {
            keys.push('hundred');
            keys.push(s);
        }
        n = parseInt(n / 10);
    }
    // now intreprete further 
    if (n !== 0) {
        for (let i = 0; ; i++) {
            //if(i % 3){
            keys.push(c[i % 3]);
            keys.push(getTwoDigitsString(n));
            //}
            if ((n = parseInt(n / 100), n) === 0) break;
        }
    }
    keys.push('Rupees');

    for (let i = keys.length - 1; i >= 0; i--) res += keys[i] + (keys[i] === '' ? '' : ' ');
    return res;
}

function state_from_code(n) {
    var state;
    switch (n) {
        case 1: state = 'JAMMU AND KASHMIR'; break;
        case 2: state = 'HIMACHAL PRADESH'; break;
        case 3: state = 'PUNJAB'; break;
        case 4: state = 'CHANDIGARH'; break;
        case 5: state = 'UTTARAKHAND'; break;
        case 6: state = 'HARYANA'; break;
        case 7: state = 'DELHI'; break;
        case 8: state = 'RAJASTHAN'; break;
        case 9: state = 'UTTAR  PRADESH'; break;
        case 10: state = 'BIHAR'; break;
        case 11: state = 'SIKKIM'; break;
        case 12: state = 'ARUNACHAL PRADESH'; break;
        case 13: state = 'NAGALAND'; break;
        case 14: state = 'MANIPUR'; break;
        case 15: state = 'MIZORAM'; break;
        case 16: state = 'TRIPURA'; break;
        case 17: state = 'MEGHLAYA'; break;
        case 18: state = 'ASSAM'; break;
        case 19: state = 'WEST BENGAL'; break;
        case 20: state = 'JHARKHAND'; break;
        case 21: state = 'ODISHA'; break;
        case 22: state = 'CHATTISGARH'; break;
        case 23: state = 'MADHYA PRADESH'; break;
        case 24: state = 'GUJARAT'; break;
        case 25: state = 'DAMAN AND DIU'; break;
        case 26: state = 'DADRA AND NAGAR HAVELI'; break;
        case 27: state = 'MAHARASHTRA'; break;
        case 28: state = 'ANDHRA PRADESH'; break;
        case 29: state = 'KARNATAKA'; break;
        case 30: state = 'GOA'; break;
        case 31: state = 'LAKSHWADEEP'; break;
        case 32: state = 'KERALA'; break;
        case 33: state = 'TAMIL NADU'; break;
        case 34: state = 'PUDUCHERRY'; break;
        case 35: state = 'ANDAMAN AND NICOBAR'; break;
        case 36: state = 'TELANGANA'; break;
        case 37: state = 'ANDHRA PRADESH(New)'; break;
        default: state = '';
    };
    return state;
}
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function add_img_src(id) {
    document.getElementById(id).setAttribute("src", resources.logo.data);
    var imgs = $(".inr-symbol");
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].setAttribute("src", resources.rupee_symbol.data);
        imgs[i].setAttribute("style", "width:" + resources.rupee_symbol.width + "px")
    }
}

/**
 * 
 * @param {object} obj structure:
 * {
 *  "OPERANDS":[operand_1, operand_2,...,operand_n],
 *  "OPERATION" : "ADD"{or "MUL", "DIV", "SUB"},
 *  "TARGET": "target"
 * }  
 * here operand_n is a string containing the ID of the elements which contains the value on which the 
 * operation has to be done on
 * 
 * OPERATION tells which operation has to be peeformed.
 * 
 * TARGET is a string which contains the id of that element where the result has to be saved.
 */


function ExCalculate(obj) {
    if (typeof (obj) !== "object") return;
    if (obj["OPERANDS"].length < 2) return;
    // get the operands
    var oprnds = [];
    for (let i = 0; i < obj["OPERANDS"].length; i++) {
        oprnds[i] = parseFloat(document.getElementById(obj["OPERANDS"][i]).value);
    }
    // calculated result
    var res = 0;
    //now look for what type of operation is being asked.
    switch (obj["OPERATION"]) {
        case "ADD": for (let i = 0; i < oprnds.length; i++) res += oprnds[i]; break;
        case "SUB": res = oprnds[0] - oprnds[1]; break;
        case "MUL": {
            res = 1;
            for (let i = 0; i < oprnds.length; i++) res *= oprnds[i];
        } break;
        case "DIV": res = oprnds[0] / oprnds[1]; break;
    }
    // save the result in the target element
    document.getElementById(obj["TARGET"]).value = '' + res;
}

function auto_calculate() {
    let taxable_value;
    try {
        let dsc_per = parseFloat(document.getElementsByClassName("i_moneytbl_discount_at")[0].value);
        let total_cost = parseFloat(document.getElementsByClassName("i_moneytbl_total_cost")[0].value);
        if (!total_cost) return;
        let discount = total_cost * dsc_per / 100;
        if (dsc_per)
            document.getElementsByClassName("i_moneytbl_discount")[0].value = discount;
        taxable_value = total_cost - discount;
        if (taxable_value)
            taxable_valuedocument.getElementsByClassName("i_moneytbl_taxable_value")[0].value = taxable_value;
    } catch{
        taxable_value = parseFloat(document.getElementsByClassName("i_moneytbl_taxable_value")[0].value);
    }
    let cgst_per = parseFloat(document.getElementsByClassName("i_moneytbl_cgst_at")[0].value);
    let sgst_per = parseFloat(document.getElementsByClassName("i_moneytbl_sgst_at")[0].value);
    let igst_per = parseFloat(document.getElementsByClassName("i_moneytbl_igst_at")[0].value);
    let cgst = cgst_per * taxable_value / 100;
    let sgst = sgst_per * taxable_value / 100;
    let igst = igst_per * taxable_value / 100;
    if (cgst_per)
        document.getElementsByClassName("i_moneytbl_cgst")[0].value = cgst;
    if (sgst_per)
        document.getElementsByClassName("i_moneytbl_sgst")[0].value = sgst;
    if (igst_per)
        document.getElementsByClassName("i_moneytbl_igst")[0].value = igst;
    let total_tax = (cgst ? cgst : 0) + (sgst ? sgst : 0) + (igst ? igst : 0);
    if (cgst || sgst || igst)
        document.getElementsByClassName("i_moneytbl_total_gst")[0].value = total_tax;
    let total = total_tax + taxable_value;
    if (total)
        document.getElementsByClassName("i_moneytbl_total")[0].value = total;
    try {
        let claim_per = parseFloat(document.getElementsByClassName("i_moneytbl_claim_at")[0].value);
        let claim = total * claim_per / 100;
        if (claim) {
            document.getElementsByClassName("i_moneytbl_claim")[0].value = claim;
            document.getElementById("Invoice_Value_in_words").innerHTML = ntow(claim)
        }
    }catch{}
}
