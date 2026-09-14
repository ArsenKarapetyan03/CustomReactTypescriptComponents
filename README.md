# Custom Components

A collection of reusable React and TypeScript UI components styled with
Tailwind CSS.

## Components

| Component | Description |
| --- | --- |
| `CustomButton` | Button with configurable variants, sizes, click animation, and standard button attributes. |
| `CollapsiblePanel` | Expandable panels with optional accordion behavior. |
| `CustomDropdown` | Dropdown menu that opens on hover or click, with up/down placement and disabled or danger items. |
| `CustomForm` | Configurable input form with labels, validation, optional descriptions, icons, reset, and submit handling. |
| `CustomLoadingSpinner` | Loading indicator with solid, dashed, or dots variants and configurable size and description. |
| `CustomModal` | Animated modal dialog with configurable content, size, and variant. |
| `CustomNotification` | Notification message with info, success, warning, or error styles, position, and auto-close options. |
| `CustomDrawer` | Sliding drawer placed at the top, bottom, left, or right of the screen. |
| `CustomTabs` | Tabs with custom React content, disabled tabs, sizes, and default or card styling. |
| `EmptyState` | Empty-content placeholder with a message and optional Lucide icon. |

## Requirements

- Node.js 18 or newer
- React 19 or newer
- TypeScript
- Tailwind CSS
- `lucide-react`, `clsx`, and `tailwind-merge`

These components use Tailwind utility classes. The consuming application must
have Tailwind CSS configured and must scan the component files for class names.

## Installation

### Clone the repository

```bash
git clone https://github.com/ArsenKarapetyan03/CustomReactTypescriptComponents
npm install
```

Then install the runtime dependencies:

```bash
npm install lucide-react clsx tailwind-merge
npm ci
```

If Tailwind CSS is not configured in the project, install and configure it
before using the components.

## Usage

Import a component and pass its props:

```tsx
import { CustomButton } from "./components/CustomButton";

export function SaveButton() {
  return (
    <CustomButton variant="primary" onClick={() => console.log("Saved")}>
      Save
    </CustomButton>
  );
}
```

### Form example

```tsx
import { CustomForm } from "./components/CustomForm";

export function LoginForm() {
  return (
    <CustomForm
      title="Sign in"
      fields={[
        {
          name: "email",
          label: "Email",
          props: { type: "email", required: true },
        },
        {
          name: "password",
          label: "Password",
          props: { type: "password", required: true },
        },
      ]}
      onSubmit={(formData) => {
        console.log(formData.get("email"));
      }}
    />
  );
}
```

### Modal and drawer example

```tsx
import { useState } from "react";
import { CustomDrawer } from "./components/CustomDrawer";
import { CustomModal } from "./components/CustomModal";

export function OverlayExample() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button onClick={() => setDrawerOpen(true)}>Open drawer</button>
      <button onClick={() => setModalOpen(true)}>Open modal</button>

      <CustomDrawer open={drawerOpen} setOpen={setDrawerOpen}>
        <div className="p-4">Drawer content</div>
      </CustomDrawer>

      <CustomModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        content={{
          contentTitle: "Example modal",
          contentBody: "Modal content",
        }}
      />
    </>
  );
}
```

## Local development

Run the demo application:

```bash
npm install
npm run dev
```

`src/App.tsx` is the demo page used to display and test the components. It is
not required when copying an individual component into another application.

## Project structure

```text
CustomComponents/
├── src/
│   ├── components/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── lib/
│   └── utils.ts
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```# CustomReactTypescriptComponents
# CustomReactTypescriptComponents
