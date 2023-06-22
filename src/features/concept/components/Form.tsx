import ErrorText from "./ErrorText"
import MutationResult from "./MutationResult"
import useConceptForm from "../hooks/useCreateForm"

import type { FC } from "react"



const Form: FC = () => {
  const {
    register,
    formState: { errors },
    onSubmit,
    mutation,
  } = useConceptForm()

  return (
    <div css={style}>
      <form onSubmit={onSubmit}>
        <div className="line">
          <label>
            <span>名前</span>
            <input
              type="text"
              {...register("name")}
            />
          </label>
        </div>
        <div className="line">
          <label>
            <span>説明</span>
            <textarea {...register("description")} />
          </label>
        </div>
        <div>
          <ErrorText message={errors.name?.message} />
          <ErrorText message={errors.description?.message} />
        </div>
        <div className="line">
          <div>
            <button type="submit">作成</button>
            <button type="reset">リセット</button>
          </div>
        </div>
      </form>
      <MutationResult
        isPending={mutation.isPending}
        errorMessage={mutation.error?.message}
        successMessage={!mutation.isIdle && "作成に成功しました"}
      />
    </div>
  )
}

export default Form

const width = "20rem"

const style = css`
  * {
    margin-left: auto;
    margin-right: auto;
  }

  .line {
    display: flex;
  }

  div {
    text-align: center;
  }


  span {
    vertical-align: top;
  }

  input,textarea {
    width: ${width};
    padding 1rem;
    font-size: 1rem;
  }

  textarea {
    height: 3rem;
  }
`
