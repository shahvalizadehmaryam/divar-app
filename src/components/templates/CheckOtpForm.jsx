import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { checkOtp } from "services/auth";
import { setCookie } from "utils/cookie";
import { getProfile } from "services/user";
import styles from "./CheckOtpForm.module.css"

function CheckOtpForm({ code, setCode, setStep, mobile }) {
  const navigate = useNavigate();
  const { refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  });
  const submitHandler = async (event) => {
    event.preventDefault();
    if (code.length !== 5) return;
    const { error, response } = await checkOtp(mobile, code);
    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
    }
    if (error) toast.error(error.response.data.message);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد اس ام اس شده</p>
      <span>کد پیامک شده به شماره {mobile} را وارد کنید.</span>
      <label htmlFor="code">کد تایید را وارد کنید.</label>
      <input
        type="text"
        id="code"
        onChange={(e) => setCode(e.target.value)}
        value={code}
        placeholder="کد تایید"
      />
      <button type="submit">ورود</button>
      <button onClick={() => setStep(1)} className={styles.backButton}>تغییر شماره موبایل</button>
    </form>
  );
}

export default CheckOtpForm;
