import React from "react";
import Button from '@material-ui/core/Button';
import shuffleArray from 'shuffle-array';


const getPosition = (index, field_size) => {
  const position = {
    x: index % field_size.height,
    y: Math.floor(index / field_size.width),
  };
  return isValidPosition(position, field_size) ? position : null;
}


const isValidPosition = (position, field_size) =>
  position.x >= 0
  && position.x <= field_size.width - 1
  && position.y >= 0
  && position.y <= field_size.height - 1;

const getIndexFromPosition = (position, field_size) =>
  isValidPosition(position, field_size)
    ? position.x + position.y * field_size.width
    : null;

const getAroundCell = (index, field_size) => {
  const position = getPosition(index, field_size);
  let cell = [
    { x: position.x - 1, y: position.y - 1 },
    { x: position.x - 1, y: position.y },
    { x: position.x - 1, y: position.y + 1 },
    { x: position.x, y: position.y - 1 },
    { x: position.x, y: position.y + 1 },
    { x: position.x + 1, y: position.y - 1 },
    { x: position.x + 1, y: position.y },
    { x: position.x + 1, y: position.y + 1 },
  ]
  return cell.filter(x => isValidPosition(x, field_size))
    .map(x => getIndexFromPosition(x, field_size));
}

const getAroundNum = (index, field, field_size) =>
  getAroundCell(index, field_size)
    .map(x => field[x].is_mine ? 1 : 0)
    .reduce((s, x) => s + x);

const getfield = (field_size, mine_num) => {
  let field =
    [...Array(field_size.width * field_size.height).keys()].map(i =>
      ({
        is_mine: i < mine_num,
        is_frag: false,
        is_opened: false,
        around_num: null,
      }
      ));

  shuffleArray(field);

  return field.map((x, i) => (
    {
      ...x,
      around_num: getAroundNum(i, field, field_size),
    }
  )
  );
};

class MineSweeper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      field: getfield(props.field_size, props.mine_num),
    };
    // this.changeFlagValue = this.changeFlagValue.bind(this);
  }

  changeOpenValue(index) {
    if (this.state.field[index].is_opened || this.state.field[index].is_frag) return;
    const field_copy = this.state.field.slice();
    field_copy[index].is_opened = true;
    if (this.state.field[index].around_num === 0 && this.state.field[index].is_mine === false) {
      const openaroundcell = getAroundCell(index, this.props.field_size).filter(x => !this.state.field[x].opened && !this.state.field[x].flagged);
      openaroundcell.map(x => this.changeOpenValue(x));
    }
    this.setState({ field: field_copy });
  }

  changeFlagValue(index) {

    if (this.state.field[index].is_opened) return;
    const field_copy = this.state.field.slice();
    field_copy[index].is_frag = !this.state.field[index].is_frag;
    this.setState({ field: field_copy });
  }

  render() {
    const button_size_px = 40;
    const game_over = this.state.field.filter((x, i) => this.state.field[i].is_mine && this.state.field[i].is_opened).length !== 0;
    const game_clear = this.state.field.filter((x, i) => !this.state.field[i].is_mine && !this.state.field[i].is_opened).length === 0;
    const flag_num = this.state.field.filter((x, i) => this.state.field[i].is_frag).length;


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
            variant={this.state.field[i].is_opened ? 'text' : "contained"}
            key={i}
            onClick={
              e => {
                if (!(game_over || game_clear)) {
                  this.changeOpenValue(i);
                  e.preventDefault();
                }
              }
            }
            onContextMenu={e => {
              this.changeFlagValue(i);
              e.preventDefault();
            }
            }
          > {
              (() => {
                if (this.state.field[i].is_frag) return "🚩";
                if (!this.state.field[i].is_opened) return "";
                if (this.state.field[i].is_mine) return "💣";
                if (this.state.field[i].around_num === 0) return "";
                else return this.state.field[i].around_num;
              })()
            }
          </Button>
        );

    return (
      <div>
        <p>残りの<span>💣</span>:{this.props.mine_num - flag_num}</p>
        {game_clear ? <p>ゲームクリア！おめでとう！</p> : null}
        {game_over ? <p>ゲームオーバー！残念！</p> : null}
        <div
          style={{
            width: button_size_px * this.props.field_size.width,
          }}
        >
          {buttons}
        </div>
      </div>
    );
  }
}

export default MineSweeper;

