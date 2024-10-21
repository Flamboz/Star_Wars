import { Person } from "../../types";
import "./PeopleList.css";

interface PeopleListProps {
  people: Person[];
  setSelectedPersonId: (id: number) => void;
}

// PeopleList component: Renders a list of Star Wars characters.
// Users can select a character by clicking on their card. It updates the selected person's ID via the `setSelectedPersonId` prop.
const PeopleList: React.FC<PeopleListProps> = ({
  people,
  setSelectedPersonId,
}) => {
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

export default PeopleList;
