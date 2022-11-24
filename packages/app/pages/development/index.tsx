import {useValue_old, useView_old, value_old, view_old} from "../../lib/envy";


const increment = (value: any) => {
  return value + 1;
}

const counter = value_old(0, {increment});
const counter2 = value_old(0, {increment});

const counterSum = view_old([counter, counter2], ([counter, counter2]) => {
  return counter + counter2;
});

const incrementAll = () => {
  counter.increment();
  counter2.increment();
}


// Components
const ButtonA = () => {
  const value = useValue_old(counter);

  return <button className="px-3 py-1.5 bg-gray-900 text-gray-50 rounded-lg" onClick={counter.increment}>
    <span>Increment {value}</span>
  </button>
}

const ButtonB = () => {
  const value2 = useValue_old(counter2);

  return <button className="px-3 py-1.5 bg-gray-900 text-gray-50 rounded-lg" onClick={counter2.increment}>
    <span>Increment {value2}</span>
  </button>
}

const Sum = () => {
  const sum = useView_old(counterSum);

  return <button className="px-3 py-1.5 bg-gray-900 text-gray-50 rounded-lg">
    <span>Sum {sum}</span>
  </button>
}

const IndexPage = () => {

  // Render
  const render = () => {
    return <div className="p-16 flex flex-row gap-1">
      <ButtonA/>

      <ButtonB/>

      <button className="px-3 py-1.5 bg-gray-900 text-gray-50 rounded-lg" onClick={incrementAll}>
        <span>Increment all</span>
      </button>

      <Sum/>
    </div>;
  }

  return render();
};

export default IndexPage;
