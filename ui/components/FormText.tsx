import { css } from "@hono/hono/css";
import { FC } from "@hono/hono/jsx";

const wrapperClass = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: var(--font-size-medium);
  width: 100%;
`;

const valueWrapperClass = css`
  flex-grow: 1;
  text-align: center;
`;

type Props = {
  label: string;
  value: string;
};

export const FormText: FC<Props> = (props: Props) => {
  const { label, value } = props;

  return (
    <div class={wrapperClass}>
      <span>{label}</span>
      <div class={valueWrapperClass}>
        <span>{value}</span>
      </div>
    </div>
  );
};
