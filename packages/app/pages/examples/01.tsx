import {value} from "../../lib/envy/atoms/value";
import {useValue} from "../../lib/envy/hooks/useValue";


const counter = value(0);


const Example01 = () => {

  const count = useValue(counter);

  // Events
  const onClick = () => {
    counter.set(c => c + 1);
  }

  // Render
  const render = () => {
    return <div className="w-full h-full flex justify-center items-center bg-gray-100">
      <div className="flex flex-row gap-2 items-center bg-white p-4 rounded">
        <button className="px-2 py-1 rounded bg-gray-900 text-white text-sm font-medium" onClick={onClick}>Increment</button>
        <span className="text-sm text-gray-900 font-medium">Count: {count}</span>
      </div>
    </div>;
  }

  return render();
};

export default Example01;
