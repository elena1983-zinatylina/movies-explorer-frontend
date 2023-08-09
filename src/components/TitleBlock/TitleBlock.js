import './TitleBlock.css';

export default function TitleBlock  ({ name, margin })  {
    return <h2 className={`${margin} title-block`}>{name}</h2>;
  };