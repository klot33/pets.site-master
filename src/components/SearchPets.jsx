import React, { useState } from 'react';
import '../pages/css/my.css';
import '../pages/css/search.css';
import dog from '../image/dog.jpg';
import koza from '../image/koza.jpg';
import cat from '../image/scale_1200.jfif';

const ads = [
  {
    id: 18,
    type: "Коза",
    description: "Потерялась коза, последний раз видели в здании Московского вокзала г. Санкт-Петербург. Коза белая, пуховая.",
    chipNumber: "go-011-spb",
    region: "Центральный",
    date: "14-03-2022",
    image: koza
  },
  {
    id: 14,
    type: "Кошка",
    description: "Потерялась кошка, пушистая, серая. Любит играть, ласковая.",
    chipNumber: "ca-001-spb",
    region: "Василиостровский",
    date: "24-03-2020",
    image: cat
  },
  {
    id: 42,
    type: "Собака",
    description: "Собака рыжая, была утеряна в Красногвардейском районе.",
    chipNumber: "do-123-spb",
    region: "Красногвардейский",
    date: "22-07-2023",
    image: dog
  }
];

function SearchPets() {
  const [region, setRegion] = useState('');
  const [animalType, setAnimalType] = useState('');
  const [filteredAds, setFilteredAds] = useState(ads);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Фильтрация объявлений по введенным значениям
    const filtered = ads.filter(ad => {
      const matchesRegion = region ? ad.region.toLowerCase().includes(region.toLowerCase()) : true;
      const matchesType = animalType ? ad.type.toLowerCase().includes(animalType.toLowerCase()) : true;
      return matchesRegion && matchesType;
    });

    setFilteredAds(filtered);
  };

  return (
    <main className="container mt-5">
      <h2 className="text-center mb-4">Поиск объявлений о животных</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="animalTypeInput" className="form-label">Вид животного</label>
          <input
            type="text"
            className="form-control"
            id="animalTypeInput"
            placeholder="Введите вид животного (например, кошка, собака)"
            value={animalType}
            onChange={(e) => setAnimalType(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="regionInput" className="form-label">Район</label>
          <input
            type="text"
            className="form-control"
            id="regionInput"
            placeholder="Введите район"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Найти объявления</button>
      </form>

      <div id="adsContainer" className="mt-4">
        {filteredAds.length > 0 ? (
          filteredAds.map(ad => (
            <div key={ad.id} className="ad card mb-3">
              <img src={ad.image} alt={ad.type} className="card-img-top" />
              <div className="card-body">
                <p><strong>ID:</strong> {ad.id}</p>
                <p><strong>Вид животного:</strong> {ad.type}</p>
                <p><strong>Описание:</strong> {ad.description}</p>
                <p><strong>Номер чипа:</strong> {ad.chipNumber}</p>
                <p><strong>Район:</strong> {ad.region}</p>
                <p><strong>Дата:</strong> {ad.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p>Объявлений не найдено.</p>
        )}
      </div>
    </main>
  );
}

export default SearchPets;
