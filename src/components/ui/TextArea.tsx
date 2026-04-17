type Props = {
  type: string;
  value: string;
  id?: string;
  onChange: (value: string) => void;
};

const TextArea = (props: Props) => {
  return (
    <>
      <input
        type={props.type}
        value={props.value}
        id={props.id}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
        className="p-4 border border-gray-300 w-full"
      />
    </>
  );
};

export default TextArea;
