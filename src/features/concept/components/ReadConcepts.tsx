import "./Style.css"
import {useState} from "react";
import { AxiosResponse } from "axios";
import { ConceptProps } from "../types";
import { FC } from "react";
import ConceptAPI from "../api";
import { useForm } from "react-hook-form";


const ConceptView: FC<ConceptProps> = (props) => {
  return (
      <article className="concept-article">
        <section className="name">{props.name}</section>
        <section className="desc">{props.description}</section>
      </article>
  )
}

const UpdateConcept: FC<ConceptProps> = (props) => {
  const {register, watch, handleSubmit, formState} = useForm<ConceptProps>({
    defaultValues: props
  })


  // const onSubmit: SubmitHandler<ConceptProps> = data => {
  //   alert("sex")
  // }

  return (
    <form className="Concept" >
      <input {...register("name", {required: true})} />
      <br />
      <textarea {...register("description", {required: true})} />
      <br />
      <input type="submit"/>
    </form>
  );
}


export const ConceptItem: FC<ConceptProps> = (props) => {
  const [isEdit, setEdit] = useState<boolean>(false)

  return (
    <li className="concept-item" key={props.uid}>
      {isEdit
        ? <UpdateConcept {...props} /> 
        : <ConceptView {...props}/>
      }
      <button onClick={() => setEdit(!isEdit)}>Edit</button>
      <button>Delete</button>
    </li>
  );
};



interface Concepts {
  values: ConceptProps[]
}

const ConceptList: FC<Concepts> = (props) => {

  return (
    <ul className="concept-list">
      {props.values.map(elm => <ConceptItem {...elm} />)}

    </ul>
  )
}


export const ReadConcept = () => {
  const [data, setData] = useState<ConceptProps[]>([]);

  const fetchData = () => {
    ConceptAPI.findAll(setData)
  }

  const updateData = (index:number, props: ConceptProps) => {

  }

  return <>
    <button onClick={fetchData}>Fetch</button>
    <button onClick={() => setData([])}>Clear</button>
    <ConceptList values={data}/>
  </>;
};
