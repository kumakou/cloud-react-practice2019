import React from "react";
import Button from '@material-ui/core/Button';

class MineSweeper extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      field: [...Array(props.field_size.width * props.field_size.height).keys()],
    };
  }

  render() {
    const button_size_px = 40;
    const buttons =
      this.state.field
        .map((x, i) =>
          <Button
            style={{
              width: button_size_px,
              minWidth: button_size_px,
              height: button_size_px,
              padding: 0,
            }}
            variant="contained"
            key={i}
          >
          </Button>
        );

    return (
      <div
        style={{
          width: button_size_px * this.props.field_size.width,
        }}
      >
        {buttons}
      </div>
    );
  }
}

export default MineSweeper;

