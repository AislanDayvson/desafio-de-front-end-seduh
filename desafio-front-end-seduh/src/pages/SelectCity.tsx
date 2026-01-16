import { use } from "react"
import { cities } from "../data/cities"
import { useNavigate } from "react-router-dom"
import Globe from '../assets/icons/globe.svg'
import CityWeather from "./CityWeather"


const SelectCity = () => {
    const navigate = useNavigate()
    return(
        <main className="select-screen">
            <section className="select-panel">
                <header className="select-header">
                    <h1 className="select-title">Weather</h1>
                    <p className="select-subtitle">Select a city</p>
                </header>

                <img
                    className="select-globe"
                    src={Globe}
                    alt=""
                />

                <div className="city-grid" role="list">
                {cities.map((city) => (
                        <button
                            key={city.id}
                            className="city-item"
                            onClick={() => navigate(`/city/${city.id}`)}
                            type="button"
                        >
                    {city.name}
                    </button>
                ))}
                </div>
            </section>
        </main>
    )
}

export default SelectCity