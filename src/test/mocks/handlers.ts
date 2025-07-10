// src/mocks/handlers.ts
import { http, HttpResponse } from "msw";

const pokemon = {
  "25": {
    name: "pikachu",
    sprites: { front_default: "https://example.com/pikachu.png" },
  },
};

export const handlers = [
  http.get("https://pokeapi.co/api/v2/pokemon/25", () => {
    if (pokemon) {
      return HttpResponse.json(pokemon, { status: 200 });
    } else {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }
  }),
];
