import { type FC, useState } from "react"
import { type ConceptProps } from "../types"
import { CreateConcept } from "./CreateConcept"

export const ConceptItem: FC<ConceptProps> = (props) => {
  const [isEditting] = useState<boolean>(false)

  if (isEditting) {
    return <CreateConcept />
  } else {
    return <div>dummy</div>
  }

  // return (
  //   <>
  //     { isEditting ? <p>aaaa</p> : <p>bbbb</p> }
  //     <button onClick={() => setEditting(!isEditting)} >E</button>
  //     <button onClick={() => setEditting(!isEditting)} >D</button>
  //   </>
  // )
}

export default ConceptItem
