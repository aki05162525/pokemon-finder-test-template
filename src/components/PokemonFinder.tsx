import { useState } from "react";

const PokemonFinder = () => {
  const [pokemonId, setPokemonId] = useState("");
  const [pokemon, setPokemon] = useState<{
    name: string;
    image: string;
  } | null>(null);
  const [error, setError] = useState("");

  const fetchPokemonById = async () => {
    setError("");
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
    );
    if (!response.ok) {
      setError("ポケモンのデータが見つかりません。");
      return;
    }
    const data = await response.json();
    setPokemon({ name: data.name, image: data.sprites.front_default });
  };

  return (
    <div className="App">
      <h1>ポケモンファインダー</h1>
      <input
        type="number"
        value={pokemonId}
        onChange={(e) => setPokemonId(e.target.value)}
        placeholder="ポケモンのIDを入力"
      />
      <button onClick={fetchPokemonById}>ポケモンを見つける</button>
      <button onClick={fetchPokemonById}>test</button>
      {error && <div>{error}</div>}
      {pokemon && (
        <div>
          <h2>{pokemon.name}</h2>
          <img
            src={pokemon.image}
            alt={pokemon.name}
            style={{ width: 250, height: 250 }}
          />
        </div>
      )}
    </div>
  );
};

export default PokemonFinder;
