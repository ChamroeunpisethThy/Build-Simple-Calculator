// // Normal Calculator

// $(function(){
//     $("body").delegate(".btn_number","click",function(){
//         var display=$(".vong_display").val();
//         var btn_value=$(this).val();
//         $(".vong_display").val(display+btn_value);
//     });

//     $("body").delegate(".btn_operator,.btn_dot","click",function(){
//         var display=$(".vong_display").val();
//         var btn_value=$(this).val();
//         $(".vong_display").val(display+btn_value);
//     });  
//     $("body").delegate(".btn_operator,.btn_equal","click",function(){
//         var display=$(".vong_display").val();//5+1 eval(5+1)=6
//         $(".vong_display").val(eval(display));
//     });  
// }); 

// AI Claculator

$(document).ready(function () {
    let expression = "";

    function updateDisplay() {
        $(".vong_display").val(expression);
    }

    $(".btn_number, .btn_dot").click(function () {
        let val = $(this).val();

        // Prevent multiple decimals in one number segment
        if (val === ".") {
            // get last number after operator to check if already contains a dot
            let lastNumber = expression.split(/[+\-*/]/).pop();
            if (lastNumber.includes(".")) return;
        }

        expression += val;
        updateDisplay();
    });

    $(".btn_operator").click(function () {
        let val = $(this).val();

        // Prevent operator at the start
        if (expression === "") return;

        // Prevent two operators in a row
        if (/[+\-*/.]$/.test(expression)) {
            expression = expression.slice(0, -1);
        }

        expression += val;
        updateDisplay();
    });

    $(".btn_clear").click(function () {
        expression = "";
        updateDisplay();
    });

    $(".btn_backspace").click(function () {
        if (expression.length > 0) {
            expression = expression.slice(0, -1); // remove last character
            updateDisplay();
        }
    });

    $(".btn_equal").click(function () {
        try {
            // Avoid evaluation if expression ends with operator
            if (/[+\-*/.]$/.test(expression)) {
                $(".vong_display").val("Error");
                expression = "";
                return;
            }
            let result = eval(expression);
            expression = result.toString();
            updateDisplay();
        } catch {
            expression = "";
            $(".vong_display").val("Error");
        }
    });
});
