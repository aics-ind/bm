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
                obj[class_list[j]] = document.getElementsByClassName(class_list[j])[0].value;
            }
        }
    }
    //console.log(obj);
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
        try{
            console.log("Filling element '"+keys[i]+"'");
            let aa = document.getElementsByClassName(keys[i])[0];
            if(aa) aa.value = obj[keys[i]];
        }catch{
            console.log("Failed at '"+keys[i]+"'");
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

function add_img_src(id){
    document.getElementById(id).setAttribute("src", resources.logo.data);
    var imgs  = $(".inr-symbol");
    for(let i=0;i<imgs.length;i++){
        imgs[i].setAttribute("src", resources.rupee_symbol.data);
        imgs[i].setAttribute("style","width:"+resources.rupee_symbol.width+"px")
    }
}

