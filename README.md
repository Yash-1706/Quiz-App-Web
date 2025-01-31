# Gamified Quiz Application

## Overview

This project is a web-based quiz application with gamification features. It fetches quiz data from a remote API via a backend proxy (to overcome CORS issues) and renders a multiple-choice quiz with an engaging user interface using React.

The API response is a quiz object that includes metadata (like `title`, `correct_answer_marks`, `negative_marks`, and `shuffle`) and a nested array of `questions`. Each question contains a `description`, an array of `options` (each with an `is_correct` flag), and additional fields.

## Features

- **Start Quiz:** Click the "Start Quiz" button to begin.
- **Multiple-Choice Questions:** Each question displays a description and several answer options.
- **Scoring System:** Points are awarded based on the API’s marking scheme:
  - Correct answer: adds the value from `correct_answer_marks` (default 10 if absent)
  - Incorrect answer: subtracts the value from `negative_marks` (default 0 if absent)
- **Result Summary:** At quiz completion, view your total score along with a performance badge:
  - *Quiz Master!* (100%)
  - *Great Job!* (70% or more)
  - *Good Effort!* (40% or more)
  - *Keep Practicing!* (Below 40%)
- **Gamification:** Earn badges based on your performance.
- **Shuffling:** If enabled (via the `shuffle` flag), both the order of questions and the order of options are randomized.
- **Responsive & Intuitive Design:** Color scheme uses:
  - `#FF8811`
  - `#F4D06F`
  - `#FFF840`
  - `#9DD9D2`
  - `#392F5A`

## Tech Stack

- **Frontend:** HTML, CSS, React
- **Backend:** Node.js with Express (to proxy API calls)
- **Quiz Data API:** Data fetched from [this endpoint](https://api.jsonserve.com/Uw5CrX)

## Project Structure

