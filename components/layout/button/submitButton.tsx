export default function SubmitButton({ onClick, disabled }: {onClick?: () => void; disabled?: boolean }) {
  return (
    <>
      <input
        type="submit"
        value="다음"
        disabled={disabled}
        onClick={onClick}
        className="blue-button w-[10rem] h-[6rem]"
      />
    </>
  );  
};
