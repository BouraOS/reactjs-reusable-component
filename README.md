# Reusable React Components

A collection of reusable and customizable React components to speed up development and maintain consistency across projects.

## Features

- Well-structured, modular components
- Fully customizable with props and styles
- Designed for reusability across different projects
- Includes common UI elements (buttons, inputs, modals, etc.)

## Installation

Clone the repository:

```sh
git clone https://github.com/BouraOS/reactjs-reusable-component
cd reusable-componants
```

Install dependencies:

```sh
npm install
# or
yarn install
```

## Usage

Import and use components in your React project:

```jsx
import { Button } from "./components/Button";

const App = () => (
  <Button label="Click Me" onClick={() => alert("Button Clicked!")} />
);

export default App;
```

## Available Components

- **Button** – Customizable button component
- **InputField** – Input field with validation
- **Modal** – Simple and reusable modal component
- **Card** – UI card for displaying content
- **Dropdown** – Select dropdown component

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/new-component`)
3. Commit your changes (`git commit -m 'Add new component'`)
4. Push to the branch (`git push origin feature/new-component`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
