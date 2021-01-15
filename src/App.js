import image from './images/antiantimage.png';
import './App.css';
import FilteredList from './FilteredList.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import data from './hero.json';

function App() {

  /*Hero List*/
  var arr = []
  var i = 0;
    for(i = 0; i < 118; i++){
      arr.push({name:data['Hero'][i], role:data['Role'][i], attribute:data['Attribute'][i], advantage:Number(data['Advantage'][i]),  image: data['image'][i]})
    }


  return (
    <div className="App">
      <header className="App-header">
        
        {/*The TitleBar on the top with image and App name*/}
        <div className = 'TitleBar'>
          <img src= {image} alt="No Antimage" style={{height: "5vw"}}/> 
          <div className = 'TitleText'>
              The Anti-AntiMage App: An AntiMage Counterpicker Tool
          </div>
        </div>

        {/*The Description below the TitleBar*/}
        <div className = 'About'>
          Antimage is the least fun hero to play against in Dota 2 with over 50% ban rate. 
          This app helps you draft an antimage-resistant team.
        </div>

        {/*Everything else is rendered from FilteredList.jsx*/}
        <div className = 'MainPane'>
          <FilteredList list={arr} />
        </div>
      </header>
    </div>
  );
}

export default App;
