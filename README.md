# farcaster #
Develop tools and application testing for UNLV capstone

## Ubuntu: ##
1. Install nodejs and npm:

    ```sudo apt install nodejs npm```


2. Install the farcaster stuff:

    ```npm install @farcaster/miniapp-wagmi-connector```

    ```npm install @farcaster/frame-sdk```


3. Clone the repo and cd into it:

    ```git clone <link>```

    ```cd farcaster```


4. Run npm install:

    ```npm install```


5. Run the dev server:

    ```npm run dev```

---------------------------------------------------------------------
IF YOU GET AN ERROR, run these commands, then run npm install again:

```unset ESBUILD_BINARY_PATH```

```rm -rf node_modules package-lock.json```

```npm cache clear --force```

```npm install```

--------------------------------------------------------------------

## Using localhost for development: ##

1. Install cloudflared:

    ```brew install cloudflared```


2. Expose localhost:

    ```cloudflared tunnel --url http://localhost:3000```


3. Use the url given by the command above and put it in the Farcaster Preview Tool in the Developers section

*Don't forget to run the dev server:*
```npm run dev```

---------------------------------------------------------------------

That will start the server, in the terminal it will tell you what local host to put in your browser, usually its "localhost:3000"

*PLEASE NOTE:* The first run will take a bit of time before it is viewable, the app is compiling, once done they screen will either refresh to the home screen or go to a black screen,
if it is a black screen just refresh the browser window, you can make changes in real to the files and the browser will update automotically, just dont close the terminal window where
you ran npm run

To edit the tabs in the app those are held in the directory:
```/src/components/ui/tabs```

The ui directory holds the header and footer to edit the menu

The files labled ***(old)
are the original files provided by farcaster, look in their for ideas on how to do things

----------------------------------------------------------------------

## Testing ##

**Makefile**
- "backend-test", "backend-coverage", "frontend-test", "frontend-coverage"

#### **Frontend Tests**
1. **Framework**: Vitest
2. **How to Run Tests**:
   - Run all tests:
     ```bash
     npm run test
     ```
   - Run tests with coverage:
     ```bash
     npm run test:coverage
     ```
3. **Coverage Report**:
   - Coverage results will be displayed in the terminal.
   - Detailed HTML reports are generated in the `./coverage` directory. Open `index.html` in a browser to view.
4. **Where to Write Tests**:
   - Place frontend test files in the `src/components/__tests__/` directory.
   - Use the `.test.tsx` or `.test.js` extension for test files.
   - Example:
     ```tsx
     import { render, screen } from '@testing-library/react';
     import React from 'react';

     function ExampleComponent() {
       return <div>Hello, World!</div>;
     }

     test('renders the example component', () => {
       render(<ExampleComponent />);
       expect(screen.getByText('Hello, World!')).toBeInTheDocument();
     });
     ```

---

#### **Backend Tests**
1. **Framework**: Pytest
2. **How to Run Tests**:
   - Run all tests:
     ```bash
     pytest
     ```
   - Run tests with coverage:
     ```bash
     pytest --cov
     ```
3. **Coverage Report**:
   - Coverage results will be displayed in the terminal.
   - Detailed reports (if configured) are generated in the `htmlcov` directory. Open `index.html` in a browser to view.
4. **Where to Write Tests**:
   - Place backend test files in the `tests/` directory.
   - Use the `test_*.py` naming convention for test files.
   - Example:
     ```python
     from app import app

     def test_home():
         response = app.test_client().get('/')
         assert response.status_code == 200
         assert b"Welcome" in response.data
     ```

---

### Summary of Test Locations
- **Frontend Tests**: `src/components/__tests__/`
- **Backend Tests**: `tests/`
