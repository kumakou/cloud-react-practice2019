import React from "react";
import Button from '@material-ui/core/Button';
//TODO: 必要なライブラリをインポート
//import hogehoge from "hogehoge"

//AnimalCounterコンポーネントを定義
class AnimalCounter extends React.Component {
  constructor(props) {
    super(props);

    //TODO: コンポーネントのstateを初期化
    this.state = { count: 0 };
  }

  render() {
    //TODO: DOM（HTML要素）の描画処理を追加

    const count = this.state.count;
    return (
      //TODO: DOMを返す
      <Button onClick={() => { this.setState({ count: this.state.count + 1, }) }}
        variant="contained">
        {this.props.animal_name}が{count}
        {count % 10 === 3 ? "びき" : count > 0 && count % 10 === 0 || count % 10 === 1 || count % 10 === 6 || count % 10 === 8 ? "ぴき" : "ひき"}
      </Button>
    );
  }
}

//AnimalCounterをエクスポート
export default AnimalCounter;

