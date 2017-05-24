export class Helper {

    validLunhCard(value) {
        // accept only digits, dashes or spaces
        if (/[^0-9-\s]+/.test(value)) return false;

        // The Luhn Algorithm.
        let nCheck = 0, nDigit = 0, bEven = false;
        value = value.replace(/\D/g, "");

        for (let n = value.length - 1; n >= 0; n--) {
            let cDigit = value.charAt(n),
                nDigit = parseInt(cDigit, 10);

            if (bEven) {
                if ((nDigit *= 2) > 9) nDigit -= 9;
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) == 0;
    }

    validationNumber(numberFromInput) {
        numberFromInput = numberFromInput.replace(/\s/g, "");
        let reg = /_/gi;
        let numberWithoutSpace = numberFromInput.replace(reg, '');

        if ((numberWithoutSpace).length > 15) {
            return this.validLunhCard(numberFromInput);
        } else {
            return false;
        }
    }

    formatExpiryChange(val) {
        if (val && Number(val[0]) > 1) {
            val = '0' + val;
        }
        if (val && val.length > 1 && Number(val[0] + val[1]) > 12) {
            val = '12' + val.substring(2, val.length);
        }
        val = val.substring(0, 2) + (val.length > 2 ? '/' + val.substring(2, 4) : '');
        return val;
    }
}