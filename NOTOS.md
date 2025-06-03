# Book Review on React: Advanced React: Deep Dives, Investigations, Performance Patterns and Techniques Hardcover by Nadia Makarevich (Author)

![Book Cover](public/advanced-react/cover.jpg)

## Table of Contents

1. Chapter 1. Intro to re-renders.
2. Chapter 2. Elements, children as props, and re-renders.
3. Chapter 3. Configuration concerns with elements as props.
4. Chapter 4. Advanced configuration with render props.
5. Chapter 5. Memoization with useMemo, useCallback and React.memo.
6. Chapter 6. Deep dive into diffing and reconciliation.
7. Chapter 7. Higher-order components in the modern world.
8. Chapter 8. React Context and performance.
9. Chapter 9. Refs: from storing data to imperative API.
10. Chapter 10. Closures in React.
11. Chapter 11. Implementing advanced debouncing and throttling with Refs.
12. Chapter 12. Escaping Flickering UI with useLayoutEffect.
13. Chapter 13. React portals and why we need them.
14. Chapter 14. Data fetching on the client and performance.
15. Chapter 15. Data fetching and race conditions.
16. Chapter 16. Universal error handling in React.

## TLDR

**Chapter 1. Intro to re-renders**

✅ *Do:* Move state to small components (State Colocation). 
❌ *Don't:* Store state in root/shared components unnecessarily.
*Why:* State updates trigger re-renders of all children. Isolation limits the impact area of changes.

## Chapter 1. Intro to re-renders

### The Problem

This chapter introduces fundamental concepts of React re-renders and performance optimization through a practical investigation of a common performance problem - adding a modal dialog to a large application.

```ts
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="layout">
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

*Example*: [https://advanced-react.com/examples/01/01](https://advanced-react.com/examples/01/01)

*Result*: Dialog takes almost a second to open.

### Key Concepts Covered

**What is a Re-render?**

- *Re-rendering* is how React updates existing components with new data
- It's a lightweight process where React reuses existing component instances, runs hooks, performs calculations, and updates DOM elements
- Essential for interactivity - without re-renders, React apps would be completely static

**Component Lifecycle Stages**

- *Mounting*: Component appears on screen for the first time
- *Unmounting*: Component is removed and cleaned up  
- *Re-rendering*: Component updates with new information

### Root Cause Analysis

**How Re-renders Propagate**

1. **State update** is the initial source of all re-renders
2. When state updates, the component holding that state re-renders
3. React then re-renders **all nested components** down the component tree
4. React **never goes "up"** the render tree during re-renders
5. All slow components re-render unnecessarily when modal state changes

### The Big Re-renders Myth

**Common Misconception**: "Component re-renders when its props change"

**Reality**:

- Components re-render when parent state updates, **regardless of props**
- Props changes without state updates are "swallowed" by React
- Props only matter for re-renders when using `React.memo`

**Proof Example**:

```js
const App = () => {
  let isOpen = false; // local variable, not state
  
  return (
    <div>
      <Button onClick={() => (isOpen = true)}>Open dialog</Button>
      {/* Dialog will never show up */}
      {isOpen ? <ModalDialog /> : null}
    </div>
  );
};
```

*Live Example*: [https://advanced-react.com/examples/01/02](https://advanced-react.com/examples/01/02)

### Solution: Moving State Down

Extract state and components that depend on it into a smaller component:

```js
const ButtonWithModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={() => setIsOpen(false)} /> : null}
    </>
  );
};

const App = () => {
  return (
    <div className="layout">
      <ButtonWithModalDialog />
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

*Live Example*: [https://advanced-react.com/examples/01/03](https://advanced-react.com/examples/01/03)

**Why It Works**

![How re-renders work](public/advanced-react/image.png)

- Creates a new sub-branch in the render tree
- State updates only affect components within `ButtonWithModalDialog`
- Rest of the app remains unaffected by modal state changes

### The Danger of Custom Hooks

Custom hooks can hide performance issues by abstracting state:

```js
const useModalDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};

const App = () => {
  const { isOpen, open, close } = useModalDialog();
  // State is hidden but still triggers re-renders!
  
  return (
    <div className="layout">
      <Button onClick={open}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={close} /> : null}
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

*Live Example*: [https://advanced-react.com/examples/01/04](https://advanced-react.com/examples/01/04)

**Hidden State Example**

Even unused state in hooks triggers re-renders:

```js
const useModalDialog = () => {
  const [width, setWidth] = useState(0);
  
  useEffect(() => {
    const listener = () => setWidth(window.innerWidth);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, []);
  
  // width is not even returned, but App still re-renders on resize!
  return { /* modal logic */ };
};
```

*Live Example*: [https://advanced-react.com/examples/01/05](https://advanced-react.com/examples/01/05)

**Analogy**

> "Hooks are like pockets in your trousers. Putting a 10kg dumbbell in your pocket doesn't make it easier to run. Components are like self-driving trolleys - they carry the weight separately."

**Solution for Hooks**

Still extract into a component:

```js
const ButtonWithModalDialog = () => {
  const { isOpen, open, close } = useModalDialog();
  
  return (
    <>
      <Button onClick={open}>Open dialog</Button>
      {isOpen ? <ModalDialog onClose={close} /> : null}
    </>
  );
};
```

*Live Example*: [https://advanced-react.com/examples/01/07](https://advanced-react.com/examples/01/07)

### Key Takeaways

1. *Re-rendering* is essential for React interactivity and updates components with new data
2. *State update* is the initial source of all re-renders in React applications
3. *Downstream propagation*: Component re-renders trigger re-renders of all nested components
4. *Props myth*: During normal React re-renders, props changes don't matter - components re-render regardless
5. *Moving state down* pattern prevents unnecessary re-renders in large applications
6. *Custom hooks* can hide performance issues - state in hooks still triggers component re-renders
7. *Hook chains* propagate re-renders through the entire chain to the consuming component
8. *Isolation principle*: Keep state in the smallest, lightest components possible




























## Chapter 2: Elements, Children as Props, and Re-renders - Summary (Partial)

## Overview
This chapter continues the exploration of re-render optimization techniques, focusing on more complex scenarios where "moving state down" isn't easily applicable. The chapter introduces advanced patterns using components as props and the "children as props" technique.

## Key Concepts Covered

### 1. Elements vs Components
- **Component**: A function that returns Elements
- **Element**: An object that defines what should be rendered (created with JSX brackets `<Component />`)
- **JSX is syntax sugar** for `React.createElement(Component, props, children)`

### Element Object Structure
```js
{
  type: Child,           // Component function or string for DOM elements
  props: {},            // Component props
  // ... other internal React stuff
}
```

### 2. React Reconciliation Process
- React builds two trees: before and after re-render (Fiber Tree/Virtual DOM)
- **Diffing algorithm** compares these trees using `Object.is()`
- If Element objects are **exactly the same** (`Object.is() === true`), React skips re-rendering
- If different, React checks the `type` and either re-renders or remounts the component

## The Scrollable Area Problem

### Scenario
Implement a floating navigation block in a scrollable area that moves based on scroll position, while maintaining smooth performance.

### Initial Implementation (Problematic)
```js
const MainScrollableArea = () => {
  const [position, setPosition] = useState(300);
  
  const onScroll = (e) => {
    const calculated = getPosition(e.target.scrollTop);
    setPosition(calculated);
  };
  
  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </div>
  );
};
```

### Problem Result
- Every scroll triggers state update
- All slow components re-render on each scroll
- Laggy, slow scrolling experience
- **Live Example**: [https://advanced-react.com/examples/02/01](https://advanced-react.com/examples/02/01)

## Solution: Components as Props Pattern

### Implementation
```js
// Extract state logic into separate component
const ScrollableWithMovingBlock = ({ content }) => {
  const [position, setPosition] = useState(300);
  
  const onScroll = (e) => {
    const calculated = getPosition(e.target.scrollTop);
    setPosition(calculated);
  };
  
  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      {content}
    </div>
  );
};

// Pass slow components as props
const App = () => {
  const slowComponents = (
    <>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
  
  return <ScrollableWithMovingBlock content={slowComponents} />;
};
```

### Why This Works
1. **Element objects** for slow components are created **outside** `ScrollableWithMovingBlock`
2. When `setPosition` triggers re-render, React compares the `content` prop
3. Since `content` Element object is **exactly the same** before/after, React skips re-rendering those components
4. Only `MovingBlock` re-renders (created inside the component)
5. **Live Example**: [https://advanced-react.com/examples/02/02](https://advanced-react.com/examples/02/02)

### Key Insight
> Components passed as props belong to the parent in the component tree hierarchy. React never goes "up" the tree during re-renders, so these components are protected from child component state updates.

## Children as Props Pattern (Introduction)

### The Problem with Components as Props
Passing entire page content through random props "feels wrong" and looks weird.

### Solution: Use `children` Prop
```js
// Before (awkward)
const Parent = ({ child }) => {
  return child;
};

// After (natural)
const Parent = ({ children }) => {
  return children;
};
```

### Nature of Props
- Props are just an object passed as first argument to component function
- `children` is just another prop name - nothing special about it
- Both patterns work identically

## React Internals Deep Dive

### Re-render Process Explained
1. **State update** triggers component function call
2. React compares returned Element objects using `Object.is()`
3. **Same object reference** → Skip re-render
4. **Different object reference** → Check type:
   - Same type → Re-render component
   - Different type → Unmount old, mount new

### Why Moving Components Outside Works
```js
const Parent = ({ child }) => {
  const [state, setState] = useState();
  
  // child object created outside Parent scope
  // doesn't change when Parent re-renders
  return child; // Object.is(childBefore, childAfter) === true
};

// vs

const Parent = () => {
  const [state, setState] = useState();
  
  // Child object re-created on every render
  return <Child />; // Object.is(childBefore, childAfter) === false
};
```

## Official Documentation References

- [React Elements](https://react.dev/reference/react/createElement)
- [React Reconciliation](https://react.dev/learn/preserving-and-resetting-state)
- [Children Prop](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
- [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)

## Key Takeaways (Partial Chapter)

1. **Elements vs Components**: Understanding the distinction is crucial for performance optimization
2. **Object.is() comparison**: React uses reference equality to determine if re-renders are needed
3. **Components as props**: Powerful pattern to prevent unnecessary re-renders in complex scenarios
4. **Reconciliation algorithm**: React's diffing process determines what actually needs to update
5. **Component tree hierarchy**: Props belong to parent components, protecting them from child state updates
6. **Children prop**: More natural way to implement the components-as-props pattern

## Performance Principle
> When Element objects are created outside the re-rendering component's scope, their references remain stable, allowing React to skip expensive re-renders.

# React Book Review: Advanced Optimization Techniques

## Chapter 2: Elements, Children as Props, and Re-renders (Continued)

### The "Children as Props" Pattern

After exploring the components-as-props technique, the author introduces a more elegant solution - the "children as props" pattern. This approach addresses the main issue with the previous method: passing content through arbitrary props feels unnatural and looks awkward.

**Evolution from components as props to children:**

```js
// Before (awkward syntax)
const App = () => {
  const slowComponents = (
    <>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </>
  );
  
  return <ScrollableWithMovingBlock content={slowComponents} />;
};

// After (natural syntax)
const App = () => {
  return (
    <ScrollableWithMovingBlock>
      <VerySlowComponent />
      <BunchOfStuff />
      <OtherStuffAlsoComplicated />
    </ScrollableWithMovingBlock>
  );
};
```

**The only change needed in the component:**
```js
// Simply rename the prop from content to children
const ScrollableWithMovingBlock = ({ children }) => {
  const [position, setPosition] = useState(300);
  
  const onScroll = (e) => {
    const calculated = getPosition(e.target.scrollTop);
    setPosition(calculated);
  };
  
  return (
    <div className="scrollable-block" onScroll={onScroll}>
      <MovingBlock position={position} />
      {children}
    </div>
  );
};
```

### Key Takeaways from Chapter 2

1. **Nature of props**: `children` is just another prop - nothing special about it
2. **JSX syntax**: `<Parent><Child /></Parent>` is equivalent to `<Parent children={<Child />} />`
3. **Performance**: Both patterns provide identical performance benefits
4. **React reconciliation**: React uses `Object.is()` to compare elements for optimization

---

## Chapter 3: Configuration Concerns with Elements as Props

### The Core Problem: Component Over-Configuration

The author begins with a classic example - a Button component that needs to show a loading icon. The chapter demonstrates how a simple requirement can evolve into "props hell":

**The Evolution of Button Component:**

```js
// Beginning - simple implementation
const Button = ({ isLoading }) => {
  return (
    <button>Submit {isLoading ? <Loading /> : null}</button>
  );
};

// End result - configuration nightmare
const Button = ({
  isLoading,
  iconLeftName,
  iconLeftColor,
  iconLeftSize,
  isIconLeftAvatar,
  iconRightName,
  iconRightColor,
  // ... dozens more props
}) => {
  // no one knows what's happening here and how all those props work
  return ...
};
```

### The Elements as Props Solution

**Elegant approach:**
```js
const Button = ({ icon }) => {
  return <button>Submit {icon}</button>;
};

// Usage - all configuration is with the consumer
<Button icon={<Loading />} />                                    // default loading icon
<Button icon={<Error color="red" />} />                         // red error icon  
<Button icon={<Warning color="yellow" size="large" />} />       // large yellow warning
<Button icon={<Avatar />} />                                    // avatar instead of icon
```

### Practical Applications

**1. Modal Dialogs:**
```js
const ModalDialog = ({ content, footer }) => {
  return (
    <div className="modal-dialog">
      <div className="content">{content}</div>
      <div className="footer">{footer}</div>
    </div>
  );
};

// Flexible usage
<ModalDialog 
  content={<SomeFormHere />} 
  footer={<><SubmitButton /><CancelButton /></>} 
/>
```

**2. Layout Components:**
```js
<ThreeColumnsLayout
  leftColumn={<Navigation />}
  middleColumn={<MainContent />}
  rightColumn={<SidebarAds />}
/>
```

### Performance and Conditional Rendering

**Important performance consideration:**
```js
const App = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // This element is always created, but NOT rendered until needed
  const footer = <Footer />;
  
  return isDialogOpen ? (
    <ModalDialog footer={footer} />
  ) : null;
};
```

**Key Understanding**: Creating an Element (object) ≠ Rendering a component. Elements are just objects in memory; rendering only happens when they end up in another component's return statement.

This principle makes routing patterns completely safe:
```js
const App = () => {
  return (
    <>
      <Route path="/some/path" element={<Page />} />
      <Route path="/other/path" element={<OtherPage />} />
    </>
  );
};
```

Both `<Page />` and `<OtherPage />` elements are created, but only the matching route actually renders.

### Advanced Technique: Default Props via cloneElement

**The Challenge**: How to maintain the flexibility of the pattern while providing sensible defaults?

**Solution using React.cloneElement:**
```js
const Button = ({ appearance, size, icon }) => {
  // Create default props for the icon
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };

  const newProps = {
    ...defaultIconProps,
    // Icon props override defaults
    ...icon.props,
  };

  // Clone the icon with new props
  const clonedIcon = React.cloneElement(icon, newProps);

  return <button>Submit {clonedIcon}</button>;
};

// Now works "magically"
<Button appearance="primary" icon={<Loading />} />      // white icon automatically
<Button appearance="secondary" icon={<Loading />} />    // black icon automatically
<Button size="large" icon={<Loading />} />              // large icon automatically

// But can still override
<Button appearance="secondary" icon={<Loading color="red" />} />  // red icon
```

### Warnings About cloneElement

**The Danger of Incorrect Usage:**
```js
// WRONG - this will break the icon's API
const clonedIcon = React.cloneElement(
  icon,
  defaultIconProps  // defaults will override all icon props
);

// CORRECT - defaults first, then icon props
const clonedIcon = React.cloneElement(icon, {
  ...defaultIconProps,
  ...icon.props,
});
```

The author warns that this pattern is very fragile and easy to break, recommending its use only for simple cases. The "magic" nature of default props can lead to confusion when they don't work as expected.

### Key Takeaways from Chapter 3

1. **Elements as props** solve the problem of component over-configuration
2. The pattern is especially useful for layouts and modal dialogs
3. Conditional rendering doesn't affect the performance of element creation
4. `React.cloneElement` enables default props but requires careful implementation
5. Balancing flexibility with ease of use is key when designing component APIs

---

## Overall Principles from Chapters 2-3

**Fundamental Understanding:**
- **Component** = function that returns elements
- **Element** = object describing what to render
- **Re-render** = calling the component function when state changes
- **Optimization** = preventing unnecessary calls through stable object references

**Performance Patterns:**
1. Components as props - protects slow components from re-renders
2. Children as props - more natural syntax for the same pattern
3. Elements vs Components - understanding the difference is critical for optimization

**Architecture Patterns:**
1. Elements as props - for flexible component configuration
2. Default props via cloneElement - for sensible defaults while maintaining flexibility
3. Composition over configuration - fundamental React principle

**The Philosophy**: Instead of trying to predict and configure every possible use case through props, React encourages passing the actual elements and letting consumers handle their own configuration needs. This results in more flexible, maintainable, and performant applications.
























**Chapter 2: Composition Patterns**  
✅ **Do:** Use `children` to pass elements (natural syntax)  
❌ **Don't:** Create artificial props like `content` for rendering  
**Why:** React automatically memoizes stable elements. Child components don't re-render if their element props don't change.

**Chapter 3: Flexible Components**  
✅ **Do:** Pass elements as props for customization  
❌ **Don't:** Add dozens of configuration props to a component  
**Why:** Delegating rendering through elements keeps the API simple, while `cloneElement` allows adding defaults without losing flexibility.






































































# Chapter 4: Advanced Configuration with Render Props - Summary

## Overview
This chapter explores the render props pattern as a solution for advanced component configuration scenarios that cannot be solved with elements as props. It covers sharing stateful logic, the evolution from render props to hooks, and when render props are still useful today.

## Key Concepts Covered

### 1. What are Render Props?
- **Render prop** is a function that returns an Element/JSX
- Similar to a Component, but you call it directly instead of React calling it
- Provides explicit control over rendering and data flow
- Alternative to elements as props for more complex scenarios

### 2. The Limitation of Elements as Props
When a component accepting other components through props needs to:
- Influence their props dynamically
- Pass internal state to them
- Share data in an explicit, non-magical way

Elements as props and `cloneElement` cannot help in these scenarios.

## The Problem Example

### Scenario
A Button component that accepts an icon Element and needs to share hover state with it.

### Initial Implementation with Elements as Props
```js
const Button = ({ appearance, size, icon }) => {
  const [isHovered, setIsHovered] = useState();
  
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  
  const newProps = { ...defaultIconProps, ...icon.props };
  const ClonedIcon = React.cloneElement(icon, newProps);
  
  return (
    <button 
      className={`button ${appearance}`}
      onMouseOver={() => setIsHovered(true)}
    >
      Submit {ClonedIcon}
    </button>
  );
};
```

### Problems with This Approach
1. **Assumptions about props**: Assumes icons have `size` and `color` props
2. **Library compatibility**: Different icon libraries may use different prop names
3. **State sharing difficulty**: Hard to share hover state with the icon
4. **Hidden magic**: `cloneElement` behavior is not explicit

## Solution 1: Render Props for Elements

### Basic Render Prop Implementation
```js
// Instead of accepting an Element, accept a function that returns an Element
const Button = ({ renderIcon }) => {
  return <button>Submit {renderIcon()}</button>;
};

// Usage - pass a function instead of an element
<Button renderIcon={() => <HomeIcon />} />
```

### Passing Props to Render Functions
```js
const Button = ({ appearance, size, renderIcon }) => {
  const defaultIconProps = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
  };
  
  // Pass props to the function
  return (
    <button>Submit {renderIcon(defaultIconProps)}</button>
  );
};

// Usage - accept and use props
<Button renderIcon={(props) => <HomeIcon {...props} />} />

// Override specific props
<Button renderIcon={(props) => (
  <HomeIcon {...props} size="large" color="red" />
)} />

// Convert props for different libraries
<Button renderIcon={(props) => (
  <HomeIcon 
    fontSize={props.size}
    style={{ color: props.color }}
  />
)} />
```

### Sharing State with Render Props
```js
const Button = ({ appearance, size, renderIcon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const iconParams = {
    size: size === 'large' ? 'large' : 'medium',
    color: appearance === 'primary' ? 'white' : 'black',
    isHovered, // Add state to params
  };
  
  return (
    <button 
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      Submit {renderIcon(iconParams)}
    </button>
  );
};

// Usage - access hover state
const icon = (props, state) => 
  state.isHovered ? 
    <HomeIconHovered {...props} /> : 
    <HomeIcon {...props} />;

<Button renderIcon={icon} />
```

**Live Example**: [https://advanced-react.com/examples/04/01](https://advanced-react.com/examples/04/01)

## Solution 2: Children as Render Props

### Basic Pattern
```js
// Children can be a function too
<Parent children={() => <Child />} />

// Pretty nested syntax also works
<Parent>{() => <Child />}</Parent>

// In Parent component
const Parent = ({ children }) => {
  return children(); // Just call it like any render prop
};
```

### Sharing State with Children as Function

#### ResizeDetector Example
```js
const ResizeDetector = ({ children }) => {
  const [width, setWidth] = useState();
  
  useEffect(() => {
    const listener = () => {
      const width = window.innerWidth;
      setWidth(width);
    };
    
    window.addEventListener("resize", listener);
    // cleanup code...
  }, []);
  
  // Pass width to children
  return children(width);
};

// Usage - no need for intermediate state
const Layout = () => {
  return (
    <ResizeDetector>
      {(windowWidth) => {
        return windowWidth > 600 ? (
          <WideLayout />
        ) : (
          <NarrowLayout />
        );
      }}
    </ResizeDetector>
  );
};
```

**Live Example**: [https://advanced-react.com/examples/04/04](https://advanced-react.com/examples/04/04)

## The Hooks Revolution

### How Hooks Replaced Render Props
The same ResizeDetector logic can be extracted into a custom hook:

```js
const useResizeDetector = () => {
  const [width, setWidth] = useState();
  
  useEffect(() => {
    const listener = () => {
      const width = window.innerWidth;
      setWidth(width);
    };
    
    window.addEventListener("resize", listener);
    // cleanup code...
  }, []);
  
  return width;
};

// Much simpler usage
const Layout = () => {
  const windowWidth = useResizeDetector();
  
  return windowWidth > 600 ? (
    <WideLayout />
  ) : (
    <NarrowLayout />
  );
};
```

### Why Hooks Are Better for Logic Sharing
- **Less code**: More concise and readable
- **Easier to understand**: Direct usage without render function complexity
- **Better composition**: Hooks can be easily combined

## When Render Props Are Still Useful

### 1. Configuration and Flexibility
Render props for component configuration (like the Button example) are still very viable and useful.

### 2. Legacy Codebases
- Popular pattern before hooks introduction
- Especially common for form validation logic
- Many libraries still use this pattern

### 3. DOM-Dependent Logic
When logic depends on a specific DOM element, render props can be more straightforward than hooks.

#### ScrollDetector Example
```js
const ScrollDetector = ({ children }) => {
  const [scroll, setScroll] = useState();
  
  return (
    <div onScroll={(e) => setScroll(e.currentTarget.scrollTop)}>
      {children(scroll)}
    </div>
  );
};

// Usage
const Layout = () => {
  return (
    <ScrollDetector>
      {(scroll) => {
        return <>{scroll > 30 ? <SomeBlock /> : null}</>;
      }}
    </ScrollDetector>
  );
};
```

**Live Example**: [https://advanced-react.com/examples/04/06](https://advanced-react.com/examples/04/06)

### Why Not Just Use a Hook?
For DOM-dependent logic, you'd need to:
- Introduce a Ref and pass it around
- Attach event listeners manually
- Handle cleanup

Render props keep the logic contained and explicit.

## Key Takeaways

### 1. **Configuration Use Case**
If a component with elements as props wants to control their props or pass state to them, convert those elements into render props:

```js
const Button = ({ renderIcon }) => {
  const [someState, setSomeState] = useState();
  const someProps = { /* ... */ };
  
  return (
    <button>
      {renderIcon(someProps, { someState })}
    </button>
  );
};

<Button renderIcon={(props, state) => (
  <IconComponent {...props} someProps={state} />
)} />
```

### 2. **Children as Render Props**
Children can also be render props, including "nesting" syntax:

```js
const Parent = ({ children }) => {
  return children(someData);
};

<Parent>
  {(data) => <Child data={data} />}
</Parent>
```

### 3. **Historical Context**
- Render props were very useful for sharing stateful logic before hooks
- Hooks replaced that use case in 99% of cases
- Still useful for DOM-dependent logic and configuration

### 4. **Modern Usage**
Render props for sharing stateful logic can still be useful today, especially when the logic is attached to a DOM element.

---


**Chapter 4: Advanced Configuration with Render Props**  
✅ **Do:** Use render props when you need to share state or control props of nested components  
❌ **Don't:** Use cloneElement when you need to pass dynamic state to elements  
**Why:** Render props provide explicit data flow and allow components to share internal state with their children, while cloneElement only works with static props.

---







































# Chapter 5: Memoization with useMemo, useCallback and React.memo

## TLDR

**Chapter 5: Memoization**  
✅ **Do:** Use memoization only with React.memo components or dependency arrays  
❌ **Don't:** Memoize props on regular components or expensive calculations without measuring  
**Why:** Memoization has overhead and often doesn't work as expected. Most "expensive" calculations are faster than component re-renders.

## Detailed Overview / Детальный обзор

### English: Understanding Memoization in React

#### Core Concepts

**Reference Equality in JavaScript**
- Primitives (strings, numbers) are compared by value
- Objects, arrays, and functions are compared by reference
- React uses reference equality to determine if values have changed

**How useMemo and useCallback Work**
- Both hooks cache their results between re-renders
- `useCallback(fn, deps)` - memoizes the function itself
- `useMemo(() => value, deps)` - memoizes the result of function execution
- The inline function passed to both hooks is re-created on every render

#### When Memoization Actually Works

**1. With React.memo Components**
```js
const ChildMemo = React.memo(Child);

const Parent = () => {
  // ✅ These need memoization for React.memo to work
  const data = useMemo(() => ({ id: 1 }), []);
  const onChange = useCallback(() => {}, []);
  
  return <ChildMemo data={data} onChange={onChange} />;
};
```

**2. As Hook Dependencies**
```js
const Component = () => {
  const submit = useCallback(() => {}, []);
  
  useEffect(() => {
    submit();
  }, [submit]); // ✅ Memoized dependency prevents infinite loops
};
```

#### Common Anti-patterns

**1. Memoizing Props on Regular Components**
```js
// ❌ Useless - button will re-render anyway when parent re-renders
const Component = () => {
  const onClick = useCallback(() => {}, []);
  return <button onClick={onClick}>Click me</button>;
};
```

**2. Broken Memoization with Props Spreading**
```js
// ❌ Breaks memoization - data object is not memoized
const Parent = () => {
  return <ChildMemo {...props} data={{ id: 1 }} />;
};
```

**3. Children as Props Issues**
```js
// ❌ Children are re-created objects, breaking memoization
const Component = () => {
  return (
    <ChildMemo>
      <div>Some content</div>
    </ChildMemo>
  );
};

// ✅ Fixed version
const Component = () => {
  const content = useMemo(() => <div>Some content</div>, []);
  return <ChildMemo>{content}</ChildMemo>;
};
```

#### Rules for React.memo

1. **Never spread props** from other components
2. **Avoid non-primitive props** from other components
3. **Avoid non-primitive values** from custom hooks
4. **Remember children** is also a prop that needs memoization

#### Expensive Calculations Myth

- Most "expensive" calculations are actually faster than component re-renders
- Always measure before optimizing
- Consider the context: device capabilities, frequency of execution, user experience impact
- Focus on reducing unnecessary re-renders instead of micro-optimizations

#### Ключевые выводы

**English:**
- Memoization is harder than it seems and often doesn't work as expected
- Only use memoization with React.memo components or as hook dependencies
- Focus on preventing unnecessary re-renders rather than micro-optimizations
- Always measure performance before and after optimizations
- Be careful with prop spreading and custom hooks - they can break memoization