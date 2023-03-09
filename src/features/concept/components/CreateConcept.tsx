// import { useState } from "react";
import "./Style.css"
import {
  useForm,
  SubmitHandler,
  // SubmitErrorHandler
} from "react-hook-form";
import { ConceptProps } from "../types";
import ConceptAPI from "../api";
import {Concept} from "./Concept";


export const CreateConcept = () => {
  const {register, watch, handleSubmit, formState} = useForm<ConceptProps>();

  const onSubmit: SubmitHandler<ConceptProps> = data => {
    ConceptAPI.create(data)
  };

  return (
    <form className="Concept" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", {required: true})} />
      <br />
      <textarea {...register("description", {required: true})} />
      <br />
      <input type="submit"/>
    </form>
  );
};
