import {value} from "../../lib/envy/atoms/value";
import {view} from "../../lib/envy/atoms/view";
import {useValue} from "../../lib/envy/hooks/useValue";


const counter1 = value(0);
const counter2 = value(0);

const sumView = view([counter1, counter2], () => {
  return counter1.get() + counter2.get();
});


const Example02 = () => {

  const count1 = useValue(counter1);
  const count2 = useValue(counter2);
  const sum = useValue(sumView);

  // Events
  const onClick1 = () => {
    counter1.set(c => c + 1);
  }

  const onClick2 = () => {
    counter2.set(c => c + 1);
  }

  // Render
  const render = () => {
    return <div className="w-full h-full flex justify-center items-center bg-gray-100 gap-2">
      <div className="flex flex-row gap-2 items-center bg-white p-4 rounded">
        <button className="px-2 py-1 rounded bg-gray-900 text-white text-sm font-medium" onClick={onClick1}>
          <span>Increment 1</span>
        </button>
        <span className="text-sm text-gray-900 font-medium">Count: {count1}</span>
      </div>

      <div className="flex flex-row gap-2 items-center bg-white p-4 rounded">
        <button className="px-2 py-1 rounded bg-gray-900 text-white text-sm font-medium" onClick={onClick2}>
          <span>Increment 2</span>
        </button>
        <span className="text-sm text-gray-900 font-medium">Count: {count2}</span>
      </div>

      <div className="flex flex-row gap-2 items-center bg-white p-4 rounded">
        <span className="text-sm text-gray-900 font-medium">Sum: {sum}</span>
      </div>
    </div>;
  }

  return render();
};

export default Example02;
