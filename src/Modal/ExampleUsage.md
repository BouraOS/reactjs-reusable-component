# Modal Component Documentation

A flexible, accessible, and customizable Modal component for React applications.

## Features

- 🎯 Multiple size options
- ♿ Accessibility support (ARIA attributes, keyboard navigation)
- 🎨 Customizable header and footer
- 🔄 Smooth animations
- 📱 Responsive design
- 🔒 Body scroll lock
- ⌨️ Keyboard support (ESC to close)

## Installation

Place the following files in your project:

```
components/
  Modal/
    Modal.tsx
    Modal.css
```

## Basic Usage

```typescript
import { useState } from "react";
import Modal from "./components/Modal";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Example Modal"
    >
      <p>Modal content goes here</p>
    </Modal>
  );
}
```

## Props

| Prop                | Type                                 | Default   | Description                                    |
| ------------------- | ------------------------------------ | --------- | ---------------------------------------------- |
| isOpen              | boolean                              | required  | Controls the visibility of the modal           |
| onClose             | () => void                           | required  | Function called when the modal should close    |
| title               | string                               | undefined | Modal title displayed in the header            |
| children            | React.ReactNode                      | required  | Content to be displayed in the modal body      |
| size                | 'small' \| 'medium' \| 'large'       | 'medium'  | Controls the width of the modal                |
| showCloseButton     | boolean                              | true      | Whether to show the close button in header     |
| closeOnOverlayClick | boolean                              | true      | Whether clicking the overlay closes the modal  |
| footer              | React.ReactNode                      | undefined | Content to be displayed in the modal footer    |
| footerAlign         | 'left' \| 'center' \| 'right'        | 'right'   | Alignment of the footer content                |
| showDividers        | boolean                              | true      | Whether to show dividers for header and footer |
| animation           | 'fade' \| 'slide-up' \| 'slide-down' | 'fade'    | Animaton types                                 |

## Size Specifications

- Small: 400px max-width
- Medium: 600px max-width
- Large: 800px max-width

## Examples

### Basic Modal

```typescript
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Basic Modal">
  <p>This is a basic modal with just content.</p>
</Modal>
```

### Modal with Footer

```typescript
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal with Footer"
  footer={
    <>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
      <button onClick={handleSave}>Save</button>
    </>
  }
>
  <p>This modal includes footer buttons.</p>
</Modal>
```

### Custom Sized Modal with Left-Aligned Footer

```typescript
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Custom Modal"
  size="large"
  footerAlign="left"
  footer={<button onClick={() => setIsOpen(false)}>Close</button>}
>
  <p>This is a large modal with a left-aligned footer.</p>
</Modal>
```

### Modal without Header or Footer Dividers

```typescript
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Clean Modal"
  showDividers={false}
  footer={<button onClick={() => setIsOpen(false)}>Close</button>}
>
  <p>This modal has no dividers between sections.</p>
</Modal>
```

## Animation Types

```typescript
// Slide-down animation
<Modal isOpen={isOpen} onClose={() => setIsOpen(false)} animation="slide-down">
  <p>This modal slides down from the top.</p>
</Modal>
```

## Accessibility Features

The Modal component implements several accessibility features:

1. **ARIA Attributes**

   - `role="dialog"`
   - `aria-modal="true"`
   - `aria-labelledby` (when title is provided)

2. **Keyboard Navigation**

   - ESC key closes the modal
   - Body scroll is locked when modal is open

3. **Focus Management**
   - Focus is trapped within the modal when open
   - Close button is keyboard accessible

## CSS Customization

The Modal uses BEM-style CSS classes that can be overridden for customization:

```css
/* Main classes that can be customized */
.modal-overlay        /* Modal background overlay */
/* Modal background overlay */
/* Modal background overlay */
/* Modal background overlay */
/* Modal background overlay */
/* Modal background overlay */
/* Modal background overlay */
/* Modal background overlay */
.modal               /* Modal container */
.modal__header       /* Modal header section */
.modal__title        /* Modal title */
.modal__content      /* Modal content area */
.modal__footer       /* Modal footer section */
.modal__close; /* Close button */
```

## Best Practices

1. **Error Handling**

   - Always provide an `onClose` handler
   - Handle loading states in your footer actions

2. **Content Management**

   - Keep content concise and focused
   - Use appropriate modal sizes for content
   - Consider mobile viewports when adding content

3. **Performance**
   - Modal content is rendered even when closed
   - Consider using React.lazy() for heavy content

## Common Patterns

### Confirmation Modal

```typescript
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirm Delete"
  size="small"
  footer={
    <>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
      <button onClick={handleDelete}>Delete</button>
    </>
  }
>
  <p>Are you sure you want to delete this item?</p>
</Modal>
```

### Form Modal

```typescript
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Edit Profile"
  footer={
    <>
      <button onClick={() => setIsOpen(false)}>Cancel</button>
      <button type="submit" form="profileForm">
        Save
      </button>
    </>
  }
>
  <form id="profileForm" onSubmit={handleSubmit}>
    {/* Form fields */}
  </form>
</Modal>
```

## Troubleshooting

### Common Issues

1. **Modal doesn't close**

   - Verify `onClose` handler is implemented
   - Check if `isOpen` state is being updated

2. **Scroll issues**

   - Content overflow is handled automatically
   - Body scroll lock is managed by the component

3. **Z-index conflicts**
   - Modal overlay uses z-index: 1000
   - Adjust if needed for your application

## Contributing

When enhancing this component, consider:

1. Maintaining accessibility features
2. Testing on multiple browsers
3. Ensuring responsive behavior
4. Documenting new props or features
