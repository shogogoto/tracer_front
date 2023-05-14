import {
  type ReactNode,
  type FC,
  useState,
  useRef,
  type ReactElement,
  type RefObject,
  cloneElement,
} from "react"
import { useKey } from "react-use"
import { css } from "@emotion/react"

export const cssActivated = css`
  color: red;
  border: solid;
`

type Props = {
  isActivated: (n: ReactElement) => boolean
  activate: (n: ReactNode) => void
  children: ReactElement<{ ref: RefObject<HTMLElement> }>
}

const Activation: FC<Props> = (props) => {
  const ref = useRef<HTMLElement>(null)
  const [isStyled, toggleStyled] = useState(props.isActivated(props.children))

  const activate = (): void => {
    props.activate(props.children)
    toggleStyled(props.isActivated(props.children))
  }

  const handleClick = (e): void => {
    activate()
    ref.current?.click()
  }

  useKey("Enter", activate, {}, [isStyled])
  return (
    <div
      css={isStyled && cssActivated}
      onClick={handleClick}
      data-testid="activation"
    >
      {cloneElement(props.children, { ref })}
    </div>
  )
}

export default Activation
