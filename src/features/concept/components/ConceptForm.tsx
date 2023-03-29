import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import ConceptAPI from "../api";

import {ConceptProps} from "../types";



const ConceptForm: FC<ConceptProps> = (props) => {
  // const { register, handleSubmit } = useForm<ConceptProps>(props);

  // const onSubmit: SubmitHandler<ConceptProps> = data => {
  //   ConceptAPI.create(data)
  // };

  // return (
  //   <form className="Concept" onSubmit={handleSubmit(onSubmit)}>
  //     <input {...register("name", {required: true})} />
  //     <br />
  //     <textarea {...register("description", {required: true})} />
  //     <br />
  //     <input type="submit"/>
  //   </form>
  // );
  return <div>aaaa</div>

}

export default ConceptForm
