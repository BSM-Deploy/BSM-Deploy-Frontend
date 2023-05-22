export default function SubmitButton({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <input
        type="submit"
        value="다음"
        onClick={onClick}
        className="blue-button w-[100px] h-[60px] text-[20px]"
      />
    </>
  );
}
