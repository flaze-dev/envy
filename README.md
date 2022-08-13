# envy
A simple state management library

## Example
### Counter
```typescript jsx
const counter = value(0);

const increment = () => {
    counter.set(c => c+1);
}

const Counter = () => {
    const count = useValue(counter);
    return <button onClick={increment}>{count}</button>
}
```

### Counter (with actions)
```typescript jsx
const increment = (value: number) => {
    return value + 1;
}

const counter = value(0, {increment});

const Counter = () => {
    const count = useValue(counter);
    return <button onClick={counter.increment}>{count}</button>
}
```

### Counter (with actions on multiple values)
```typescript jsx
const increment = (value: number) => {
    return value + 1;
}

const counter = value(0, {increment});
const counter2 = value(0, {increment});

const incrementAll = () => {
    counter.increment();
    counter2.increment();
}

const Counter = () => {
    const count = useValue(counter);
    const count2 = useValue(counter2);
    
    return <div>
        <span>{count}</span>
        <span>{count2}</span>
        <button onClick={incrementAll}>Increment All</button>
    </div>
}
```

### Counter (with views)
```typescript jsx
const increment = (value: number) => {
    return value + 1;
}

const counter = value(0, {increment});
const counter2 = value(0, {increment});

const sumView = ([counter, counter2], ([counter, counter2]) => {
   return counter + counter2; 
});

const Counter = () => {
    const count = useValue(counter);
    const count2 = useValue(counter2);
    const sum = useView(sumView);
    
    return <div>
        <button onClick={counter.increment}>{count}</button>
        <button onClick={counter2.increment}>{count2}</button>
        <span>{sum}</span>
    </div>
}
```
