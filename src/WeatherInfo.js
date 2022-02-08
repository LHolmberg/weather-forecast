import React from "react";
import './styles/WeatherInfo.scss'
import {
    useNavigate,
    useLocation
} from "react-router-dom";
import {
    toCelsius,
    day
} from './helper/Helper';


class WeatherHelper extends React.Component {

    constructor(props) {
        super(props);
   
        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    componentDidMount() {
        fetch(
            "https://api.openweathermap.org/geo/1.0/direct?q="+this.props.city.replace(/ /g, '_') +"&limit=5&appid=ebd7ba44716d363e4cf939b5c8a73e46/", {
                headers: {'Access-Control-Allow-Origin': '*'}
            })
            .then((geoRes) => geoRes.json())
            .then((geoJson) => {
                fetch(
                    "https://weather-react-api.vercel.app/forecast/coords/" + geoJson[0]["lat"] + "," + geoJson[0]["lon"], { 
                        headers: {'Access-Control-Allow-Origin': '*'}
                    })
                    .then((weatherRes) => weatherRes.json())
                    .then((weatherJson) => {
                        this.setState({
                            items: weatherJson,
                            DataisLoaded: true
                        });
                    })
            })
    }

    render() {
        const { DataisLoaded, items } = this.state;

        if (!DataisLoaded) return <div>
            <h1 className="loading"> Loading... </h1> </div> ;
        
        return (
            <div>
            <div class="card">
                <h2>{this.props.city.charAt(0).toUpperCase() + this.props.city.slice(1)}</h2>
                <h3>{this.state.items["currently"]["summary"] + ", Feels like " +
                 Math.round(toCelsius(this.state.items["currently"]["apparentTemperature"])) + "°"}<br/>
                {"Wind: " + Math.round(this.state.items["currently"]["windSpeed"]) + "kph"} <br/>
                {"UV Index: " + this.state.items["currently"]["uvIndex"]}<br/> {"Pressure: " +
                 this.state.items["currently"]["pressure"] +  "hPa"}</h3>
                <br/><br/><br/><br/><br/>
                <h1>{Math.round(toCelsius(this.state.items["currently"]["temperature"])) + "°"}</h1>
                
                <table>
                    <tr>
                        <td>{day(1)}</td>
                        <td>{day(2)}</td>
                        <td>{day(3)}</td>
                        <td>{day(4)}</td>
                        <td>{day(5)}</td>
                    </tr>
                    {/* high */}
                    <tr>
                        <td>{Math.round(toCelsius(this.state.items["daily"]["data"][1]["temperatureHigh"])) + "°"}</td>
                        <td>{Math.round(toCelsius(this.state.items["daily"]["data"][2]["temperatureHigh"])) + "°"}</td>
                        <td>{Math.round(toCelsius(this.state.items["daily"]["data"][3]["temperatureHigh"])) + "°"}</td>
                        <td>{Math.round(toCelsius(this.state.items["daily"]["data"][4]["temperatureHigh"])) + "°"}</td>
                        <td>{Math.round(toCelsius(this.state.items["daily"]["data"][5]["temperatureHigh"])) + "°"}</td>
                    </tr>
                    {/* low */}
                    <tr>
                        <td>{Math.round(toCelsius(this.state.items["daily"]["data"][1]["temperatureLow"])) + "°"}</td>
                        <td>{Math.round(toCelsius(this.state.items["daily"]["data"][2]["temperatureLow"])) + "°"}</td>
                        <td>{Math.round(toCelsius(this.state.items["daily"]["data"][3]["temperatureLow"])) + "°"}</td>
                        <td>{Math.round(toCelsius(this.state.items["daily"]["data"][4]["temperatureLow"])) + "°"}</td>
                        <td>{Math.round(toCelsius(this.state.items["daily"]["data"][5]["temperatureLow"])) + "°"}</td>
                    </tr>
                </table>
            </div>
            </div>
        );
    }
}

export default function WeatherInfo() {
    var location = useLocation();
    return (
        <body>
            <WeatherHelper city={location.state.city}/>
        </body>
    );
}
