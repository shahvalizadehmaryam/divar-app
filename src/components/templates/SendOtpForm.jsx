import toast from "react-hot-toast";
import { sendOtp } from "services/auth";
import styles from "./SendOtpForm.module.css"

function SendOtpForm({ mobile, setMobile, setStep }) {
  const submitHandler = async (event) => {
    event.preventDefault();
    if (mobile.length !== 11) return;
    const { response, error } = await sendOtp(mobile);
    if (response) setStep(2);
    if (error) toast.error(error.response.data.message);
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید.کد
        تایید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="mobile">شماره موبایل خود را وارد کنید.</label>
      <input
        type="text"
        id="mobile"
        onChange={(e) => setMobile(e.target.value)}
        value={mobile}
        placeholder="شماره موبایل"
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
}

export default SendOtpForm;
