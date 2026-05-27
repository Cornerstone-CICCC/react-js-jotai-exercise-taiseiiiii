import { useState, type FormEvent, type ChangeEvent } from "react";
import { useAtom } from "jotai";
import {
  firstNameAtom,
  lastnameAtom,
  ageAtom,
  hobbiesAtom,
} from "../atoms/user.atom";

const HOBBY_OPTIONS = [
  "Reading",
  "Gaming",
  "Cooking",
  "Sports",
  "Music",
  "Traveling",
];

function User() {
  const [firstName, setFirstName] = useAtom(firstNameAtom);
  const [lastname, setLastname] = useAtom(lastnameAtom);
  const [age, setAge] = useAtom(ageAtom);
  const [hobbies, setHobbies] = useAtom(hobbiesAtom);

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastnameInput, setLastnameInput] = useState("");
  const [ageInput, setAgeInput] = useState("");
  const [hobbiesInput, setHobbiesInput] = useState<string[]>([]);

  const handleHobbyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setHobbiesInput((prev) =>
      checked ? [...prev, value] : prev.filter((h) => h !== value)
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFirstName(firstNameInput);
    setLastname(lastnameInput);
    setAge(Number(ageInput));
    setHobbies(hobbiesInput);
  };

  return (
    <div>
      <h2>User Info</h2>
      <div>
        <span>First Name: {firstName}</span>
      </div>
      <div>
        <span>Last Name: {lastname}</span>
      </div>
      <div>
        <span>Age: {age}</span>
      </div>
      <div>
        <span>Hobbies: {hobbies.join(", ")}</span>
      </div>

      <h3>Update User</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            First Name:{" "}
            <input
              type="text"
              value={firstNameInput}
              onChange={(e) => setFirstNameInput(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Last Name:{" "}
            <input
              type="text"
              value={lastnameInput}
              onChange={(e) => setLastnameInput(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Age:{" "}
            <input
              type="number"
              value={ageInput}
              onChange={(e) => setAgeInput(e.target.value)}
            />
          </label>
        </div>
        <fieldset>
          <legend>Hobbies</legend>
          {HOBBY_OPTIONS.map((hobby) => (
            <label key={hobby} style={{ marginRight: "0.75rem" }}>
              <input
                type="checkbox"
                value={hobby}
                checked={hobbiesInput.includes(hobby)}
                onChange={handleHobbyChange}
              />
              {hobby}
            </label>
          ))}
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default User;
