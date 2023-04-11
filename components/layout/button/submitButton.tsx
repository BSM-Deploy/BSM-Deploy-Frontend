export default function SubmitButton({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <input
        type="submit"
        value="다음"
        onClick={onClick}
        className="blue-button w-[10rem] h-[6rem]"
      />
    </>
  );
}
