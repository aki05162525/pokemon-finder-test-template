import { describe, expect, test } from "vitest";
import PokemonFinder from "../components/PokemonFinder";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

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

  test("ボタンクリックでポケモンデータがフェッチされ、表示される", async () => {
    render(<PokemonFinder />);

    const user = userEvent.setup();

    const inputElement = screen.getByPlaceholderText("ポケモンのIDを入力");
    await user.type(inputElement, "25");

    const buttonElement = screen.getByRole("button", {
      name: "ポケモンを見つける",
    });
    await user.click(buttonElement);
    const pokemonName = screen.queryByText("pikachu");
    expect(pokemonName).toBeInTheDocument();

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://example.com/pikachu.png");
    expect(image).toHaveAttribute("alt", "pikachu");
  });

  test("データ取得中にエラーが発生した場合にエラーメッセージが表示される", async () => {
    render(<PokemonFinder />);

    const user = userEvent.setup();

    const inputElement = screen.getByPlaceholderText("ポケモンのIDを入力");
    await user.type(inputElement, "2000");

    const buttonElement = screen.getByRole("button", {
      name: "ポケモンを見つける",
    });
    await user.click(buttonElement);

    const pokemonName =
      screen.queryByText("ポケモンのデータが見つかりません。");
    expect(pokemonName).toBeInTheDocument();
  });
});
