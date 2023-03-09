import "./Style.css"
import {useState} from "react";
import { AxiosResponse } from "axios";
import { ConceptProps } from "../types";
import { FC } from "react";
import ConceptAPI from "../api";

export const ConceptItem: FC<ConceptProps> = (props) => {
  const [isEdit, setEdit] = useState<boolean>(false)

  return (
    <li className="concept-item" key={props.uid}>
      <article className="concept-article">
        <section className="name">{props.name}</section>
        <section className="desc">{props.description}</section>
      </article>
      <button>Edit</button>
      <button>Delete</button>
    </li>
  );
};





export const ReadConcept = () => {
  const [data, setData] = useState<ConceptProps[]>([]);

  const fetchData = () => {
    ConceptAPI.findAll(setData)
  }

  return <>
    <button onClick={fetchData}>Fetch</button>
    <button onClick={() => setData([])}>Clear</button>
    <ul className="concept-list">
      {data.map(elm => <ConceptItem {...elm} />)}
    </ul>
  </>;
};
