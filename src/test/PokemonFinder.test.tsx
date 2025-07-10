import { describe, expect, test } from "vitest";
import PokemonFinder from "../components/PokemonFinder";
import { render, screen } from "@testing-library/react";

describe(PokemonFinder, () => {
  test("初期レンダリングが正しく行われる", () => {
    render(<PokemonFinder />);
    expect(screen.getByText("ポケモンファインダー")).toBeInTheDocument();

    expect(screen.getByText("ポケモンを見つける")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "ポケモンを見つける" })
    ).toBeInTheDocument(); //nameを付ければボタンを定められる
    expect(screen.getByRole("button", { name: "test" })).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("ポケモンのIDを入力")
    ).toBeInTheDocument();
  });
});
