# Lotto Number Generator

## Overview

A simple web application to generate random lottery numbers.

## Features

*   Generates a user-specified number of lottery sets.
*   Each set contains 6 unique random numbers and 1 bonus number between 1 and 45.
*   Displays the main numbers and the bonus number for each set.
*   An input field to specify the number of sets to generate (1-10).
*   A button labeled "번호 추첨" (Number Draw) to generate the numbers.
*   Korean localization.
*   Light and Dark mode support with a toggle switch. The theme icon is positioned above the switch.
*   Defaults to dark mode on the user's first visit.
*   User's theme preference is saved for subsequent visits.

## Current Plan

1.  **Modify `main.js`**: Adjust the theme loading logic to set dark mode as the default when no theme preference is found in local storage.
2.  **No changes to `index.html` or `style.css` are needed.**
