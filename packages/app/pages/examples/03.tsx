import {useState} from "react";
import {partial} from "../../lib/envy/atoms/partial";
import {value} from "../../lib/envy/atoms/value";
import {useValue} from "../../lib/envy/hooks/useValue";


const userValue = value({
  firstName: "Ingo",
  lastName: "Andelhofs",
});

const firstNameValue = partial(userValue, (user) => ({firstName: user.firstName}));
const lastNameValue = partial(userValue, (user) => ({lastName: user.lastName}));


const NamesUpdate = () => {

  const [firstName, setFirstName] = useState<string>(userValue.get().firstName);
  const [lastName, setLastName] = useState<string>(userValue.get().lastName);

  // Actions
  const updateFirstName = () => {
    userValue.set({
      ...userValue.get(),
      firstName: firstName,
    });
  }

  const updateLastName = () => {
    userValue.set({
      ...userValue.get(),
      lastName: lastName,
    });
  }

  return <>
    <div className="flex flex-row gap-2 items-center bg-white p-4 rounded">
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 font-medium">First Name</label>
        <input
          type="text"
          className="px-2 py-[1px] rounded border"
          placeholder="John"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && updateFirstName()}
        />
      </div>
      <button className="self-end px-2 py-1 rounded bg-gray-900 text-white text-sm font-medium"
              onClick={updateFirstName}>
        <span>Update</span>
      </button>
    </div>

    <div className="flex flex-row gap-2 items-center bg-white p-4 rounded">
      <div className="flex flex-col">
        <label className="text-sm text-gray-700 font-medium">Last Name</label>
        <input
          type="text"
          className="px-2 py-[1px] rounded border"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && updateLastName()}
        />
      </div>
      <button className="self-end px-2 py-1 rounded bg-gray-900 text-white text-sm font-medium"
              onClick={updateLastName}>
        <span>Update</span>
      </button>
    </div>
  </>
}

const FirstNameView = () => {
  // const firstName = useValue(userValue).firstName;
  const firstName = useValue(firstNameValue).firstName;

  return <div className="flex flex-row gap-2 items-center bg-white p-4 rounded">
    <span className="text-sm text-gray-700">FirstName: <span
      className="text-gray-900 font-medium">{firstName}</span></span>
  </div>
}

const LastNameView = () => {
  // const lastName = useValue(userValue).lastName;
  const lastName = useValue(lastNameValue).lastName;

  return <div className="flex flex-row gap-2 items-center bg-white p-4 rounded">
    <span className="text-sm text-gray-700">LastName: <span
      className="text-gray-900 font-medium"> {lastName}</span></span>
  </div>
}

const Example03 = () => {

  // Render
  const render = () => {
    return <div className="w-full h-full flex justify-center items-center bg-gray-100 gap-2">
      <NamesUpdate/>
      <FirstNameView/>
      <LastNameView/>
    </div>;
  }

  return render();
};

export default Example03;
