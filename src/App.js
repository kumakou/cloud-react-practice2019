import "./styles/style.scss";
import React from "react";
import { ThemeProvider } from '@material-ui/styles';
import theme from './styles/theme.js';
import AnimalCounter from "./games/AnimalCounter.js"
import NumberReasoner from "./games/NumberReasoner.js"
import MineSweeper from "./games/MineSweeper.js"

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <h2>Animal Counter</h2>
        <AnimalCounter animal_name="いぬ" />
        <AnimalCounter animal_name="ねこ" />
        <AnimalCounter animal_name="さる" />

        <h2>数あてゲーム</h2>
        <NumberReasoner upper={100} under={1} />

        <h2>Mine Sweeper</h2>
        <h3>簡単</h3>
        <MineSweeper
          field_size={{
            width: 9,
            height: 9,
          }}
          mine_num={10}
        />
        <h3>普通</h3>
        <MineSweeper
          field_size={{
            width: 16,
            height: 16,
          }}
          mine_num={40}
        />
        <h3>難しい</h3>
        <MineSweeper
          field_size={{
            width: 30,
            height: 16,
          }}
          mine_num={99}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;

