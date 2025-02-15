# CustomInput Component Usage Examples

The `CustomInput` component is a flexible input field that supports various configurations including icons, password visibility toggle, and error messages.

## Basic Usage

```tsx
import React, { useState } from 'react';
import { CustomInput } from './CustomInput';


// Simple text input
<CustomInput
value={text}
onChange={setText}
placeholder="Enter text..."
/>


```

## With Left Icon Only:


```tsx
import React, { useState } from 'react';
import { CustomInput } from './CustomInput';

<CustomInput
  value={value}
  onChange={(value) => setValue(value)}
  placeholder="Enter your username"
  leftIcon={<UserIcon />}
  />


```

## With Password Toggle (Right Icon):

```tsx
import React, { useState } from 'react';
import { CustomInput } from './CustomInput';

<CustomInput
  value={password}
  onChange={(value) => setPassword(value)}
  placeholder="Enter your password"
  secureTextEntry
/>

```

## With Custom Right Icon:

```tsx
import React, { useState } from 'react';
import { CustomInput } from './CustomInput';

<CustomInput
  value={value}
  onChange={(value) => setValue(value)}
  placeholder="Enter your email"
  rightIcon={<SearchIcon />}
/>

```

## With Both Left and Right Icons:

```tsx
import React, { useState } from 'react';
import { CustomInput } from './CustomInput';
<CustomInput
  value={value}
  onChange={(value) => setValue(value)}
  placeholder="Enter your email"
  leftIcon={<MailIcon />}
  rightIcon={<ClearIcon />}
/>


```

## With Icons and Error Message

```tsx
import { SearchIcon } from '../svg/searchIcon';

<CustomInput
  value={searchText}
  onChange={setSearchText}
  placeholder="Search..."
  leftIcon={<SearchIcon width={20} height={20} fill="#ccc" />}
  errorMessage="This field is required"
/>
```

## Custom Styling

```tsx
<CustomInput
  value={text}
  onChange={setText}
  placeholder="Custom styled input"
  containerStyle={{ width: '100%', maxWidth: '500px' }}
  inputStyle={{ backgroundColor: '#f5f5f5' }}
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| value | string | The input value |
| onChange | (value: string) => void | Callback function when value changes |
| placeholder | string | Placeholder text |
| leftIcon | React.ReactNode | Icon to display on the left side |
| rightIcon | React.ReactNode | Icon to display on the right side |
| secureTextEntry | boolean | Enable password toggle visibility |
| keyboardType | string | Input type (e.g., 'text', 'email', 'number') |
| errorMessage | string | Error message to display below input |
| inputStyle | React.CSSProperties | Custom styles for the input field |
| containerStyle | React.CSSProperties | Custom styles for the container |

## Accessibility Features

The component includes several accessibility features:
- Proper ARIA attributes for error states
- Password visibility toggle with appropriate ARIA labels
- Keyboard navigation support

