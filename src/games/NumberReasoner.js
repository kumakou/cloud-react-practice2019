import React from "react";
import Button from '@material-ui/core/Button';
import { updateExpression } from "@babel/types";

class NumberReasoner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upper: props.upper,
      under: props.under,

      isresetbutton: false,
      curentValue: 51,
      maxValue: 100,
      minValue: 1,
    };
    this.mimanClick = this.mimanClick.bind(this);
    this.ijouClick = this.ijouClick.bind(this);
    this.resetClick = this.resetClick.bind(this);
  }


  mimanClick() {

    if (this.state.curentValue > 51) {
      this.setState((state) => ({
        maxValue: Math.ceil(this.state.curentValue) - 1,
        curentValue: Math.ceil((this.state.curentValue + this.state.minValue) / 2),
        isresetbutton: true,
      }))
    } else {
      this.setState((state) => ({
        maxValue: Math.floor(this.state.curentValue
        ),
        curentValue: Math.floor((this.state.curentValue + this.state.minValue) / 2),
        isresetbutton: true,
      }))
    }
  };

  ijouClick() {
    if (this.state.curentValue > 51) {
      this.setState((state) => ({
        minValue: Math.ceil(this.state.curentValue),
        curentValue: Math.ceil((this.state.maxValue + this.state.curentValue) / 2),
        isresetbutton: true,
      }))
    } else {
      this.setState((state) => ({
        minValue: Math.floor(this.state.curentValue),
        curentValue: Math.floor((this.state.maxValue + this.state.curentValue) / 2),
        isresetbutton: true,
      }))
    }
  };

  resetClick() {
    this.setState((state) => ({
      minValue: 1,
      maxValue: 100,
      curentValue: 51,
      isresetbutton: true,
    }))
  }

  render() {

    const isbutton = this.state.minValue !== this.state.maxValue;

    return (
      <div>


        <p>1から100までの整数を思い浮かべてください！</p>
        {isbutton ? <BeforeButton ijouClick={this.ijouClick} mimanClick={this.mimanClick} curentValue={this.state.curentValue} /> :
          <AfterButton curentValue={this.state.curentValue} />}
        {this.state.isresetbutton ? <Button variant="contained" onClick={this.resetClick}>リセット</Button> : null}

      </div>
    );
  }
}



function BeforeButton(props) {
  return (
    <div>
      <p>それは…</p>
      <Button onClick={props.ijouClick}>{props.curentValue}以上</Button>
      <Button onClick={props.mimanClick}>{props.curentValue}未満</Button>
    </div>
  );
}

function AfterButton(props) {
  return (
    <div>
      <p>あなたの選んだ数字は{props.curentValue}です。</p>
    </div>
  );
}

export default NumberReasoner;

