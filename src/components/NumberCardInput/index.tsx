import * as React from 'react';
import * as classNames from 'classnames';
import * as style from './style.css';
import { Button, Collapse, Well, FormGroup } from 'react-bootstrap';
let NumberFormat = require('react-number-format');

export namespace NumberCardInput {
  export interface Props {
  }

  export interface State {
    numberCard: number;
    expireDate: string;
    isErrorNumberField: boolean;
    isValidNumberCard: boolean;
    isValidExpireDate: boolean;
    isExpiredDate: boolean;
    isTouchNumberField: boolean;
    isTouchDateField: boolean;
  }
}

export class NumberCardInput extends React.Component<NumberCardInput.Props, NumberCardInput.State> {

  constructor(props?: NumberCardInput.Props, context?: any) {
    super(props, context);
    this.state = {
      numberCard: 0,
      expireDate: '',
      isErrorNumberField: false,
      isValidNumberCard: false,
      isValidExpireDate: false,
      isExpiredDate: false,
      isTouchNumberField: false,
      isTouchDateField: false

    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExpiryChange = this.handleExpiryChange.bind(this);
    this.handleBlurExpireDate = this.handleBlurExpireDate.bind(this);
  }

  handleSubmit(e) {
    alert('Card #' + this.state.numberCard + ' is valid!');
  }

  handleChange(e) {
    this.setState({ isTouchNumberField: true });
    this.setState({ numberCard: e.target.value });
    this.validationNumber(e.target.value);
  }

  validationNumber(numberFromInput) {
    numberFromInput = numberFromInput.replace(/\s/g, "");
    let reg = /_/gi;
    let numberWithoutSpace = numberFromInput.replace(reg, '');

    if ((numberWithoutSpace).length > 15) {
      this.setState({ isValidNumberCard: this.validLunhCard(this.state.numberCard) });
    } else {
      this.setState({ isValidNumberCard: false });
    }
  }

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
  handleBlur(e) {
    this.validationNumber(e.target.value);
    if (!this.state.isValidNumberCard) {
      this.setState({ isErrorNumberField: true });
    } else {
      this.setState({ isErrorNumberField: false });
    }
  }

  handleBlurExpireDate() {
    if (!this.state.isValidExpireDate) {
      this.setState({ isExpiredDate: true });
    } else {
      this.setState({ isExpiredDate: false });
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

  handleExpiryChange(e) {
    this.setState({ isTouchDateField: true });
    this.setState({ expireDate: e.target.value });
    let dataFromInput = e.target.value;

    if (dataFromInput.length > 4) {
      if (+Date.parse('01/' + dataFromInput) - (+Date.now()) > 0) {
        this.setState({ isExpiredDate: false });
        this.setState({ isValidExpireDate: true });
      }
    } else {
      this.setState({ isValidExpireDate: false });
    }
  }

  getStyleDate() {
    if (!this.state.isExpiredDate) {
      return style.success;
    } else {
      return style.error;
    }
  }

  getStyleNumber() {
    if (this.state.isValidNumberCard) {
      return style.success;
    } else {
      return style.error;
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} >
        <div>
          <p>Number credit card</p>
          <NumberFormat
            className={
              (this.state.isTouchNumberField)
                ? this.getStyleNumber()
                : style.start}
            value={this.state.numberCard}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            format="#### #### #### ####"
            mask="_" />
          <Collapse in={
            !this.state.isValidNumberCard && this.state.isErrorNumberField}
            className={
              (!this.state.isValidNumberCard && this.state.isErrorNumberField)
                ? this.getStyleNumber()
                : style.start}>
            <Well>
              Invalid number card!
            </Well>
          </Collapse>
        </div>

        <div>
          <p>Credit card expiry time</p>
          <NumberFormat
            className={
              (this.state.isTouchDateField)
                ? this.getStyleDate()
                : style.start}
            onBlur={this.handleBlurExpireDate}
            onChange={this.handleExpiryChange}
            format={this.formatExpiryChange} />
          <Collapse
            in={this.state.isExpiredDate}
            className={
              (this.state.isExpiredDate)
                ? this.getStyleDate()
                : style.start}>
            <Well>
              Expired date!
          </Well>
          </Collapse>
        </div>

        <Button type="submit"
          bsStyle="primary"
          disabled={
            (this.state.isValidNumberCard && !this.state.isExpiredDate)
              ? false
              : true} >
          Validate card
         </Button>
      </form>
    );
  }
}
