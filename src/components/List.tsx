import { Person } from "../types";
import "./List.css";

interface IList {
  people: Person[];
  setSelectedPersonId: (id: number) => void;
}

const List = ({ people, setSelectedPersonId }: IList) => {
  const handleClick = (person: Person) => {
    setSelectedPersonId(person.id);
  };

  return (
    <ul className="list">
      {people.map((person) => {
        return (
          <li
            className="list__person"
            key={person.id}
            onClick={() => handleClick(person)}
          >
            <img
              className="list__person-image"
              src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
              alt={person.name}
            />
            <p className="list__person-name">{person.name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
