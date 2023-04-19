import { ConceptProps } from "./types";
import { AxiosResponse } from "axios";
import BACKEND from "../api";



class ConceptAPI {
  public static async create(props: ConceptProps): Promise<AxiosResponse> {
    return BACKEND.post("concepts", props)
  }

  public static async update(props: ConceptProps): Promise<AxiosResponse> {
    return BACKEND.put("concepts", props)
  }


  public static findAll(
    setter: (props: ConceptProps[]) => void
  ): void {
    BACKEND.get("concepts")
    .then((res: AxiosResponse<ConceptProps[]>) => {
      setter(res.data)
    })
  }
}


export default ConceptAPI
