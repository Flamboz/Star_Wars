import { Person } from "../types";
import "./List.css";

interface IList {
  people: Person[];
}

const List = ({ people }: IList) => {
  return (
    <ul className="list">
      {people.map((person) => {
        return (
          <li className="list__person" key={person.id}>
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
