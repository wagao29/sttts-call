import { css } from "@hono/hono/css";
import { FC } from "@hono/hono/jsx";

const btnClass = css`
  padding: 10px;
  width: 200px;
  background-color: var(--color-green);
  border-radius: var(--border-radius-small);
  display: flex;
  align-items: center;
`;

const labelClass = css`
  flex: 1;
  text-align: center;
  font-size: var(--font-size-small);
`;

type Props = {
  iconSrc: string;
  labelText: string;
};

export const SquareButton: FC<Props> = (props: Props) => {
  const { iconSrc, labelText } = props;

  return (
    <button class={btnClass}>
      <img width={30} height={30} src={iconSrc}></img>
      <span class={labelClass}>{labelText}</span>
    </button>
  );
};
