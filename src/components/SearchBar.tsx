import React, { useState, useMemo, useEffect, useRef, type FC } from 'react';
import type { City } from '../types/base';
import '../styles/SearchBar.scss';
import { cln } from '../utils';
import { If } from './If';

interface Props {
    cities: City[];
    onSelectCity: (city: City) => void;
}

const SearchBar: FC<Props> = ({ cities, onSelectCity }) => {
    const [query, setCity] = useState<string>('');
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const nextCities = useMemo<City[]>(() => {
        const q = query.trim().toLowerCase();

        return q.length > 1 ? cities
            .filter(c => c.name.toLowerCase().startsWith(q))
            .slice(0, 10)
        : [];
    }, [query, cities]);


    useEffect(() => { setActiveIndex(0) }, [nextCities]);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!nextCities.length) return;

        switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              setActiveIndex(idx => Math.min(idx + 1, nextCities.length - 1));
              break;
            case 'ArrowUp':
              e.preventDefault();
              setActiveIndex(idx => Math.max(idx - 1, 0));
              break;
            case 'Enter':
              e.preventDefault();
              const city = nextCities[activeIndex];
              
              if (city) {
                onSelectCity(city);
                setCity("");
              }
              break;
            case 'Escape':
              setCity("");
              break;
          }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                onChange={e => setCity(e.target.value)}
                autoComplete="off"
                value={query}
                placeholder="Zadejte město..."
                ref={inputRef}
                onKeyDown={onKeyDown}
            />

            <If is={nextCities.length > 0}>
                <div className="next-cities">
                    {nextCities.map((city, i) => (
                        <div
                            key={city.id}
                            className={cln({ item: true, active: i === activeIndex })}
                            onMouseEnter={() => setActiveIndex(i)}
                            onClick={() => {
                                onSelectCity(city);
                                setCity('');
                            }}
                        >
                            {city.name}, {city.country}
                        </div>
                    ))}
                </div>
            </If>
        </div>
    );
};

export default SearchBar;
