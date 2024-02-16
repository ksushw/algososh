import React from "react";
import { render, screen } from "@testing-library/react";
import { ReverseString } from "./utils";

test("Корректно разворачивается строка с чётным количеством символов", () => {
  const linkElement = ReverseString(["п", "р", "и", "в", "е", "т"]);
  expect(linkElement).toEqual([
    ["т", "р", "и", "в", "е", "п"],
    ["т", "е", "и", "в", "р", "п"],
    ["т", "е", "в", "и", "р", "п"],
  ]);
});

test("Корректно разворачивается строка с нечетным количеством символов", () => {
  const linkElement = ReverseString(["т", "ю", "л", "ь", "п", "а", "н"]);
  expect(linkElement).toEqual([
    ["н", "ю", "л", "ь", "п", "а", "т"],
    ["н", "а", "л", "ь", "п", "ю", "т"],
    ["н", "а", "п", "ь", "л", "ю", "т"],
  ]);
});

test("Корректно разворачивается строка с одним символом", () => {
  const linkElement = ReverseString(["т"]);
  expect(linkElement).toEqual([["т"]]);
});

test("Корректно разворачивается пустая строка ", () => {
  const linkElement = ReverseString([]);
  expect(linkElement).toEqual([[]]);
});
