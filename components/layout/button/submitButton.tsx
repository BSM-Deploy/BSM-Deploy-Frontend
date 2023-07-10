export default function SubmitButton({ onClick }: { onClick?: () => void }) {
  return (
    <>
      <input
        type="submit"
        value="다음"
        onClick={onClick}
        className="blue-button w-[100px] h-[60px] text-[20px] mobile:h-[50px] mobile:w-[80px] mobile:text-[16px]"
      />
    </>
  );
}
