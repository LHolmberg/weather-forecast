import logo from './logo.svg';
import './styles/App.scss';
import {
  useNavigate
} from "react-router-dom";

function Home() {
  var navigate = useNavigate();
  var val = "";
  return (
    <body>
      <form class="search-form">
      <input onChange={(evt) => { val = evt.target.value }} type="search" placeholder="Enter a city..." class="search-input"/>
      <button onClick={() => {
        if(val !== "") {
          navigate("/s",{ state: { city: val} });
        } else {
          alert("Enter a city");
        }
      }} class="search-button"></button>
      </form>
    </body>
  );
}

export default Home;